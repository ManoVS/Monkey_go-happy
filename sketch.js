var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var ground, invisible;
var survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(500, 500)

  FoodGroup = new Group();
  obstacleGroup = new Group();

  monkey = createSprite(70, 370, 50, 50);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(250, 405, 1000, 10);
  ground.x = ground.width / 2;
  //ground.debug = true;

  invisible = createSprite(250, 407, 1000, 10);
  invisible.x = ground.width / 2;

}


function draw() {
  background("white");

  //to move the ground
  ground.velocityX = -5;

  //reset the ground
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (invisible.x < 0) {
    invisible.x = invisible.width / 2;
  }

  if (keyDown("space") && monkey.isTouching(ground)) {
    monkey.velocityY = -20;
  }

  //gravity
  monkey.velocityY = monkey.velocityY + 0.9;

  monkey.collide(invisible);

  score = Math.round(frameCount / 3);
  stroke("black");
  textSize(20);
  fill("red");
  text("score:" + score, 400, 50);

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("survival Time:" + survivalTime,100,50);

  ground.velocityX = -(5 + 2 * score / 100);
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
  }

  Food();
  Obstacle();






  drawSprites();
}

function Food() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(500, 10, 10, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -(5 + 2 * score / 100);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    FoodGroup.add(banana);
    FoodGroup.setLifetimeEach(100);
    banana.setCollider("rectangle",0,0,400,400);

  }

}

function Obstacle() {

  if (frameCount % 300 === 0) {
    var obstacle = createSprite(500, 365, 23, 32);
    obstacle.velocityX = -(5 + 2 * score / 100);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
  }

}