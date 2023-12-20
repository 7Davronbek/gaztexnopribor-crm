import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import MonitoringNavbar from "@/pages/RECEIVING/monitoring/components/MonitoringNavbar.jsx";
import { API_PATH, CONFIG } from "@/constants/index.js";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ClientPaymeParol = () => {
  const [client, setClient] = useState([]);
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState("");
  const [parol, setParol] = useState("");
  const navigate = useNavigate();
  const order_id = localStorage.getItem("order_id");
  const getClient = useCallback(async () => {
    try {
      const { data } = await axios.get(API_PATH + "/main/client/", CONFIG);
      setClient(data);
    } catch (error) {
      toast.error("Error getting client:", error);
    }
  }, [nav]);

  useEffect(() => {
    getClient();
  }, [getClient]);

  const PayLast = () => {
    const formData2 = new FormData();
    formData2.append("token", localStorage.getItem("TOKEN_PAYME"));
    axios
      .post(API_PATH + `/payment/payment/`, formData2, CONFIG)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        axios
          .patch(API_PATH + `/main/update-spcialist-2/${order_id}/`, {
            inspector_1: true,
          })
          .then(() => {
            navigate("/client-specialist-2");
          })
          .catch((error) => {
            toast.error("Error with payment:", error);
          });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast(
          "Xatolik yuz berdi qayta urunib ko'ring yoki hisobingizni tekshiring"
        );
      });
  };

  const post = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("verify_code", parol);
    formData.append("token", localStorage.getItem("TOKEN_PAYME"));

    if (parol.length > 0) {
      axios
        .post(API_PATH + `/payment/verify-phone/`, formData, CONFIG)
        .then((res) => {
          setIsLoading(false);
          PayLast();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);

          setIsLoading(false);
          toast.error("Invalid order");
        });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="ClientLayout LayoutStyle ClientPayme">
      <div className="row">
        <div className="col-lg-2 left">
          <Link to="/" className="logo">
            <img src={logo} alt="" />
          </Link>

          <div
            className={`wrap ${
              client[0]?.status === "received" ||
              client[0]?.status === "specialist" ||
              client[0]?.status === "accountant" ||
              client[0]?.status === "payment" ||
              client[0]?.status === "specialist_2" ||
              client[0]?.status === "test" ||
              client[0]?.status === "docs" ||
              client[0]?.status === "end"
                ? "active"
                : ""
            }`}
          >
            <div className="iconWrap">
              <span className="icon icon-dot"></span>
            </div>
            <div className="line"></div>
            <div>
              <h3>Принимающий</h3>
              <h4>
                Происходит внешний осмотр счетчика и отправляется к специалисту
              </h4>
            </div>
          </div>

          <div
            className={`wrap ${
              client[0]?.status === "specialist" ||
              client[0]?.status === "accountant" ||
              client[0]?.status === "payment" ||
              client[0]?.status === "specialist_2" ||
              client[0]?.status === "test" ||
              client[0]?.status === "docs" ||
              client[0]?.status === "end"
                ? "active"
                : ""
            }`}
          >
            <div className="iconWrap">
              <span className="icon icon-dot"></span>
            </div>
            <div className="line h-105"></div>
            <div>
              <h3>Специалист</h3>
              <h4>
                Специалист производит внутренний осмотр счётчик и заполняет
                нужные данные (нужные запчасти и другие данные) по форме.
              </h4>
            </div>
          </div>

          <div
            className={`wrap ${
              client[0]?.status === "accountant" ||
              client[0]?.status === "payment" ||
              client[0]?.status === "specialist_2" ||
              client[0]?.status === "test" ||
              client[0]?.status === "docs" ||
              client[0]?.status === "end"
                ? "active"
                : ""
            }`}
          >
            <div className="iconWrap">
              <span className="icon icon-dot"></span>
            </div>
            <div className="line"></div>
            <div>
              <h3>Бухгалтер</h3>
              <h4>Бухгалтер заполняет ценами запчастей и других услуг</h4>
            </div>
          </div>

          <div
            className={`wrap ${
              client[0]?.status === "payment" ||
              client[0]?.status === "specialist_2" ||
              client[0]?.status === "test" ||
              client[0]?.status === "docs" ||
              client[0]?.status === "end"
                ? "active"
                : ""
            }`}
          >
            <div className="iconWrap">
              <span className="icon icon-dot"></span>
            </div>
            <div className="line"></div>
            <div>
              <h3>Оплата</h3>
              <h4>
                Оплачитите за услуги в виде онлайн оплаты (Click , Payme) или в
                виде наличные.
              </h4>
            </div>
          </div>

          <div
            className={`wrap ${
              client[0]?.status === "specialist_2" ||
              client[0]?.status === "test" ||
              client[0]?.status === "docs" ||
              client[0]?.status === "end"
                ? "active"
                : ""
            }`}
          >
            <div className="iconWrap">
              <span className="icon icon-dot"></span>
            </div>
            <div className="line h-105"></div>
            <div>
              <h3>Специалист 2</h3>
              <h4>
                Специалист производит внутренний осмотр счётчик и заполняет
                нужные данные (нужные запчасти и другие данные) по форме.
              </h4>
            </div>
          </div>

          <div
            className={`wrap ${
              client[0]?.status === "test" ||
              client[0]?.status === "docs" ||
              client[0]?.status === "end"
                ? "active"
                : ""
            }`}
          >
            <div className="iconWrap">
              <span className="icon icon-dot"></span>
            </div>
            <div className="line"></div>
            <div>
              <h3>Pабота над счетчиком</h3>
              <h4>Pачинается внутренний осмотр и работа над счетчиком</h4>
            </div>
          </div>

          <div
            className={`wrap ${
              client[0]?.status === "docs" || client[0]?.status === "end"
                ? "active"
                : ""
            }`}
          >
            <div className="iconWrap">
              <span className="icon icon-dot"></span>
            </div>
            <div className="line"></div>
            <div>
              <h3>B стенд</h3>
              <h4>Начинается внутренний осмотр и работа над счетчиком</h4>
            </div>
          </div>

          <div
            className={`wrap ${client[0]?.status === "end" ? "active" : ""}`}
          >
            <div className="iconWrap">
              <span className="icon icon-dot"></span>
            </div>
            <div>
              <h3>Документация</h3>
              <h4>Начинается внутренний осмотр и работа над счетчиком</h4>
            </div>
          </div>
        </div>

        <div className="col-lg-10 right">
          <MonitoringNavbar />
          <div onSubmit={post} className="payme_box w-50 ms-5">
            <div className="payme_box_name">
              <h3 className={"mb-2"}>Payme {"to'lov"} tizimi</h3>
              <h5 className={"mb-3"}>Tasdiqlash kodini kiriting</h5>
              <div className="order_amount">{}</div>
              <form onSubmit={post} action="">
                <div className="input_box">
                  <div className="pay_card_inp_box">
                    <input
                      onChange={(e) => setParol(e.target.value)}
                      placeholder="______"
                      maxLength={6}
                      minLength={6}
                      pattern="\d*"
                      name=""
                      id="inp_id"
                      className=" form-control"
                    />
                  </div>
                  <button
                    className="pay_a btn myBtn mt-3"
                    disabled={isLoading}
                    type="submit"
                  >
                    Tasdiqlash
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPaymeParol;
