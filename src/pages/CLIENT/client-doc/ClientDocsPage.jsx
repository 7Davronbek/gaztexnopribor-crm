import downloadimage from "@/assets/download.svg";
import pdf from "@/assets/pdf.svg";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_PATH } from "@/constants/index.js";
import { toast } from "react-toastify";
import { CONFIG } from "../../../constants";

const ClientDocsPage = () => {
 

  return (
    <div className="ClientSpecialistPage ClientReceiverPage RightStyle">
      <h1 className="mb-3">B стенд</h1>
      <h5>начинается внутренний осмотр и работа над счетчиком.</h5>
      
    </div>
  );
};

export default ClientDocsPage;
