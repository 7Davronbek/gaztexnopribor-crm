import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { API_PATH } from "@/constants";
import { Loader } from "@/components/Loader.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
  const [statistics, setStatistic] = useState([]);
  const [btn, setBtn] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getStatistics = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        API_PATH +
          `/main/statictics/${
            btn === 1
              ? ""
              : btn === 2
              ? "?today=2"
              : btn === 3
              ? "?yesterday=3"
              : btn === 4
              ? "?week=4"
              : btn === 5
              ? "?month=5"
              : "?year=6"
          }`
      );
      setStatistic(data);
      setIsLoading(false);
    };
    getStatistics();
  }, [btn]);

  const data = {
    labels: [
      "Принимающий",
      "Специалист",
      "Бухгалтер",
      "Оплата",
      "Pабота над счетчиком",
      "B стенд",
      "Документация",
      "Bce",
    ],
    datasets: [
      {
        label: "Transaction",
        data: [
          statistics.received,
          statistics.specialist,
          statistics.accountant,
          statistics.payment,
          statistics.test,
          statistics.end,
          statistics.docs,
        ],
        backgroundColor: [
          "#76ca66",
          "#3174BA",
          "#FFC772",
          "#FF6E2E",
          "#DA1E28",
          "#CF54BC",
          "#9461FF",
        ],
        borderColor: ["#fff"],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      labels: {
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Doughnut Chart",
      },
    },
  };

  return (
    <div className="Statistics">
      <h1>Мониторинг</h1>
      <div className="filterWrap FilterStyle">
        <div
          onClick={() => setBtn(1)}
          className={`filterBtn ${btn === 1 ? "active" : ""}`}
        >
          Все
        </div>
        <div
          onClick={() => setBtn(2)}
          className={`filterBtn ${btn === 2 ? "active" : ""}`}
        >
          Сегодня
        </div>
        <div
          onClick={() => setBtn(3)}
          className={`filterBtn ${btn === 3 ? "active" : ""}`}
        >
          Вчера
        </div>
        <div
          onClick={() => setBtn(4)}
          className={`filterBtn ${btn === 4 ? "active" : ""}`}
        >
          Неделя
        </div>
        <div
          onClick={() => setBtn(5)}
          className={`filterBtn ${btn === 5 ? "active" : ""}`}
        >
          Месяц
        </div>
        <div
          onClick={() => setBtn(6)}
          className={`filterBtn ${btn === 6 ? "active" : ""}`}
        >
          Год
        </div>
      </div>
      <div className="cards CardStyle">
        <div className="cardsTop">
          <h2>Статистика </h2>
          <h3>Поступающих счетчиков по статусам</h3>
        </div>
        <div className="line"></div>

        <div className="cardsBottom">
          <div className="chart">
            {isLoading ? (
              <Loader />
            ) : (
              <Doughnut data={data} options={options} />
            )}
          </div>

          <div className="userList">
            <div className="row">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <div className="col-lg-5">
                    <div className="wrap">
                      <p>
                        <span className="green"></span>Принимающий
                      </p>
                      <h6>{statistics.received}</h6>
                    </div>
                    <div className="wrap">
                      <p>
                        <span className="blue"></span>Специалист
                      </p>
                      <h6>{statistics.specialist}</h6>
                    </div>
                    <div className="wrap">
                      <p>
                        <span className="orange"></span>Бухгалтер
                      </p>
                      <h6>{statistics.accountant}</h6>
                    </div>
                    <div className="wrap">
                      <p>
                        <span className="dark-orange"></span>Оплата
                      </p>
                      <h6>{statistics.payment}</h6>
                    </div>
                  </div>
                  <div className="col-lg-5 ms-auto">
                    <div className="wrap">
                      <p>
                        <span className="pink"></span>B стенд
                      </p>
                      <h6>{statistics.test}</h6>
                    </div>
                    <div className="wrap">
                      <p>
                        <span className="red"></span>Pабота над счетчиком
                      </p>
                      <h6>{statistics.end}</h6>
                    </div>
                    <div className="wrap">
                      <p>
                        <span className="dark-blue"></span>Документация
                      </p>
                      <h6>{statistics.docs}</h6>
                    </div>
                    <div className="wrap">
                      <p>
                        <span className="dark-blue"></span>Bce
                      </p>
                      <h6>
                        {statistics.received +
                          statistics.specialist +
                          statistics.accountant +
                          statistics.payment +
                          statistics.test +
                          statistics.docs}
                      </h6>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
