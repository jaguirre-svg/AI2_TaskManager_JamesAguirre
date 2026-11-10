// js/ui.js

export function renderTasks(tasksToRender, containerId, allTasks) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Limpiar la lista
    
    tasksToRender.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div>
                <span class="priority-badge p-${task.priority.toLowerCase()}">${task.priority}</span>
                <span>${task.title}</span>
            </div>
            <div class="task-actions">
                <button class="btn-toggle" data-id="${task.id}">✔</button>
                <button class="btn-delete" data-id="${task.id}">🗑</button>
            </div>
        `;
        container.appendChild(li);
    });

    // Actualización reactiva del Dashboard de métricas
    if(allTasks) {
        document.getElementById('total-tasks').innerText = allTasks.length;
        document.getElementById('pending-tasks').innerText = allTasks.filter(t => !t.completed).length;
        document.getElementById('completed-tasks').innerText = allTasks.filter(t => t.completed).length;
    }
}