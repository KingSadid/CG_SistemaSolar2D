const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');

// Configuración inicial
const centerX = cvs.width / 2;
const centerY = cvs.height / 2;
const radius = 40;

(function renderLoop() {
    // 1. Limpieza del frame anterior
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    // 2. Configuración del trazo
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;

    // 3. Dibujo (Usamos arc para círculos perfectos)
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // 4. Ciclo de animación
    requestAnimationFrame(renderLoop);
})();