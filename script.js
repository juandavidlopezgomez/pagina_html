
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-actividad');
    const nombreActividadInput = document.getElementById('nombre-actividad');
    const notaActividadInput = document.getElementById('nota-actividad');
    const tablaActividades = document.querySelector('#tabla-actividades tbody');

   
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

        
        const nombreActividad = nombreActividadInput.value;
        const notaActividad = notaActividadInput.value;

        
        const nuevaFila = document.createElement('tr');

        
        const celdaActividad = document.createElement('td');
        celdaActividad.textContent = nombreActividad;

        const celdaNota = document.createElement('td');
        celdaNota.textContent = notaActividad;

        
        nuevaFila.appendChild(celdaActividad);
        nuevaFila.appendChild(celdaNota);

   
        tablaActividades.appendChild(nuevaFila);

       
        nombreActividadInput.value = '';
        notaActividadInput.value = '';
    });
});
