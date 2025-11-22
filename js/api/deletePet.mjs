import { authFetch } from "./authFetch.mjs";
import { API_BASE_URL, API_PETS } from "./constants.mjs";

export async function deletePet(id) {
  const response = await authFetch(
    `${API_BASE_URL}${API_PETS}/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    const msg = await response.text();
    console.error("Failed to delete pet:", msg);
    throw new Error("Could not delete pet");
  }

  return true;
}
