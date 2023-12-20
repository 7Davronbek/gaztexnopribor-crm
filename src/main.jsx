import { Provider } from "react-redux";
import { store } from "./redux/store";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
