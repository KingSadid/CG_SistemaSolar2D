/**
 * CONFIGURACIÓN
 */
const SYSTEM_CONFIG = {
    sun: {
        radius: 30, 
        color: '#FFD700', 
        glowColor: 'rgba(255, 215, 0, 0.4)'
    },
    planets: [
        { name: "Mercurio", r: 4,  dist: 50,  speed: 0.04,  color: '#A9A9A9' },
        { name: "Venus",    r: 7,  dist: 80,  speed: 0.03,  color: '#FFA500' },
        { name: "Tierra",   r: 8,  dist: 110, speed: 0.02,  color: '#00BFFF' },
        { name: "Marte",    r: 6,  dist: 140, speed: 0.015, color: '#FF4500' },
        { name: "Júpiter",  r: 18, dist: 200, speed: 0.008, color: '#DEB887' },
        { name: "Saturno",  r: 15, dist: 260, speed: 0.005, color: '#F4A460' },
        { name: "Urano",    r: 12, dist: 310, speed: 0.003, color: '#AFEEEE' }, 
        { name: "Neptuno",  r: 11, dist: 360, speed: 0.002, color: '#4169E1' } 
    ]
};

const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');


class Planet {
    constructor(data) {
        this.radius = data.r;
        this.distance = data.dist;
        this.speed = data.speed;
        this.color = data.color;
        this.angle = Math.random() * Math.PI * 2; 
    }

    update() {
        this.angle += this.speed;
    }

    draw(ctx, centerX, centerY) {
        const x = centerX + Math.cos(this.angle) * this.distance;
        const y = centerY + Math.sin(this.angle) * this.distance;

        // Órbita
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'; 
        ctx.lineWidth = 1;
        ctx.arc(centerX, centerY, this.distance, 0, Math.PI * 2);
        ctx.stroke();

        // Planeta
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(x, y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}



const SolarSystem = {
    planets: [],
    width: 0,
    height: 0,

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.planets = SYSTEM_CONFIG.planets.map(data => new Planet(data));
        this.loop();
    },

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        cvs.width = this.width;
        cvs.height = this.height;
    },

    drawSun(cx, cy) {
        ctx.shadowBlur = 35; 
        ctx.shadowColor = SYSTEM_CONFIG.sun.glowColor;
        
        ctx.beginPath();
        ctx.fillStyle = SYSTEM_CONFIG.sun.color;
        ctx.arc(cx, cy, SYSTEM_CONFIG.sun.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
    },

    loop() {
        ctx.fillStyle = 'rgba(10, 10, 15, 1)'; 
        ctx.fillRect(0, 0, this.width, this.height);

        const centerX = this.width / 2;
        const centerY = this.height / 2;

        this.drawSun(centerX, centerY);

        this.planets.forEach(planet => {
            planet.update();
            planet.draw(ctx, centerX, centerY);
        });

        requestAnimationFrame(() => this.loop());
    }
};

SolarSystem.init();