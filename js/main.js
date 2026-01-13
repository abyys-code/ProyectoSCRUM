// Manejo de asistencias en reuniones Scrum
let registros = JSON.parse(localStorage.getItem('asistencias_scrum')) || [];

const form = document.getElementById('asistenciaForm');
const tablaCuerpo = document.getElementById('tablaCuerpo');
const filtroEstado = document.getElementById('filtroEstado');
const mensajeVacio = document.getElementById('mensajeVacio');

function renderizarTabla(filtro = 'Todos') {
    tablaCuerpo.innerHTML = '';
    const registrosFiltrados = filtro === 'Todos' ? registros : registros.filter(r => r.estado === filtro);
    if (registrosFiltrados.length === 0) {
        mensajeVacio.classList.remove('hidden');
    } else {
        mensajeVacio.classList.add('hidden');
    }
    registrosFiltrados.forEach((reg) => {
        let colorBadge = '';
        if(reg.estado === 'Presente') colorBadge = 'bg-green-100 text-green-800';
        else if(reg.estado === 'Ausente') colorBadge = 'bg-red-100 text-red-800';
        else colorBadge = 'bg-yellow-100 text-yellow-800';
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${reg.nombre}</td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">${reg.fecha}</td>
            <td class="px-4 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorBadge}">
                    ${reg.estado}
                </span>
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-center text-sm">
                <button onclick="eliminarRegistro(${reg.id})" class="text-red-600 hover:text-red-900 font-bold">
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
    // validar que el usuario mo use más de 3 repeticiones seguidas de la misma letra
    if (/(.)\1{3,}/.test(nombre)) return false;
    // validar que las cadenas tipo "jajajaja" o muchas vocales/consonantes seguidas
    if (/([jha]{4,})/i.test(nombre)) return false;
    return true;
}

// Mostrar mensaje de error debajo del input nombre
function mostrarErrorNombre(msg) {
    let error = document.getElementById('error-nombre');
    if (!error) {
        error = document.createElement('div');
        error.id = 'error-nombre';
        error.className = 'text-red-600 text-sm mt-1';
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
    // Validar fecha: solo permitir la fecha del día actual
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    const hoyStr = `${yyyy}-${mm}-${dd}`;
    if (fecha !== hoyStr) {
        mostrarErrorNombre('La fecha ingresada no coincide con la fecha actual.');
        return;
    }
    // Validar duplicado: mismo nombre y fecha
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

document.addEventListener('DOMContentLoaded', () => {
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fecha').value = hoy;
    renderizarTabla();
});
