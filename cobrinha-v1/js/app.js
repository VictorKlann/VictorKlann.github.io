console.log('Início - Jogo da Cobrinha!');
 
//R.I.P Adobe Flash
const canvas = document.querySelector('#snake');
const contexto = canvas.getContext('2d');

const box = 32;

const snake = [];
 
let tamanho = 1;
const tamanhoSpan = document.querySelector('#tamanho');


snake[0] = {
   x: 8 * box,
   y: 8 * box
};
 
function criarCenario() {
   contexto.fillStyle = 'lightgreen';
   contexto.fillRect(0,0,16*box,16*box);
}
 

function criarCobrinha() {
   for(let i=0; i < snake.length; i++){
       contexto.fillStyle = 'green';
       contexto.fillRect(snake[i].x, snake[i].y, box, box);
   }
}
 
document.addEventListener('keydown', atualizaDirection);
 
let direction = ''; 
 
function atualizaDirection(evento) {
   
   if(evento.keyCode === 37 && direction !== 'right')
       direction = 'left'; //37 - seta para a esquerda
   if(evento.keyCode === 39 && direction !== 'left')
       direction = 'right'; //39 - seta para a direita
   if(evento.keyCode === 38 && direction !== 'down')
       direction = 'up'; //38 - seta para cima
   if(evento.keyCode === 40 && direction !== 'up')
       direction = 'down';
}

let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
 }
  
 function criarComida() {
    contexto.fillStyle = 'red';
    contexto.fillRect(comida.x, comida.y, box, box);
 }
 


function desenharJogo(){

    if(snake[0].x > 15 * box && direction === 'right') snake[0].x = 0;
    if(snake[0].x < 0 && direction === 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction === 'down') snake[0].y = 0;
    if(snake[0].y < 0 && direction === 'up') snake[0].y = 16 * box;
 
  
   for(let i = 1; i < snake.length; i++) {
    if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
        clearInterval(jogo);
        alert('Fim de jogo!');
    }
}


    criarCenario();
    criarCobrinha();
    criarComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
  
    if(direction === 'right') snakeX += box;
    if(direction === 'left') snakeX -= box;
    if(direction === 'up') snakeY -= box;
    if(direction === 'down') snakeY += box;
  
    if(snakeX !== comida.x || snakeY !== comida.y){
        snake.pop();
    } else {
        tamanhoSpan.textContent = ++tamanho;
        comida.x = Math.floor(Math.random() * 15 + 1) * box;
        comida.y = Math.floor(Math.random() * 15 + 1) * box;
    }
 
  
    const newHead = {
        x: snakeX,
        y: snakeY
    }
  
    snake.unshift(newHead); 

 }
  
 let jogo = setInterval(desenharJogo, 100);