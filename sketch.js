var dogImg, happyDogImg, dog, 
database, foodS, foodStock, 
canvas, lastFed,  
foodObj, feed, addFood, 
food1, foodCount, input, 
milk, milkImg, gameState, 
readState, bedRoomImg, washRoomImg, 
gardenImg, sadDogImg, currentTime;

function preload() {
  dogImg = loadImage('images/Dog.png');
  happyDogImg = loadImage('images/dogImg1.png');
  milkImg = loadImage('images/Milk.png');
  bedRoomImg = loadImage('images/Bed Room.png');
  washRoomImg = loadImage('images/Wash Room.png');
  gardenImg = loadImage('images/Garden.png');
  sadDogImg = loadImage('images/sadDog.png');
}

function setup() {
  
  database = firebase.database();

  dog = createSprite(250, 350);
  dog.scale = 0.3;
  dog.addImage(dogImg);

  milk = createSprite(185, 410);
  milk.addImage(milkImg);
  milk.scale = 0.1;
  milk.visible = false;
  milk.rotation = 35;
  
  food1 = new Food();
  
  food1.start();

  addFood = createButton("Add food");
  addFood.position(270, 70);
  addFood.mousePressed(addFoods);

  input = createInput("Your Dog's Name");
  input.position(50, 70);

  feed = createButton("Feed your Dog");
  feed.position(350, 70);
  feed.mousePressed(feedDog);

  canvas = createCanvas(550, 550);  
}

function draw() {  
  background(46, 139, 87);
  drawSprites();
  food1.defineState();  
}

function feedDog() {
  food1.getFoodStock();
  food1.updateFedTime();

  if(foodCount === 0) {
    foodCount = 0;
    milk.visible = false;
    dog.addImage(dogImg);
  } else if(foodCount !== 0 && gameState === "hungry"){
    food1.updateFoodStock(foodCount - 1);
    milk.visible = true;
    dog.addImage(happyDogImg);
  }
}

function addFoods() {
 food1.getFoodStock();

 food1.updateFoodStock(foodCount + 1); 
}