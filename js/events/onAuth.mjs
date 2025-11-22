import { register } from "../auth/register.mjs";
import { login } from "../auth/login.mjs";
import { load } from "../storage/load.mjs";
import { save } from "../storage/save.mjs";
import { STORAGE_KEY } from "../api/constants.mjs";

function setupRegistrationForm() {
  const form = document.getElementById("registration-form");
  if (!form) return;

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

      if (accessToken) {
        save(STORAGE_KEY.token, accessToken);
      }

      updateNavbarAuth();

      window.location.href = "../index.html";
    } catch (error) {
      console.error("Registration error:", error);
      alert("Could not register. Please check your details and try again.");
    }
  });
}

export function updateNavbarAuth() {
  const token = load(STORAGE_KEY.token);

  const loginLink = document.getElementById("nav-login");
  const registerLink = document.getElementById("nav-register");
  const logoutBtn = document.getElementById("nav-logout");

  if (!loginLink || !registerLink || !logoutBtn) return;

  const logoutLi = logoutBtn.closest("li");

  if (token) {
    // Logged in → hide login/register, show logout
    loginLink.classList.add("d-none");
    registerLink.classList.add("d-none");
    if (logoutLi) logoutLi.classList.remove("d-none");
  } else {
    // Logged out → show login/register, hide logout
    loginLink.classList.remove("d-none");
    registerLink.classList.remove("d-none");
    if (logoutLi) logoutLi.classList.add("d-none");
  }
}

// Logut function
export function setupLogout() {
  const logoutBtn = document.getElementById("nav-logout");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();

    save(STORAGE_KEY.token, null);
    updateNavbarAuth();
    window.location.href = "../index.html";
  });
}

setupRegistrationForm();
updateNavbarAuth();
setupLogout();
