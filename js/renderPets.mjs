export function renderPets(list) {
  const feedContainer = document.querySelector("#display-pets-container");
  if (!feedContainer) return;

  const petItemHTML = list.map((pet) => {
    const name = pet.name;
    const breed = pet.breed;
    const age = pet.age;
    const id = pet.id;
    const species = pet.species;
    const description = pet.description;
    const imageUrl =
      pet.image && pet.image.url
        ? pet.image.url
        : "https://images.unsplash.com/photo-1701627788657-1a942dac8a7d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1035";
    const altText = pet.image?.alt || "Pet Image";

    return `
			<div class="col-12 col-sm-4 col-md-3 col-lg-2-4 text-center mb-5">
			   <a href="./singlePet/index.html?id=${encodeURIComponent(id)}" 
       class="text-decoration-none text-dark d-block">
				 <img src="${imageUrl}" alt="${altText}" class="img-fluid rounded-circle shadow-sm border"
					 style="width: 180px; height: 180px; object-fit: cover;"
				 />
					 <p class="mt-2 fw-bold">${name}</p>
					 </a>
			 </div>`;
  });

  feedContainer.innerHTML = `
		 <section class="pets-section py-5">
			 <div class="container-lg d-flex justify-content-center">
				 <div class="row justify-content-center align-items-start w-100 pets-grid">
					 ${petItemHTML.join("")}
				 </div>
			 </div>
		 </section>
	 `;
}
