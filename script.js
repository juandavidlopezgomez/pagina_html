document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-actividad');
    const nombreActividadInput = document.getElementById('nombre-actividad');
    const notaActividadInput = document.getElementById('nota-actividad');
    const tablaActividades = document.querySelector('#tabla-actividades tbody');
    const promedioContainer = document.getElementById('promedio');
    let actividades = [];
    let idCounter = 1;

    // Agregar actividad
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const nombreActividad = nombreActividadInput.value;
        const notaActividad = parseFloat(notaActividadInput.value);

        // Validar que la nota sea un número entre 0 y 5
        if (isNaN(notaActividad) || notaActividad < 0 || notaActividad > 5) {
            alert('La nota debe ser un número entre 0 y 5.');
            return;
        }

        // Crear un objeto actividad
        const actividad = {
            id: idCounter++,
            nombre: nombreActividad,
            nota: notaActividad,
            aprobado: notaActividad >= 3 ? 'Aprobado' : 'Reprobado'
        };

        // Agregar la actividad al array
        actividades.push(actividad);

        // Renderizar la tabla
        renderizarTabla();

       
        nombreActividadInput.value = '';
        notaActividadInput.value = '';
    });

   
    function renderizarTabla() {
        tablaActividades.innerHTML = '';

        actividades.forEach(actividad => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${actividad.id}</td>
                <td>${actividad.nombre}</td>
                <td>${actividad.nota}</td>
                <td>${actividad.aprobado}</td>
                <td>
                    <button class="editar" onclick="editarActividad(${actividad.id})">Editar</button>
                    <button class="eliminar" onclick="eliminarActividad(${actividad.id})">Eliminar</button>
                </td>
            `;

            tablaActividades.appendChild(fila);
        });

        // Calcular y mostrar el promedio
        calcularPromedio();
    }

    // eliminar una actividad
    window.eliminarActividad = function(id) {
        const confirmacion = confirm('¿Deseas eliminar esta actividad?');
        if (confirmacion) {
            actividades = actividades.filter(actividad => actividad.id !== id);
            renderizarTabla();
        }
    }

    // editar una actividad
    window.editarActividad = function(id) {
        const actividad = actividades.find(actividad => actividad.id === id);
        if (actividad) {
            nombreActividadInput.value = actividad.nombre;
            notaActividadInput.value = actividad.nota;
            
            // Eliminar la actividad original
            actividades = actividades.filter(actividad => actividad.id !== id);
            renderizarTabla();
        }
    }

    // Calcular el promedio de las notas
    function calcularPromedio() {
        if (actividades.length === 0) {
            promedioContainer.textContent = '0';
            return;
        }

        const suma = actividades.reduce((total, actividad) => total + actividad.nota, 0);
        const promedio = (suma / actividades.length).toFixed(2);
        promedioContainer.textContent = promedio;
    }
});
