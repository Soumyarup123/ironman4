var ironman;
var background;
var ironimg;
var bgimg;
var stoneimg;
var stonegroup;
var diamondimg;
var diamondgroup;
var diamondcount=0;
var spike;
var spikegroup;
var spikeimg;

function preload() 
{
  ironimg=loadImage("images/iron.png");
  bgimg=loadImage("images/bg.jpg");
  stoneimg=loadImage("images/stone.png");
  diamondimg=loadImage("images/diamond.png")
  spikeimg=loadImage("images/spikes.png")
}


function setup() {
  createCanvas(1200,600);
  ironman=createSprite(300,300,30,30)
  ironman.addImage(ironimg);
  ironman.scale=0.3;
  edges=createEdgeSprites();
  stonegroup=new Group();
  diamondgroup=new Group();
  spikegroup=new Group();
}

function draw() {
  background(bgimg); 
  background.scale=2;
  ironman.setCollider("rectangle",100,0,200,400);
  
  ironman.bounceOff(edges[0]);
  ironman.bounceOff(edges[1]);
  ironman.bounceOff(edges[2]);
  if(keyDown("up"))
  {
    ironman.velocityY=-10;
  }
  if(keyDown("left"))
  {
    ironman.x=ironman.x-10;
  }
  if(keyDown("right"))
  {
    ironman.x=ironman.x+10;
  }
  ironman.velocityY=ironman.velocityY+0.5;
  generatePlatforms()
  for(i=0;i<(stonegroup).length;i++)
  {
    var temp=stonegroup.get(i);
    if(temp.isTouching(ironman))
    {
      ironman.collide(temp);
    }
  }
  generateDiamonds()
  for(var i=0;i<(diamondgroup).length;i++)
  {
    var temp1=(diamondgroup).get(i) ;
   if(temp1.isTouching(ironman))
    {
      diamondcount++;
      temp1.destroy();
      temp1=null;
    }
  }
  generatespikes()
  for(var j=0;j<(spikegroup).length;j++)
  {
    var temp2=(spikegroup).get(j) ;
   if(temp2.isTouching(ironman))
    {
      diamondcount=diamondcount-5;
      temp2.destroy();
      temp2=null;
    }
  }

  drawSprites()
  textSize(20);
  fill("white");
  text("diamonds collected : "+diamondcount,500,50);
}

function generatePlatforms() 
{
  if (frameCount % 60 === 0) 
  {
    var brick = createSprite(1200, 10, 40, 10);
    brick.x = random(50,850);
    brick.addImage(stoneimg);
    brick.velocityY = 5;
    brick.lifetime = 250;
    stonegroup.add(brick);
  }
}

function generateDiamonds()
{
  if (frameCount % 70 === 0)
  {
    var dmnd = createSprite(1200, 10, 40, 10);
    dmnd.x = random(40,860);
    dmnd.addImage(diamondimg);
    dmnd.scale=0.5;
    dmnd.velocityY = 3;
    dmnd.lifetime = 250;
    diamondgroup.add(dmnd);
  }
}

function generatespikes()
{
  if (frameCount % 70 === 0)
  {
    var spks = createSprite(1200, 10, 40, 10);
    spks.x = random(40,860);
    spks.addImage(spikeimg);
    spks.scale=0.5;
    spks.velocityY = 6;
    spks.lifetime = 250;
    spikegroup.add(spks);
  }
}
