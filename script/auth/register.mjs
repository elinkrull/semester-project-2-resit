import { API_BASE_URL, API_REGISTER, API_AUTH } from "../constants.mjs";

export async function register(name, email, password) {
  const res = await fetch(API_BASE_URL + API_AUTH + API_REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  console.log("Register response status:", res.status);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Registration failed:", errorText);
    throw new Error("Could not register the account");
  }

  const json = await res.json();
  console.log("Registration response data:", json);

  return json.data;
}
