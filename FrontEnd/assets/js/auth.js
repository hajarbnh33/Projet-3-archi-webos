const formSubmit = document.querySelector("form");
formSubmit.addEventListener("submit", async function (event) {
    event.preventDefault();

    // on récupère mdp et email
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginError = document.getElementById("login_error");

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailInput.value,
                password: passwordInput.value,
            }),
        });

        if (response.status !== 200) {
            throw `Le mot de passe ou l'adresse mail est incorrect !`;
        }

        let user = await response.json();
        //stockage dans localstorage
        window.localStorage.setItem("token", user.token);
        window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
    } catch (error) {
        loginError.innerText = error;
    }
});
