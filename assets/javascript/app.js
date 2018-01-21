var game = {
	questionNmbr: 0,
	countr: 31,
	correctAns: 0,
	wrongAns: 0,
	unAnswered: 0,
	QandA: [{
		q: "Who wrote 'The Little Mermaid'?",
		ans: ["King", "Twain", "Buckley", "Christian Andersen"],
		cAnsIndex: 3 //Correct Answer Index
	}, { 
		q: "What is your Quest?",
		ans: ["food", "party", "Holy Grail", "developer"],
		cAnsIndex: 3 //Correct Answer Index
	}, {
		q: "In what year was the US Constitution written?",
		ans: ["1776", "1492", "1787", "1812"],
		cAnsIndex: 2 //Correct Answer Index
	}, {
		q: "Which planet has the most oxygen?",
		ans: ["Saturn", "Earth", "Neptune", "Mars"],
		cAnsIndex: 0 //Correct Answer Index
	}, {
		q: "What is my name?",
		ans: ["Don", "Bob", "Fred", "Lebron"],
		cAnsIndex: 0 //Correct Answer Index
	},],
	init: function(){
		console.log("Init");
		this.guessWrong = false;
		this.timedOut = false;
		this.correctAns = 0;
		this.wrongAns = 0;
		this.unAnswered = 0;
		this.questionNmbr = 0;
	},

	displayQres: function(bres){
		var ansIndex = this.QandA[game.questionNmbr].cAnsIndex;
		var aans = this.QandA[game.questionNmbr].ans[ansIndex];
		if(bres === true){
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
	nxtQ: function(){
		$("h2").hover(function(){
			$(this).css("background-color", "#ccff99")
		}, function(){
			$(this).css("background-color", "#ffff99")
		});
		var Qnmbr = this.questionNmbr;
		$("#ques").html(this.QandA[Qnmbr].q);
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
	}
}



var cn = game.countr;
var counting = false;
var sc;
var stb;

function strt30Cnt(){
	cn--;
	console.log(cn + "secs");
	$("#timRem").html("Time Remaining: "+ cn +" Seconds");
	sc = setTimeout(function(){
		if (cn > 0) {
			strt30Cnt(); //continue counting
		} else {tOut();}//handle the time out
	}, 1000);
}


function strt5secCnt(hdlFunc){
	sc = setTimeout(function(){
		hdlFunc();
	}, 5000); // use a 5 second timer
}
function stopClock(){
	clearTimeout(sc);
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
	strt5secCnt(getNxtQues); //Set a 5 timer to display timeout and set the call back function to get the next question
}
function getNxtQues(){
	var qn = game.questionNmbr;
	if (qn < game.QandA.length-1){
		game.questionNmbr++;
		game.nxtQ()
		console.log("more questions");
		$(".answer").toggleClass("hidden");
		$(".question").toggleClass("hidden");
		cn = game.countr;
		strt30Cnt();
	} else {
		console.log("Game over! Your results:");
		$(".answer").toggleClass("hidden"); //Then display it
		$("#ques").html("Game over! Your results:");
		$("#res0").html("Correct Answers: " + game.correctAns);
		$("#res1").html("Incorrect Answers: " + game.wrongAns);
		$("#res2").html("Unanswered: " + game.unAnswered);
		$(".results").toggleClass("hidden");
		}
}

//Wait for the document to load
$(document).ready(function(){
	console.log("DOM is ready");
	$("button").click(function(){
		$("button").hide();
		$(".restart").toggleClass("center");
		game.init();
		game.nxtQ(); //get the current question
		$(".question").toggleClass("hidden");
		$(".quesResults").toggleClass("hidden");
		cn = game.countr;
		strt30Cnt(); //Start a timer for 30 seconds
	});
	
	$(".ans").on("click", function(){
		var ansVal = parseInt($(this).attr("value"));
		stopClock(); //Stop the 30 second timer
		$(".question").toggleClass("hidden"); // yes, we want to turn these answers off

		if (ansVal === game.QandA[game.questionNmbr].cAnsIndex){

			game.displayQres(true);
		} else {
			game.displayQres(false);
		}
		strt5secCnt(getNxtQues); //delay for 5 seconds, pass the next function as an arguement
	});

	$(".rst").on("click", function(){
		game.init();
		game.questionNmbr = 0;
		game.nxtQ(); //get the current question
		$(".question").toggleClass("hidden"); // yes, we want to turn these answers on
		$(".results").toggleClass("hidden");
		cn = game.countr;
		strt30Cnt(); //Start a timer for 30 seconds
	});
});