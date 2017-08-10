//var data = [25, 55, 85];
var data = JSON.parse(sessionStorage.getItem('pieData'));
var dimensionNames = JSON.parse(sessionStorage.getItem('dimNames')); //used to change dimension names when hovered over
var reportScore = JSON.parse(sessionStorage.getItem('repScore'));
var dimensionScoreIDs = JSON.parse(sessionStorage.getItem('dimIDs'));
var clickedDimensionScore = 0;
var clickedDimension = "";
//alert(dimensionNames);
var piedata = [], piecolor = [25,76,115,139,180];
var mouseAngle = 0, pieDelta = 0, hover = 0;
var message = "100";
var passedMessageForDimensionBreakdown = "bueno";
var moveIt = 0;
var moved = 0; 
var lines = 0;
var moveCircleLines = 0;
   
//getting the size of the div to put the circle in it
var element = document.getElementById("circleOperations");
var eleWidth = parseInt(window.getComputedStyle(element, null).width);
var eleHeight = parseInt(window.getComputedStyle(element, null).height);


//set to the center of the page  
var circleCenterX =  (eleWidth / 2), circleCenterY = (eleHeight / 2);

//variables for points used to draw the lines
var p1X = 0, p1Y = 0, p2X = circleCenterX, p2Y = circleCenterY;



function setup() {
	
	
  sessionStorage.removeItem('pieData');
  sessionStorage.removeItem('dimNames');
  sessionStorage.removeItem('dimIDs');
  sessionStorage.removeItem('selectedReportId');
  sessionStorage.removeItem('repScore');
 
  var canvas = createCanvas(eleWidth, eleHeight);
  canvas.parent('circleOperations');
  if (data != null) {
  total = data.reduce(function(a,b){ return a+b; }, 0);
  	for(var i=0,count=0;i<data.length;i++) {
  		piedata.push([Math.PI * 2 * count / total, Math.PI * 2 * (count + data[i]) / total]);
  		count += data[i]; 
  	}
  }
}

function draw() {
  clear();
  var messageSet = false;
  for(var i=0,dx=0,dy=0;i<piedata.length;i++,dx=0,dy=0) {
    fill(piecolor[i%5]);

    //make the arcs pop when the mouse hovers over them
    if(mouseAngle >= piedata[i][0] && mouseAngle < piedata[i][1] && (dist(circleCenterX,circleCenterY,mouseX,mouseY) > (window.outerWidth / 4.56) / 2 && dist(circleCenterX,circleCenterY,mouseX,mouseY) < (window.outerWidth / 3.3) / 2) ){
      dx = Math.cos((piedata[i][0] + piedata[i][1])/2) * 10;
      dy = Math.sin((piedata[i][0] + piedata[i][1])/2) * 10;
      textSize(45);
      
      text(dimensionNames[i], circleCenterX - 210, -20, 250, 550);
      clickedDimension = dimensionNames[i];
      clickedDimensionScore = dimensionScoreIDs[i];
      passedMessageForDimensionBreakdown = data[i];
    }
    arc(circleCenterX + dx, circleCenterY + dy, window.outerWidth / 3.3, window.outerWidth / 3.3, piedata[i][0], piedata[i][1], PIE);
    
    
    
  
  }
  
  //put a black circle in the middle of the pie chart to make it a 
  //doughnut chart then put the score in the middle
  //text is hardcoded for now
  //set size to 120 so it is huge
  
 
  fill(0);
  ellipse(circleCenterX + dx, circleCenterY + dy, window.outerWidth / 4.56, window.outerWidth / 4.56);
  textSize(120);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  
  
  if (reportScore < 80){
	  var yellow = color(255,255,0);
	  fill(yellow);
  }
  else if (reportScore < 60){
	  var red = color(255,0,0);
	  fill(red);
  }
  else{ 
	  var green = color(0,255,0);
	  fill(green);
  }
  text(reportScore, circleCenterX + 20, circleCenterY - 120, 350, 350);

  	
  fill(255);
  //if the mouse was clicked and the chart needs to move
  if (moveIt == 1 && moved == 0){
      
      //move the circle slowly to the left 
      circleCenterX -= 10;
   
      if (circleCenterX <= ((eleWidth + (window.outerWidth - eleWidth))/ 4)){
        //set moveIt to 0 so it stops moving then
        //set moved to 1 so it doesnt move again 
        moveIt = 0;
        moved = 1;
        lines = 1;
        //set the x position of the line to the outside of the circle
        p1X = moveCircleLines - circleCenterX;
        resizeCanvas((eleWidth / 2) + 5, eleHeight);
        
        //half the div so that the dimesion breakdown can display
        document.getElementById("circleOperations").style.width = "50%";
        document.getElementById("circleOperations").style.float = "left";
        document.getElementById("circleOperations").style.opacity = .4;
        document.getElementById("myDimensionDiv").style.width = "50%";
        document.getElementById("myDimensionDiv").style.height = "90%";
        document.getElementById("myDimensionDiv").style.float = "right";
        
        
        document.getElementById("metricHeader").innerHTML = "Dimension Name:" + clickedDimension;
       
    
        
      }
  }
 if (lines == 1){
   //two lines from the point clicked on the circle as well as a rectangle for the data
   line(p1X, p1Y, p2X, window.outerHeight - eleHeight - (eleHeight / 7));
   line(p1X, p1Y, p2X, window.outerHeight - (eleHeight / 4));
  }
}

 


function mouseMoved() {
  mouseAngle = Math.PI / 2 - Math.atan((circleCenterX - mouseX) / (circleCenterY - mouseY));
  if(mouseY < circleCenterY) mouseAngle = mouseAngle + Math.PI;
}


//if a mouse is clicked, register that it is clicked so the chart cannot move again
//then set the original point of the two lines to the spot where the mouse was clicked
function mouseClicked(){

 for(var i=0,dx=0,dy=0;i<piedata.length;i++,dx=0,dy=0) {
   
    if(mouseAngle >= piedata[i][0] && mouseAngle < piedata[i][1] && (dist(circleCenterX,circleCenterY,mouseX,mouseY) > (window.outerWidth / 4.56) / 2 && dist(circleCenterX,circleCenterY,mouseX,mouseY) < (window.outerWidth / 3.3) / 2) ){
     moveCircleLines = pmouseX;
     p1X = circleCenterX;
     p1Y = circleCenterY;
     moveIt = 1;
     sessionStorage.setItem('selectedDimScoreID', JSON.stringify(clickedDimensionScore));
     angular.element(document.getElementById('mainThingsGoHere')).scope().getMetricScores();
    }
  }
}
