var ground,groundImage;
var invisibleGround;
var pinky,pinkyImage;
var flower,flowerImage,flowersGroup;
var obstacle,obstacleImage,obstaclesGroup;
var score=0;

var PLAY = 1, END = 0;
var gameState = PLAY;

function preload(){
  
groundImage=loadImage("ground.png");
pinkyImage=loadImage("player.png");
flowerImage=loadImage("flower.png");
obstacleImage=loadImage("rock.png")
  
}

function setup() {
  createCanvas(300,400)
   ground=createSprite(200,300,50,50);
   ground.addImage(groundImage);
   ground.scale=0.3
   ground.velocityX=-3;

    flowersGroup=new Group();
    obstacleGroup=new Group();

   pinky=createSprite(70,350);
   pinky.addImage(pinkyImage);
   pinky.scale=0.2;
  
  invisibleGround = createSprite(200,385,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background(230);
  
  fill("black")
  textSize(15)
  stroke("black")
  text("Score:"+score,200,50);
  
  if(gameState=== PLAY){
    if(ground.x<0){
       ground.x=300;
    }

   if(keyDown("space")&&pinky.y >100){
      pinky.velocityY=-15;
    }

    if(pinky.isTouching(flowersGroup)){
      flowersGroup.destroyEach();
      score=score+2;
    }

    pinky.velocityY = pinky.velocityY + 0.8;

    flowers();
    obstacle();
    
    if(pinky.isTouching(obstacleGroup)){
      gameState= END;
    }
  }
  else if(gameState === END ){
    ground.velocityX=0;
    pinky.velocityY = 0;
    
    flowersGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    flowersGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    fill("black")
    textSize(25)
    stroke("black")
    text("GAMEOVER",80,200);

  }
  pinky.collide(invisibleGround) ;
    

  // pinky.depth=obstacleGroup.depth;
   // pinky.depth=pinky.depth+1;
   drawSprites();
}

function flowers(){
  if(frameCount%100===0){
    flower=createSprite(390,200);
    flower.addImage(flowerImage);
    flower.scale=0.1;
    flower.velocityX=-9;
    flower.lifetime=80;
    flower.y=Math.round(random(170,220));
    flowersGroup.add(flower);
  }
}

function obstacle(){
  if(frameCount%200===0){
    var obstacle =createSprite(270,358,50,50);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;  
    obstacle.velocityX=-9;
    obstacle.lifetime=80;
   // obstacle.debug=true;
    
     obstacle.depth = pinky.depth;
   // pinky.depth=pinky.depth+1;
    
    obstacleGroup.add(obstacle)
     }
}


