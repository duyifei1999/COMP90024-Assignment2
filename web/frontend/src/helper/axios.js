import _axios from "axios";

const axios = () => {
  const instance = _axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_API,
  });
  return instance;
};

export default axios();
