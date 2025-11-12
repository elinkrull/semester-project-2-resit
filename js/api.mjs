import { API_BASE_URL, API_PETS } from "./api/constants.mjs";

//Fetch data from the API
export async function getPets() {
  try {
    const url = `${API_BASE_URL}${API_PETS}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}

export async function getPet(id) {
  const url = `${API_BASE_URL}${API_PETS}/${encodeURIComponent(id)}`;
  const res = await fetch(url);
  return res.json();
}
