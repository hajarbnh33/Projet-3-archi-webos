//récupérer les images depuis API 
async function init() {
    let response = await fetch("http://localhost:5678/api/works");
    let works = await response.json();
    displayWorks(works); 
    worksModalFunction(works); 
}
init();

function displayWorks(works) {
    console.log(works);
    const container = document.querySelector(".gallery");
    container.innerHTML = "";
    for (let work of works) {
        const figure = document.createElement("figure");
        figure.classList.add("projet");
        figure.dataset.categoryId = work.category.id;
        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        figure.appendChild(img);
        const figcaption = document.createElement("figcaption");
        figcaption.innerText = work.title;
        figure.appendChild(figcaption);
        container.appendChild(figure);
    }
}

//récupérer les catégories depuis API
async function initFilter() {
    let responseFilter = await fetch("http://localhost:5678/api/categories");
    let filters = await responseFilter.json();
    displayFilters(filters);
}
initFilter();

function displayFilters(filters) {
    console.log(filters);
    const containerFilter = document.querySelector(".button_filter");
    for (let filter of filters) {
        const button = document.createElement("button");
        containerFilter.appendChild(button);
        button.classList.add("filtres");
        button.dataset.id = filter.id;
        button.innerText = filter.name;
    }
    const buttonFilters = document.querySelectorAll(".filtres");
        buttonFilters.forEach((btn) => {
        btn.addEventListener("click", function () {
            const works = document.querySelectorAll(".projet");
            const selectedCategoryId = btn.dataset.id;
            console.log(selectedCategoryId);
            works.forEach((work) => {
                work.classList.add("none");
                const workCategoryId = work.dataset.categoryId;
                const visible =
                    selectedCategoryId === undefined ||
                    selectedCategoryId === workCategoryId;
                if (visible) {
                    work.classList.remove("none");
                } else {
                    work.classList.add("none");
                }
            });
        });
    });
}
