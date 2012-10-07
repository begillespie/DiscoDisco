//  DiscoDisco
//  https://www.github.com/begillespie/discodisco
//  by Brian Gillespie
//  GPL license, see README for more information

//=========================================================================
//  defaults
var cellHeight = 25;    //size in px
var cellWidth = 50;
var bpm = 140;     // dubstep beat
var interval = Math.floor((60 / bpm) * 1000);      //speed in ms
var numThreads = 10;     //number of cells to change per iteration
//==========================================================================

  //  random color generator, returns a string in the form of 'rgb(xxx,xxx,xxx)'
function random_color(){
	var rgb = [];
	for(var i=0; i<3; i++){
		rgb[i] = Math.floor(Math.random()*256);
	}
	var rgbStr = "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";     //format the color as an rgb string
	return rgbStr;
	}
	
var numRows;
var numCols;

$(document).ready(function(){
	var $disco = $('#disco');
	$("#interval_control_value").text(bpm);
	$("#numthread_control_value").text(numThreads);
	$("#cellwidth_control_value").text(cellWidth);
	$("#cellheight_control_value").text(cellHeight);
			
			
			
    $("#interval_control").slider({
		min: 50,
		max: 500,
		value: bpm,
		slide: function(event, ui){
			$("#interval_control_value").text(ui.value);
			bpm = ui.value;
			interval = Math.floor((60 / bpm) * 1000);      //speed in ms
		},
		stop: function(event, ui){
			clearInterval(cellInterval);
			change_color();
		}
	});  //{orientation: "vertical"}
    $("#numthread_control").slider({
		min: 1,
		max: 30,
		value: numThreads,
		slide: function(event, ui){
			$("#numthread_control_value").text(ui.value);
			numThreads = ui.value;
		}
	});
    $("#cellwidth_control").slider({
		min: 5,
		max: 200,
		value: cellWidth,
		slide: function(event, ui){
			$("#cellwidth_control_value").text(ui.value);
			cellWidth = ui.value;
			draw_cells();
		},
		stop: function(event, ui){
			clearInterval(cellInterval);
			change_color();
		}
	});
    $("#cellheight_control").slider({
		min: 5,
		max: 100,
		value: cellHeight,
		slide: function(event, ui){
			$("#cellheight_control_value").text(ui.value);
			cellHeight = ui.value;
			draw_cells();
		},
		stop: function(event, ui){
			clearInterval(cellInterval);
			change_color();
		}
	});
	
	function print_values(){
		var value =$("#interval_control").slider( "option", "values" );
		console.log(value);
	}
	function draw_cells(){
		var windowHeight = $(window).height();     //find available window size
		var windowWidth = $(window).width();
		numRows = Math.floor(windowHeight / cellHeight);     //find the number of cells that will fit in the area
		numCols = Math.floor((windowWidth - 150) / cellWidth);
		$disco.html("");
		$disco.width(numCols * cellWidth);
		$('#container').width(numCols * cellWidth + 150);     //set a fixed width for the container div so we can center it horizontally in the CSS
		console.log("Window dimensions:", windowHeight, windowWidth);     //debug
		console.log("Grid size:", numRows, numCols, "Total cells:", numRows * numCols);              //debug
				for(var i = 0; i < numRows; i++){     //generate blocks. Each block has an ID and starting color
			for(var j = 0; j < numCols; j++){
				$disco.append("<div class='cell' id='cellx" + j + "y" + i + "' style='background-color:"+random_color()+";'></div>");
					// html: <div class='cell' id='cellx0y0' style='background-color:rgb(0, 0, 0); height: 50px; width: 100px'></div>
			}
		}
		//  set the size of the cells to fill the window
		var $cell = $('.cell');
		$cell.height(cellHeight);
		$cell.width(cellWidth);
		}

	function flash_color(){     //  flashes a random cell momentarily to white, then to a random color
		var cells = [];
		for(i=0; i<numThreads; i++){
			var x = Math.floor(Math.random()*numCols);     //choose a random cell
			var y = Math.floor(Math.random()*numRows);
			var cellID = "cellx" + x + "y" + y;            //build the cell's ID
			var color = random_color();                     //generate a color
			cells.push([cellID, color]);
		}
//			console.log(cells);     //debug
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

	function change_color(){
		cellInterval = setInterval(flash_color, interval);
	}
	
	$disco.click(function(){     //stop
		clearInterval(cellInterval);
	});
	
	draw_cells();
	change_color();
});