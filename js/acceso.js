// Mostrar menú de usuario solo si está logueado

document.addEventListener('DOMContentLoaded', function() {
    const usuario = localStorage.getItem('usuario_logueado');
    const accesoMenu = document.getElementById('acceso-menu');
    const loginMenu = document.getElementById('login-menu');
    
    // Solo ejecutar si los elementos existen
    if (!accesoMenu || !loginMenu) {
        return;
    }
    
    if (usuario) {
        accesoMenu.style.display = '';
        loginMenu.style.display = 'none';
        const accesoUsuario = document.getElementById('acceso-usuario');
        if (accesoUsuario) {
            accesoUsuario.textContent = usuario;
        }
    } else {
        accesoMenu.style.display = 'none';
        loginMenu.style.display = '';
    }
    
    // Dropdown
    const accesoLink = document.getElementById('acceso-link');
    const dropdown = document.getElementById('acceso-dropdown');
    if (accesoLink && dropdown) {
        accesoLink.addEventListener('mouseenter', () => dropdown.style.display = 'block');
        accesoMenu.addEventListener('mouseleave', () => dropdown.style.display = 'none');
    }
    
    // Cerrar sesión
    const cerrarBtn = document.getElementById('cerrarSesionBtn');
    if (cerrarBtn) {
        cerrarBtn.addEventListener('click', function() {
            localStorage.removeItem('usuario_logueado');
            window.location.href = 'pages/login.html';
        });
    }
});
