export function renderPets(list) {
  const feedContainer = document.querySelector("#display-pets-container");
  if (!feedContainer) return;

  const placeholderUrl = "https://placehold.co/500x500?text=No+Image";

  feedContainer.replaceChildren();

  const section = document.createElement("section");
  section.className = "pets-section py-5";

  const container = document.createElement("div");
  container.className = "container-lg d-flex justify-content-center";

  const row = document.createElement("div");
  row.className =
    "row justify-content-center align-items-start w-100 pets-grid";

  list.forEach((pet) => {
    const name = pet.name ?? "Unnamed pet";
    const id = pet.id;
    const rawUrl = pet.image?.url;
    const altText = pet.image?.alt || "Pet image";

    const initialUrl =
      rawUrl && rawUrl.trim() !== "" ? rawUrl.trim() : placeholderUrl;

    const col = document.createElement("div");
    col.className = "col-12 col-sm-4 col-md-3 col-lg-2-4 text-center mb-5";

    const link = document.createElement("a");
    link.href = `./singlePet/index.html?id=${encodeURIComponent(id)}`;
    link.className = "text-decoration-none text-dark d-block";

    const img = document.createElement("img");
    img.className = "img-fluid rounded-circle shadow-sm border";
    img.style.width = "180px";
    img.style.height = "180px";
    img.style.objectFit = "cover";
    img.src = initialUrl;
    img.alt = altText;

    img.addEventListener("error", () => {
      if (img.src !== placeholderUrl) {
        img.src = placeholderUrl;
      }
    });

    const p = document.createElement("p");
    p.className = "mt-2 fw-bold";
    p.textContent = name;

    link.append(img, p);
    col.appendChild(link);
    row.appendChild(col);
  });

  container.appendChild(row);
  section.appendChild(container);
  feedContainer.appendChild(section);
}
