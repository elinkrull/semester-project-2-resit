import { login } from "./auth/login.mjs";

console.log("login.mjs loaded");

const form = document.getElementById("login-form");

if (!form) {
  console.error("Could not find #login-form");
} else {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Submitting login:", { email, password });

    try {
      const data = await login(email, password);
      console.log("Login success:", data);

      // Redirect to homepage after successful login
      window.location.href = "../index.html";
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password. Please try again.");
    }
  });
}
