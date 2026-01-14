// Mostrar menú de usuario solo si está logueado
/*
document.addEventListener('DOMContentLoaded', function() {
    const usuario = localStorage.getItem('usuario_logueado');
    const accesoMenu = document.getElementById('acceso-menu');
    const loginMenu = document.getElementById('login-menu');
    if (usuario) {
        accesoMenu.style.display = '';
        loginMenu.style.display = 'none';
        document.getElementById('acceso-usuario').textContent = usuario;
    } else {
        accesoMenu.style.display = 'none';
        loginMenu.style.display = '';
    }
    // Dropdown
    const accesoLink = document.getElementById('acceso-link');
    const dropdown = document.getElementById('acceso-dropdown');
    accesoLink.addEventListener('mouseenter', () => dropdown.style.display = 'block');
    accesoMenu.addEventListener('mouseleave', () => dropdown.style.display = 'none');
    // Cerrar sesión
    const cerrarBtn = document.getElementById('cerrarSesionBtn');
    cerrarBtn.addEventListener('click', function() {
        localStorage.removeItem('usuario_logueado');
        window.location.href = 'login.html';
    });
});*/

document.addEventListener('DOMContentLoaded', () => {
    const usuario = localStorage.getItem('usuario_logueado');
    const BuscarElement = (id) => document.getElementById(id); // Pequeño helper para reducir código

    // Alternar visibilidad con operador ternario
    BuscarElement('acceso-menu').style.display = usuario ? '' : 'none'; // Estructura: ¿Condición? (Si es verdad) : (Si es falso)
    BuscarElement('login-menu').style.display = usuario ? 'none' : ''; // Estructura: ¿Condición? (Si es verdad) : (Si es falso)
    
    if (usuario)
        BuscarElement('acceso-usuario').textContent = usuario;

    // Dropdown
    const dropdown = BuscarElement('acceso-dropdown');
    BuscarElement('acceso-link').onmouseenter = () => dropdown.style.display = 'block';
    BuscarElement('acceso-menu').onmouseleave = () => dropdown.style.display = 'none';

    // Cerrar sesión
    BuscarElement('cerrarSesionBtn').onclick = () => {
        localStorage.removeItem('usuario_logueado');
        window.location.href = 'login.html';
    };
});