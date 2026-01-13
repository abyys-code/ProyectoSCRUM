//  VARIABLES GLOBALES 
let registros = [];

// ELEMENTOS DEL DOM 
const formAsistencia = document.getElementById('form-asistencia');
const inputNombre = document.getElementById('nombre');
const inputFecha = document.getElementById('fecha');
const inputHoraEntrada = document.getElementById('hora-entrada');
const inputHoraSalida = document.getElementById('hora-salida');
const inputTema = document.getElementById('tema');

const docenteInput = document.getElementById('docente');
const asignaturaInput = document.getElementById('asignatura');
const cursoInput = document.getElementById('curso');
const paraleloInput = document.getElementById('paralelo');
const especialidadInput = document.getElementById('especialidad');
const guardarDocenteBtn = document.getElementById('guardar-docente');
const actualizarDocenteBtn = document.getElementById('actualizar-docente');

const tbodyRegistros = document.getElementById('tbody-registros');
const tablaRegistros = document.getElementById('tabla-registros');
const tablaEmpty = document.getElementById('tabla-empty');

const buscarNombre = document.getElementById('buscar-nombre');
const statTotal = document.getElementById('stat-total');

// INICIALIZACION 
document.addEventListener('DOMContentLoaded', () => {
    setearFechaActual();
    cargarRegistrosDelStorage();
    cargarDocenteDelStorage();
    renderizarTabla();
});

// SETEAR FECHA ACTUAL 
function setearFechaActual() {
    const hoy = new Date();
    inputFecha.value = hoy.toISOString().split('T')[0];
}

//  MANEJO DEL FORMULARIO
formAsistencia.addEventListener('submit', (e) => {
    e.preventDefault();

    // Crear objeto de registro
    const registro = {
        id: Date.now(),
        nombre: inputNombre.value.trim(),
        fecha: inputFecha.value,
        tema: inputTema.value.trim(),
        horaEntrada: inputHoraEntrada.value,
        horaSalida: inputHoraSalida.value
    };

    // Agregar a array y guardar
    registros.push(registro);
    guardarRegistrosEnStorage();

    // Limpiar formulario
    formAsistencia.reset();
    setearFechaActual();

    // Actualizar tabla
    renderizarTabla();

    // Feedback visual
    mostrarNotificacion('Registro guardado correctamente');
});

// CARGAR REGISTROS DEL STORAGE 
function cargarRegistrosDelStorage() {
    const datosGuardados = localStorage.getItem('registrosAsistencia');
    if (datosGuardados) {
        registros = JSON.parse(datosGuardados);
    }
}

// GUARDAR REGISTROS EN STORAGE 
function guardarRegistrosEnStorage() {
    localStorage.setItem('registrosAsistencia', JSON.stringify(registros));
}

//  RENDERIZAR TABLA 
function renderizarTabla() {
    const tablaContainer = document.querySelector('.tabla-wrapper');
    tablaContainer.innerHTML = '';

    // Aplicar filtros
    const registrosFiltrados = aplicarFiltros();

    if (registrosFiltrados.length === 0) {
        tablaContainer.innerHTML = '<div id="tabla-empty" style="padding: 2rem; text-align: center; color: #999;">No hay registros aún</div>';
        actualizarEstadisticas();
        return;
    }

    // Agrupar por fecha
    const registrosPorFecha = agruparPorFecha(registrosFiltrados);

    // Crear secciones por fecha
    for (const fecha in registrosPorFecha) {
        const seccion = document.createElement('div');
        seccion.className = 'seccion-fecha';

        const titulo = document.createElement('h4');
        titulo.className = 'titulo-seccion-fecha';
        titulo.textContent = formatearFecha(fecha);

        const tabla = document.createElement('table');
        tabla.className = 'tabla-asistencia';

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>N°</th>
                <th>NOMBRES Y APELLIDOS</th>
                <th>TEMA</th>
                <th>HORA INGRESO</th>
                <th>HORA SALIDA</th>
                <th>ACCIÓN</th>
            </tr>
        `;

        const tbody = document.createElement('tbody');
        registrosPorFecha[fecha].forEach((registro, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${index + 1}</td>
                <td><strong>${registro.nombre}</strong></td>
                <td>${registro.tema || '-'}</td>
                <td>${registro.horaEntrada || '-'}</td>
                <td>${registro.horaSalida || '-'}</td>
                <td>
                    <button class="btn-eliminar" onclick="eliminarRegistro(${registro.id})">
                        ELIMINAR
                    </button>
                </td>
            `;
            tbody.appendChild(fila);
        });

        tabla.appendChild(thead);
        tabla.appendChild(tbody);

        seccion.appendChild(titulo);
        seccion.appendChild(tabla);

        tablaContainer.appendChild(seccion);
    }

    actualizarEstadisticas();
}

// AGRUPAR REGISTROS POR FECHA 
function agruparPorFecha(registros) {
    const agrupados = {};

    registros.forEach(registro => {
        if (!agrupados[registro.fecha]) {
            agrupados[registro.fecha] = [];
        }
        agrupados[registro.fecha].push(registro);
    });

    // Ordenar fechas de forma descendente (más reciente primero)
    const ordenado = {};
    Object.keys(agrupados).sort((a, b) => new Date(b) - new Date(a)).forEach(fecha => {
        ordenado[fecha] = agrupados[fecha];
    });

    return ordenado;
}

// APLICAR FILTROS 
function aplicarFiltros() {
    let filtrados = [...registros];

    // Filtro por nombre
    if (buscarNombre.value) {
        const busqueda = buscarNombre.value.toLowerCase();
        filtrados = filtrados.filter(r =>
            r.nombre.toLowerCase().includes(busqueda)
        );
    }

    return filtrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

// ELIMINAR REGISTRO 
function eliminarRegistro(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
        registros = registros.filter(r => r.id !== id);
        guardarRegistrosEnStorage();
        renderizarTabla();
        mostrarNotificacion('Registro eliminado');
    }
}

// LISTENERS PARA FILTROS 
buscarNombre.addEventListener('input', renderizarTabla);

// GUARDAR DOCENTE 
guardarDocenteBtn.addEventListener('click', () => {
    const datosDocente = {
        docente: docenteInput.value.trim(),
        asignatura: asignaturaInput.value.trim(),
        curso: cursoInput.value.trim(),
        paralelo: paraleloInput.value.trim(),
        especialidad: especialidadInput.value.trim()
    };
    localStorage.setItem('docenteInfo', JSON.stringify(datosDocente));
    mostrarNotificacion('Información del docente guardada correctamente');
});

// ACTUALIZAR DOCENTE 
actualizarDocenteBtn.addEventListener('click', () => {
    const datosDocente = {
        docente: docenteInput.value.trim(),
        asignatura: asignaturaInput.value.trim(),
        curso: cursoInput.value.trim(),
        paralelo: paraleloInput.value.trim(),
        especialidad: especialidadInput.value.trim()
    };
    localStorage.setItem('docenteInfo', JSON.stringify(datosDocente));
    mostrarNotificacion('Información del docente actualizada correctamente');
});

// CARGAR DOCENTE DEL STORAGE 
function cargarDocenteDelStorage() {
    const datosGuardados = localStorage.getItem('docenteInfo');
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        docenteInput.value = datos.docente || '';
        asignaturaInput.value = datos.asignatura || '';
        cursoInput.value = datos.curso || '';
        paraleloInput.value = datos.paralelo || '';
        especialidadInput.value = datos.especialidad || '';
    }
}

// ACTUALIZAR ESTADISTICAS 
function actualizarEstadisticas() {
    const registrosFiltrados = aplicarFiltros();
    statTotal.textContent = registrosFiltrados.length;
}

//  UTILIDADES 
function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr + 'T00:00:00');
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
}

function mostrarNotificacion(mensaje) {
    console.log('✓ ' + mensaje);
}
