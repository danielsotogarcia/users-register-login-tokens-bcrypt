const register = () => {

    const newUser = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const urlApi = `api/users/register`;

    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newUser)
    }

    fetch(urlApi, options).then((response) => {
        return response.json();
    }).then((data) => {
        alert("usuario registrado correctamente");

        // redireccionar a una url
        window.location.href = "/login";

    }).catch((err) => {
        console.error(err);
    });
};