var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;
var restartImg

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
restartImg = loadImage("restart.png");
 
}


function setup() {
  createCanvas(400,400);

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 380, 900, 100);
  ground.velocityX = -4;
  ground.shapeColor = "green";
  ground.x=ground.width/2;
  console.log(ground.x);
  
  restart = createSprite(200,200);
  restart.addImage(restartImg);
  restart.scale = 0.2;
  
  score = 0;
  survialTime = 0;
  
}

function draw() {
  background ('lightblue');
  
  stroke("blue");
  fill("blue");
  textSize(20);
  text("Survial Time:- "+  survialTime, 10, 35);
  
  stroke("blue");
  fill("blue");
  textSize(20);
  text("Score:- "+  score, 300, 35);
  
  monkey.collide(ground);
  
  if(gameState === PLAY){
    
    restart.visible = false;
    monkey.visible = true;
    
    monkey.changeAnimation("running", monkey_running);
    survialTime = Math.ceil(frameCount/frameRate());
     
    if (ground.x < 0){
      ground.x = ground.width/2;}
    
    if(keyDown("space")) {
        monkey.velocityY = -12;}    
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score + 1;}
  
   monkey.velocityY = monkey.velocityY + 0.8;
   obstacleGroup.setLifetimeEach(-1);

   food();
   obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;}
  
}
  
   if (gameState === END) {
     obstacleGroup.destroyEach();
     FoodGroup.destroyEach();
     
     survialTime.visible = false;
     monkey.visible = false;
     restart.visible = true;
     
     if(mousePressedOver(restart)) {
      reset();
    } 
     
     if (ground.x < 0) {
    ground.x = ground.width/2;}
     
  stroke("red");
  fill("red");
  textSize(30);
  text("Game Over", 115, 165);
     
}
 
  drawSprites();
}


function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0){
    var obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
    obstacleGroup.add(obstacle);
}
 }

function reset(){
  
gameState = PLAY;
restart.visible = false;
score = 0;
survivalTime = 0;
}