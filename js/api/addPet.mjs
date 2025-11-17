import { setupLogout, updateNavbarAuth } from "../events/onAuth.mjs";
import { authFetch } from "./authFetch.mjs";

export async function addPet(petData) {
  try {
    const response = await authFetch(`${API_BASE_URL}${API_PETS}`, {
      method: "POST",
      body: JSON.stringify(petData),
    });

    console.log("Add Pet response status:", response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error("Add Pet failed:", error);
      throw new Error(error.message || "Failed to add pet");
    }

    const data = await response.json();
    console.log("Pet added successfully:", data);
    return data;
  } catch (error) {
    console.error("Error adding pet:", error);
    throw error;
  }
}
