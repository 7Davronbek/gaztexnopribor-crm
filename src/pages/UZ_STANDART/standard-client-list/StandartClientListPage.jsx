import downloadimage from "@/assets/download.svg"
import upload from "@/assets/upload.svg"
import pdf from "@/assets/pdf.svg"
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {API_PATH, IMAGE_CONFIG} from "@/constants/index.js";
import {toast} from "react-toastify";
import {Loader} from "@/components/Loader.jsx";

const StandardClientListPage = () => {
        const [btn, setBtn] = useState(1);
        const [orders, setOrders] = useState([]);
        const [isLoading, setIsLoading] = useState(false)

        const [image, setImage] = useState("");

        const formatDate = (dateTimeString) => {
            const date = new Date(dateTimeString);
            return date.toLocaleString('en-GB', {
                hour: 'numeric',
                minute: 'numeric',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
        };

        const getOrders = useCallback(async () => {
            setIsLoading(true);
            try {
                const {data} = await axios(
                    API_PATH +
                    `/main/list-for-uzstandard/${
                        btn === 1 ? "" : btn === 2 ? "?today=2" : "?yesterday=3"
                    }`
                );
                setOrders(data);
                setIsLoading(false)
            } catch (error) {
                toast.error("Error getting orders:", error);
                setIsLoading(false)
            }
        }, [btn]);

        useEffect(() => {
            getOrders();
        }, [getOrders]);

        const postFile = async (id) => {
            if (image.length !== 0) {

                const formData = new FormData();
                formData.append("file_1", image);
                formData.append("order", id);

                axios
                    .post(API_PATH + "/main/uz-standard/", formData, IMAGE_CONFIG)
                    .then(() => {
                        setImage("")
                        toast.success("File posted successfully")
                    })
                    .catch(() => {
                        toast.error("Bad request.")
                    });
            } else {
                toast.error("Image not found")
            }
        }


// const download = () => {
//     const element = document.createElement("a");
//     const file = new Blob(
//         [
//             "https://timesofindia.indiatimes.com/thumb/msid-70238371,imgsize-89579,width-400,resizemode-4/70238371.jpg"
//         ],
//         {type: "image/*"}
//     );
//     element.href = URL.createObjectURL(file);
//     element.download = "image.png";
//     element.click();
// };

        return (
            <>
                <div className="StandardClientListPage RightStyle">
                    <div className="btnWrap mb-4">
                        <h1>Список клиентов</h1>
                    </div>
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
                    </div>

                    {isLoading ? <Loader/> :

                        <table className="table TableStyle">
                            <thead>
                            <tr>
                                <td>№</td>
                                <td>Наименование организации</td>
                                <td>Дата</td>
                                <td>Марка счетчика газа</td>
                                <td>Протокол</td>
                                <td>Зав.№ кор</td>
                            </tr>
                            </thead>
                            <tbody>
                            {orders && orders.map((item) => (
                                <tr key={item.id}>
                                    <th key={item.id}>{item.id}</th>
                                    <th>{item.name_org}</th>
                                    <th>{formatDate(item.created_time)}</th>
                                    <th>{item.meter_brand}</th>
                                    <th className='file'>
                                        {item.order_files && item.order_files.map((item2, index) => (
                                            <div className={'mb-3'} key={index}>
                                                <p className={'mb-2 mt-2'}><span className={'me-2'}>
                                             <img src={pdf} alt=""/></span>
                                                    {item2.file.substring(
                                                        item2.file.lastIndexOf("/") + 1,
                                                        item2.file.lastIndexOf(".")
                                                    )}
                                                </p>
                                                <a
                                                    download
                                                    href={item2.file}
                                                    rel="noreferrer"
                                                    target={"_blank"}
                                                    // onClick={download}
                                                    className="btn">
                                                    <span><img src={downloadimage} alt=""/></span>
                                                    Скачать
                                                </a>
                                            </div>
                                        ))}


                                    </th>
                                    <th>
                                        <div className="imageWrap">

                                            <input
                                                type="file"
                                                id="xisobot"
                                                name="xisobot"
                                                autoFocus
                                                className={`form-control  d-none`}
                                                accept="image/png, image/jpg, image/jpeg, image/webp"
                                                onChange={(e) => setImage(e.target.files[0])}
                                            />
                                            <label className="cursor btn" htmlFor="xisobot">
                                                <img src={upload} alt=""/>
                                            </label>

                                            {image && (
                                                <label className="image ms-2 cursor" htmlFor="xisobot">
                                                    <h6>{image.name}</h6>
                                                </label>
                                            )}

                                            <button onClick={() => postFile(item.id)} className={"btn"}>Загрузить</button>
                                        </div>
                                    </th>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    }
                </div>
            </>)
            ;
    }
;

export default StandardClientListPage;
