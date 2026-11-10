// js/main.js
import { loadInitialTasks } from './api.js';
import { saveTasks } from './storage.js';
import { renderTasks } from './ui.js';

let currentTasks = [];

// READ: Inicialización de la app al cargar la ventana
document.addEventListener('DOMContentLoaded', async () => {
    currentTasks = await loadInitialTasks();
    renderTasks(currentTasks, 'task-list');
});

// CREATE: Agregar nueva tarea
const formBtn = document.getElementById('add-task-btn');
formBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    
    const titleInput = document.getElementById('task-title');
    const priorityInput = document.getElementById('task-priority');
    const title = titleInput.value.trim();
    
    // Validación estricta solicitada en la rúbrica
    if (title === "") {
        alert("Error: El título de la tarea no puede estar vacío."); 
        return;
    }

    const newTask = {
        id: Date.now(), // ID único basado en la fecha actual
        title: title,
        completed: false,
        priority: priorityInput.value,
        date: new Date().toISOString()
    };

    currentTasks.push(newTask);
    saveTasks(currentTasks);
    renderTasks(currentTasks, 'task-list');
    
    titleInput.value = ''; // Limpiar el campo de texto
});

// UPDATE y DELETE: Uso de delegación de eventos en la lista
const taskList = document.getElementById('task-list');
taskList.addEventListener('click', (e) => {
    const target = e.target;
    // Extraemos el ID del botón que fue clickeado
    const id = parseFloat(target.getAttribute('data-id'));

    if (!id) return; // Si no se clickeó un botón, ignoramos

    if (target.classList.contains('btn-delete')) {
        // DELETE: Filtramos la tarea eliminada
        currentTasks = currentTasks.filter(task => task.id !== id);
    } else if (target.classList.contains('btn-toggle')) {
        // UPDATE: Cambiamos el estado de completado
        currentTasks = currentTasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
    }

    // Guardamos en local y volvemos a pintar
    saveTasks(currentTasks);
    renderTasks(currentTasks, 'task-list');
});