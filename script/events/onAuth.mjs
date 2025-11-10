import { register } from "../auth/register.mjs";

document
  .getElementById("registration-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Submitting registration:", { name, email, password });

    try {
      const data = await register(name, email, password);
      console.log("Registration success:", data);
    } catch (error) {
      console.error("Registration error:", error);
    }
  });
