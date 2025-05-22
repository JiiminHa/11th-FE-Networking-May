// src/api/axios.ts

import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1", // 기존의 http://54.180... 대신 "/api"부터 시작
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
