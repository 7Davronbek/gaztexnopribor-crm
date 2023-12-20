import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_PATH, CONFIG } from "@/constants/index.js";
import { toast } from "react-toastify";

const ClientSpecialistPage = () => {
  const [client, setClient] = useState([]);

  const getClient = useCallback(async () => {
    try {
      const { data } = await axios.get(API_PATH + "/main/client/", CONFIG);
      setClient(data);
    } catch (error) {
      toast().error("Error getting client:", error);
    }
  }, []);

  useEffect(() => {
    getClient();
  }, [getClient]);

  return (
    <div className="ClientSpecialistPage ClientReceiverPage RightStyle">
      <h1>Принимающий</h1>
      <div className="cards">
        <div className="wrap">
          <h5>Наименование организации:</h5>
          <h6>{client[0]?.name_org}</h6>
        </div>

        <div className="wrap">
          <h5>Марка счетчика газа:</h5>
          <h6>{client[0]?.meter_brand}</h6>
        </div>

        <div className="wrap">
          <h5>Заводские номера: датчик давления:</h5>
          <h6>{client[0]?.serial_number} </h6>
        </div>

        <div className="wrap">
          <h5>датчик температуры:</h5>
          <h6>{client[0]?.temp_sensor} </h6>
        </div>

        <div className="wrap">
          <h5>Сертификат последней поверки:</h5>
          <h6>{client[0]?.latest_certificate ? "Есть" : "Нет"} </h6>
        </div>

        <div className="wrap">
          <h5>Паспорта газового счетчика:</h5>
          <h6>{client[0]?.passport_meter ? "Есть" : "Нет"} </h6>
        </div>

        <div className="wrap">
          <h5>Паспорт блока коррекции:</h5>
          <h6>{client[0]?.correction_block_passport ? "Есть" : "Нет"} </h6>
        </div>

        <div className="wrap">
          <h5>
            Акт (Рай.газ, гор.газ, обл.газ) о снятии счетчик газа на гос.
            поверку с показаниями счетчика, печатью или штампом:
          </h5>
          <h6>{client[0]?.verification_with_stamp ? "Есть" : "Нет"} </h6>
        </div>

        <div className="wrap">
          <h5>
            Техническое состояние счетчика при поступлении в метрологический
            центр «GAZ TEXNO PRIBOR» МЧЖ. Наличие пломб: счетный механизм
          </h5>
          <h6>{client[0]?.gaz_pribor_stamp ? "Есть" : "Нет"} </h6>
        </div>

        <div className="wrap">
          <h5>блок коррекции ДР</h5>
          <h6>{client[0]?.block_correction_dp ? "Есть" : "Нет"} </h6>
        </div>

        <div className="wrap">
          <h5>ДТ</h5>
          <h6>{client[0]?.dt ? "Есть" : "Нет"} </h6>
        </div>

        <div className="wrap">
          <h5>ДД</h5>
          <h6>{client[0]?.dd ? "Есть" : "Нет"} </h6>
        </div>

        <div className="wrap">
          <h5>Er 3000000 Внештатные ситуации:</h5>
          <h6>{client[0]?.er_300000 ? "Есть" : "Нет"} </h6>
        </div>

        <div className="wrap">
          <h5>Визуальные повреждения:</h5>
          <h6>{client[0]?.visual_damage ? "Есть" : "Нет"} </h6>
        </div>

        <div className="wrap">
          <h5>Механические повреждения:</h5>
          <h6>{client[0]?.mechanical_damage ? "Есть" : "Нет"} </h6>
        </div>

        <div className="wrap">
          <h5>Заключения:</h5>
          <h6>{client[0]?.conclusion} </h6>
        </div>
      </div>
    </div>
  );
};

export default ClientSpecialistPage;
