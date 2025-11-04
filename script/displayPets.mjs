import { API_BASE_URL, API_LISTINGS } from "./constants.mjs";

//Fetch data from the API
export async function getPets() {
  const getPetsUrl = `${API_BASE_URL}${API_LISTINGS}`;
  const response = await fetch(getPetsUrl);
  const data = await response.json();
  console.log(data);
  return data;
}

getPets();
