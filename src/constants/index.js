export const API_PATH = "http://back.gaztexnopribor.uz";
// export const API_PATH = "http://127.0.0.1:8001";

export const TOKEN = "GAZ/TOKEN";
export const USER_ROLE = "GAZ/USER_ROLE";

export const CONFIG = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem(TOKEN)}`,
  },
};

export const IMAGE_CONFIG = {
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    Authorization: `Token ${localStorage.getItem(TOKEN)}`,
  },
};
