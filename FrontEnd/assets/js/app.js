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
    console.log(works);
    // récupérer l'élément dans lequel mettre les works
    const container = document.querySelector(".gallery");
    //parcourir le tableau
    for (let work of works) {
        console.log(work);
        // pour chaque work créer le HTML en JS
        /*
        <figure>
            <img
                src="assets/images/abajour-tahina.png"
                alt="Abajour Tahina"
            />
            <figcaption>Abajour Tahina</figcaption>
        </figure>
        */
        const figure = document.createElement("figure");
        figure.classList.add("projet");
        figure.classList.add(
            work.category.name.split(" & ").join("_").toLowerCase()
        ); //on ajoute une classe en fonction de sa catégorie
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
        button.classList.add(filter.name.split(" & ").join("_").toLowerCase());
        //j'ajoute le texte dans mes filtres
        button.innerText = filter.name; // j'ajoute le nom de mes catégories dynamiquement
    }
    console.log(filters);
    const buttonFilters = document.querySelectorAll(".filtres");
    buttonFilters.forEach((btn) => {
        //parcours les élements du tableau button pour y appliquer la fonction
        btn.addEventListener("click", function () {
            const projet = document.querySelectorAll(".projet"); //on récupère les élements ayant la class "projet"
            projet.forEach((img) => {
                //pour chacun de ces elements on lui applique la class none (voir css)
                img.classList.add("none"); //images masquées
            });

            const categorySelected = "." + this.classList[1]; // [1] correspond à la 2è class du tableau des boutons, this ici fait référence au bouton sur le quelle on clique

            const projetSelected = document.querySelectorAll(categorySelected);

            if (categorySelected == ".tous") {
                projet.forEach((img) => {
                    img.classList.remove("none"); //afficher tous les projets en supprimant la class none à tous les projets
                });
            } else {
                projetSelected.forEach((img) => {
                    img.classList.remove("none"); //supprimer la class none aux projets selectionnés (deuxième class selectionnées)
                });
            }
        });
    });
}
