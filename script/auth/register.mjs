import { API_BASE_URL, API_REGISTER, API_AUTH } from "../constants.mjs";
import { save } from "../storage/save.mjs";

//register form user
export async function register(name, email, password) {
  try {
    const response = await fetch(API_BASE_URL + API_AUTH + API_REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Registration failed:", errorText);
      throw new Error("Could not register the account");
    }

    const data = await response.json();
    console.log("Registration response data:", data);

    save("acessToken", data.data.accessToken);
    save("user", data.data.user);

    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}
