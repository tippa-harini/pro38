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
  createCanvas(displayWidth-20,displayHeight-30)
   ground=createSprite(displayWidth/2,displayHeight-200,displayWidth,displayHeight/2);
   ground.addImage(groundImage);
   
   ground.velocityX=-3;

    flowersGroup=new Group();
    obstacleGroup=new Group();

   pinky=createSprite(displayWidth/2,displayHeight+80);
   pinky.addImage(pinkyImage);
   pinky.scale=0.3;
  //200,385,400,10
  invisibleGround = createSprite(displayWidth/2,displayHeight+150,displayWidth,displayHeight/2);
  invisibleGround.visible = false;
}

function draw() {
  background(230);
  
  fill("black")
  textSize(30)
  stroke("black")
  text("Score:"+score,200,displayHeight/6);
  
  if(gameState=== PLAY){
    if(ground.x<0){
       ground.x=displayWidth/2;
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

    camera.position.x=displayWidth/2;
    camera.position.y=displayHeight/2;
  }
  else if(gameState === END ){
    ground.velocityX=0;
    pinky.velocityY = 0;
    
    flowersGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    flowersGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    fill("black")
    textSize(40)
    stroke("black")
    text("GAMEOVER",displayWidth/2,displayHeight/2);

  }
  pinky.collide(invisibleGround) ;
    

  // pinky.depth=obstacleGroup.depth;
   // pinky.depth=pinky.depth+1;
   drawSprites();
}

function flowers(){
  if(frameCount%150===0){
    flower=createSprite(displayWidth,displayHeight/4+300);
    flower.addImage(flowerImage);
    flower.scale=0.1;
    flower.velocityX=-9;
    flower.lifetime=160;
   // flower.y=Math.round(random(800,displayHeight/2));
    flowersGroup.add(flower);
  }
}

function obstacle(){
  if(frameCount%200===0){
    var obstacle =createSprite(displayWidth,displayHeight/2+320,50,50);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;  
    obstacle.velocityX=-9;
    obstacle.lifetime=160;
   // obstacle.debug=true;
    
     obstacle.depth = pinky.depth;
   // pinky.depth=pinky.depth+1;
    
    obstacleGroup.add(obstacle)
     }
}


