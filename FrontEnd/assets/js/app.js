/* fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
        displayWorks(works);
    });*/

async function init() {
    let response = await fetch("http://localhost:5678/api/works");
    let works = await response.json();
    displayWorks(works);
}
init();

function displayWorks(works) {
    // récupérer l'élément dans lequel mettre les works
    const container = document.querySelector(".gallery");
    //parcourir le tableau
    for (let work of works) {
        // pour chaque work créer le HTML en JS
        const figure = document.createElement("figure");
        figure.classList.add("projet");
        //on ajoute en dataset l'id de la catégorie
        figure.dataset.categoryId = work.category.id
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

//J'appel API pour récupérer les catégories

async function initFilter() {
    let responseFilter = await fetch("http://localhost:5678/api/categories");
    let filters = await responseFilter.json();
    displayFilters(filters);
}
initFilter();

function displayFilters(filters) {
    const containerFilter = document.querySelector(".buttonFilter");
    for (let filter of filters) {
        //je crée mes balises boutons
        const button = document.createElement("button");
        containerFilter.appendChild(button);
        //j'ajoute une class à chacun de mes filtres
        const containerButton = document.querySelector("button");
        button.classList.add("filtres");
        //j'ajoute en dataset id de la catégorie
        button.dataset.id = filter.id
        //j'ajoute le texte dans mes filtres
        button.innerText = filter.name; // j'ajoute le nom de mes catégories dynamiquement
    }
    const buttonFilters = document.querySelectorAll(".filtres");
    buttonFilters.forEach((btn) => {
        //parcours les élements du tableau button pour y appliquer la fonction
        btn.addEventListener("click", function () {
            const works = document.querySelectorAll(".projet"); //on récupère les élements ayant la class "projet"
            const selectedCategoryId = btn.dataset.id
            works.forEach((work) => {
                //pour chacun de ces elements on lui applique la class none (voir css)
                work.classList.add("none"); //images masquées
                //on determine si on doit afficher ou pas le projet
                const workCategoryId = work.dataset.categoryId
                const visible =
                    selectedCategoryId === undefined // le bouton tous on affiche
                    || selectedCategoryId === workCategoryId // la catégorie correspondante
                if(visible){
                    work.classList.remove("none")
                }else{
                    work.classList.add("none")
                }
            });

        });
    });
}
