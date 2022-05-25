import http from "./httpService";
import { apiUrl } from "../config.json";

export async function addToFav(data) {
  await http.post(`${apiUrl}/recipes/favorites`, data)
}

export async function removeFav(recipeId) {
  await http.delete(`${apiUrl}/recipes/favorites/${recipeId}`)
}

export async function getFavorites() {
    const data = await http.get(`${apiUrl}/recipes/favorites`);
    return data;
}

export default {
  addToFav,
  getFavorites,
  removeFav,
}