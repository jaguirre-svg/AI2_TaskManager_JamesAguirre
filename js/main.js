// js/main.js
import { loadInitialTasks } from './api.js';
import { saveTasks } from './storage.js';
import { renderTasks } from './ui.js';

let currentTasks = [];

// Elementos del DOM para filtros
const searchInput = document.getElementById('search-input');
const filterStatus = document.getElementById('filter-status');
const sortPriority = document.getElementById('sort-priority');

// Función que agrupa Filtros, Búsqueda y Ordenamiento
function applyFiltersAndRender() {
    let filtered = [...currentTasks];

    // 1. Búsqueda dinámica en tiempo real (includes y toLowerCase)
    const searchText = searchInput.value.toLowerCase();
    if (searchText) {
        filtered = filtered.filter(task => task.title.toLowerCase().includes(searchText));
    }

    // 2. Filtrar por estado
    const status = filterStatus.value;
    if (status === 'pending') {
        filtered = filtered.filter(task => !task.completed);
    } else if (status === 'completed') {
        filtered = filtered.filter(task => task.completed);
    }

    // 3. Ordenamiento (sort)
    const sort = sortPriority.value;
    if (sort === 'priority') {
        const priorityWeight = { 'Alta': 3, 'Media': 2, 'Baja': 1 };
        filtered.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
    } else {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date)); // Fecha
    }

    // Renderizamos la lista filtrada, pero enviamos 'currentTasks' para calcular las métricas totales
    renderTasks(filtered, 'task-list', currentTasks);
}

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
    currentTasks = await loadInitialTasks();
    applyFiltersAndRender();
});

// Eventos (addEventListener) para reaccionar a los filtros al instante
searchInput.addEventListener('input', applyFiltersAndRender);
filterStatus.addEventListener('change', applyFiltersAndRender);
sortPriority.addEventListener('change', applyFiltersAndRender);

// CREATE: Agregar nueva tarea
document.getElementById('add-task-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('task-title');
    const priorityInput = document.getElementById('task-priority');
    const title = titleInput.value.trim();
    
    if (title === "") {
        alert("Error: El título de la tarea no puede estar vacío."); 
        return;
    }

    const newTask = {
        id: Date.now(),
        title: title,
        completed: false,
        priority: priorityInput.value,
        date: new Date().toISOString()
    };

    currentTasks.push(newTask);
    saveTasks(currentTasks);
    applyFiltersAndRender(); 
    titleInput.value = '';
});

// UPDATE y DELETE
document.getElementById('task-list').addEventListener('click', (e) => {
    const target = e.target;
    const id = parseFloat(target.getAttribute('data-id'));
    if (!id) return;

    if (target.classList.contains('btn-delete')) {
        currentTasks = currentTasks.filter(task => task.id !== id);
    } else if (target.classList.contains('btn-toggle')) {
        currentTasks = currentTasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
    }

    saveTasks(currentTasks);
    applyFiltersAndRender();
});