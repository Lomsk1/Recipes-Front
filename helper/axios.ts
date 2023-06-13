import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_DB_HOST;

const authTokens = Cookies.get("jwt") ? Cookies.get("jwt") : null;

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${authTokens}`,
    "Content-Type": "multipart/form-data",
  },
});

export const axiosUnauthorizedWithImg = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

export const axiosUnAuthorized = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    const authTokens = Cookies.get("jwt") ? Cookies.get("jwt") : null;
    req.headers.Authorization = `Bearer ${authTokens}`;
  }

  return req;
});