import axios from "axios";
const BASE_URL = "https://localhost:5000/api";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWMzNGU0OGRlNTdkNzAwMGM4ZTE3MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MzI5NzQ5MSwiZXhwIjoxNjkzOTAyMjkxfQ.SOcJCrhgoHYnv3zTZFDtd7dS89vH8OogWFT70kkQI3U";

export const publicRequest = axios.create({ baseURL: BASE_URL });
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
