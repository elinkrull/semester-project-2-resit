import { API_BASE_URL, API_LISTINGS } from "./constants.mjs";

//Fetch data from the API
export async function getPets() {
  try {
    const getPetsUrl = `${API_BASE_URL}${API_LISTINGS}`;
    const response = await fetch(getPetsUrl);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Display all pets
export async function displayPets() {
  const pets = await getPets();
  const data = pets.data;
  console.log(data);

  const feedContainer = document.querySelector("#display-pets-container");

  const petItem = data.map((el) => {
    const name = el.name;
    const breed = el.breed;
    const age = el.age;
    const id = el.id;
    const species = el.species;
    const description = el.description;
    const imageUrl =
      el.image && el.image.url
        ? el.image.url
        : "https://images.unsplash.com/photo-1701627788657-1a942dac8a7d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035";
    const altText = el.image?.alt || "Pet Image";

    return `
   <div class="col-12 col-sm-4 col-md-3 col-lg-2-4 text-center mb-5">
      <img src="${imageUrl}" alt="${altText}" class="img-fluid rounded-circle shadow-sm border"
        style="width: 180px; height: 180px; object-fit: cover;"
      />
        <p class="mt-2 fw-bold">${name}</p>
    </div>`;
  });

  feedContainer.innerHTML = `
  <section class="pets-section py-5">
    <div class="container-lg d-flex justify-content-center">
      <div class="row justify-content-center align-items-start w-100 pets-grid">
        ${petItem.join("")}
      </div>
    </div>
  </section>
`;
}

displayPets();
