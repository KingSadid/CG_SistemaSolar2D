const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');

// State variables (x, y, radius, velocities, and dynamic radii for squash effect)
let x = cvs.width / 2, y = cvs.height / 2, r = 40;
let dx = 6, dy = 5, rx = r, ry = r;

(function animationLoop() {
    // 1. Clear screen & update position
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    x += dx; 
    y += dy;

    // 2. Rubber effect recovery (spring back to original radius)
    rx += (r - rx) * 0.15;
    ry += (r - ry) * 0.15;

    // 3. Wall collisions & Rubber squash trigger
    if (x + r > cvs.width || x - r < 0) {
        dx = -dx; x += dx; // Reverse direction and prevent sticking
        rx = r * 0.5; ry = r * 1.5; // Squash X, Stretch Y
    }
    if (y + r > cvs.height || y - r < 0) {
        dy = -dy; y += dy; // Reverse direction and prevent sticking
        rx = r * 1.5; ry = r * 0.5; // Stretch X, Squash Y
    }

    // 4. Draw the hollow red sphere
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    // 5. Next frame
    requestAnimationFrame(animationLoop);
})();