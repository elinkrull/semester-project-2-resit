import { getPets } from "./api.mjs";
import { renderPets } from "./renderPets.mjs";

let allPets = [];
let visibleCount = 20;
let isSearching = false;

export async function displayPets() {
  const pets = await getPets();
  allPets = Array.isArray(pets) ? pets : pets.data;

  allPets.sort((a, b) => new Date(b.created) - new Date(a.created));

  renderPets(allPets.slice(0, visibleCount));

  attachSearch();
  attachViewMore();
  updateViewMoreVisibility();
}

function normalize(str = "") {
  return str
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function startsWithWord(str = "", q = "") {
  const n = normalize(str);
  if (!q) return false;
  const words = n.split(/[^a-z0-9]+/g).filter(Boolean);
  return words.some((w) => w.startsWith(q));
}

function attachSearch() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  const viewMoreBtn = document.getElementById("view-more-btn");

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query === "") {
      isSearching = false;
      renderPets(allPets);
      removeNoResultsMessage();
      if (viewMoreBtn) viewMoreBtn.style.display = "none";
      return;
    }

    isSearching = true;

    const filtered = allPets.filter((pet) => {
      const name = pet?.name ?? "";
      const breed = pet?.breed ?? "";
      const species = pet?.species ?? "";

      return (
        startsWithWord(name, query) ||
        startsWithWord(breed, query) ||
        normalize(species).startsWith(query)
      );
    });

    // Hide view more btn during search
    if (viewMoreBtn) viewMoreBtn.style.display = "none";

    if (filtered.length === 0) {
      renderPets([]);
      showNoResultsMessage();
    } else {
      removeNoResultsMessage();
      renderPets(filtered);
    }
  });
}

function attachViewMore() {
  const button = document.getElementById("view-more-btn");
  if (!button) return;

  button.addEventListener("click", () => {
    if (isSearching) return;

    visibleCount += 20;
    renderPets(allPets.slice(0, visibleCount));
    updateViewMoreVisibility();
  });
}

function updateViewMoreVisibility() {
  const button = document.getElementById("view-more-btn");
  if (!button) return;

  const hasMore = !isSearching && visibleCount < allPets.length;
  button.style.display = hasMore ? "inline-block" : "none";
}

function showNoResultsMessage() {
  const container = document.querySelector("#display-pets-container");
  if (!container) return;
  if (document.querySelector(".no-results")) return;

  container.innerHTML = `
    <div class="text-center py-5 no-results">
      <h4 class="fw-bold mb-3">No pets found</h4>
      <p class="text-muted">Try another name or breed.</p>
    </div>
  `;
}

function removeNoResultsMessage() {
  const message = document.querySelector(".no-results");
  if (message) message.remove();
}

displayPets();
