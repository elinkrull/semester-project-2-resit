import { deletePet } from "./api/deletePet.mjs";
import { getPet } from "./apiRoot.mjs";
import { setupLogout, updateNavbarAuth } from "./events/onAuth.mjs";

function addSpecRow(parent, label, value) {
  const row = document.createElement("div");
  row.className = "row mb-3";

  const labelEl = document.createElement("div");
  labelEl.className = "col-4 col-lg-3";
  labelEl.textContent = `${label}:`;

  const valueEl = document.createElement("div");
  valueEl.className = "col-8 col-lg-9";
  valueEl.textContent = value ?? "—";

  row.append(labelEl, valueEl);
  parent.append(row);
}

function renderSinglePet(pet) {
  const container = document.getElementById("single-pet-container");
  if (!container) return;

  container.replaceChildren();

  const toast = document.createElement("div");
  toast.id = "copy-toast";
  toast.className = "copy-toast";
  container.appendChild(toast);

  const placeholderUrl = "https://placehold.co/500x500?text=No+Image";
  const rawUrl = pet.image?.url;
  const imageUrl =
    rawUrl && rawUrl.trim() !== "" ? rawUrl.trim() : placeholderUrl;
  const altText = pet.image?.alt || pet.name || "Pet";

  const outer = document.createElement("div");
  outer.className = "container-lg py-5 d-flex justify-content-center";

  const card = document.createElement("div");
  card.className = "pet-detail-card";

  const actions = document.createElement("div");
  actions.className = "d-flex flex-column align-items-end gap-2 mb-4";

  const editBtn = document.createElement("a");
  editBtn.className = "btn btn-outline-dark btn-sm w-auto";
  editBtn.href = `../edit-pet/index.html?id=${encodeURIComponent(pet.id)}`;
  editBtn.textContent = "Edit Pet";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-outline-danger btn-sm w-auto";
  deleteBtn.textContent = "Delete Pet";

  const closeBtn = document.createElement("a");
  closeBtn.className = "btn btn-outline-dark btn-sm w-auto";
  closeBtn.href = "../index.html";
  closeBtn.textContent = "Close";

  actions.append(closeBtn, editBtn, deleteBtn);

  const row = document.createElement("div");
  row.className = "row align-items-center gy-4 gx-5";

  const left = document.createElement("div");
  left.className = "col-12 col-md-5 text-center";

  const heroWrap = document.createElement("div");
  heroWrap.className = "pet-hero-wrap mx-auto";

  const img = document.createElement("img");
  img.className = "pet-hero-img rounded-circle";
  img.src = imageUrl;
  img.alt = altText;

  img.addEventListener("error", () => {
    if (img.src !== placeholderUrl) {
      img.src = placeholderUrl;
    }
  });

  heroWrap.appendChild(img);

  const shareBtn = document.createElement("button");
  shareBtn.type = "button";
  shareBtn.className = "btn btn-outline-dark mt-4 px-4";

  const icon = document.createElement("span");
  icon.className = "bi bi-share me-2";

  const shareText = document.createTextNode("Share");

  shareBtn.append(icon, shareText);
  left.append(heroWrap, shareBtn);

  const right = document.createElement("div");
  right.className = "col-12 col-md-7 ps-md-5";

  const specs = document.createElement("div");
  specs.className = "pet-specs";

  const nameHeading = document.createElement("h2");
  nameHeading.className = "pet-name mb-4";
  nameHeading.textContent = pet.name ?? "Unnamed pet";

  addSpecRow(specs, "Breed", pet.breed);
  addSpecRow(specs, "Age", pet.age);
  addSpecRow(specs, "Size", pet.size);
  addSpecRow(specs, "Color", pet.color);
  addSpecRow(
    specs,
    "Description",
    pet.description ?? "No description available.",
  );

  right.append(nameHeading, specs);

  row.append(left, right);
  card.append(actions, row);
  outer.appendChild(card);
  container.appendChild(outer);

  shareBtn.addEventListener("click", async () => {
    const petUrl = location.href;
    const toastEl = document.getElementById("copy-toast");

    try {
      await navigator.clipboard.writeText(petUrl);

      toastEl.textContent = "Link copied to clipboard!";
      toastEl.classList.add("show");

      setTimeout(() => toastEl.classList.remove("show"), 2000);
    } catch (err) {
      console.error("Clipboard failed:", err);

      toastEl.textContent = "Could not copy the link.";
      toastEl.classList.add("show");
      setTimeout(() => toastEl.classList.remove("show"), 2000);
    }
  });

  deleteBtn.addEventListener("click", async () => {
    const confirmed = confirm("Are you sure you want to delete this pet?");
    if (!confirmed) return;

    try {
      await deletePet(pet.id);
      alert("Pet deleted successfully.");
      window.location.href = "../index.html";
    } catch (error) {
      console.error(error);
      alert("Could not delete the pet.");
    }
  });
}

async function displaySinglePet() {
  const id = new URLSearchParams(location.search).get("id");
  if (!id) {
    console.error("No ID in URL");
    return;
  }

  try {
    const { data: pet } = await getPet(id);
    renderSinglePet(pet);
  } catch (e) {
    console.error("Failed to load pet", e);
  }
}

displaySinglePet();

updateNavbarAuth();
setupLogout();
