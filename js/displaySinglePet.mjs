import { deletePet } from "./api/deletePet.mjs";
import { getPet } from "./apiRoot.mjs";

function el(tag, className, attrs = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  return node;
}

function addSpecRow(dl, label, value) {
  const row = el("div", "row mb-3");
  const dt = el("dt", "col-4 col-lg-3", { text: `${label}:` });
  const dd = el("dd", "col-8 col-lg-9", { text: value ?? "—" });
  row.append(dt, dd);
  dl.append(row);
}

function renderSinglePet(pet) {
  const container = document.querySelector("#single-pet-container");
  if (!container) return;
  container.replaceChildren(); // clear without innerHTML

  const toast = el("div", "copy-toast", {
    id: "copy-toast",
    text: "Link copied!",
  });
  container.append(toast);

  const imageUrl = pet.image?.url?.trim()
    ? pet.image.url.trim()
    : "https://via.placeholder.com/500?text=No+Image";
  const altText = pet.image?.alt || pet.name || "Pet";

  // ── outer container
  const outer = el("div", "container py-4");

  // top-right action buttons (stacked)
  const actions = el("div", "d-flex flex-column align-items-end gap-2 mb-4");

  // Edit button
  const editBtn = el("a", "btn btn-outline-dark btn-sm w-auto", {
    href: `../edit-pet/index.html?id=${encodeURIComponent(pet.id)}`,
  });
  editBtn.textContent = "Edit Pet";

  // Delete btn
  const deleteBtn = el("button", "btn btn-outline-danger btn-sm w-auto");
  deleteBtn.textContent = "Delete Pet";

  // Close button
  const closeBtn = el("a", "btn btn-outline-dark btn-sm w-auto", {
    href: "../index.html",
  });
  closeBtn.textContent = "Close";

  // Add both
  actions.append(closeBtn, editBtn, deleteBtn);

  // main row
  const row = el("div", "row align-items-start gy-4");

  // left: image + share
  const left = el("div", "col-12 col-md-5 text-center");
  const heroWrap = el("div", "pet-hero-wrap mx-auto");
  const img = el("img", "pet-hero-img rounded-circle", {
    src: imageUrl,
    alt: altText,
  });
  heroWrap.append(img);

  const shareBtn = el("button", "btn btn-outline-dark mt-4 px-4", {
    type: "button",
  });

  const icon = el("span", "bi bi-share me-2");
  const text = document.createTextNode("Share");

  shareBtn.append(icon, text);
  left.append(heroWrap, shareBtn);

  const right = el("div", "col-12 col-md-7 ps-md-5");
  const dl = el("dl", "pet-specs");

  addSpecRow(dl, "Name", pet.name);
  addSpecRow(dl, "Breed", pet.breed);
  addSpecRow(dl, "Age", pet.age);
  addSpecRow(dl, "Size", pet.size);
  addSpecRow(dl, "Color", pet.color);
  addSpecRow(dl, "Description", pet.description ?? "No description available.");

  right.append(dl);

  row.append(left, right);
  outer.append(actions, row);
  container.append(outer);

  shareBtn.addEventListener("click", async () => {
    const petUrl = location.href;
    const toast = document.getElementById("copy-toast");

    try {
      await navigator.clipboard.writeText(petUrl);

      toast.textContent = "Link copied to clipboard!";
      toast.classList.add("show");

      setTimeout(() => toast.classList.remove("show"), 2000);
    } catch (err) {
      console.error("Clipboard failed:", err);

      toast.textContent = "Could not copy the link.";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2000);
    }
  });

  deleteBtn.addEventListener("click", async () => {
    const confirmed = confirm("Are you sure you want to delete this pet?");
    if (!confirmed) return;

    try {
      await deletePet(pet.id);
      alert("Pet deleted successfully.");

      // Redirect to homepage/pets listing
      window.location.href = "../index.html";
    } catch (error) {
      console.error(error);
      alert("Could not delete the pet.");
    }
  });
}

async function displaySinglePet() {
  const id = new URLSearchParams(location.search).get("id");
  if (!id) return console.error("No ID in URL");
  try {
    const { data: pet } = await getPet(id);
    renderSinglePet(pet);
  } catch (e) {
    console.error("Failed to load pet", e);
  }
}

displaySinglePet();
