function obtenerElementos(){
    logout = document.getElementById("logout");
    texto = document.getElementsByClassName("text")[0];
}

window.onload = () => {
    obtenerElementos();
    if (localStorage.logged == "false") {
        cerrarSesion();
    }
    logout.onclick = cerrarSesion;
    realizarRequest();
}

function realizarRequest() {
    texto.classList.toggle("hidden", false);
    let url = "https://basic-server-one.vercel.app/users";
    fetch(url)
        .then(response => response.json())
        .then(usuarios => {
            setTimeout(llenarTabla, 500, usuarios.data)
        })
        .catch(error => console.log(error))
}

function llenarTabla(usuarios){
    texto.classList.toggle("hidden", true);
    let head = "<tr><th>Nombre</th><th>Ciudad</th><th>Teléfono</th><th>Nombre de usuario</th><th>Email</th></tr>";
    let body = "";
    for (let i = 0; i < usuarios.length; i++) {
        body += `<tr><td>${usuarios[i].name}</td><td>${usuarios[i].address.city}</td>
        <td>${usuarios[i].phone}</td><td>${usuarios[i].username}</td><td>${usuarios[i].email}</td></tr>`;
    }
    document.getElementById("encabezado").innerHTML = head;
    document.getElementById("contenido").innerHTML = body;
}

function cerrarSesion(){
    localStorage.logged = "false";
    location = "./login.html";
}