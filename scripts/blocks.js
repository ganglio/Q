$(document).ready(function(){
	var colors={
		1:"red",
		2:"yellow",
		3:"green",
		4:"cyan",
		5:"blue",
		6:"magenta"
	};
	
	var level=1;
	
	$("#board .level").html(level);

	function newBlock() {
		var lane=Math.floor(Math.random()*6+1);
		var value=Math.floor(Math.random()*9+1);
		var color=colors[Math.floor(Math.random()*6+1)];
		
		var $block=$("<div class='block "+color+"'>"+value+"</div>").data({"value":value,"color":color,"lane":lane}).addClass("moving");
		$("#l"+lane).append($block);
	}
	
	$("#pressme").click(function(){
		newBlock();
	});
	
	function moveLeft() {
		var $block=$(".block.moving");
		var curLane=$block.data("lane");
		
		if (curLane>1) {
			curLane--;
			var $nb=$block.clone(true)
			$nb.data("lane",curLane);
			$block.remove();
			$("#l"+curLane).append($nb);
		}
	}
	
	function moveRight() {
		var $block=$(".block.moving");
		var curLane=$block.data("lane");
		
		if (curLane<9) {
			curLane++;
			var $nb=$block.clone(true)
			$nb.data("lane",curLane);
			$block.remove();
			$("#l"+curLane).append($nb);
		}
	}
	
	function drop() {
	}
	
	$(document).keyup(function(e) {
		switch (e.keyCode) {
			case 37:
				moveLeft()
			break;
			
			case 39:
				moveRight();
			break;
			
			case 40:
				drop();
			break;
		}
	});
});
