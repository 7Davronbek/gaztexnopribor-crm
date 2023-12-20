import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import MonitoringNavbar from "../pages/RECEIVING/monitoring/components/MonitoringNavbar";
import { TOKEN, USER_ROLE } from "@/constants/index.js";
import logout from "@/assets/logout.svg";

const StenLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER_ROLE);
    navigate("/", { replace: true });
  };
  return (
    <div className="ReceivingLayout LayoutStyle">
      <div className="row">
        <div className="col-lg-2 left">
          <div className="linkWrapper">
            <Link to="/" className="logo">
              <img src={logo} alt="" />
            </Link>
            <Link
              className={`link ${
                location.pathname === "/sten-client-list" && "active"
              }`}
              to="/sten-client-list"
            >
              <span className="icon icon-list"></span>Список клиентов
            </Link>
            <Link
              className={`link ${
                location.pathname === "/sten-client-history" && "active"
              }`}
              to="/sten-client-history"
            >
              <span className="icon icon-history"></span>История клиентов
            </Link>
          </div>
          <button onClick={logOut} className="btn">
            <span>
              <img src={logout} alt="" />
            </span>
            Выход
          </button>
        </div>
        <div className="col-lg-10 right">
          <MonitoringNavbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StenLayout;
