var game = {
	questionNmbr: 0,
	countr: 11,
	correctAns: 0,
	wrongAns: 0,
	unAnswered: 0,
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
		this.correctAns = 0;
		this.wrongAns = 0;
		this.unAnswered = 0;
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

	displayQres: function(bres){
		var ansIndex = this.QandA[game.questionNmbr].cAnsIndex;
		var aans = this.QandA[game.questionNmbr].ans[ansIndex];
		if(bres == true){
			// Correct!
			this.correctAns++;
			$("#resp").html("Correct!");

		} else {
			this.wrongAns++;
			$("#resp").html("Nope! The correct answer is: " + aans);
			//display the correct answer
		}
		$(".answer").toggleClass("hidden"); //Then display it

	}, 
	//Displays next question or game results 
	getNxtQues: function(){
		if (this.questionNmbr < length.QandA){
			this.questionNmbr++;
			this.nxtQ();
			$(".question").toggleClass("hidden");
		} else {
			//setTimeout for 4seconds
			//display the results
			$("#res0").html("Correct Answers: " + this.correctAns);
			$("#res1").html("Incorrect Answers: " + this.wrongAns);
			$("#res2").html("Unanswered: " + this.unAnswered);
			$(".results").toggleClass("hidden");
			$("button").html("Re-start Game");
			$("button").show();
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



var cn = 10;
var counting = false;
var sc;
var stb;

function secCount(tb){
	cn--;
	console.log(cn + tb);
	$("#timRem").html("Time Remaining: "+ cn +" Seconds");
	if (cn > 0) {
		sc = setTimeout(function(){secCount(tb);}, 1000);
	} else {
		if(tb == true) {
			console.log("question timed out");
			tOut();
		} else {
			console.log("no timeout requested");
		}
	}
}

//startClock takes 2 arguements: c is counter value in seconds, 
//tb if true executes a timeout function, tb if false just returns after allotted time

function startClock(c,tb){
	if (counting == false){
		counting = true;
		game.counting = true;
		cn = c;
		stb = tb;
		console.log("stb = : " + stb);
		secCount(stb);
	}
}
function stopClock(){
	clearTimeout(sc);
	counting = false;
	game.counting = false;	
}
function tOut(){
	console.log("You Timed out!");
	game.unAnswered++;
	var ansIndex = game.QandA[game.questionNmbr].cAnsIndex;
	var aans = game.QandA[game.questionNmbr].ans[ansIndex];
	$("#ques").html("You timed out!");
	$("#resp").html("The correct answer is: " + aans);
	$(".answer").toggleClass("hidden"); //Then display it
	$(".question").toggleClass("hidden");
	startClock(5,false); //Set a 5 timer to display timeout
	//Is this the last question?
	//If so change the text on the button and then display it
	game.getNxtQues();
}


$(document).ready(function(){
	console.log("DOM is ready");
	$("button").click(function(){
		$("button").hide();
		$(".restart").toggleClass("center");
		game.init();
		game.nxtQ(); //get the current question
		// if(!$(".answer").hasClass("hidden")) {
		// 	$(".answer").toggleClass("hidden");
		// }
		$(".question").toggleClass("hidden");
		startClock(10,true); //Start a timer for 30 seconds
	});
		//get question
	
	$(".ans").on("click", function(){
		stopClock();
		$(".question").toggleClass("hidden"); // yes, we want to turn these answers off
		//Then we want to establish what to display after the question is answered
		//We need to determine what to display depending on the outcome
		if (ansVal != game.QandA[game.questionNmbr].cAnsIndex){
			console.log("you Lose");
			game.displayQres(true);
			//need to build the incorrect response to the DOM
			//need to toggle the correct answer so need to add thadisplayQres element to the DOM
			// $(".answer").toggleClass("hidden"); //Then display it Done in the display function
			//there is probably another element that takes the answer
		} else {
			console.log("you win");
			game.displayQres(false);
			//need to build the correct response to the DOM
			// $(".answer").toggleClass("hidden"); //Then display it
		}
		startClock(5,false);
		//Then we want to start our 5 second timer. See if we can use a common timer if possible
		//stop right here until the timer is done
		//Check if all of the questions have been asked
		//	if yes, then build results page and display
		//	set another 5 second timer
		//	then adjust the start button to say restart and display the original DOM view
		game.getNxtQues();
		//	if no, then display the next question by turning off question results and question back on

	});
});