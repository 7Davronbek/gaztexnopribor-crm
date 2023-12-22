import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import MonitoringNavbar from "@/pages/RECEIVING/monitoring/components/MonitoringNavbar.jsx";
import { API_PATH, CONFIG } from "@/constants/index.js";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ClientLayout = () => {
  const [client, setClient] = useState([]);
  const nav = useNavigate();

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

        <div className="col-lg-10 right">
          <MonitoringNavbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
