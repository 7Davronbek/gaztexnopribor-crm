import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { API_PATH, CONFIG } from "@/constants/index.js";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import search from "@/assets/search.svg";
import bell from "@/assets/bell.svg";

const ClientLayout = () => {
  const [client, setClient] = useState([]);
  const nav = useNavigate();
  const [bar, setBar] = useState(false);

  const getClient = useCallback(async () => {
    try {
      const { data } = await axios.get(API_PATH + "/main/client/", CONFIG);
      setClient(data);
      if (data) {
        if (data[0].status === "received") {
          nav("/client-receiver");
        }
        if (data[0].status === "specialist") {
          nav("/client-spesialist");
        }
        if (data[0].status === "accountant") {
          nav("/client-accountant");
        }
        if (data[0].status === "payment") {
          nav("/client-accountant");
        }
        if (data[0].status === "specialist_2") {
          nav("/client-specialist-2");
        }
        if (data[0].status === "test") {
          nav("/client-test");
        }
        if (data[0].status === "docs") {
          nav("/client-docs");
        }
        if (data[0].status === "end") {
          nav("/client-end");
        }
      } else {
        toast.error("Error getting client:");
      }
    } catch (error) {
      toast.error("Error getting client:", error);
    }
  }, [nav]);

  useEffect(() => {
    getClient();
  }, [getClient]);

  return (
    <div className="ClientLayout LayoutStyle">
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
        <div className={`col-lg-2 left2 ${bar ? "" : "d-none"}`}>
          <div className="logo d-flex justify-content-between align-items-center">
            <img src={logo} alt="" />
            <svg
              onClick={() => setBar(false)}
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="40"
              viewBox="0 0 384 512"
              className="me-3"
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </div>

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
              <h5>
                Происходит внешний осмотр счетчика и отправляется к специалисту
              </h5>
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
              <h5>Бухгалтер заполняет ценами запчастей и других услуг</h5>
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
              <h5>
                Специалист производит внутренний осмотр счётчик и заполняет
                нужные данные (нужные запчасти и другие данные) по форме.
              </h5>
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
              <h5>Pачинается внутренний осмотр и работа над счетчиком</h5>
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
              <h5>Начинается внутренний осмотр и работа над счетчиком</h5>
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
              <h5>Начинается внутренний осмотр и работа над счетчиком</h5>
            </div>
          </div>
        </div>

        <div className={`col-lg-10 right ${bar ? "d-none" : ""}`}>
          <div className="MonitoringNavbar">
            <div className="inputWrap">
              <div className="search">
                <img src={search} alt="" />
              </div>
              <input type="text" placeholder="Поиск" className="form-control" />
            </div>

            <div className="bell">
              <img src={bell} alt="" />
            </div>
            <div className="menu_bar_icon ">
              <div>
                <img src="/src/assets/logo.svg" alt="" />
              </div>
              <div onClick={() => setBar(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  viewBox="0 0 448 512"
                >
                  <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                </svg>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
