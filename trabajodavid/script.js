document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const formulario = document.getElementById('formulario-actividad');
    const nombreActividadInput = document.getElementById('nombre-actividad');
    const notaActividadInput = document.getElementById('nota-actividad');
    const tablaActividades = document.querySelector('#tabla-actividades tbody');
    const promedioContainer = document.getElementById('promedio');
    const estadoEstudiante = document.getElementById('estado');
    const modalEliminar = document.getElementById('modal-eliminar');

    let actividades = [];
    let idCounter = 1;
    let idToDelete = null;

    // Evento para agregar una nueva actividad
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const nombreActividad = nombreActividadInput.value;
        const notaActividad = parseFloat(notaActividadInput.value);

        if (isNaN(notaActividad) || notaActividad < 0 || notaActividad > 5) {
            alert('La nota debe ser un número entre 0 y 5.');
            return;
        }

        const actividad = {
            id: idCounter++,
            nombre: nombreActividad,
            nota: notaActividad
        };

        actividades.push(actividad);
        renderizarTabla();

        nombreActividadInput.value = '';
        notaActividadInput.value = '';
    });

    // Función para renderizar la tabla de actividades
    function renderizarTabla() {
        tablaActividades.innerHTML = '';

        actividades.forEach(actividad => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${actividad.id}</td>
                <td>${actividad.nombre}</td>
                <td>${actividad.nota}</td>
                <td>
                    <button class="editar" onclick="editarActividad(${actividad.id})">Editar</button>
                    <button class="eliminar" onclick="mostrarModal(${actividad.id})">Eliminar</button>
                </td>
            `;

            tablaActividades.appendChild(fila);
        });

        calcularPromedio();
    }

    // Mostrar modal de confirmación para eliminar
    window.mostrarModal = function(id) {
        idToDelete = id;
        modalEliminar.style.display = 'flex';
    }

    // Confirmar eliminación
    document.getElementById('confirmar-eliminar').addEventListener('click', function() {
        eliminarActividad(idToDelete);
        modalEliminar.style.display = 'none';
    });

    // Cancelar eliminación
    document.getElementById('cancelar-eliminar').addEventListener('click', function() {
        modalEliminar.style.display = 'none';
        idToDelete = null;
    });

    // Función para eliminar una actividad
    function eliminarActividad(id) {
        actividades = actividades.filter(actividad => actividad.id !== id);
        renderizarTabla();
    }

    // Función para editar una actividad
    window.editarActividad = function(id) {
        const actividad = actividades.find(actividad => actividad.id === id);
        if (actividad) {
            nombreActividadInput.value = actividad.nombre;
            notaActividadInput.value = actividad.nota;

            actividades = actividades.filter(actividad => actividad.id !== id);
            renderizarTabla();
        }
    };

    // Función para calcular el promedio y actualizar el estado
    function calcularPromedio() {
        if (actividades.length === 0) {
            promedioContainer.textContent = '0';
            estadoEstudiante.textContent = 'Reprobado';
            document.querySelector('.estado-box').style.backgroundColor = '#e74c3c';
            return;
        }

        const suma = actividades.reduce((total, actividad) => total + actividad.nota, 0);
        const promedio = (suma / actividades.length).toFixed(2);
        promedioContainer.textContent = promedio;

        if (promedio >= 3) {
            estadoEstudiante.textContent = 'Aprobado';
            document.querySelector('.estado-box').style.backgroundColor = '#2ecc71';
        } else {
            estadoEstudiante.textContent = 'Reprobado';
            document.querySelector('.estado-box').style.backgroundColor = '#e74c3c';
        }
    }
});