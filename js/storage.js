// js/storage.js

const STORAGE_KEY = 'taskManager_data';

// Función para obtener las tareas del localStorage
export function getTasks() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Función para guardar las tareas en el localStorage
export function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}