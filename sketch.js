var dogImg, happyDogImg, dog, database, foodS, foodStock, canvas;

function preload() {
  dogImg = loadImage('images/Dog.png');
  happyDogImg = loadImage('images/happydog.png');
}

function setup() {
  database = firebase.database();
	canvas = createCanvas(500, 500);
  dog = createSprite(250, 250);
  dog.addImage("dog", dogImg);
  dog.scale = 0.3;
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
}

function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage("dog", happyDogImg);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke(5);
  text("Press the UP ARROW key to feed your dog!", 50, 50);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  if(foodS != undefined) {
    database.ref('/').update({
      food:x
    })
  }
}