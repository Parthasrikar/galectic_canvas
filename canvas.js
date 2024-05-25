var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



var colorArray = [
    "#F57D1F",
    "#F6FDC3",
    "#F8F4EC",
    "#FF8080",
    "#C0EEF2"
];


window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init()
})

let mousedown = false;
window.addEventListener('mousedown', function() {
    mousedown = true;
})

window.addEventListener('mouseup', function() {
    mousedown = false;
})

class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI,false);
        c.shadowColor = this.color;
        c.shadowBlur = 10;
        c.fill();
        c.closePath();
    }
    update() {
        this.draw()
    }

}

let particles;
function init() {
    particles = [];

    for(var i=0; i<400; i++) {
        const canvaswidth = window.innerWidth + 500;
        const canvasheight = canvas.height + 500;

        const x = (Math.random() * canvaswidth) - canvaswidth/2;
        const y = (Math.random() * canvasheight) - canvasheight/2;
        const radius = Math.random() * 2;
        const color = colorArray[Math.floor(Math.random() * colorArray.length)];
        particles.push(new Particle(x,y,radius,color));
    }
}


let radians = 0
let alpha = 1
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = `rgba(15, 15, 15, ${alpha})`
    c.fillRect(0,0,canvas.width,canvas.height);

    c.save();
    c.translate(canvas.width/2, canvas.height/2);
    c.rotate(radians)
    particles.forEach(element => {
        element.update();
    });
    c.restore();
    radians += 0.001;

    if(mousedown && alpha >=0.1 ) {
        alpha -= 0.07;
    }
    else if(!mousedown && alpha < 1) {
        alpha += 0.01;
    }
}

init();
animate();