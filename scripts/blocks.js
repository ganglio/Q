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
	var skyline=[0,0,0,0,0,0];
	var goals=[0,0,0,0,0,0]
	
	$("#board .level").html(level);

	function newBlock() {
		var lane=Math.floor(Math.random()*6);
		var value=Math.floor(Math.random()*9+1);
		
		var $block=$("<div class='block'>"+value+"</div>").data({"value":value,"lane":lane}).addClass("moving");
		$("#l"+lane).append($block);
	}
	
	$("#pressme").click(function(){
		newBlock();
	});
	
	function start(){
		for (i in goals) {
			$("#g"+i).html(goals[i]=Math.floor(Math.random()*9+1));
		}
		newBlock();
	};
	
	function moveLeft() {
		var $block=$(".block.moving");
		var curLane=$block.data("lane");
		
		if (curLane>0) {
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
		
		if (curLane<5) {
			curLane++;
			var $nb=$block.clone(true)
			$nb.data("lane",curLane);
			$block.remove();
			$("#l"+curLane).append($nb);
		}
	}
	
	function drop() {
		var $block=$(".block.moving");
		var curLane=$block.data("lane");

		$block.css({"bottom":60*skyline[curLane]}).removeClass("moving");
		status[skyline[curLane]++][curLane]=$block.data("value");
		checkGoals();
		newBlock();
	}
	
	function checkGoals(){
		for (lane=0;lane<6;lane++) {
			var curr=0;
			for (row=8;row>=0;row--) 
				if (status[row][lane]!=0) {
					curr+=status[row][lane];
					if (curr==goals[lane]) {
						$("#g"+lane).html(goals[lane]=Math.floor(Math.random()*9+1));
					} else if (curr>goals[lane])
						curr=status[row][lane];
				}
		}
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
	
	$(document).keypress(function(e){
		switch(e.keyCode) {
			case 37:
				moveLeft();
				return false;
			break;
			
			case 39:
				moveRight();
				return false;
			break
			
			case 40:
				drop();
				return false;
			break;
		}
	})
	
	$("#splash .button.start").click(function(){
		$("#splash").hide();
		start();
	});
});
