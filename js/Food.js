class Food {
    constructor() {
        this.image = loadImage("images/Milk.png");
    }

    async start(){
        var foodRef = await database.ref('food').once("value");
        if(foodRef.exists()) {
            foodCount = foodRef.val();
        }
      }

    display() {
        var x = 80, y = 100;
        imageMode(CENTER);
        if(foodCount != 0) {
            for(var i = 0; i < foodCount; i++) {
                if(i % 10 === 0) {
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
    
    getFoodStock() {
        var foodStockRef = database.ref('food');
        foodStockRef.on("value", (data)=>{
        foodCount = data.val();
        });
    }

    updateFoodStock(foodStockToUpdate) {
        database.ref('/').update({
            food: foodStockToUpdate
        });
    }
}