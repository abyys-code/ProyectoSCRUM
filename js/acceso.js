// Mostrar menú de usuario y controlar botón Login/Logout

document.addEventListener('DOMContentLoaded', function() {
    const usuario = localStorage.getItem('usuario_logueado');
    const loginLogoutBtn = document.getElementById('loginLogout');
    
    // Controlar el botón dinámico Login/Logout
    if (loginLogoutBtn) {
        if (usuario) {
            // Usuario logueado: mostrar "Cerrar Sesión"
            loginLogoutBtn.textContent = 'Cerrar Sesión';
            loginLogoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('usuario_logueado');
                localStorage.removeItem('asistencias_scrum');
                window.location.href = 'index.html';
            });
        } else {
            // Usuario no logueado: mostrar "Login"
            loginLogoutBtn.textContent = 'Login';
            loginLogoutBtn.href = 'pages/login.html';
        }
    }
});
