import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const APIHandler = (
  method,
  url,
  data = null,
  headers = null,
  params = null
) => {
  return instance({
    method: method,
    url: url,
    data: data,
    headers: headers,
    params: params,
  });
};
