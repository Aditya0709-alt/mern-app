import http from "./httpService";
import { apiUrl } from "../config.json";

export async function getUserByRecipe(id) {
  const data = await http.get(`${apiUrl}/recipes/user-recipe/${id}`)
  return data;
}

export async function getSearch(search) {
  const data = await http.get(`${apiUrl}/recipes/search/${search}`);
  return data;
}

export async function createRecipe(data) {
  await http.post(`${apiUrl}/recipes`, data);
}

export async function getAllRecipes() {
  const data = await http.get(`${apiUrl}/recipes/all-recipes`);
  return data;
}

export async function getRecipe(recipeId) {
  const data = await http.get(`${apiUrl}/recipes/${recipeId}`);
  return data;
}

export async function editRecipe(data) {
  const { _id: recipeId, ...recipe } = data;
  await http.put(`${apiUrl}/recipes/${recipeId}`, recipe);
}

export function deleteRecipe(recipeId) {
  return http.delete(`${apiUrl}/recipes/delete/${recipeId}`);
}

export default {
  getAllRecipes,
  getRecipe,
  editRecipe,
  deleteRecipe,
  createRecipe,
  getSearch,
  getUserByRecipe,
}