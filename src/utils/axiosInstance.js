import axios from "axios";

const instance = axios.create({
  baseURL:
    import.meta.env.VITE_ENVIRONMENT === "development"
      ? import.meta.env.VITE_DEV_BACKEND_SERVER_API_URL
      : import.meta.env.VITE_PROD_BACKEND_SERVER_API_URL,
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
