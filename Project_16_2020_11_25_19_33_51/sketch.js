    //Create variables for monkey
    var monkey , monkey_running

    //Create variables for bananas and obstacles
    var banana ,bananaImage, obstacle, obstacleImage

    //Create variables for obstacle and banana group
    var bananaGroup, obstaclesGroup;

    //Create a varaiable for survival time and score
    var survivalTime=0;
    var score=0;

function preload(){
  
    //Load animation of the monkey
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

   //Load images of the banana and obstacle
    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");

}

function setup() {
     //Create canvas
     createCanvas(600,600);
  
    //Create monkey
    monkey=createSprite(80,315,20,20);
    monkey.addAnimation("running",monkey_running);
    monkey.scale=0.1;

    //Create ground
    ground=createSprite(400,350,900,10);
    ground.velocityX=-4;
    ground.x=ground.width/2
    console.log(ground.x);

    //Create group for bananas and obstacles
    bananaGroup=new Group();
    obstaclesGroup= new Group();

}


function draw() {
  
   background("white");
  
  //Create infinite ground
  if(ground.x<0) {
    ground.x=ground.width/2;
  } 
   
  //If space is pressed,the moneky should jump
  if(keyDown("space") && monkey.y >= 160) {
    monkey.velocityY = -12;
    }
  
    //Add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
  
    //Make monkey collide with th ground
    monkey.collide(ground);  
  
    //Call the functions of banana and obstacles
    createBanana();
    createObstacles();
 
    //Draw the sprites
    drawSprites();
       
  
    //If obstacles touch the monkey,both of them should have a velocity of 0
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    }
  
    //Score
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: "+ score, 500,50);  
  
    //Survival time
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate()) 
    text("Survival Time: "+ survivalTime, 100,50);
  
}

    //Create functions to create bananas and obstacles
function createBanana(){
  if(frameCount%80===0){
     //Create banana
    banana=createSprite(100,200,10,10);
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //Let banana appear at different positions
    banana.y=Math.round(random(120,200));
    
    //Add banana image
    banana.addImage(bananaImage);
    
    //Scale the banana
    banana.scale=0.1;
    
    //Give velocity to the banana
    banana.velocityX=-2;
    
    //Give lifetime to the banana
    banana.lifetime=250;
    
    //Add banana to bananaGroup
    bananaGroup.add(banana);
  }
}

function createObstacles(){
  if (frameCount % 300 === 0){
    obstacle = createSprite(800,324,10,40);
    obstacle.velocityX = -6;
    
    //Add image to the obstacle 
    obstacle.addImage(obstacleImage);
    
    //Scale the obstacle
    obstacle.scale=0.15;
    
    //Add lifetime to the obstacle     
    obstacle.lifetime = 250;
    
    //Add obstacles to the group
    obstaclesGroup.add(obstacle);
}
}


