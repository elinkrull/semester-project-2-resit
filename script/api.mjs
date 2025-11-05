import { API_BASE_URL, API_LISTINGS } from "./constants.mjs";

//Fetch data from the API
export async function getPets() {
  try {
    const url = `${API_BASE_URL}${API_LISTINGS}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}
