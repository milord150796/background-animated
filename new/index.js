const background = document.getElementById("background");
const ctx = background.getContext("2d");
background.width = window.innerWidth;
background.height = window.innerHeight;

let particlesArray;
//create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    //method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "white";
        ctx.fill();
    }
    //check particle position, check mouse position
    update() {
        //check if particle is still winthin background
        if (this.x > background.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > background.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}
//create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (background.height * background.width) / 20000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 5 + 1;
        let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
        let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
        let directionX = Math.random() * 5 - 2.5;
        let directionY = Math.random() * 5 - 2.5;
        let color = "#6ff6ff";
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}
//animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance =
                (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x) +
                (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y);
            if (distance < (background.width / 7) * (background.height / 7)) {
                opacityValue = 1 - distance / 15000;
                ctx.strokeStyle = "rgba(111, 246, 255, " + opacityValue + ")";
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.5; //opacity 0.5
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}
window.addEventListener("resize", function () {
    background.width = this.innerWidth;
    background.height = this.innerHeight;
    init();
});

init();
animate();