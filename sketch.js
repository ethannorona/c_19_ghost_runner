var towerImg, tower;
var door, doorImg, doorsG;
var climber,climberImg, climberG;
var ghost, ghostImg;
var invisibleBlock, invisibleBlockG;
var gameState = "play";
var spookySound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  
  climberG = new Group();
  invisibleBlockG = new Group();
  doorsG = new Group();
}

function draw(){
  background("white");
  
  if(gameState === "play"){
    if(keyDown(LEFT_ARROW)){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown(RIGHT_ARROW)){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.5;
  
    if(tower.y > 400){
      tower.y = tower.width / 2;
    }
    
    spawnDoors();
    
    if(climberG.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    
    if(invisibleBlockG.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
    
    drawSprites();
  }
  if(gameState === "end"){
    text("Game Over", 230, 250);
  }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(200, -50);
    climber = createSprite(200, 10);
    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
    doorsG.add(door);
    climberG.add(climber);
    invisibleBlockG.add(invisibleBlock);
  }
}