import { API_BASE_URL, API_AUTH, API_LOGIN } from "../api/constants.mjs";
import { save } from "../storage/save.mjs";

import { STORAGE_KEY } from "../api/constants.mjs";

export async function login(email, password) {
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

  const json = await response.json();
  console.log("Login response data:", json);

  const data = json.data;
  const accessToken = data.accessToken;

  if (!accessToken) {
    throw new Error("No access token returned from API");
  }

  const { accessToken: _ignored, ...userProfile } = data;

  save(STORAGE_KEY.token, accessToken);
  save(STORAGE_KEY.user, userProfile);

  console.log("Stored accessToken:", localStorage.getItem("accessToken"));
  console.log("Stored user:", userProfile);

  return { accessToken, user: userProfile };
}
