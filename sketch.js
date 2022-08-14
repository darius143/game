var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImg
var zombieGroup
var heart1,heart2,heart3,heartImg1,heartImg2,heartImg3
var bullets = 30
var bullet
var life = 3
var gamestate = 'fight'
var score = 0
var winsound,losesound,explosionsound
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  heartImg1 = loadImage("assets/heart_1.png")
  heartImg2 = loadImage("assets/heart_2.png")
  heartImg3 = loadImage("assets/heart_3.png")
  winsound = loadSound("assets/win.mp3")
  losesound = loadSound("assets/lose.mp3")
  explosionsound = loadSound("assets/explosion.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-5,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   //creating hearts
heart1 = createSprite(displayWidth-150,40,20,20)   
heart1.addImage(heartImg1)
heart1.scale = 0.3
heart1.visible=false

heart2 = createSprite(displayWidth-120,40,20,20)   
heart2.addImage(heartImg2)
heart2.scale = 0.3
heart2.visible=false

heart3 = createSprite(displayWidth-90,40,20,20)   
heart3.addImage(heartImg3)
heart3.scale = 0.3
heart3.visible=false

//creating groups
zombieGroup = new Group()
bulletGroup = new Group()

}


function draw() {
  background(0);
  
  if(gamestate=="fight"){
    //creating life bar
    if(life==3){
      heart3.visible=true
      heart2.visible=false
      heart1.visible=false
    }

    if(life==2){
      heart3.visible=false
      heart2.visible=true
      heart1.visible=false
    }

    if(life==1){
      heart3.visible=false
      heart2.visible=false
      heart1.visible=true
    }
if(life==0){
  gamestate="lost"
}

if(score==20){
  gamestate="won"
}
  

  // movement of the player up and down
  if(keyDown("UP_ARROW")||touches.length>10){
    player.y = player.y-20
    
  }

  if(keyDown("DOWN_ARROW")||touches.length>10){
    player.y = player.y+20
    
  }
   
  //creating the bullets and shooting
if(keyWentDown("space")){
bullet = createSprite(displayWidth-1150, player.y-30, 20, 10)
bullet.velocityX = 20
bulletGroup.add(bullet)
player.depth=bullet.depth
player.depth=bullet.depth+2

bullets = bullets-1

player.addImage(shooter_shooting)
}
  
//bullets stop firing 
  else if(keyWentUp("space"))
  player.addImage(shooterImg)

  if(bullets==0){
    gamestate="bullet"

  }
  
  //creating condition for when zombiegroup touches bulletgroup
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i =0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        score=score+5
        explosionsound.play()
      }
    }
  }

  //zombie touches players 
  if(zombieGroup.isTouching(player)){
    for(var i = 0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy()
       console.log(i)
       life=life-1
losesound.play()


      }
    }
  

  }



enemy()
  }


drawSprites();
//if player runs out of bullets
if(gamestate=="bullet"){
  fill("yellow")
  textSize(25)
  text("YOU RAN OUT OF BULLETS",470,410)
  
  
  player.destroy()
  zombieGroup.destroyEach()
  bulletGroup.destroyEach()
  
}

//player loses
if(gamestate=="lost"){
  fill("red")
  textSize(55)
  text("YOU LOST",470,410)
  
  
  player.destroy()
  zombieGroup.destroyEach()
  bulletGroup.destroyEach()
  losesound.play()
}

//player wins
if(gamestate=="won"){
  fill("green")
  textSize(55)
  text("YOU WON",470,410)
  
  
  player.destroy()
  zombieGroup.destroyEach()
  bulletGroup.destroyEach()
  winsound.play()
}

}

// creating enemies 
function enemy(){
  if(frameCount%50==0){
  zombie = createSprite(random(500,1100),random(100,500),40,40);
 zombie.addImage(zombieImg)
   zombie.scale = 0.15
   zombie.debug = true
   zombie.velocityX = -3
   zombie.setCollider("rectangle",0,0,400,400)
   zombieGroup.add(zombie)
  
  }
  
}