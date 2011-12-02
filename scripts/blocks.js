$(document).ready(function(){
	var level=1;
	var status=[
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0],
		[0,0,0,0,0,0]
	];
	
	$("#board .level").html(level);

	function newBlock() {
		var lane=Math.floor(Math.random()*6+1);
		var value=Math.floor(Math.random()*9+1);
		
		var $block=$("<div class='block "+color+"'>"+value+"</div>").data({"value":value,"lane":lane}).addClass("moving");
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
	
	$("#nav .button").click(function(){
		var cn=this.className.split(" ")[1];
		switch (cn) {
			case "left":
				moveLeft();
			break;
			
			case "right":
				moveRight();
			break;
			
			case "drop":
				drop();
			break;
		}
	});
});
