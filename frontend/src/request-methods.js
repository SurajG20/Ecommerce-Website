import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const user = JSON.parse(localStorage.getItem("persist:root"))?.auth;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.token;
console.log(TOKEN)

export const publicRequest = axios.create({
  baseURL: baseURL,
});

export const userRequest = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
