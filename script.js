//  DiscoDisco
//  https://www.github.com/begillespie/discodisco
//  by Brian Gillespie
//  GPL license, see README for more information

//=========================================================================
//  a few global variables to set up the effect
//  Customize the effect by modifying these variables
var cellHeight = 25;    //size in px
var cellWidth = 50;

var interval = 120;      //speed in ms
var numThreads = 8;     //number of cells to change per iteration
//==========================================================================

  //  random color generator, returns a string in the form of 'rgb(xxx,xxx,xxx)'
  function randomColor(){
    var rgb = [];
	for(var i=0; i<3; i++){
	  rgb[i] = Math.floor(Math.random()*256);
	}
	var rgbStr = "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";     //format the color as an rgb string
	return rgbStr;
  }
  
$(document).ready(function(){
  var windowHeight = $(window).height();     //find available window size
  var windowWidth = $(window).width();

  var numRows = Math.floor(windowHeight / cellHeight);     //find the number of cells that will fit in the area
  var numCols = Math.floor(windowWidth / cellWidth);

  $('#container').width(numCols * cellWidth);     //set a fixed width for the container div so we can center it horizontally in the CSS

  console.log("Window dimensions:", windowHeight, windowWidth);     //debug
  console.log("Grid size:", numRows, numCols);              //debug

  var $container = $('#container');
  for(var i = 0; i < numRows; i++){     //generate blocks. Each block has an ID and starting color
    for(var j = 0; j < numCols; j++){
      $container.append("<div class='cell' id='cellx" + j + "y" + i + "' style='background-color:"+randomColor()+";'></div>");
        // html: <div class='cell' id='cellx0y0' style='background-color:rgb(0, 0, 0); height: 50px; width: 100px'></div>
    }
  }
  
  //  set the size of the cells to fill the window
  var $cell = $('.cell');
  $cell.height(cellHeight);
  $cell.width(cellWidth);

  function flashColor(){     //  flashes a random cell momentarily to white, then to a random color
	var cells = [];
	for(i=0; i<numThreads; i++){
		var x = Math.floor(Math.random()*numCols);     //choose a random cell
		var y = Math.floor(Math.random()*numRows);
		var cellID = "cellx" + x + "y" + y;            //build the cell's ID
		var color = randomColor();                     //generate a color
		cells.push([cellID, color]);
	}
		console.log(cells);     //debug
		
	for(j=0; j<cells.length; j++){
		$("#"+cells[j][0]).css("background-color", "white");     //create a "flashing" effect
	}
	setTimeout(func, Math.floor(interval/2));     //timeout function changes the cells to a random color after half the interval length
	function func(){
	  for(k=0; k<cells.length; k++){
		$("#"+cells[k][0]).css("background-color", cells[k][1]);
	  }
	}
  }

  function changeColor(){
    cellInterval = setInterval(flashColor, interval);
  }
  $container.click(function(){     //stop
    clearInterval(cellInterval);
  });
  
  changeColor();
});