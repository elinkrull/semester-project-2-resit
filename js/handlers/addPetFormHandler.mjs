import { load } from "../storage/load.mjs";
import { addPet } from "../api/addPet.mjs";
import { STORAGE_KEY } from "../api/constants.mjs";
import { setupLogout, updateNavbarAuth } from "../events/onAuth.mjs";

const token = load(STORAGE_KEY.token);
if (!token) {
  alert("Please log in before adding a pet.");
  window.location.href = "../login/index.html";
}

const form = document.getElementById("add-pet-form");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const petData = {
      name: document.getElementById("petName").value.trim(),
      species: document.getElementById("petSpecies").value.trim(),
      breed: document.getElementById("petBreed").value.trim(),
      age: Number(document.getElementById("petAge").value),
      gender: document.getElementById("petGender").value,
      size: document.getElementById("petSize").value,
      color: document.getElementById("petColor").value.trim(),
      description: document.getElementById("petDescription").value.trim(),
      adoptionStatus: document.getElementById("petStatus").value,
      location: document.getElementById("petLocation").value.trim(),
      image: {
        url: document.getElementById("petImageUrl").value.trim(),
        alt: `${document.getElementById("petName").value}'s photo`,
      },
    };

    console.log("Sending pet data:", petData);

    try {
      await addPet(petData);
      alert("Pet added successfully!");
      window.location.href = "../index.html";
    } catch (error) {
      alert(`Failed to add pet: ${error.message || "Please try again."}`);
    }
  });
}

updateNavbarAuth();
setupLogout();
