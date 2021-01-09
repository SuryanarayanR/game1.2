var exitwall;
var wallGroup,guardGroup,doorGroup,player,key;
var gameState="play",keyflag=0, bg, treasureflag = 0,antiqueflag = 0; 
var time = 60;
var guardTime = 30;
var lowestDoor, middleDoor, highestDoor;


function preload(){
   soldierf = loadAnimation("images/soldierFront1.png","images/soldierFront3.png");
   soldierb = loadAnimation("images/soldierBack1.png","images/soldierBack3.png");
   soldierl = loadAnimation("images/soldierLeft1.png","images/soldierLeft3.png");
   soldierr = loadAnimation("images/soldierRight1.png","images/soldierRight3.png");

   playerf = loadAnimation("images/playerFront2.png","images/playerFront3.png");
   playerb = loadAnimation("images/playerBack2.png","images/playerBack3.png");
   playerl = loadAnimation("images/playerLeft1.png","images/playerLeft2.png","images/playerLeft3.png");
   playerr = loadAnimation("images/playerRight1.png","images/playerRight2.png","images/playerRight3.png");

   Key = loadImage("images/key.png");
   Lock = loadImage("images/lock.png");
   Unlock = loadImage("images/unlocking.png");// To display it while unlocking the lock.
   Treasure = loadImage("images/treasure.png");
   Antique = loadImage("images/antique.png");
   bg = loadImage("images/background.jpg");

}


function setup() {
  createCanvas(1350,650);
  wallGroup = new Group();
  doorGroup = new Group();
  createWalls();
  exitwall = createSprite(5, 620, 10, 100);
  exitwall.shapeColor = "black";
  
  lowestDoor = createSprite( 850,560,  10, 50);/*lowest door*/
  lowestDoor.shapeColor = "black";
  doorGroup.add(lowestDoor);
  middleDoor = createSprite( 50, 280, 100, 10);/*middle door*/
  middleDoor.shapeColor = "black";
  doorGroup.add(middleDoor);
  highestDoor = createSprite( 50, 130, 100, 10);/*highest door*/
  highestDoor.shapeColor = "black";
  doorGroup.add(highestDoor);

  //CHARACTERS
  //npc
  guardGroup = new Group();
  createGuards();
  //highest
  key1 = createSprite(950,40);
  key1.addImage("keys",Key);
  key1.scale = 0.08;
  //key1.debug = true;
  key1.setCollider("rectangle",0,0,400,300);
  //highest
  lock1 = createSprite( 50, 125);
  lock1.addImage("locks",Lock);
  lock1.scale = 0.13;

  //high-middle
  key2 = createSprite(200,100);
  key2.addImage("keys",Key);
  key2.scale = 0.08;
  //key2.debug = true;
  //high-middle
  lock2 = createSprite( 50, 275);
  lock2.addImage("locks",Lock);
  lock2.scale = 0.13;

  key2.setCollider("rectangle",0,0,400,300);
  //lower
  key3 = createSprite(580,625);
  key3.addImage("keys",Key);
  key3.scale = 0.08;
  //key3.debug = true;
  key3.setCollider("rectangle",0,0,400,300);
  //high-middle
  lock3 = createSprite(850, 560);
  lock3.addImage("locks",Lock);
  lock3.scale = 0.13; 

  treasure = createSprite(50,60);
  treasure.addImage("treasure",Treasure);
  treasure.scale = 0.4;
  //treasure.debug = true;
  treasure.setCollider("rectangle", 0, 0, 90, 190);

  antique = createSprite(1270,618);
  antique.addImage("antique",Antique);
  antique.scale = 0.08;
   
  player = createSprite( 30,615);                             //30, 615
  //player.debug = true;
  player.setCollider("rectangle",0,0,player.width-120,player.height-55)

  player.addAnimation("front",playerf);
  player.addAnimation("back",playerb);
  player.addAnimation("left",playerl);
  player.addAnimation("right",playerr);

}           

function draw() {
  background(bg);  

  console.log("x: " + player.x);
  console.log("y: " + player.y);
  if(gameState === "play"){
    pc();
    player.collide(wallGroup);
    player.collide(exitwall);
    player.collide(lowestDoor);
    player.collide(middleDoor);
    player.collide(highestDoor);
    guardGroup.collide(doorGroup);

    guard1.guardMovingAnimation();
    guard2.guardMovingAnimation();
    guard3.guardMovingAnimation();
    guard4.guardMovingAnimation();
    guard5.guardMovingAnimation();
    guard6.guardMovingAnimation();
    guard7.guardMovingAnimation();
    guard8.guardMovingAnimation();
    guard9.guardMovingAnimation();
    guard10.guardMovingAnimation();

    if(player.y > 160 ){
      guard1.followPlayer();
    }
    if(player.y < 110){
      guard2.followPlayer();
    }
    if(player.y > 425){   
      guard3.followPlayer();
    }
    if(player.y > 205 ){
      guard4.followPlayer();
    }
    if(player.x < 980){
      guard5.followPlayer();
    }
    if(player.y > 80){
      guard6.followPlayer();
    }
    if(player.x > 840){
      guard7.followPlayer();
    }
    if(player.y > 350){
      guard8.followPlayer();
    }
    if(player.y < 80 ){
      guard9.followPlayer();
    }
    if(player.x < 1200){
    guard10.followPlayer();
    }

    //KEY
    
    if(player.isTouching(key1)){
      key1.destroy();
      keyflag = 1;
    }
    else if(player.isTouching(key2)){
      key2.destroy();
      keyflag = 3;
    }
    else if(player.isTouching(key3)){
      key3.destroy();
      keyflag = 2;
    }

    if(keyflag === 1){
      image(Key,1310,1,35,30)
    }
    else if(keyflag === 2){
      image(Key,1310,1,35,30)
      image(Key,1275,1,35,30)
    }
    else if(keyflag === 3){
      image(Key,1310,1,35,30)
      image(Key,1275,1,35,30)
      image(Key,1240,1,35,30)
    }


    //COLLECTING TREASURE
    if(player.isTouching(treasure)){
      //var currentframe = frameCount;
      console.log("time: " + time);
      if(keyDown("space")){
        time = time-1;
      }
      if(time<1){
        treasureflag = 1;
      } 
      //console.log("currentframe: " + currentframe);
    }

    if(treasureflag === 1){
      console.log("treasure collected");
        textSize(50);
        //fill("blue");
        treasure.destroy();
        //TreasureFlag
        image(Treasure,1210,5,35,30);
    }

    if(antiqueflag === 1){
      antique.destroy();
      image("Antique",1280,5,35,30);
    }

    if(player.isTouching(antique)){
      if(keyDown("space")){
        antiqueflag = 1;
      }
    }
    
    //if(antiqueflag===1){}
    if(antiqueflag===1 && treasureflag===1){
      gameState = "escape"
    }
    if(guardGroup.isTouching(player)){
      guardTime = guardTime-1;
      if(guardTime<1){
        gameState ="lose";
      }
    }


   
    /** UNLOCKING DOORS */
    for(var i = 0; i < doorGroup.length; i++){
      if(doorGroup.get(i).isTouching(player) && keyDown("space")){
        doorGroup.get(i).destroy();
        keyflag--;
      }
    }





  }

  else if(gameState === "escape"){
    textSize(30);
    fill("red");
    text("<---- EXIT",40,620)
    exitwall.destroy();
    pc();
    player.collide(wallGroup);
    
    guard1.guardMovingAnimation();
    guard1.followPlayerEscape();
    guard2.guardMovingAnimation();
    guard2.followPlayerEscape();
    guard3.guardMovingAnimation();
    guard3.followPlayerEscape();
    guard4.guardMovingAnimation();
    guard4.followPlayerEscape();
    guard5.guardMovingAnimation();
    guard5.followPlayerEscape();
    guard6.guardMovingAnimation();
    guard6.followPlayerEscape();
    guard7.guardMovingAnimation();
    guard7.followPlayerEscape();
    guard8.guardMovingAnimation();
    guard8.followPlayerEscape();
    guard9.guardMovingAnimation();
    guard9.followPlayerEscape();
    guard10.guardMovingAnimation();
    guard10.followPlayerEscape();


    if(player.x < 0){
      gameState = "win";
    }
  }

  else if(gameState === "win"){
    destroy();
    textSize(100);
    fill("red");
    text("Game Won",180,180);
  }

  else if(gameState === "lose"){
    destroy(); 
    fill("red");
    textSize(100);
    text("Game lost",width/2-220,height/2+10);
  }

  console.log(gameState);
  drawSprites();
}