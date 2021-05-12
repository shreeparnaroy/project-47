var john
var key=0
var keyig
var bg1
var gameState=0
var button, counter =0
var o1,o2,o3
var score=0
var ground
var reset
var life=3
var PLAY=1
var END=0
var gameState1=PLAY

localStorage["HighestScore"]=0


function preload(){
  john_walk=loadAnimation("images/b1.png","images/b2.png")
  john_stand=loadAnimation("images/b1.png")
  john_jump=loadAnimation("images/b3.png")
  john_slide=loadAnimation("images/b4.png")
  john_hurt=loadAnimation("images/b5.png")
  keyig=loadImage("images/key.png")
  bg1=loadImage("bg1.png")
  o1=loadImage("images/m1.png")
  o2=loadImage("images/m2.png")
  o3=loadImage("images/m3.png")
}


function setup() {
  createCanvas(displayWidth,displayHeight);
  john = createSprite(500,500)
  john.addAnimation("image",john_stand)
  john.addAnimation("running", john_walk)
  john.addAnimation("jump",john_jump)
  john.addAnimation("slide", john_slide)
  john.scale=2.5
  john.visible = true
  
  zombie = createSprite(800,470,100,100)
  zombie.addImage(o1)
  zombie.visible = true
  
  button=createButton("next")
  button.position(600,300)

  keyGroup=createGroup()
  obstaclesGroup=createGroup()

  ground=createSprite(width/2,height-150,width,10)
  //ground.visible = false

  restart=createSprite(width/2,height/2)
  restart.visible=false
}


function draw() {
  textSize(50);
  //fill("red");
  //strokeWeight(7);
  //stroke("white");
  console.log(gameState)

  if(gameState===0){
    background("orange")
    console.log(counter)
    button.mouseClicked(function(){  counter++})
    
      
      if(counter ===1){
        textSize(50);  
        stroke(6) 
        strokeWeight(4) 
        text("ZOMBIE : Do you realize where you are?",50,200)
        console.log(counter)
      }
      else if(counter ===2){
        textSize(50);
        stroke(6) 
        strokeWeight(4)  
        text("JOHN: oh my god have you kidnapped me?",200,200)
        console.log(counter)
      }
      else if(counter ===3){
        textSize(50); 
        stroke(6) 
        strokeWeight(4)  
        text("ZOMBIE: noo you are stuck in the zombie world",50,200)
        console.log(counter)
      }
      else if(counter === 4){
        textSize(50); 
        stroke(6) 
        strokeWeight(4) 
        text("ZOMBIE: if you want to escape run for your life ",200,200)
       
        console.log(counter)

   
      }
   // })
  }


//instruction fro jhon
    if(gameState ===1){
      zombie.visible = false
    background("black")
    text("help john escape the zombie world \nby fighting the emimies and running for his life \n he is trapper here,\n help him escape using the below instruction",300,100)
    text("to jump press space key \n help him collect all the keys \n he can fight the monsters by pressing k",400,600)
    button.mouseClicked(()=>{
        gameState =2
      })
    }


    if(gameState === 2){
      //runner game
      button.hide()
      zombie.visible = false
      background("blue");
      textSize(20);
      fill(255);
      text("Score: " + score, 500, 40);
      text("Life: " + life, 500, 60);
      drawSprites();
      if (gameState1 === PLAY) {
        john.changeAnimation("running", john_walk)
        john.x=height-280;
        
        john.velocityY = john.velocityY + 0.8
        ground.visible=true

    
    
        if (keyDown("space") && john.y >= 139) {
          john.velocityY = -15;
        }
    
        if (ground.x < 0) {
          ground.x = ground.width / 2;
        }
    
        john.collide(ground);
    
        spawnKeys();
        spawnObstacles();
    
        if(obstaclesGroup.isTouching(john)) {
          life = life - 1;
          gameState1 = END;
        }
        
        if(keyGroup.isTouching(john)) {
          score = score + 1;
         // coinSound.play();
          keyGroup[0].destroy();
        }
      } else if (gameState1 === END) {
        restart.visible = true;
        text("restart", 280,170 );
        john.addAnimation("collided",john_hurt );
    
    
        //set velcity of each game object to 0
        ground.velocityX = 0;
        john.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        keyGroup.setVelocityXEach(0);
    
        //change the trex animation
        john.changeAnimation("collided", john_hurt);
    
        //set lifetime of the game objects so that they are never destroyed
        obstaclesGroup.setLifetimeEach(-1);
        keyGroup.setLifetimeEach(-1);
    
        if (mousePressedOver(restart)) {
          if (life > 0) {
            reset();
          }
    
        }
      }
    }


  drawSprites();
}

function spawnKeys() {
    if (frameCount % 60 === 0) {
      var key = createSprite(width,height-200,40,10);
      key.y = Math.round(random(height-200,height-400));
      key.addImage(keyig);
      key.scale=0.5
      key.velocityX = -3;
      key.lifetime = 800; 
      keyGroup.add(key)  
  }
}

//spawn monster function -like obsticals
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(width,height-200,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(o1);
              break;
      case 2: obstacle.addImage(o2);
              break;
      case 3: obstacle.addImage(o3);
              break;
     
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 800;
   
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
//
    
function reset() {

  gameState = PLAY;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  keyGroup.destroyEach();

  mario.changeAnimation("running", john_walk);
  mario.scale = 0.5;

  if (localStorage["HighestScore"] < score) {
    localStorage["HighestScore"] = score;
  }

  score = 0;
 
}

