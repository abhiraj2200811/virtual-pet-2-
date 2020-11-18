//Create variables here
var dog_sit,dog, happyDog, database, foodS, foodStock;
var feedButton,add_Food,fedTime,lastFed,foodObj;

function preload()
{
  //load images here
  dog_sit = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png")

}

function setup() {
  createCanvas(1500, 1000);
  
  dog = createSprite(1250,500,50,50)
  dog.addImage(dog_sit);

  database=firebase.database();

  foodObj= new Milk(250,250,20,20)

  foodStock=database.ref('Food');
  foodStock.on("value",readStock)

  feedButton=createButton("Feed the dog");
  feedButton.position(700,95);
  feedButton.mousePressed(feedDog);

  add_Food=createButton("Add Food");
  add_Food.position(800,95);
  add_Food.mousePressed(addFoods)

}


function draw() {  

background(46,139,87)

foodObj.display();

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
})

  drawSprites();
  //add styles here

  textSize(50)
  fill("white")
  stroke(5)

if(lastFed>=12){

text("Last Feed :"+ lastFed%12 + "PM", 350,30)

}else if(lastFed==0){

text("Last Feed : 12 AM", 350,30)

}else{

text("Last Feed :"+ lastFed + "AM", 350,30)

}

 

  

}

function readStock(data){

foodS=data.val();

}

function writeStock(x){

if(x<=0){

  x=0;

}else{

x=x-1;

}

database.ref('/').update({
  Food:x
})

}

function feedDog(){

dog.addImage(happyDog);

foodS--

foodObj.lastFed=hour()
foodObj.foodStock=foodS
database.ref('/').update({

  Food:foodObj.foodStock,
  FeedTime:foodObj.lastFed

})
}

function addFoods(){

foodS++;

foodObj.foodStock=foodS

database.ref('/').update({

Food:foodS

})

}

