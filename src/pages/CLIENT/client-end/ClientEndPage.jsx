import downloadimage from "@/assets/download.svg";
import pdf from "@/assets/pdf.svg";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_PATH } from "@/constants/index.js";
import { toast } from "react-toastify";
import { CONFIG } from "../../../constants";

const ClientEndPage = () => {
  const [order, setClient] = useState([]);

  const getClient = useCallback(async () => {
    try {
      const { data } = await axios.get(API_PATH + "/main/client/", CONFIG);
      setClient(data);
      console.log(data);
    } catch (error) {
      toast.error("Error getting client:", error);
    }
  }, []);

  useEffect(() => {
    getClient();
  }, [getClient]);
  return (
    <div className="ClientSpecialistPage ClientReceiverPage RightStyle">
      <h1 className="mb-3">Документация</h1>
      <div className="mt-5">
        <div className="docs_file">
          {order[0]?.uaz_standard_files?.map((item2, index) => (
            <div key={index}>
              <div className="mb-3">
                <p className={"mb-2 mt-2"}>
                  <span className={"me-2"}>
                    <img src={pdf} alt="" />
                  </span>
                  {item2?.file_1?.substring(
                    item2?.file_1?.lastIndexOf("/") + 1,
                    item2?.file_1?.lastIndexOf(".")
                  )}
                </p>
                <a
                  download
                  href={item2?.file_1}
                  rel="noreferrer"
                  target={"_blank"}
                  // onClick={download}
                  className="btn"
                >
                  <span>
                    <img src={downloadimage} alt="" />
                  </span>
                  Скачать
                </a>
              </div>

              <div className={`mb-3 ${item2.file_2 ? "" : "d-none"}`}>
                <p className={"mb-2 mt-2"}>
                  <span className={"me-2"}>
                    <img src={pdf} alt="" />
                  </span>
                  {item2?.file_2?.substring(
                    item2?.file_2?.lastIndexOf("/") + 1,
                    item2?.file_2?.lastIndexOf(".")
                  )}
                </p>
                <a
                  download
                  href={item2?.file_2}
                  rel="noreferrer"
                  target={"_blank"}
                  // onClick={download}
                  className="btn"
                >
                  <span>
                    <img src={downloadimage} alt="" />
                  </span>
                  Скачать
                </a>
              </div>
              <div className={`mb-3 ${item2.file_3 ? "" : "d-none"}`}>
                <p className={"mb-2 mt-2"}>
                  <span className={"me-2"}>
                    <img src={pdf} alt="" />
                  </span>
                  {item2?.file_3?.substring(
                    item2?.file_3?.lastIndexOf("/") + 1,
                    item2?.file_3?.lastIndexOf(".")
                  )}
                </p>
                <a
                  download
                  href={item2?.file_3}
                  rel="noreferrer"
                  target={"_blank"}
                  // onClick={download}
                  className="btn"
                >
                  <span>
                    <img src={downloadimage} alt="" />
                  </span>
                  Скачать
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientEndPage;
