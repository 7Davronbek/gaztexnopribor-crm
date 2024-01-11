import { useCallback, useEffect, useState } from "react";
import plus from "@/assets/plus.svg";
import close from "@/assets/close.svg";
import axios from "axios";
import { API_PATH, CONFIG } from "../../../constants";
import { toast } from "react-toastify";
import { Loader } from "@/components/Loader.jsx";
import edit from "@/assets/edit.svg";

const AccountantToolsPage = () => {
  const [name, setName] = useState("");
  const [number_hash, setNumber_hash] = useState("");
  const [count, setCount] = useState("");
  const [come_time, setCome_time] = useState("");
  const [price, setPrice] = useState("");

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [isTool, setIsTool] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const productCreate = async (e) => {
    setIsTool(true);
    e.preventDefault();
    await axios
      .post(
        API_PATH + "/main/product-create/",
        {
          name,
          number_hash,
          count,
          come_time,
          price,
        },
        CONFIG
      )
      .then(() => {
        getProductList();
        toast.success("Tool created successfully");
        setName("");
        setNumber_hash("");
        setCount("");
        setCome_time("");
        setPrice("");
        setIsOpen(false);
        setIsTool(false);
      })
      .catch(() => {
        toast.error("Bad request. Try again later");
        setIsTool(false);
      });
  };

  const getProductList = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(API_PATH + "/main/product-list/");
      setProducts(data);
    } catch (error) {
      console.error("Error getting product list:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  const closeModal = () => {
    setIsModal(false);
    setName("");
    setNumber_hash("");
    setCount("");
    setCome_time("");
    setPrice("");
    setIsOpen(false);
    setIsTool(false);
  };

  const deleteProduct = async (id) => {
    setIsTool(true);
    await axios
      .delete(API_PATH + `/main/product-rud/${id}/`, CONFIG)
      .then(() => {
        toast.success("Product has been deleted");
        getProductList();
        setIsTool(false);
        closeModal();
      })
      .catch(() => {
        toast.error("Error deleting product");
        setIsTool(false);
      });
  };

  const getProduct = (item) => {
    setIsModal(true);
    setProduct(item);

    setName(item.name);
    setNumber_hash(item.number_hash);
    setCount(item.count);
    setCome_time(item.come_time);
    setPrice(item.price);
  };

  const productPatch = async (e) => {
    e.preventDefault();
    setIsTool(true);
    await axios
      .patch(
        API_PATH + `/main/product-rud/${product.id}/`,
        {
          name,
          number_hash,
          count,
          come_time,
          price,
        },
        CONFIG
      )
      .then(() => {
        getProductList();
        toast.success("Tool updated successfully");
        closeModal();
        setIsOpen(false);
        setIsTool(false);
      })
      .catch(() => {
        toast.error("Bad request. Try again later");
        setIsTool(false);
      });
  };

  return (
    <>
      <div className="AccountantToolsPage RightStyle">
        <div className="btnWrap mb-4">
          <h1>Список Запчасти </h1>
          <button onClick={() => setIsOpen(true)} className="btn myBtn">
            <span>
              <img src={plus} alt="" />
            </span>
            Добавить запчасть
          </button>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <table className="table TableStyle">
              <thead>
                <tr>
                  <td>№</td>
                  <td>Имя</td>
                  <td>Номер шифра</td>
                  <td>Количество</td>
                  <td>Время прибытия</td>
                  <td>Цена</td>
                  <td>Изменить</td>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((item) => (
                    <tr key={item.id}>
                      <th>{item.id}</th>
                      <th>{item.name}</th>
                      <th>{item.number_hash}</th>
                      <th>{item.count}</th>
                      <th>{item.come_time}</th>
                      <th>{item.price}</th>
                      <th>
                        <span
                          className="cursor"
                          onClick={() => {
                            setIsModal(true);
                            getProduct(item);
                          }}
                        >
                          <img src={edit} alt="" />
                        </span>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      <div
        className={`myModal middleModal accountantModal tools ${
          isOpen && "active"
        }`}
      >
        <form onSubmit={productCreate} className="cards">
          <div className="cardsTop">
            <div className="d-flex align-items-center justify-content-between">
              <h1>Добавить Запчасть</h1>
              <span className="cursor" onClick={() => setIsOpen(false)}>
                <img src={close} alt="" />
              </span>
            </div>
          </div>

          <div className="cardsBody">
            <label htmlFor="name">Имя</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              className="form-control"
            />

            <label htmlFor="номер шифра">Номер шифра</label>
            <input
              required
              value={number_hash}
              onChange={(e) => setNumber_hash(e.target.value)}
              id="номер шифра"
              type="text"
              className="form-control"
            />

            <label htmlFor="Количество">Количество</label>
            <input
              required
              value={count}
              onChange={(e) => setCount(e.target.value)}
              id="Количество"
              type="number"
              className="form-control"
            />

            <label htmlFor="время прибытия">Bремя прибытия</label>
            <input
              required
              value={come_time}
              onChange={(e) => setCome_time(e.target.value)}
              id="время прибытия"
              type="date"
              className="form-control"
            />

            <label htmlFor="Цена">Цена</label>
            <input
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="Цена"
              type="number"
              className="form-control"
            />
          </div>

          <div className="btnWrap">
            <button disabled={isTool} type="submit" className="btn cardsBtn">
              {isTool && (
                <i className="spinner-border spinner-border-sm text-white text-dark me-2"></i>
              )}
              <span>
                <img src={plus} alt="" />
              </span>
              Добавить запчасть
            </button>
          </div>
        </form>
        <div onClick={() => setIsOpen(false)} className="close"></div>
      </div>

      <div
        className={`myModal middleModal accountantModal tools ${
          isModal && "active"
        }`}
      >
        <form onSubmit={productPatch} className="cards">
          <div className="cardsTop">
            <div className="d-flex align-items-center justify-content-between">
              <h1>Изменить Запчасть</h1>
              <span className="cursor" onClick={() => setIsModal(false)}>
                <img src={close} alt="" />
              </span>
            </div>
          </div>

          <div className="cardsBody">
            <label htmlFor="name">Имя</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              className="form-control"
            />

            <label htmlFor="номер шифра">Номер шифра</label>
            <input
              required
              value={number_hash}
              onChange={(e) => setNumber_hash(e.target.value)}
              id="номер шифра"
              type="text"
              className="form-control"
            />

            <label htmlFor="Количество">Количество</label>
            <input
              required
              value={count}
              onChange={(e) => setCount(e.target.value)}
              id="Количество"
              type="number"
              className="form-control"
            />

            <label htmlFor="время прибытия">Bремя прибытия</label>
            <input
              required
              value={come_time}
              onChange={(e) => setCome_time(e.target.value)}
              id="время прибытия"
              type="date"
              className="form-control"
            />

            <label htmlFor="Цена">Цена</label>
            <input
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="Цена"
              type="number"
              className="form-control"
            />
          </div>

          <div className="btnWrap">
            <button
              disabled={isTool}
              type="submit"
              className="btn cardsBtn me-2"
            >
              {isTool && (
                <i className="spinner-border spinner-border-sm text-white text-dark me-2"></i>
              )}
              Сохранить
            </button>
            <button
              disabled={isTool}
              onClick={() => deleteProduct(product.id)}
              className="btn cardsBtn silver"
            >
              {isTool && (
                <i className="spinner-border spinner-border-sm text-white text-dark me-2"></i>
              )}
              Удалить
            </button>
          </div>
        </form>
        <div onClick={closeModal} className="close"></div>
      </div>
    </>
  );
};

export default AccountantToolsPage;
