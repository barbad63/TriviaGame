//set an interval for 1 second and executes a function that displays and then increments the second clock
//present a question to the user
//process each of the keys into an array wait for the response and then check 

var game = {
	secCount: 0,
	count: 31,
	correctAns: 0,
	wrongAns: 0,
	compAnsArr: ["Don"],
	userAnsArr: ["Holy Grail"],
	QandA: [{
		q: "What is my name?",
		ans: ["Don", "Bob", "Fred", "Lebron"]
	}, {
		q: "What is your Quest?",
		ans: ["food", "drink", "Holy Grail", "developer"]
	}],
	// answers: ["Don", "Holy Grail", "Buffalo"],

	init: function(){
		count = 0;
	},
	increment: function(){
		console.log(this.count--);
		if (this.count == 0){
			clearInterval(secCount);
		}
	},
	startTime: function(){
		console.log("building the question and displaying it");
		console.log(this.QandA[0].q);
		var ptr = this.QandA[0].q;
		$("#quest").html(this.QandA[0].ans[0]);	
	}

}


$(document).ready(function(){
	console.log("DOM is ready");
	$("button").click(function(){
		console.log("Hi");
		$("button").hide();
		$(".restart").toggleClass("center");
		game.init();
		$(".question").toggleClass("hidden");
		game.startTime();


	});

});

//Load the page including the button that starts the game
//when the start button is pushed the game is initialized 
//	1. set the next question
//	2. 
//get a question. I think they should be sequential, display it
//Set the interval timer to be a second timer to run in background
//The call back function to the timer should increment/decrement the counter
//	-check to see if time is up and if it is:
//		1. clear and reset the interval timer
//		2. display or execute the new question function 
//Process key strokes and check for answers
