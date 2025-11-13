import { register } from "../auth/register.mjs";
import { login } from "../auth/login.mjs";

const form = document.getElementById("registration-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Submitting registration:", { name, email, password });

    try {
      const profile = await register(name, email, password);
      console.log("Registration success, profile:", profile);

      const { accessToken, user } = await login(email, password);
      console.log("Auto-login after register:", { accessToken, user });

      window.location.href = "../index.html";
    } catch (error) {
      console.error("Registration error:", error);
      alert("Could not register. Please check your details and try again.");
    }
  });
}
