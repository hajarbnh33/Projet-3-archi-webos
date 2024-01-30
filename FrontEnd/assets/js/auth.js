const formSubmit = document.querySelector("form");
formSubmit.addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginError = document.getElementById("login_error");

    try {
        const response = await fetch(`http://localhost:5678/api/users/login`, {
            method: "POST",
            headers: {
                Accept: "application/json", //client accepte reponse format json
                "Content-Type": "application/json",//corp de la requête en json
            },
            body: JSON.stringify({ //converti les infos identification en une chaîne json et assigne au corp de la requête
                email: emailInput.value,
                password: passwordInput.value,
            }),
        });

        if (response.status !== 200) {
            throw `Le mot de passe ou l'adresse mail est incorrect !`; //verification réponse serveur
        }

        let user = await response.json(); //réponse de la requête JSON : token
        //stockage dans sessionStorage
        window.sessionStorage.setItem("token", user.token);  //stock token dans sessionstorage
        window.location.href = "./index.html";//redirection
    } catch (error) {
        loginError.innerText = error;//si une erreur se produit
    }
});
