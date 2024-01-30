/* fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
        displayWorks(works);
    });*/

/***************************Fonction appel api*/

async function init() {
    let response = await fetch("http://localhost:5678/api/works");
    let works = await response.json();
    displayWorks(works); //appelée pour afficher ces données
    worksModalFunction(works); //appel à la fonction permettant d'afficher projets dans la modal
}
init();

//fonction pour récupérer les images depuis API (tableau avec objets)
function displayWorks(works) {
    console.log(works);
    // récupérer l'élément dans lequel mettre les works
    const container = document.querySelector(".gallery");
    //efface le contenu actuel du conteneur
    container.innerHTML = "";
    //parcourir le tableau
    for (let work of works) {
        // pour chaque work créer le HTML en JS
        const figure = document.createElement("figure");
        figure.classList.add("projet");
        //on ajoute en dataset l'id de la catégorie
        figure.dataset.categoryId = work.category.id; // on récupère la categorie de l'id de chaque catégorie + on ajoute une dataset
        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        figure.appendChild(img);
        const figcaption = document.createElement("figcaption");
        figcaption.innerText = work.title;
        figure.appendChild(figcaption);
        //insérer le HTML crée
        container.appendChild(figure);
    }
}

//Appel API pour récupérer les catégories
async function initFilter() {
    let responseFilter = await fetch("http://localhost:5678/api/categories");
    let filters = await responseFilter.json();
    displayFilters(filters);
}
initFilter();

//Fonction création des catégories (tableau avec en objet les catégories)
function displayFilters(filters) {
    console.log(filters);
    const containerFilter = document.querySelector(".button_filter");
    for (let filter of filters) {
        const button = document.createElement("button");
        containerFilter.appendChild(button);
        button.classList.add("filtres");
        button.dataset.id = filter.id; //j'ajoute dataset à tous mes boutons et je récupère l'id directement
        button.innerText = filter.name; // j'ajoute le nom de mes catégories dynamiquement
    }
    const buttonFilters = document.querySelectorAll(".filtres");
    //btn correspond à chaque élément du tableau buttonFilters (catégories), pour chaque btn on applique la fonction
    buttonFilters.forEach((btn) => {
        btn.addEventListener("click", function () {
            const works = document.querySelectorAll(".projet"); //on récupère les élements ayant la class "projet"
            const selectedCategoryId = btn.dataset.id;
            works.forEach((work) => {
                //pour chacun de ces elements on lui applique la class none (voir css)
                work.classList.add("none");
                //on récupère id de chaque projet
                const workCategoryId = work.dataset.categoryId;
                const visible =
                    selectedCategoryId === undefined || // tous les projets sont visibles (supprime none btn "tous")
                    selectedCategoryId === workCategoryId; // si btn id === id du projet on supprime none pour ces projets
                if (visible) {
                    work.classList.remove("none"); // on supprime none si le btn selectionné est undefined ou si on selectionne le btn correspondant à la catégorie
                } else {
                    work.classList.add("none");
                }
            });
        });
    });
}
