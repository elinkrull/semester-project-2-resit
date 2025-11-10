import { API_BASE_URL, API_AUTH, API_LOGIN } from "../constants.mjs";
import { save } from "../storage/save.mjs";

export async function login(email, password) {
  try {
    const response = await fetch(API_BASE_URL + API_AUTH + API_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log("Login response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Login failed:", errorText);
      throw new Error("Could not log in");
    }

    const data = await response.json();
    console.log("Login response data:", data);

    save("accessToken", data.data.accessToken);
    save("user", data.data.user);

    console.log(
      "Stored accessToken via save():",
      localStorage.getItem("accessToken")
    );

    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
