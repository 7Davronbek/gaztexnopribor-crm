import axios from "axios";
import { useEffect, useState } from "react";
import { API_PATH } from "@/constants";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { toast } from "react-toastify";
import { Loader } from "@/components/Loader.jsx";

const SpecialistCliestListPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [btn, setBtn] = useState(1);
  const [orders, setOrders] = useState([]);
  // const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    setIsLoading(true);
    const { data } = await axios(API_PATH + "/main/product-list/");
    setAvailableProducts(data);
    setIsLoading(false);
  };
  const getOrders = async () => {
    const { data } = await axios(
      API_PATH +
        `/main/orders-specialist${
          btn === 1
            ? ""
            : btn === 2
            ? "?today=2"
            : btn === 3
            ? "?yesterday=3"
            : btn === 4
            ? "?week=4"
            : btn === 5
            ? "?month=6"
            : "?year=6"
        }`
    );
    setOrders(data);
  };

  useEffect(() => {
    getOrders();
    getProducts();
  }, [btn]);

  const getOrder = (item) => {
    setOrder(item);
  };

  const handleOnSelect = (item) => {
    const data = [...selectedProducts];
    data.push({
      item: item,
      count: 1,
    });
    setSelectedProducts(data);
  };

  const [availableProducts, setAvailableProducts] = useState([]);

  const addToSelectedProducts = (product) => {
    const newProduct = { ...product, count: 1 };
    setSelectedProducts([...selectedProducts, newProduct]);
    removeProduct(product.item.id);
  };

  const removeProduct = (productId) => {
    const updatedProducts = availableProducts.filter(
      (product) => product.item.id !== productId
    );
    setAvailableProducts(updatedProducts);
  };

  const increaseCount = (productId) => {
    const updatedSelectedProducts = selectedProducts.map((product) => {
      if (product.item.id === productId) {
        return { ...product, count: product.count + 1 };
      }
      return product;
    });
    setSelectedProducts(updatedSelectedProducts);
  };

  const decreaseCount = (productId) => {
    const updatedSelectedProducts = selectedProducts.map((product) => {
      if (product.item.id === productId && product.count > 1) {
        return { ...product, count: product.count - 1 };
      }
      return product;
    });
    setSelectedProducts(updatedSelectedProducts);
  };

  const removeSelectedProduct = (productId) => {
    const removedProduct = selectedProducts.find(
      (product) => product.item.id === productId
    );
    setSelectedProducts(
      selectedProducts.filter((product) => product.item.id !== productId)
    );
    setAvailableProducts([...availableProducts, removedProduct]);
  };

  const sendProducts = (item_id) => {
    selectedProducts.map((item) =>
      axios.post(API_PATH + "/main/specialist-create/", {
        order: item_id,
        product: item.item.id,
        count: item.count,
      })
    );
    setIsOpen(false);
    getOrders();
    getProducts();
    document.location.reload(true);
    toast.success("Ma'lumotlar jo'natildi");
    setSelectedProducts([]);
  };

  return (
    <>
      <div className="SpecialistCliestListPage RightStyle">
        <h1>Список клиентов</h1>
        <>
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

          {isLoading ? (
            <Loader />
          ) : (
            <table className="table TableStyle">
              <thead>
                <tr>
                  <td>№</td>
                  <td>Наименование организации</td>
                  <td>Дата</td>
                  <td>Марка счетчика газа</td>
                  <td>Заводские номера</td>
                  <td>Статус</td>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => {
                        setIsOpen(true), getOrder(item);
                      }}
                      className=""
                    >
                      <th>{item.id}</th>
                      <th>{item.name_org}</th>
                      <th>
                        {item.created_time.slice(0, 10)}{" "}
                        {item.created_time.slice(11, 16)}
                      </th>
                      <th>{item.meter_brand}</th>
                      <th>{item.serial_number}</th>
                      <th
                        className={`status ${
                          item.is_paid ? "status-green" : "status-red"
                        }`}
                      >
                        {item.is_paid ? "Оплаченно" : "Не оплачено"}
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </>
      </div>
      <div className={`ModalStyle ${isOpen && "active"}`}>
        <div key={order.id} className="ClientModal zed">
          <div className="modalTop">
            <h1>Данные клиента</h1>
          </div>
          <div className="modalBody">
            <div className="formWrap">
              <label htmlFor="Наименование организации:">
                Наименование организации:
              </label>
              <input
                disabled
                type="text"
                value={order.name_org}
                id="Наименование организации:"
                className="form-control"
              />
            </div>
            <div className="formWrap">
              <label htmlFor="Дата">Дата</label>
              <input
                value={order.created_time}
                disabled
                id="Дата"
                type="text"
                className="form-control"
              />
            </div>
            <div className="formWrap">
              <label htmlFor="Статус">Статус</label>
              <input
                value={order.status}
                disabled
                type="text"
                id="Статус"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label htmlFor="Марка счетчика газа:">Марка счетчика газа:</label>
              <input
                value={order.meter_brand}
                disabled
                type="text"
                id="Марка счетчика газа:"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label htmlFor="Заводские номера: датчик давления:">
                Заводские номера: датчик давления:
              </label>
              <input
                value={order.serial_number}
                disabled
                type="text"
                id="Заводские номера: датчик давления:"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label htmlFor="датчик температуры:">Датчик температуры:</label>
              <input
                value={order.temp_sensor}
                disabled
                type="text"
                id="датчик температуры:"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label htmlFor="Сертификат последней поверки:">
                Сертификат последней поверки:
              </label>
              <input
                value={order.latest_certificate ? "Есть" : "Нет"}
                disabled
                type="text"
                id="Сертификат последней поверки:"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label htmlFor="Паспорта газового счетчика:">
                Паспорта газового счетчика:
              </label>
              <input
                value={order.passport_meter ? "Есть" : "Нет"}
                disabled
                type="text"
                id="Паспорта газового счетчика:"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label htmlFor="Паспорт блока коррекции:">
                Паспорт блока коррекции:
              </label>
              <input
                value={order.correction_block_passport ? "Есть" : "Нет"}
                disabled
                type="text"
                id="Паспорт блока коррекции:"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label
                htmlFor="Акт (Рай.газ, гор.газ, обл.газ) о снятии счетчик газа на гос. поверку с показаниями
счетчика, печатью или штампом:"
              >
                Акт (Рай.газ, гор.газ, обл.газ) о снятии счетчик газа на гос.
                поверку с показаниями счетчика, печатью или штампом:
              </label>
              <input
                value={order.verification_with_stamp ? "Есть" : "Нет"}
                disabled
                type="text"
                id="Акт (Рай.газ, гор.газ, обл.газ) о снятии счетчик газа на гос. поверку с показаниями
счетчика, печатью или штампом:"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label
                htmlFor="Техническое состояние счетчика при поступлении в метрологический центр «GAZ TEXNO PRIBOR» МЧЖ.
Наличие пломб: счетный механизм"
              >
                Техническое состояние счетчика при поступлении в метрологический
                центр «GAZ TEXNO PRIBOR» МЧЖ. Наличие пломб: счетный механизм
              </label>
              <input
                value={order.gaz_pribor_stamp ? "Есть" : "Нет"}
                disabled
                type="text"
                id="Техническое состояние счетчика при поступлении в метрологический центр «GAZ TEXNO PRIBOR» МЧЖ.
Наличие пломб: счетный механизм"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label htmlFor="блок коррекции ДР">блок коррекции ДР</label>
              <input
                value={order.block_correction_dp ? "Есть" : "Нет"}
                disabled
                type="text"
                id="блок коррекции ДР"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label htmlFor="ДТ">ДТ</label>
              <input
                value={order.dt ? "Есть" : "Нет"}
                disabled
                type="text"
                id="ДТ"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label htmlFor="dd">ДД</label>
              <input
                value={order.dd ? "Есть" : "Нет"}
                disabled
                type="text"
                id="dd"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label
                htmlFor="Er 3000000
Внештатные ситуации:"
              >
                Er 3000000 Внештатные ситуации:
              </label>
              <input
                value={order.er_300000 ? "Есть" : "Нет"}
                disabled
                type="text"
                id="Er 3000000
Внештатные ситуации:"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label htmlFor="Визуальные повреждения:">
                Визуальные повреждения
              </label>
              <input
                value={order.visual_damage ? "Есть" : "Нет"}
                disabled
                type="text"
                id="Визуальные повреждения:"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label htmlFor="Механические повреждения:">
                Механические повреждения:
              </label>
              <input
                value={order.mechanical_damage ? "Есть" : "Нет"}
                disabled
                type="text"
                id="Механические повреждения:"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label htmlFor="Заключения:">Заключения:</label>
              <input
                value={order.conclusion}
                disabled
                type="text"
                id="Заключения:"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label htmlFor="Показания:">Показания:</label>
              <input
                value={order.indications}
                disabled
                type="text"
                id="Показания:"
                className="form-control"
              />
            </div>

            <div className="formWrap">
              <label htmlFor="Счетного механизма:">Счетного механизма:</label>
              <input
                value={order.counting_mechanism}
                disabled
                type="text"
                id="Счетного механизма:"
                className="form-control"
              />
            </div>

            <div className="formWrap align-items-center">
              <label htmlFor="Замена комплектующих:">
                Замена комплектующих:
              </label>
              <ReactSearchAutocomplete
                items={availableProducts}
                onSelect={handleOnSelect}
                autoFocus
                className="w-50"
                onClick={addToSelectedProducts}
                onClear={true}
              />
            </div>

            {selectedProducts.map((product, index) => (
              <div key={index} className="formWrap">
                <label htmlFor={product.item.name}>{product.item.name}</label>
                <label htmlFor={`${product.count} sht`}>
                  {product.count} шт
                </label>
                <button
                  className={"btn border mx-1"}
                  onClick={() => increaseCount(product.item.id)}
                >
                  +
                </button>
                <button
                  className={"btn border mx-1"}
                  onClick={() => decreaseCount(product.item.id)}
                >
                  -
                </button>
                <button
                  className={"btn border mx-1"}
                  onClick={() => removeSelectedProduct(product.item.id)}
                >
                  Remove
                </button>
              </div>
            ))}

            {/*{selectedProducts ? (*/}
            {/*    <>*/}
            {/*        {selectedProducts?.map((item, index) => (*/}
            {/*            <div key={index} className="formWrap">*/}
            {/*                <label htmlFor={item.item.name}>{item.item.name}</label>*/}
            {/*                <label htmlFor={`${item.count} sht`}>*/}
            {/*                     <button className="btn">-</button> {item.count} sht <button className="btn">+</button>*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </>*/}
            {/*) : (*/}
            {/*    <></>*/}
            {/*)}*/}
          </div>

          <div className="modalFooter">
            <button
              onClick={() => sendProducts(order.id)}
              className="btn myBtn d-block w-100"
            >
              Отправить
            </button>
          </div>
        </div>
        <div onClick={() => setIsOpen(false)} className="close"></div>
      </div>
    </>
  );
};

export default SpecialistCliestListPage;
