// initial data
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

let canva = document.querySelector('#tela');
let context = canva.getContext('2d');

//events
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});
canva.addEventListener('mousedown', mouseDownEvent);
canva.addEventListener('mousemove', mouseMoveEvent);
canva.addEventListener('mouseup', mouseUpEvent);

document.querySelector('.clear').addEventListener('click', clearCanva);


//functions
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - canva.offsetLeft;
    mouseY = e.pageY - canva.offsetTop;
}

function mouseMoveEvent(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent() {
    canDraw = false;
}

function draw(x, y) {
    let pointX = x - canva.offsetLeft;
    let pointY = y - canva.offsetTop;

    context.beginPath();
    context.lineWidth = 5;
    context.lineJoin = "round";
    context.moveTo(mouseX, mouseY);
    context.lineTo(pointX, pointY);
    context.closePath();
    context.strokeStyle = currentColor;
    context.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function clearCanva() {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}