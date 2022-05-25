import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export function getToken() {
  return localStorage.getItem(tokenKey);
};

export async function getUser() {
  const { data } = await http.get(`${apiUrl}/users/me`);
  return data;
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    return jwtDecode(localStorage.getItem(tokenKey));
  } catch (error) {
    return null;
  }
}

async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
}

export default {
  login,
  getCurrentUser,
  logout,
  getUser,
  getToken
};
