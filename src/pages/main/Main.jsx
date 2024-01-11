import logo from "@/assets/logo.svg";
import closeEye from "@/assets/closeEye.svg";
import openEye from "@/assets/opneEye.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_PATH } from "@/constants";
import { TOKEN, USER_ROLE } from "../../constants";
// import { useDispatch, useSelector } from "react-redux";
// import { setToken } from "../../redux/authSlice";

const Main = () => {
  const [isPassword, setIsPassword] = useState(true);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const logIn = (e) => {
    setIsLoading(true);
    e.preventDefault();
    axios
      .post(API_PATH + "/user/login/", {
        username: login,
        password,
      })
      .then((res) => {
        const inputString = res.data.token;
        const startIndex = inputString.indexOf(": ") + 2;
        const endIndex = inputString.indexOf(">");
        const extractedValue = inputString.substring(startIndex, endIndex);

        localStorage.setItem(TOKEN, extractedValue);
        localStorage.setItem(USER_ROLE, res.data.role.toUpperCase());
        localStorage.setItem("ismi", res?.data?.name);
        // dispatch(setToken({ extractedValue }));

        if (res.data.role === "receiver") {
          navigate("/monitoring", { replace: true });
          window.location.reload();
        }
        if (res.data.role === "specialist") {
          navigate("/specialist-client-list", { replace: true });
          window.location.reload();
        }
        if (res.data.role === "accountant") {
          navigate("/accountant-client-list", { replace: true });
          window.location.reload();
        }
        if (res.data.role === "client") {
          navigate("/client-receiver", { replace: true });
          window.location.reload();
        }
        if (res.data.role === "uz_standard") {
          navigate("/standard-client-list", { replace: true });
          window.location.reload();
        }
        if (res.data.role === "inspector_1") {
          navigate("/inspector_1", { replace: true });
          window.location.reload();
        }
        if (res.data.role === "inspector_2") {
          navigate("/inspector_2", { replace: true });
          window.location.reload();
        }

        if (res.data.role === "sten") {
          navigate("/sten-client-list", { replace: true });
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err.response.status === 302) {
          toast.info("User is already logged in");
        } else {
          toast.error("Couldn't login");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="Main">
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-12 ">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
          </div>
          <div className="col-lg-5 mx-auto h-100 myCol">
            <form onSubmit={logIn} className="cards">
              <h1>Вход</h1>
              <label htmlFor="Логин">Логин</label>
              <input
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                type="text"
                id="Логин"
                className="form-control mb-3"
              />

              <div className="inputWrap">
                <label htmlFor="Пароль">Пароль</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type={isPassword ? "password" : "text"}
                  id="Пароль"
                  className="form-control"
                />
                {isPassword ? (
                  <div
                    onClick={() => setIsPassword(false)}
                    className="openEye eye"
                  >
                    <img src={openEye} alt="" />
                  </div>
                ) : (
                  <div
                    onClick={() => setIsPassword(true)}
                    className="closeEye eye"
                  >
                    <img src={closeEye} alt="" />
                  </div>
                )}
              </div>

              <button disabled={isLoading} className="btn myBtn" type="submit">
                {isLoading && (
                  <i className="spinner-border spinner-border-sm text-white text-dark me-2"></i>
                )}
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
