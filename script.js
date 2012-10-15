//  DiscoDisco
//  https://www.github.com/begillespie/discodisco
//  by Brian Gillespie, 2012
//  GPL license, see README for more information

$(document).ready(function(){
//================================================================
//  defaults
	var cellHeight = 25;                               // size in px
	var cellWidth = 50;
	var bpm = 140;                                     // dubstep beat
	var numThreads = 10;                               // number of cells to change per iteration
//================================================================

	var $controlpanel = $("#controlpanel");
	var $disco = $('#disco');                          // Where the magic happens

	var numRows;
	var numCols;
	var interval = Math.floor((60 / bpm) * 1000);      // speed in ms

	$(".trigger").click(function(){     // animate the sliding control panel
		$controlpanel.toggleClass('closed', 400);
		if ($controlpanel.hasClass('closed')){
			$('.trigger').html('&#9660; Controls');  // change the triangle character to point the right way
		}else{
			$('.trigger').html('&#9650; Controls');
		}
	});

	//  set up four jQueryUI sliders to adjust parameters
	$("#interval_control").slider({       // control the speed. readout is in beats per minute (BPM)
		min: 50,
		max: 500,
		value: bpm,
		create: function(event, ui){
			$("#interval_control_value").text(bpm);
		},
		slide: function(event, ui){
			$("#interval_control_value").text(ui.value);
			bpm = ui.value;
		},
		stop: function(event, ui){
			interval = Math.floor((60 / bpm) * 1000);      //speed in ms
			clearInterval(cellInterval);
			change_color();
		}
	});
	$("#numthread_control").slider({      // control the number of cells changed per iteration
		min: 1,
		max: 50,
		create: function(event, ui){
			$("#numthread_control_value").text(numThreads);
		},
		value: numThreads,
		slide: function(event, ui){
			$("#numthread_control_value").text(ui.value);
			numThreads = ui.value;
		}
	});
	$("#cellwidth_control").slider({      // control the width of the cells
		min: 20,
		max: 200,
		create: function(event, ui){
			$("#cellwidth_control_value").text(cellWidth);
		},
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
	$("#cellheight_control").slider({     // control the height of the cells
		min: 20,
		max: 100,
		create: function(event, ui){
			$("#cellheight_control_value").text(cellHeight);
		},
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

		//  random color generator, returns a string in the form of 'rgb(xxx,xxx,xxx)'
	function random_color(){
		var rgb = [];
		for(var i=0; i<3; i++){
			rgb[i] = Math.floor(Math.random()*256);
		}
		var rgbStr = "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";     //format the color as an rgb string
		return rgbStr;
		}

		// builds the grid of cells to fill the window and initializes them with ramdom colors
	function draw_cells(){
		var windowHeight = $(window).height();               // find available window size
		var windowWidth = $(window).width();
		var htmlstring = ""
		numRows = Math.floor(windowHeight / cellHeight);     // find the number of cells that will fit in the area
		numCols = Math.floor((windowWidth) / cellWidth);
		$disco.html("");                                     // clear the dancefloor
		$disco.width(numCols * cellWidth);                   // fix the width of the <div> so we can center it in CSS
		console.log("Window dimensions:", windowHeight, windowWidth);     //debug
		console.log("Grid size:", numRows, numCols, "Total cells:", numRows * numCols);     //debug
		for(var i = 0; i < numRows; i++){                // generate blocks. Each block has an ID and starting color
			for(var j = 0; j < numCols; j++){
				htmlstring += "<div class='cell' id='cellx" + j + "y" + i + "' style='background-color:"+random_color()+";'></div>"
			}
					// html: <div class='cell' id='cellx0y0' style='background-color:rgb(0, 0, 0);'></div>
		}
		$disco.html(htmlstring)
		  //  set the size of the cells to fill the window
		var $cell = $('.cell');
		$cell.height(cellHeight);
		$cell.width(cellWidth);
		}

	function flash_color(){     //  flashes a random cell momentarily to white, then to a random color
		var cells = [];
		for(i=0; i<numThreads; i++){                       // for loop produces an array of random cells with their new random colors
			var x = Math.floor(Math.random()*numCols);     // choose a random cell
			var y = Math.floor(Math.random()*numRows);
			var cellID = "cellx" + x + "y" + y;            // build the cell's ID
			var color = random_color();                    // generate a color
			cells.push([cellID, color]);
		}
// console.log(cells);     //debug
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
	
	$disco.click(function(){     // stop
		clearInterval(cellInterval);
	});
	
	draw_cells();
	change_color();
});

