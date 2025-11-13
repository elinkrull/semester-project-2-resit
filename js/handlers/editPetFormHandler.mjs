import { getPet } from "../apiRoot.mjs";
import { load } from "../storage/load.mjs";
import { editPet } from "../api/editPet.mjs";
import { STORAGE_KEY } from "../api/constants.mjs";

const token = load(STORAGE_KEY.token);
if (!token) {
  alert("Please log in.");
  window.location.href = "../login/index.html";
}

const form = document.getElementById("edit-pet-form");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("No pet ID provided.");
  window.location.href = "../index.html";
}

async function loadPetData() {
  const response = await getPet(id);
  const pet = response.data;

  document.getElementById("petName").value = pet.name;
  document.getElementById("petSpecies").value = pet.species;
  document.getElementById("petBreed").value = pet.breed;
  document.getElementById("petAge").value = pet.age;
  document.getElementById("petGender").value = pet.gender;
  document.getElementById("petSize").value = pet.size;
  document.getElementById("petColor").value = pet.color;
  document.getElementById("petDescription").value = pet.description;
  document.getElementById("petStatus").value = pet.adoptionStatus;
  document.getElementById("petLocation").value = pet.location;
  document.getElementById("petImageUrl").value = pet.image?.url || "";
}

loadPetData();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const updatedPet = {
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

  try {
    await editPet(id, updatedPet);
    alert("Pet updated!");
    window.location.href = `../singlePet/index.html?id=${encodeURIComponent(
      id
    )}`;
  } catch (error) {
    console.error(error);
    alert("Could not update the pet.");
  }
});
