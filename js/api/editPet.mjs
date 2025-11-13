import { authFetch } from "./authFetch.mjs";
import { API_BASE_URL, API_PETS } from "./constants.mjs";

export async function editPet(id, petData) {
  const response = await authFetch(
    `${API_BASE_URL}${API_PETS}/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      body: JSON.stringify(petData),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Update failed:", errorText);
    throw new Error("Could not update pet");
  }

  const json = await response.json();
  return json.data;
}
