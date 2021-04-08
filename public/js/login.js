const login = () => {

    const user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const urlApi = `api/users/login`;

    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(user)
    }

    fetch(urlApi, options).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        alert("usuario logado");

        window.location.href = "/private";

    }).catch((err) => {
        console.error(err);
    });
};