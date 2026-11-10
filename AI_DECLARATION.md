# Declaración de Uso de IA

**1. Herramientas utilizadas y momentos:**
Se utilizó Google Gemini como asistente de desarrollo durante todo el ciclo del proyecto para: estructurar la arquitectura modular en ES6, generar la lógica de consumo de la API JSONPlaceholder, configurar la persistencia en `localStorage` y optimizar las funciones de filtrado de arreglos.

**2. Prompts clave utilizados:**
* **Prompt 1:** "Hola, de la misma forma que hicimos la actividad 1 Y 3, haremos esta actividad que es la 2, paso a paso... Evaluar el dominio práctico de JavaScript Vanilla (ES6+), manipulación del DOM, consumo asíncrono..." (Usado para estructurar la planificación y los 5 commits).
* **Prompt 2:** "al hacer el paso 2, solo veo eso, hago el paso 4? de intentar crear una nueva tarea?" (Usado para diagnosticar y resolver el problema de carga de los módulos de JS).

**3. Ajustes manuales requeridos:**
* Se realizó un ajuste manual en el entorno de ejecución, moviendo la carpeta del proyecto al servidor local XAMPP (`htdocs`) en lugar de abrir el archivo HTML directamente. Esto fue necesario para evitar el bloqueo por políticas de seguridad CORS del navegador al utilizar la arquitectura de módulos nativos de ES6 (`import`/`export`).