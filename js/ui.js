// js/ui.js

// Función para renderizar la lista de tareas en el DOM
export function renderTasks(tasks, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Limpiar la lista antes de volver a pintar
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        // Estructura HTML de cada tarea
        li.innerHTML = `
            <div>
                <span class="priority-badge p-${task.priority.toLowerCase()}">${task.priority}</span>
                <span>${task.title}</span>
            </div>
            <div class="task-actions">
                <!-- Guardamos el ID en un atributo de datos (data-id) -->
                <button class="btn-toggle" data-id="${task.id}">✔</button>
                <button class="btn-delete" data-id="${task.id}">🗑</button>
            </div>
        `;
        container.appendChild(li);
    });
}