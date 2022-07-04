function obtenerElementos(){
    submit = document.getElementById("ingresar");
    email = document.getElementById("txtEmail");
    pass = document.getElementById("txtPass");
    lblEG = document.getElementById("lblErrorGeneral");
}

window.onload = () =>{
    comprobarSesion();
    obtenerElementos();
    ocultarLabels();
    submit.onclick = (e) => {
        e.preventDefault();
        if (validarCampos()) {
            lblEG.classList.toggle("hidden",true);
            realizarRequest();
        }
    }
}

function ingresar(info){
    if (info.error == false) {
        localStorage.logged = "true";
        location = "./dashboard.html";
    }
    else{
        lblEG.classList.toggle("hidden",false);
        alert("jamanica");
    }
}

function comprobarSesion(){
    if (localStorage.logged == "true") {
        location = "./dashboard.html";
    }
}

function validarCampos() {
    validate = true;
    if (pass.value.length < 7) {
        pass.labels[1].classList.toggle("hidden",false);
        validate = false;
    }
    if (!email.value.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
        email.labels[1].classList.toggle("hidden",false);
        validate = false;
    }
    return validate;
}

function ocultarLabels(){
    email.onfocus = () => {
        email.labels[1].classList.toggle("hidden",true);
        lblEG.classList.toggle("hidden",true);
    }
    pass.onfocus = () => {
        pass.labels[1].classList.toggle("hidden",true);
        lblEG.classList.toggle("hidden",true);
    }
}

function realizarRequest(){
    fetch("https://basic-server-one.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
        email: email.value,
        password: pass.value
        })
    })
        .then(response => response.json())
        .then(info => ingresar(info))
        .catch(error => console.log(error))
}