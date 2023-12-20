import search from "@/assets/search.svg";
import bell from "@/assets/bell.svg";

const MonitoringNavbar = () => {
  return (
    <>
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
      </div>
    </>
  );
};

export default MonitoringNavbar;
