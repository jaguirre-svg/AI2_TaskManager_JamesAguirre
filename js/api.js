// js/api.js
import { getTasks, saveTasks } from './storage.js';

export async function loadInitialTasks() {
    // 1. Verificamos si ya hay tareas guardadas localmente
    const localTasks = getTasks();
    
    // Si ya hay tareas, no consumimos la API. Así funciona offline.
    if (localTasks.length > 0) {
        return localTasks; 
    }

    // 2. Si el localStorage está vacío, traemos datos de la API
    try {
        // Consumo asíncrono de API REST
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5'); // Traemos solo 5 para probar
        
        if (!response.ok) throw new Error('Falló la respuesta de la red');
        
        const apiData = await response.json();
        
        // Adaptamos los datos de la API a nuestra estructura
        const initialTasks = apiData.map(task => ({
            id: Date.now() + Math.random(), // Generamos ID único
            title: task.title,
            completed: task.completed,
            priority: 'Media', // Prioridad por defecto
            date: new Date().toISOString()
        }));

        // Guardamos en localStorage usando nuestro módulo
        saveTasks(initialTasks);
        return initialTasks;

    } catch (error) {
        // Manejo de errores con notificación amigable al usuario
        console.error("Error al cargar la API:", error);
        alert("Aviso: No se pudieron cargar las tareas de prueba desde internet. Puedes seguir trabajando en modo Offline.");
        return [];
    }
}