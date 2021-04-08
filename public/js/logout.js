const logout = () => {

    const urlApi = `api/users/logout`;

    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        }
    }

    fetch(urlApi, options).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        alert("usuario deslogado");

        window.location.href = "/login";

    }).catch((err) => {
        console.error(err);
    });
};