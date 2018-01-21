//set an interval for 1 second and executes a function that displays and then increments the second clock
//present a question to the user
//process each of the keys into an array wait for the response and then check 


var game = {
	questionNmbr: 0,
	countr: 11,
	correctAns: 0,
	wrongAns: 0,
	counting: false,
	timedOut: false,
	guessWrong: false,
	QandA: [{
		q: "What is my name?",
		ans: ["Don", "Bob", "Fred", "Lebron"],
		cAnsIndex: 0 //Correct Answer Index
	}, {
		q: "What is your Quest?",
		ans: ["food", "party", "Holy Grail", "developer"],
		cAnsIndex: 1 //Correct Answer Index
	}],
	init: function(){
		console.log("Init");
		this.guessWrong = false;
		this.timedOut = false;
	},
	decrement: function(){
		console.log("This is this: " + this);
		var self = this;
		console.log(self.countr);
		var lcount = (this.countr)--;
		console.log(lcount);
		if (this.countr == 0){
			clearInterval(secCount);
			this.timeFailure();
			this.startTimer();
		}
	},
	lose: function(){
		console.log("Nope, that's not it");
		clearTimeout(this.timHandle);
	},
	timeFailure: function(){
		console.log("timeout failure");
		clearTimeout(this.timHandle);
	},
	win: function(){
		console.log("Yes, you won");
		clearTimeout(this.timHandle);
	},
	startTimer: function(){
		var self = this;
		console.log("starting the 1 second timer: This: " + this);
		self.timHandle = setTimeout(self.decrement, 1000);
	},
	//get question: report status to user, show the correct answer for 3 seconds toggle question data change screena
	//is this the last question. If so then tally the results and present the restart button
	//if not last, then get the next question and present to the 
	//
	getNxtQues: function(bres){
		if(bres == true){
			// Correct!
			$("#resp").html("Correct!");

		} else {
			$("#resp").html("Nope!");

		}
		//starts timeout for 4 seconds
		//displays question results 
		if (this.questionNmbr < length.QandA){
			this.questionNmbr++;
			this.nxtQ();
		} else {
			//setTimeout for 4seconds
			//display the results
		}
	},
	nxtQ: function(){
		console.log("building the question and displaying it: this: " + this);
		$("h2").hover(function(){
			$(this).css("background-color", "#ccff99")
		}, function(){
			$(this).css("background-color", "#ffff99")
		});
		var Qnmbr = this.questionNmbr;
		$("#quest").html(this.QandA[Qnmbr].q);
		console.log(this.QandA[Qnmbr].q);
		var ansArray = this.QandA[Qnmbr].ans;
		for (var i = 0; i < ansArray.length; i++) {
			switch(i) {
				case 0:
					$("#ans0").html(ansArray[i]);
					break;
				case 1:
					$("#ans1").html(ansArray[i]);
					break;
				case 2:
					$("#ans2").html(ansArray[i]);
					break;
				case 3:
					$("#ans3").html(ansArray[i]);
					break;
				default:
					$("#ans0").html("There is a problem");
			}
		}
		console.log("More of this: " + this);	
	}
}

var timHandle;

function decrement(){
	console.log("This is decrement");
	var lcount = game.countr;
	lcount--;
	game.countr = lcount;
	console.log(lcount);
	if (lcount == 0){
		game.timeFailure();
	} else {
		game.timHandle = setTimeout(decrement, 1000);
	}
}
function win(){
	console.log("Yes, you won: " + game.timHandle);
	clearTimeout(timHandle);
}
var cn = 10;
var counting = false;
var sc;

function secCount(){
	cn--;
	console.log(cn);
	if (cn > 0) {
		sc = setTimeout(secCount, 1000);
	} else {
		console.log("question timed out");
		game.timedOut = true;
	}
}
function startClock(){
	if (counting == false){
		counting = true;
		game.counting = true;
		secCount();
	}
}
function stopClock(){
	clearTimeout(sc);
	counting = false;
	game.counting = false;	
}

$(document).ready(function(){
	console.log("DOM is ready");
	$("button").click(function(){
		$("button").hide();
		$(".restart").toggleClass("center");
		game.init();
		// if(!$(".answer").hasClass("hidden")) {
		// 	$(".answer").toggleClass("hidden");
		// }
		$(".question").toggleClass("hidden");
		startClock();
		game.nxtQ(); //or get question
	});
		//get question
	
	$(".ans").on("click", function(){
		$(".answer").toggleClass("hidden");
		$(".question").toggleClass("hidden");
		stopClock();
		cn = 4;
		console.log(this);
		var ansVal = $(this).attr("value");
		console.log("This is the attr val: " + ansVal);
		startClock();
		if (ansVal != game.QandA[game.questionNmbr].cAnsIndex){
			console.log("you Lose");
			$(".answer").toggleClass("hidden");
			$(".question").toggleClass("hidden");
			game.getNxtQues(false);
			// stopClock();
			$(".answer").toggleClass("hidden");
			$(".question").toggleClass("hidden");

			//	get question
		} else {
			console.log("you win");
			$(".answer").toggleClass("hidden");
			$(".question").toggleClass("hidden");
			game.getNxtQues(true);
			// stopClock();
			$(".answer").toggleClass("hidden");
			$(".question").toggleClass("hidden");

			//	get question
		}
		
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
