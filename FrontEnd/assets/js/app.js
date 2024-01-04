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

// créer les boutons filtres
/* 
    <section id="portfolio">
    <h2>Mes Projets</h2>
    <div class="gallery"></div>
    </section>
*/
//Je récupère mon élément du fichier HTML

/*let classButton = document.querySelector(".buttonFilter");

//J'indique le contenu de mes boutons
let contenuFirstButton = "Tous";
let contenuSecondButton = "Objets";
let contenuThirdButton = "Appartements";
let contenuFourthButton = "Hôtels & restaurants";

// Je vais créer mes boutons filtres
let firstButton = document.createElement("button");
classButton.appendChild(firstButton);

let secondButton = document.createElement("button");
classButton.appendChild(secondButton);

let thirdButton = document.createElement("button");
classButton.appendChild(thirdButton);

let fourthButton = document.createElement("button");
classButton.appendChild(fourthButton);

//J'ajoute le contenu aux boutons
firstButton.textContent = contenuFirstButton;
secondButton.textContent = contenuSecondButton;
thirdButton.textContent = contenuThirdButton;
fourthButton.textContent = contenuFourthButton;

//La possibilité de filtrer la galerie par catégorie de projet

//je récupère tous mes boutons
let filters = document.querySelectorAll(".buttonFilter button");
console.log(filters);

//Boucle for of pour parcourir ma liste de filtre
for (let filterButton of filters) {
    filterButton.addEventListener("click", function () {
        console.log("vous avez cliqué");
    });
}
*/

async function initFilter() {
    let responseFilter = await fetch("http://localhost:5678/api/categories");
    let filters = await responseFilter.json();
    displayFilters(filters);
    console.log(filters);
}
initFilter();

function displayFilters(filters) {
    console.log(filters);
    const containerFilter = document.querySelector(".buttonFilter");
    for (let filter of filters) {
        console.log(filter);
        //je crée mes balises boutons
        const button = document.createElement("button");
        containerFilter.appendChild(button);
        //j'ajoute une class à chacun de mes filtres
        const containerButton = document.querySelector("button");
        button.classList.add("filtres");
        //j'ajoute le texte dans mes filtres
        button.innerText = filter.name;
    }
}
