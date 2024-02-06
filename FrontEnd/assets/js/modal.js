const token = sessionStorage.getItem("token");

if (token) {
    console.log("vous êtes connecté");
    logoutButton();
    createElementAdmin();
    deleteProject();
    addImage();
    uploadImage();
    modal();
}

function createElementAdmin() {
    const bandeau = document.querySelector(".rod");
    bandeau.classList.remove("hidden");

    const buttonEdition = document.querySelector(".button_edition");
    buttonEdition.classList.remove("hidden");

    const icon = document.querySelector(".fa-regular");
    icon.classList.remove("hidden");

    const buttonProjet = document.querySelector(".button_project");
    buttonProjet.classList.remove("hidden");

    const element = document.createElement("p");
    element.textContent = "Mode édition";
    buttonEdition.appendChild(element);

    const buttonFilter = document.querySelector(".button_filter");
    buttonFilter.classList.add("hidden");
}

//déconnexion
function logoutButton() {
    const logout = document.querySelector(".logout");
    logout.classList.remove("hidden");
    const login = document.querySelector(".login");
    login.classList.add("hidden");
    logout.addEventListener("click", () => {
        window.sessionStorage.removeItem("token");
    });
}

function modal() {
    const editButton = document.querySelector(".edit_button");
    const modalContainer = document.getElementById("modal_container");
    const firstModal = document.querySelector(".first_modal");
    const overlay = document.querySelector(".overlay");
    const closeFirstModal = document.querySelector(".close_first_modal");
    const openSecondContainer = document.querySelector(".second_modal");
    const arrowLeft = document.querySelector(".fa-arrow-left");
    const buttonOpenSecondModal = document.querySelector(".button_add_photo");
    const closeSecondModal = document.querySelector(".btn_close_modal");

    //bouton modifier
    editButton.addEventListener("click", () => {
        modalContainer.classList.remove("hidden");
        overlay.classList.remove("hidden");
        firstModal.classList.remove("hidden");
    });

    //fermer première modal
    closeFirstModal.addEventListener("click", () => {
        modalContainer.classList.add("hidden");
        overlay.classList.add("hidden");
        firstModal.classList.add("hidden");
    });

    //fermer overlay
    overlay.addEventListener("click", () => {
        modalContainer.classList.add("hidden");
        overlay.classList.add("hidden");
        firstModal.classList.add("hidden");
        openSecondContainer.classList.add("hidden");
    });

    //ouverture seconde modale
    buttonOpenSecondModal.addEventListener("click", () => {
        firstModal.classList.add("hidden");
        openSecondContainer.classList.remove("hidden");
        arrowLeft.classList.remove("hidden");
    });

    //retour sur la page précédente
    arrowLeft.addEventListener("click", () => {
        firstModal.classList.remove("hidden");
        openSecondContainer.classList.add("hidden");
        arrowLeft.classList.add("hidden");
    });

    //fermeture des modales
    closeSecondModal.addEventListener("click", () => {
        modalContainer.classList.add("hidden");
        openSecondContainer.classList.add("hidden");
        overlay.classList.add("hidden");
    });
}

function worksModalFunction(works) {
    const worksModal = document.querySelector(".works_modal");

    for (let workProject of works) {
        const projects = document.createElement("figure");
        projects.classList.add("project_modal");
        const img = document.createElement("img");
        img.classList.add("image_modal");
        projects.dataset.id = workProject.id;
        img.src = workProject.imageUrl;
        img.alt = workProject.title;
        projects.appendChild(img);
        worksModal.appendChild(projects);

        const iconDeleteBtn = document.createElement("div");
        iconDeleteBtn.classList.add("icon_delete");
        iconDeleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        projects.appendChild(iconDeleteBtn);
    }
}

//suppression
function deleteProject() {
    const modal = document.getElementById("modal");

    modal.addEventListener("click", (event) => {
        const trashIcon = event.target.closest(".icon_delete");

        if (trashIcon) {
            const projectModal = trashIcon.closest(".project_modal");
            const workId = projectModal.dataset.id;

            if (confirm("Souhaitez-vous supprimer le projet ?")) {
                deleteProjectApi(workId);
            }
        }
    });
}

//supression projet depuis api
async function deleteProjectApi(workId) {
    try {
        const response = await fetch(
            `http://localhost:5678/api/works/${workId}`,
            {
                method: "DELETE",
                headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error("echec de la supression");
        }

        if (response.status === 204) {
            console.log("projet supprimé !");
            const projectElementDelete = document.querySelector(
                `[data-id="${workId}"]`
            );
            if (projectElementDelete) {
                const modalElementDelete =
                    projectElementDelete.closest(".project_modal");
                modalElementDelete.remove();
                const container = document.querySelector(".works_modal");
                container.innerHTML = "";
                init();
            }
        }
    } catch (error) {
        console.error("erreur de suppression:", error);
    }
}

//prévisualiser l'image
function previewImage(e) {
    const input = e.target;
    const image = document.getElementById("preview_image");
    const addPhotoContent = document.querySelector(".add_photo_content");
    const previewContainer = document.getElementById("preview_container");

    console.log(input.files);
    if (input.files && input.files[0]) {
        const redear = new FileReader();
        redear.onload = function (e) {
            image.src = e.target.result;
            previewContainer.style.display = "flex";
            addPhotoContent.classList.add("hidden");
        };
        redear.readAsDataURL(input.files[0]);
    }
}

function addImage() {
    const inputImage = document.getElementById("image");
    inputImage.addEventListener("change", previewImage);
}

//validation et vérification du formulaire
function uploadImage() {
    const form = document.getElementById("new_project_form");
    const imageInput = document.getElementById("image");
    const titleInput = document.getElementById("title");
    const categoryInput = document.getElementById("category");
    const submitButton = document.getElementById("validate_form");
    const addPhotoContainer = document.querySelector(".add_photo_content");
    const previewContent = document.getElementById("preview_container");

    submitButton.disabled = true;

    imageInput.addEventListener("change", validateForm);
    titleInput.addEventListener("input", validateForm);
    categoryInput.addEventListener("change", validateForm);

    function validateForm() {
        const imageSelected = imageInput.files.length > 0;
        const titleEntered = titleInput.value.trim() !== "";
        const categorySelected = categoryInput.value !== "";

        const formValid = imageSelected && titleEntered && categorySelected;

        submitButton.disabled = !(
            imageSelected &&
            titleEntered &&
            categorySelected
        );

        submitButton.disabled = !formValid;
        if (formValid) {
            submitButton.classList.add("enabled");
        } else {
            submitButton.classList.remove("enabled");
        }
    }

    //catégorie
    async function updateCategorySelect() {
        try {
            const responseCategory = await fetch(
                "http://localhost:5678/api/categories"
            );
            const category = await responseCategory.json();
            categoryInput.innerHTML = "";

            const defaultCategory = document.createElement("option");
            defaultCategory.value = "";
            defaultCategory.text = "Sélectionnez une catégorie...";
            categoryInput.appendChild(defaultCategory);

            category.forEach((categoryElement) => {
                let option = document.createElement("option");
                option.value = categoryElement.id;
                option.text = categoryElement.name;
                categoryInput.appendChild(option);
            });
        } catch (error) {
            console.error("erreur récupération des catégories:", error);
        }
        validateForm();
    }
    updateCategorySelect();

    //soumission du formulaire
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!submitButton.disabled) {
            submitForm();
            form.reset();
            addPhotoContainer.classList.remove("hidden");
            previewContent.style.display = "none";
        }
    });

    function submitForm() {
        const formData = new FormData();
        formData.append("image", imageInput.files[0]);
        formData.append("title", titleInput.value);
        formData.append("category", categoryInput.value);

        fetch(`http://localhost:5678/api/works`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("echec de la requête");
                }
                return response.json();
            })

            .then((data) => {
                console.log("Photo ajoutée avec succès ! :", data);

                //mise à jour de la page d'acceuil
                const galleryContent = document.querySelector(".gallery");
                const figure = document.createElement("figure");
                const imageFigure = document.createElement("img");
                imageFigure.src = data.imageUrl;
                imageFigure.alt = data.title;
                figure.dataset.id = data.id;
                const figcaption = document.createElement("figcaption");
                figcaption.textContent = data.title;
                figure.appendChild(imageFigure);
                figure.appendChild(figcaption);
                galleryContent.appendChild(figure);

                //mise à jour de la modale
                const worksModalContainer =
                    document.querySelector(".works_modal");
                const projectsContainer = document.createElement("figure");
                const img = document.createElement("img");
                img.classList.add("image_modal");
                projectsContainer.classList.add("project_modal");
                projectsContainer.dataset.id = data.id;
                img.src = data.imageUrl;
                img.alt = data.title;
                projectsContainer.appendChild(img);
                worksModalContainer.appendChild(projectsContainer);

                //fermeture deuxième modal
                const firstmodal = document.querySelector(".first_modal");
                const secondModal = document.querySelector(".second_modal");
                firstmodal.classList.remove("hidden");
                secondModal.classList.add("hidden");

                //bouton désactivé
                submitButton.classList.remove("enabled");
                submitButton.disabled = true;

                //bouton suppression
                const iconDeleteBtn = document.createElement("div");
                iconDeleteBtn.classList.add("icon_delete");
                iconDeleteBtn.innerHTML =
                    '<i class="fa-solid fa-trash-can"></i>';
                projectsContainer.appendChild(iconDeleteBtn);
                iconDeleteBtn.addEventListener("click", function () {
                    const workId = projectsContainer.dataset.id;
                    deleteProjectApi(workId);
                });
            })

            .catch((error) => {
                console.error("erreur: photo non envoyée :", error);
            });
    }
}
