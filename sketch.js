var dogImg, happyDogImg, dog, database, foodS, foodStock, canvas, lastFed, fedTime, foodObj, feed, addFood, food1, foodCount;

function preload() {
  dogImg = loadImage('images/Dog.png');
  happyDogImg = loadImage('images/dogImg1.png');
}

function setup() {
  database = firebase.database();

  dog = createSprite(650, 250);
  dog.scale = 0.3;
  dog.addImage(dogImg);

  fedTime = database.ref('fedTime');
  fedTime.on("value", function(data){
  lastFed = data.val();
  lastFed = hour();
  });
  
  food1 = new Food();
  
  food1.start();

  addFood = createButton("Add food");
  addFood.position(350, 35);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed the dog");
  feed.position(430, 35);
  feed.mousePressed(feedDog);

  canvas = createCanvas(800, 400);
}

function draw() {  
  background(46, 139, 87);

  food1.display();

  drawSprites();
  
  textSize(15);
  fill("white");
  stroke(5);
  text("Press the Feed button to feed the dog!", 50, 50);

  textSize(15);
  fill("white");
  stroke(5);
  if(lastFed >= 12) {
    text("Last Feed: " + lastFed % 12 + " PM", 350, 30);
  } else if(lastFed === 0){
    text("Last Feed: 12 AM", 350, 30);
  } else {
    text("Last Feed: " + lastFed + " AM", 350, 30);
  }

}

function feedDog() {
  dog.addImage(happyDogImg);

  
  food1.getFoodStock();

  if(foodCount === 0) {
    foodCount = 0;
  } else {
    food1.updateFoodStock(foodCount - 1);
  }

}

function addFoods() {
 food1.getFoodStock();

 food1.updateFoodStock(foodCount + 1); 
}