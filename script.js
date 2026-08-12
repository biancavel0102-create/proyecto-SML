document.addEventListener("DOMContentLoaded", () => {
    alert("¡Bienvenido a Huella Azul! 🐾");
});
document.addEventListener("DOMContentLoaded", () => {
    // 1. Mensaje de bienvenida inicial (se mantiene tu código original)
    alert("¡Bienvenido a Huella Azul! 🐾");

    // Elementos del Modal y Login
    const modalAuth = document.getElementById("modal-auth");
    const btnOpenLogin = document.getElementById("btn-open-login");
    const btnCloseModal = document.getElementById("btn-close-modal");
    
    const tabLogin = document.getElementById("tab-login");
    const tabRegister = document.getElementById("tab-register");
    const formLogin = document.getElementById("form-login");
    const formRegister = document.getElementById("form-register");
    const userArea = document.getElementById("user-area");

    // Abrir modal
    if (btnOpenLogin) {
        btnOpenLogin.addEventListener("click", () => {
            modalAuth.style.display = "flex";
        });
    }

    // Cerrar modal
    if (btnCloseModal) {
        btnCloseModal.addEventListener("click", () => {
            modalAuth.style.display = "none";
        });
    }

    // Cerrar si hace clic fuera del contenido
    window.addEventListener("click", (e) => {
        if (e.target === modalAuth) {
            modalAuth.style.display = "none";
        }
    });

    // Cambiar entre pestañas de Login y Registro
    tabLogin.addEventListener("click", () => {
        tabLogin.classList.add("active");
        tabRegister.classList.remove("active");
        formLogin.classList.add("active");
        formRegister.classList.remove("active");
    });

    tabRegister.addEventListener("click", () => {
        tabRegister.classList.add("active");
        tabLogin.classList.remove("active");
        formRegister.classList.add("active");
        formLogin.classList.remove("active");
    });

    // Cargar usuarios de localStorage o iniciar arreglo vacío
    let users = JSON.parse(localStorage.getItem("huella_users")) || [];

    // LÓGICA DE REGISTRO
    formRegister.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = document.getElementById("reg-user").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const pass = document.getElementById("reg-pass").value;
        const msgReg = document.getElementById("msg-register");

        const exists = users.find(u => u.user === user);

        if (exists) {
            msgReg.style.color = "#dc3545";
            msgReg.textContent = "El usuario ya existe.";
            return;
        }

        users.push({ user, email, pass });
        localStorage.setItem("huella_users", JSON.stringify(users));

        msgReg.style.color = "#198754";
        msgReg.textContent = "¡Registro exitoso! Ya puedes iniciar sesión.";
        formRegister.reset();

        setTimeout(() => {
            tabLogin.click();
            msgReg.textContent = "";
        }, 1500);
    });

    // LÓGICA DE INICIO DE SESIÓN
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const userVal = document.getElementById("login-user").value.trim();
        const passVal = document.getElementById("login-pass").value;
        const msgError = document.getElementById("error-login");

        const foundUser = users.find(u => u.user === userVal && u.pass === passVal);

        if (foundUser) {
            localStorage.setItem("huella_active_user", foundUser.user);
            msgError.textContent = "";
            formLogin.reset();
            modalAuth.style.display = "none";
            checkSession();
        } else {
            msgError.textContent = "Usuario o contraseña incorrectos.";
        }
    });

    // COMPROBAR SESIÓN ACTIVA
    function checkSession() {
        const activeUser = localStorage.getItem("huella_active_user");

        if (activeUser) {
            userArea.innerHTML = `
                <div class="user-logged">
                    <span>🐾 Hola, <strong>${activeUser}</strong></span>
                    <button id="btn-logout" class="btn-logout">Salir</button>
                </div>
            `;

            document.getElementById("btn-logout").addEventListener("click", () => {
                localStorage.removeItem("huella_active_user");
                location.reload();
            });
        }
    }

    // Verificar si ya había sesión guardada al abrir la página
    checkSession();
});