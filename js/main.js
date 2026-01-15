// Manejo de asistencias en reuniones Scrum
let registros = JSON.parse(localStorage.getItem('asistencias_scrum')) || [];

// Verificar si el usuario está autenticado
function verificarSesion() {
    const usuarioLogueado = localStorage.getItem('usuario_logueado');
    if (!usuarioLogueado) {
        // Si no hay usuario logueado, redirigir a login
        window.location.href = 'login.html';
        return false;
    }
    return true;k
}

// Ejecutar verificación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    if (!verificarSesion()) {
        return;
    }
    
    inicializarApp();
});

function inicializarApp() {
    const form = document.getElementById('asistenciaForm');
    const tablaCuerpo = document.getElementById('tablaCuerpo');
    const filtroEstado = document.getElementById('filtroEstado');
    const mensajeVacio = document.getElementById('mensajeVacio');
    
    if (!form || !tablaCuerpo || !filtroEstado || !mensajeVacio) {
        console.error('Elementos del DOM no encontrados');
        return;
    }

    function renderizarTabla(filtro = 'Todos') {
        tablaCuerpo.innerHTML = '';

        const registrosFiltrados = filtro === 'Todos'
            ? registros
            : registros.filter((r) => r.estado === filtro);

        if (registrosFiltrados.length === 0) {
            mensajeVacio.style.display = 'block';
        } else {
            mensajeVacio.style.display = 'none';
        }

        registrosFiltrados.forEach((reg) => {
            let colorBadge = 'badge-presente';
            if (reg.estado === 'Presente') colorBadge = 'badge-presente';
            else if (reg.estado === 'Ausente') colorBadge = 'badge-ausente';
            else if (reg.estado === 'Tarde') colorBadge = 'badge-tarde';

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td class="celda-datos">${reg.nombre}</td>
                <td class="celda-datos">${reg.fecha}</td>
                <td class="celda-datos">
                    <span class="badge-estado ${colorBadge}">
                        ${reg.estado}
                    </span>
                </td>
                <td class="celda-datos celda-accion">
                    <button type="button" class="btn-eliminar" onclick="eliminarRegistro(${reg.id})">
                        Eliminar
                    </button>
                </td>
            `;
            tablaCuerpo.appendChild(fila);
        });
    }

    // Validación de nombre
    function nombreValido(nombre) {
        // Solo letras, espacios, tildes, apóstrofes y máximo 40 caracteres
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ' ]{2,40}$/.test(nombre.trim())) return false;
        // validar que el usuario no use más de 3 repeticiones seguidas de la misma letra
        if (/(.)\1{3,}/.test(nombre)) return false;
        // validar que las cadenas tipo "jajajaja" o muchas vocales/consonantes seguidas
        if (/([aeiouaeiou]{4,}|[bcdfghjklmnpqrstvwxyz]{5,})/i.test(nombre)) return false;
        return true;
    }

    // Mostrar mensaje de error debajo del nombre
    function mostrarErrorNombre(msg) {
        let error = document.getElementById('error-nombre');
        if (!error) {
            error = document.createElement('div');
            error.id = 'error-nombre';
            error.className = 'mensaje-error';
            document.getElementById('nombre').parentNode.appendChild(error);
        }
        error.textContent = msg;
    }

    function limpiarErrorNombre() {
        const error = document.getElementById('error-nombre');
        if (error) error.remove();
    }

    // Limpiar error automáticamente al cambiar la fecha
    const inputFecha = document.getElementById('fecha');
    if (inputFecha) {
        inputFecha.addEventListener('input', () => {
            limpiarErrorNombre();
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const fecha = document.getElementById('fecha').value;
        
        // Validar nombre
        if (!nombreValido(nombre)) {
            mostrarErrorNombre('Por favor ingresa un nombre válido (sin repeticiones, solo letras, máx. 40 caracteres).');
            return;
        }
        
        // Validar fecha: solo permitira el dia y fecha actual 
        const hoy = new Date();
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, '0');
        const dd = String(hoy.getDate()).padStart(2, '0');
        const hoyStr = `${yyyy}-${mm}-${dd}`;
        if (fecha !== hoyStr) {
            mostrarErrorNombre('La fecha ingresada no coincide con la fecha actual.');
            return;
        }
        
        // Validar duplicado del mismo nombre y fecha
        const yaRegistrado = registros.some(r => r.nombre.trim().toLowerCase() === nombre.trim().toLowerCase() && r.fecha === fecha);
        if (yaRegistrado) {
            mostrarErrorNombre('Este estudiante ya fue registrado hoy. No se permiten duplicados el mismo día.');
            return;
        }
        
        limpiarErrorNombre();
        const nuevoRegistro = {
            id: Date.now(),
            nombre: nombre,
            fecha: fecha,
            estado: document.getElementById('estado').value
        };
        registros.push(nuevoRegistro);
        guardarYActualizar();
        form.reset();
    });

    window.eliminarRegistro = (id) => {
        registros = registros.filter(r => r.id !== id);
        guardarYActualizar();
    };

    function guardarYActualizar() {
        localStorage.setItem('asistencias_scrum', JSON.stringify(registros));
        renderizarTabla(filtroEstado.value);
    }

    filtroEstado.addEventListener('change', (e) => {
        renderizarTabla(e.target.value);
    });

    // Establecer fecha actual
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fecha').value = hoy;
    renderizarTabla();

    // Botón dinámico Login/Logout
    const btnLoginLogout = document.getElementById('loginLogout');
    if (btnLoginLogout) {
        btnLoginLogout.textContent = 'Cerrar Sesión';
        btnLoginLogout.addEventListener('click', (e) => {
            e.preventDefault();
            // Limpiar localStorage
            localStorage.removeItem('asistencias_scrum');
            localStorage.removeItem('usuario_logueado');
            // Redirigir a principal
            window.location.href = '../index.html';
        });
    }
}
