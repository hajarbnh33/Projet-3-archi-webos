/* fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
        displayWorks(works);
    });*/

async function init() {
    let response = await fetch("http://localhost:5678/api/works");
    let works = await response.json();
    displayWorks(works);
    worksModalFunction(works);
}
init();

function displayWorks(works) {
    // récupérer l'élément dans lequel mettre les works
    const container = document.querySelector(".gallery");
    //parcourir le tableau
    for (let work of works) {
        // pour chaque work créer le HTML en JS
        console.log(work);
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
        button.dataset.id = filter.id; //j'ajoute dataset à tous mes boutons et je récupère l'id directement
        //j'ajoute le texte dans mes filtres
        button.innerText = filter.name; // j'ajoute le nom de mes catégories dynamiquement
    }
    const buttonFilters = document.querySelectorAll(".filtres");
    buttonFilters.forEach((btn) => {
        //parcours les élements du tableau button pour y appliquer la fonction
        btn.addEventListener("click", function () {
            const works = document.querySelectorAll(".projet"); //on récupère les élements ayant la class "projet"
            const selectedCategoryId = btn.dataset.id;
            works.forEach((work) => {
                //pour chacun de ces elements on lui applique la class none (voir css)
                work.classList.add("none"); //images masquées
                //on determine si on doit afficher ou pas le projet
                const workCategoryId = work.dataset.categoryId;
                const visible =
                    selectedCategoryId === undefined || // le bouton tous on affiche
                    selectedCategoryId === workCategoryId; // la catégorie correspondante
                if (visible) {
                    work.classList.remove("none"); // on supprime none si le btn selectionné est undefined ou si on selectionne le btn correspondant à la catégorie
                } else {
                    work.classList.add("none");
                }
            });
        });
    });
}

// Verifier si l'utilisateur est connecté : si token est stocké

/*if(navigator.onLine = true){
   
}*/

const token = localStorage.getItem("token"); //recupère token stocké dans localstorage

if (token) {
    console.log("connecté");
    const bandeau = document.querySelector(".bandeau");
    bandeau.classList.remove("cache"); // je supprime la class cache pour faire disparaître le bandeau quand non connecté
    const logout = document.querySelector(".logout");
    logout.textContent = "logout"; //je crée mon lien de déconnexion
    logout.addEventListener("click", function () {
        // function qui permet de supprimer du localstorage mon token
        window.localStorage.removeItem("info");
    });
    const buttonEdition = document.querySelector(".buttonEdition");
    buttonEdition.classList.remove("cache");

    const icon = document.querySelector(".fa-regular");
    icon.classList.remove("cache");

    const buttonProjet = document.querySelector(".buttonProjet")
    buttonProjet.classList.remove("cache")

    const element = document.createElement("p");
    element.textContent = "Mode édition";
    buttonEdition.appendChild(element);

    const buttonFilter = document.querySelector(".buttonFilter");
    buttonFilter.classList.add("cache");

    const modalContainer = document.querySelector(".modalContainer");
    const modalTriggers = document.querySelectorAll(".modal-trigger");
    modalTriggers.forEach((trigger) =>
        trigger.addEventListener("click", toggleModal)
    );
    function toggleModal() {
        modalContainer.classList.toggle("active");
    }

    function worksModalFunction(works) {
        const worksModal = document.querySelector(".worksModal"); //je récupère le div avec mes projets dans la modal
        for (let workImage of works) {
            //une boucle pour générer mes images
            const divImg = document.createElement("div"); //je crée une div pour chacune des img
            divImg.classList.add("projet_modal"); //une class pour chacune des div
            const img = document.createElement("img"); // création balise img
            img.src = workImage.imageUrl;
            divImg.appendChild(img);
            worksModal.appendChild(divImg);
            const iconeDelete = document.createElement("div");
            iconeDelete.classList.add("icon_delete");
            iconeDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            divImg.appendChild(iconeDelete);
        }
    }

   /* const buttonDelete = document.querySelectorAll(".icone_delete"); //suppression des projets
    buttonDelete.addEventListener("click", async function (event) {
        event.preventDefault();
    });*/
}
