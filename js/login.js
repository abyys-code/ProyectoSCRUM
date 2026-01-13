// Login usando localStorage
// Usuario: admin, Contraseña: 1234

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const errorDiv = document.getElementById('login-error');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const usuario = document.getElementById('usuario').value.trim();
        const contrasena = document.getElementById('contrasena').value;

        // Credenciales válidas
        const userValido = 'admin';
        const passValido = '1234';

        if (usuario === userValido && contrasena === passValido) {
            // Guardar sesión en localStorage
            localStorage.setItem('usuario_logueado', usuario);
            // Redirigir a la página de asistencia
            window.location.href = 'asistencia.html';
        } else {
            errorDiv.textContent = 'Usuario o contraseña incorrectos.';
        }
    });
});
