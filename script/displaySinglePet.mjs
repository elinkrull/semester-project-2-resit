import { getPet } from "./api.mjs";

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

  const imageUrl = pet.image?.url || "https://via.placeholder.com/500";
  const altText = pet.image?.alt || pet.name || "Pet";

  // ── outer container
  const outer = el("div", "container py-4");

  // top-right action
  const actions = el("div", "d-flex justify-content-end mb-3");
  const editBtn = el("a", "btn btn-outline-dark btn-sm", {
    href: `../update-pet.html?id=${encodeURIComponent(pet.id)}`,
  });
  editBtn.textContent = "Edit/Delete Pet";
  actions.append(editBtn);

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
  shareBtn.append(document.createTextNode("Share"));
  left.append(heroWrap, shareBtn);

  // right: specs
  const right = el("div", "col-12 col-md-7");
  const dl = el("dl", "pet-specs");

  addSpecRow(dl, "Name", pet.name);
  addSpecRow(dl, "Breed", pet.breed);
  addSpecRow(dl, "Age", pet.age);
  addSpecRow(dl, "Size", pet.size);
  addSpecRow(dl, "Color", pet.color);
  addSpecRow(dl, "Description", pet.description ?? "No description available.");

  right.append(dl);

  // assemble
  row.append(left, right);
  outer.append(actions, row);
  container.append(outer);

  // Share behavior
  shareBtn.addEventListener("click", async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: pet.name,
          text: pet.description ?? "",
          url: location.href,
        });
      } else {
        await navigator.clipboard.writeText(location.href);
        alert("Link copied!");
      }
    } catch {}
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
