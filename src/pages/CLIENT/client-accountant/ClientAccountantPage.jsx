import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_PATH, CONFIG } from "@/constants/index.js";
import { toast } from "react-toastify";
import { PDFExport } from "@progress/kendo-react-pdf";
import payme from "@/assets/payme.png";
import cash from "@/assets/cash.png";

const ClientAccountantPage = () => {
  const [order, setClient] = useState([]);
  const [payment, setPayment] = useState(false);

  const getClient = useCallback(async () => {
    try {
      const { data } = await axios.get(API_PATH + "/main/client/", CONFIG);
      setClient(data);
    } catch (error) {
      toast.error("Error getting client:", error);
    }
  }, []);

  useEffect(() => {
    getClient();
  }, [getClient]);

  const contentArea = useRef(null);

  const nav = useNavigate();
  const [agre, setAgre] = useState(false);
  const patchStatus = () => {
    setPayment(true);
    // await axios
    //   .patch(API_PATH + `/main/update-spcialist-2/${order[0].id}/`, {
    //     status: "specialist_2",
    //   })
    //   .then(() => {})
    //   .catch((error) => {
    //     toast.error("Error with payment:", error);
    //   });
  };
  const patchStatus2 = () => {
    axios
      .patch(API_PATH + `/main/update-spcialist-2/${order[0].id}/`, {
        status: "accountant",
      })
      .then(() => {
        toast("Скоро рассмотрю!");
      })
      .catch((error) => {
        toast.error("Error with payment:", error);
      });
  };
  
  const sendToPayme = () => {
    localStorage.setItem("amount", order[0]?.get_full_amount * 1.12);
    localStorage.setItem("order_id", order[0]?.id);
    nav("/client-payme");
  };

  const pdfExportComponent = useRef(null);
  const [layoutSelection, setLayoutSelection] = useState({
    text: "A4",
    value: "size-a4",
  });

  const handleExportWithComponent = () => {
    pdfExportComponent.current.save();
  };

  return (
    <>
      <div
        className={`ClientAccountantPage ${payment ? "d-none" : ""} ${
          agre ? "d-none" : ""
        }`}
      >
        <div className={`myModal middleModal accountantModal active"}`}>
          <div className="cards">
            <div className="cardsTop border-0">
              <div className="d-flex align-items-center justify-content-between">
                <h1>Бухгалтер </h1>
                <div className="closeImg cursor">
                  <button
                    onClick={handleExportWithComponent}
                    className="btn myBtn"
                  >
                    Скачать PDF
                  </button>
                </div>
              </div>
            </div>
            <PDFExport ref={pdfExportComponent}>
              <div className="cardsTop">
                <div className="d-flex align-items-center justify-content-between">
                  <h1>{order[0]?.name_org} </h1>
                </div>
                <div className="mb-2">
                  <h2>INN - {order[0]?.inn}</h2>
                </div>
                <div className="topWrap">
                  <div className="d-flex align-items-center">
                    <div className="wrap me-5">
                      <h2>Зав.№ сч</h2>
                      <h3>№ {order[0]?.serial_number}</h3>
                    </div>
                    <div className="wrap">
                      <h2>Зав.№ сч</h2>
                      <h3>№ {order[0]?.temp_sensor}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div
                ref={contentArea}
                className={`cardsBody ${layoutSelection.value}`}
              >
                <table className="table TableStyle">
                  <thead>
                    <tr>
                      <td>Наименование работ и услуг</td>
                      <td>Кол.</td>
                      <td>Ед. изм</td>
                      <td>Цена</td>
                      <td>Сумма</td>
                      <td>НДС %</td>
                      <td>Сумма НДС</td>
                      <td>Общая сумма с учетом НДС, сум</td>
                    </tr>
                  </thead>

                  <tbody>
                    {order[0]?.order_products &&
                      order[0].order_products.map((item) => (
                        <tr key={item.id}>
                          <th>{item?.product?.name}</th>
                          <th>{item?.count}</th>
                          <th> шт</th>
                          <th>{item?.product?.price.toLocaleString()}</th>
                          <th>
                            {(
                              item?.product?.price * item.count
                            ).toLocaleString()}
                          </th>
                          <th>12%</th>
                          <th>
                            {(
                              item.product?.price * item.count * 1.12 -
                              item.product?.price * item.count
                            ).toLocaleString()}
                          </th>
                          <th>
                            {(
                              item.product?.price *
                              1.12 *
                              item.count
                            ).toLocaleString()}
                          </th>
                        </tr>
                      ))}
                  </tbody>

                  <tfoot>
                    <tr>
                      <td>ИТОГО</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{order[0]?.get_full_amount?.toLocaleString()}</td>
                      <td></td>
                      <td>
                        {(
                          order[0]?.get_full_amount * 1.12 -
                          order[0]?.get_full_amount
                        ).toLocaleString()}
                      </td>
                      <td>
                        {(order[0]?.get_full_amount * 1.12).toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </PDFExport>
            <div className="btnWrap">
              <button
                onClick={() => patchStatus2()}
                className="btn cardsBtn silver d-block w-50"
              >
                Hе согласится, отправить к принимающему
              </button>
              <button
                onClick={() => patchStatus()}
                className="btn cardsBtn d-block w-50"
              >
                Согласится и перейти к оплату
              </button>
            </div>
          </div>
        </div>
      </div>
      {payment ? (
        <>
          <div className="ClientPaymentPage ClientSpecialistPage ClientReceiverPage RightStyle">
            <h1 className="mb-4">Оплата</h1>
            <div className="row">
              {/* <div className="col-lg-6">
                <div className="paymentCard">
                  <div className="img">
                    <img src={click} alt="" />
                  </div>
                  <button className="btn myBtn">Оплатить</button>
                </div>
              </div> */}
              <div className="col-lg-6">
                <div className="paymentCard">
                  <div className="img">
                    <img src={payme} alt="" />
                  </div>
                  <button onClick={() => sendToPayme()} className="btn myBtn">
                    Оплатить
                  </button>
                </div>
              </div>
              {/* <div className="col-lg-6">
                <div className="paymentCard">
                  <div className="img">
                    <img src={cash} alt="" />
                  </div>
                  <button className="btn myBtn">Оплатить</button>
                </div>
              </div> */}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ClientAccountantPage;
