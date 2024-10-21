var shapeConstructor = [{ red: 96, green: 8, blue: 216, multi: 1, frameC: 0}];

var speed = 100;

//These are the set points for the main rhombus shape.
var x1 = -87;
var x2 = 87;
var x3 = 58.5;
var x4 = -58.5;
var y1 = -58.875;
var y2 = 58.975;

//Variables that relate to the expansion of the background shapes.
var expand, xFactor, yFactor;

//Not sure if I still need these. Still works without them weirdly enough.
// var rCol, gCol, bCol;

var frame;
var multiply = 32;
var scale;
var responsive = 1;

//Counts the amount of times the marker frame to create a new shape has been met.
//For this, its every 32 frames it creates a new 'shape'
var frameCounter = 1;

//Variables for the colour of the background shapes. 
var shapeRed = 0;
var shapeGreen = 0; 
var shapeBlue = 0;

//Basic setup function with the frame rate and setting the screen size.
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
}

function draw() {

  // Setting up background and location of everything, as it'll all be at center of the screen.
  background(0);
  noStroke();
  translate(width/2, height/2)

  xFactor = 1;

  //These adjust the rate at which the Y co-ordinates of the shape move, depending on if
  //The width is larger or height is larger.
  if(width > height){
    yFactor = 1 + height/width;
  }

  if(height > width){
    yFactor = 1 + width/height;
  }

  scale = width/(multiply*20);

  if(scale <2){
    scale = 2;
  }

  //Creates a new shape every 32 frames
  if(frameCount == multiply * frameCounter){
    createShape();
    frameCounter++;
  }

  //Responsiveness stuff to match html + css
  if(width <= 375){
    responsive = 0.75;
  }else{
    responsive = 1;
  }

  //The bulk of the work of the site is here.
  //This creates a shape that expands to fill the screen whilst progressively changing colour
  for(var i = 0; i < shapeConstructor.length; i++) {

    //Gets the RGB colour values of the current shape in the array
    shapeRed = shapeConstructor[i].red;
    shapeGreen = shapeConstructor[i].green; 
    shapeBlue = shapeConstructor[i].blue;

    //Sets it as the fill of the shape
    fill(shapeRed, shapeGreen, shapeBlue);

    //As the difference between the purple and blue is fixed
    //and the ideal amount of shapes visible is around 10
    //This changes the colour set in the array to a slight variation every pass
    //Giving the illusion of shifting colours.
    shapeConstructor[i].red = shapeRed-(1.5/multiply);
    shapeConstructor[i].green = shapeGreen + (24.5/multiply);
    shapeConstructor[i].blue = shapeBlue - (2.5/multiply);
    
    //Take the current frame count and subtract it from the frame the shape initially started
    //Multiplied by the scale of the screen.
    expand = ((frameCount - shapeConstructor[i].frameC)*scale)*responsive;

    //Building the shape based on the fixed co-ordinates plus or minus the expansion factor
    beginShape();
    
      vertex((x1*responsive)-expand,(y1*responsive)-(expand/yFactor)); //top left corner
      vertex((x2*responsive)+expand,(y1*responsive)-(expand/yFactor)); //top right corner
      vertex((x3*responsive)+expand,(y2*responsive)+(expand/yFactor)); //bottom right corner
      vertex((x4*responsive)-expand,(y2*responsive)+(expand/yFactor)); //bottom left corner

    endShape(CLOSE);

    beginShape();
    
    
    endShape(CLOSE);

      
  
  }

  //This helps to optimise the site by removing the first item on the list,
  //which isn't usually visible after a certain point.
  for(var j = 0; j < shapeConstructor.length; j++){
    if(shapeConstructor.length >= 15 && j != 0){
        shapeConstructor.shift();
    }
  } 


  //A solid rhombus
  push();
    fill('#e4f5fa');
    beginShape();
      vertex(x1*responsive,y1*responsive); //top left
      vertex(x2*responsive,y1*responsive); //top right
      vertex(x3*responsive,y2*responsive); //bottom right
      vertex(x4*responsive,y2*responsive); //bottom left
    endShape(CLOSE);
  pop();

  //Test text
  // push();
  //   fill(0);
  //   noStroke();
  //   text(responsive,0,100);

  // pop();


}

//Creates the shape with the first colour set and taking the current frame of the site.
function createShape(){
  rCol = 96;
  gCol = 8;
  bCol = 216;

  frame = frameCount;

  shapeConstructor.push({red:rCol, green:gCol, blue:bCol, frameC: frame});
}

//For when the window changes sizes.
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
