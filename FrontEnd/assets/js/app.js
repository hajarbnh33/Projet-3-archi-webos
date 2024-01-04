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
