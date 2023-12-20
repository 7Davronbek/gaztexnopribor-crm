import document from "@/assets/document.svg";
import axios from "axios";
import {useEffect, useState} from "react";
import {API_PATH, CONFIG, IMAGE_CONFIG} from "@/constants";
import {toast} from "react-toastify";
import {Loader} from "@/components/Loader.jsx";

const DocumentationPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({});

    const [image, setImage] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const getOrders = async () => {
        setIsLoading(true);
        const {data} = await axios(API_PATH + `/main/recevier-list-2/`);
        setOrders(data);
        setIsLoading(false);
    };

    useEffect(() => {
        getOrders();
    }, []);

    const getOrder = (item) => {
        setOrder(item);
    };

    const senduzSandard = (pk) => {
        if (
            image.length !== 0 ||
            image1.length !== 0 ||
            image2.length !== 0 ||
            image3.length !== 0
        ) {
            const images = [image, image1, image2, image3];

            for (let i = 0; i < images.length; i++) {
                if (images[i]) {

                    const formData = new FormData();
                    formData.append("file", images[i]);
                    formData.append("order", pk);

                    axios
                        .post(API_PATH + "/main/order-file-create/", formData, IMAGE_CONFIG)
                        .then(() => {

                        })
                        .catch(() => {
                            toast.error("Bad request.")
                        });
                }
            }
            senduzSandard2(pk)
            setImage("")
            setImage1("")
            setImage2("")
            setImage3("")
            setIsOpen(false)
        } else {
            toast.error("Image not found")
        }
    };
    const senduzSandard2 = (pk) => {
        axios
            .patch(
                API_PATH + `/main/recevier-update-2/${pk}/`,
                {
                    status: "end",
                },
                CONFIG
            )
            .then(() => {
                toast.success("Jo'natildi");
                getOrders();
            })
            .catch(() => {
                toast.error("Bad request.")
            });
    };

    return (
        <>
            <div className="SpecialistCliestListPage RightStyle">
                <h1>Список клиентов</h1>
                <>
                    {isLoading ? (
                        <Loader/>
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
                                        <th>{item.created_time.slice(0,10)} {item.created_time.slice(11,16)}</th>
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
                        {order?.order_products &&
                            order?.order_products.map((item, index) => (
                                <>
                                    <div key={index} className="formWrap">
                                        <label htmlFor="Счетного механизма:">
                                            {item?.product?.name}
                                        </label>
                                        <input
                                            value={item.count}
                                            disabled
                                            type="text"
                                            id="Счетного механизма:"
                                            className="form-control"
                                        />
                                    </div>
                                </>
                            ))}

                        {/* <div className="formWrap align-items-center">
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
            </div> */}

                        {/* {selectedProducts.map((product, index) => (
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
            ))} */}

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
                        <div className="row ">
                            <div className="col-lg-6">
                                <label className="a text-secondary" htmlFor="Images:">
                                    Фото:
                                </label>
                            </div>
                            <div className="col-lg-6 ">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input
                                            type="file"
                                            id="xisobot"
                                            name="xisobot"
                                            autoFocus
                                            className={`form-control  d-none`}
                                            accept="image/png, image/jpg, image/jpeg, image/webp"
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                        <label className="cursor" htmlFor="xisobot">
                                            <img src={document} alt=""/>
                                        </label>

                                        {image && (
                                            <label className="image ms-2 cursor" htmlFor="xisobot">
                                                <img
                                                    alt="not found"
                                                    width={"100%"}
                                                    src={URL.createObjectURL(image)}
                                                />
                                            </label>
                                        )}
                                    </div>
                                    <div className="col-lg-6">
                                        <input
                                            type="file"
                                            id="xisobot1"
                                            className={`form-control d-none`}
                                            accept="image/png, image/jpg, image/jpeg, image/webp"
                                            onChange={(e) => setImage1(e.target.files[0])}
                                        />
                                        <label className="cursor" htmlFor="xisobot1">
                                            <img src={document} alt=""/>
                                        </label>

                                        {image1 && (
                                            <label className="image ms-2 cursor" htmlFor="xisobot1">

                                                <img
                                                    alt="not found"
                                                    width={"100%"}
                                                    src={URL.createObjectURL(image1)}
                                                />
                                            </label>
                                        )}
                                    </div>
                                    <div className="col-lg-6">
                                        <input
                                            type="file"
                                            id="xisobot2"
                                            className={`form-control  d-none`}
                                            accept="image/png, image/jpg, image/jpeg, image/webp"
                                            onChange={(e) => setImage2(e.target.files[0])}
                                        />
                                        <label className="cursor" htmlFor="xisobot2">
                                            <img src={document} alt=""/>
                                        </label>

                                        {image2 && (
                                            <label className="image ms-2 cursor" htmlFor="xisobot2">

                                                <img
                                                    alt="not found"
                                                    width={"100%"}
                                                    src={URL.createObjectURL(image2)}
                                                />
                                            </label>
                                        )}
                                    </div>
                                    <div className="col-lg-6">
                                        <input
                                            type="file"
                                            id="xisobot3"
                                            className={`form-control  d-none`}
                                            accept="image/png, image/jpg, image/jpeg, image/webp"
                                            onChange={(e) => setImage3(e.target.files[0])}
                                        />
                                        <label className="cursor" htmlFor="xisobot3">
                                            <img src={document} alt=""/>
                                        </label>

                                        {image3 && (
                                            <label className="image ms-2 cursor" htmlFor="xisobot3">

                                                <img
                                                    alt="not found"
                                                    width={"100%"}
                                                    src={URL.createObjectURL(image3)}
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modalFooter">
                        <button
                            onClick={() => {
                                senduzSandard(order.id);
                            }}
                            className="btn myBtn d-block w-100"
                        >
                            Отправить на Uz Standard
                        </button>
                    </div>
                </div>
                <div onClick={() => setIsOpen(false)} className="close"></div>
            </div>
        </>
    );
};

export default DocumentationPage;
