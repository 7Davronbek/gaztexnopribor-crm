import search from "@/assets/search.svg";
import bell from "@/assets/bell.svg";
import { useEffect, useState } from "react";

const MonitoringNavbar = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  return (
    <>
      <div className="MonitoringNavbar">
        <div className="local_time me-3">
          <h5>{date.toLocaleTimeString()}</h5>
        </div>
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
          <div>
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
    </>
  );
};

export default MonitoringNavbar;
