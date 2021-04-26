//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey, monkey_running;
var invisibleGround;

var bananaGroup, bananaImage;
var stoneGroup,stoneImage;
var backGround1,backGround2,jungleImage;

var score;


function preload(){
  jungleImage =loadImage ("jungle.jpg");
  
  
  monkey_running = ("Monkey_01.png",           "Monkey_02.png","Monkey_03.png",         "Monkey_04.png","Monkey_05.png",         "Monkey_06.png","Monkey_07.png",         "Monkey_08.png","Monkey_09.png",         "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  
  stoneImage = loadImage("stone.png");

}


function setup() {
  createCanvas(400,400);
  
  backGround1=createSprite(200,200,400,400);
  backGround1.addAnimation("jungle.jpg",
  jungleImage);
  
  monkey= createSprite(50,300,20,50);   
  monkey.addAnimation("monkey_running",
  monkey_running)
  monkey.scale = 0.2;
  monkey.x = 50;
  
  
  invisibleGround = createSprite(100,390,600,35);
  invisibleGround.visible = true
 
  
  if (invisibleGround.x < 0){
    invisibleGround.x = invisibleGround.width/2;
  }
  
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  score = 0;
  
  
}

function draw() {
  background(180);
   text("Score: "+ score, 500,50);
  
  if(gameState===PLAY){
     
    
   
  score = score + Math.round(getFrameRate()/60);
 
  
  if(keyDown("space")) {
    monkey.velocityY = -10;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  spawnbanana();
  spawnstone(); 
 
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
  }
    
    
  if(stoneGroup.isTouching(monkey)){
  gameState = END;
     
    
    
    
    }
  }
  
  else if(gameState === END) {
    
  //set velcity of each game object to 0
    monkey.velocityY = 0;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    
  }
  
  monkey.collide(invisibleGround)
  
  drawSprites();
}
function reset(){
  gameState=PLAY;
 
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
 
  score=0;
  
  
}

function spawnbanana() {
  //write code here to spawn the banana
  if (frameCount % 60 === 0) {
    var banana= createSprite(600,120,40,10);
    banana.y =    Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.080 ;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
  
}

function spawnstone() {
  if(frameCount % 60 === 0) {
  var stone =                             createSprite(400,360,10,40);  
    stone.velocityX = -4;
 stone.addImage("stone.png",stoneImage)
  
    
    //generate random obstacles
    var rand = Math.round(random(1));
    
     
    switch(score) {
      case 10: monkey.scale=0.12
              break;
      case 20:  monkey.scale=0.14
              break;
      case 30:  monkey.scale=0.16
              break;
      case 40:  monkey.scale=0.18
              break;
      default: break;
    }
    
    //assign scale and lifetime to the stone          
    stone.scale = 0.2;
    stone.lifetime = 300;
    //add each stone to the group
    stoneGroup.add(stone);
  }
}