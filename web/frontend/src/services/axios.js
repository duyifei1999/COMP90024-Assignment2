import _axios from "axios";

const axios = () => {
  const instance = _axios.create({
    baseURL: "http://localhost:3000",
  });
  return instance;
};

export default axios();
