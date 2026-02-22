const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');

// State variables
let x = cvs.width / 2, y = cvs.height / 2, r = 40;
let dx = 6, dy = 5, rx = r, ry = r;

(function animationLoop() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    
    // 1. Update position
    x += dx; 
    y += dy;

    // 2. Faster recovery for realistic stiff rubber (0.25 instead of 0.15)
    rx += (r - rx) * 0.25;
    ry += (r - ry) * 0.25;

    // 3. Wall collisions & squash trigger 
    if (x + r > cvs.width || x - r < 0) {
        dx = -dx; x += dx; 
        rx = r * 0.8; ry = r * 1.2; // Golpeo con la pared
    }
    if (y + r > cvs.height || y - r < 0) {
        dy = -dy; y += dy; 
        rx = r * 1.2; ry = r * 0.8; // Golpeo con la pared 
    }

    // 4. Dibujar esfera en el canvas
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    requestAnimationFrame(animationLoop);
})();