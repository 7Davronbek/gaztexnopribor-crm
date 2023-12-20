import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import MonitoringNavbar from "@/pages/RECEIVING/monitoring/components/MonitoringNavbar.jsx";
import { API_PATH, CONFIG } from "@/constants/index.js";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

const ClientPayme = () => {
  const [client, setClient] = useState([]);
  const nav = useNavigate();

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

  const [card, setCard] = useState("");
  const [num, setNum] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const navigate = useNavigate();
  const amount = localStorage.getItem("amount") || "0";
  const post = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("number", card);
    formData.append("expire", num);

    if (card.length > 0 && num.length > 0) {
      axios
        .post(API_PATH + `/payment/card-create/`, formData, CONFIG)
        .then((res) => {
          setIsLoading(false);
          localStorage.setItem("TOKEN_PAYME", res.data.token);
          navigate("/client-payme-parol");
        })
        .catch(() => {
          setIsLoading(false);
          toast.error("Ma'lumotlaringizda xatolik mavjud");
        });
    } else {
      setIsLoading(false);
      toast.error("Ma'lumotlarni kiriting.")
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
              <h3>Payme {"to'lov"} tizimi</h3>

              <div className="order_amount py-3">{Math.round(amount).toLocaleString()}</div>
              <form action="">
                <div className="input_box">
                  <div className="pay_card_inp_box">
                    <label className={"mb-2"} htmlFor="name">Carta raqami</label>
                    <InputMask
                      onChange={(e) => setCard(e.target.value)}
                      value={card}
                      mask="9999 9999 9999 9999"
                      maskChar="_"
                      placeholder="Karta raqami"
                      id="name"
                      type="text"
                      className="pay_card_inp form-control  mb-3"
                    />

                    <label className={"mb-2"} htmlFor="month">Amal qilish muddati</label>
                    <InputMask
                      value={num}
                      onChange={(e) => setNum(e.target.value)}
                      mask="99 / 99"
                      maskChar="_"
                      placeholder="MM / YY"
                      id="month"
                      type="text"
                      className="pay_card_inp form-control  mb-3"
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

export default ClientPayme;
