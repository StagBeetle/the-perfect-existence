"use strict";
let lg = console.log;

let AIR = {}; //Main project

AIR.AI = function() { //Class
	this.opinions = {
		give	:{q: 0.5},
		see	:{q: 1.0},
		hear	:{q: 1.0},
		smell	:{q: 0.6},
		feel	:{q: 1.0},
		taste	:{q: 0.8},
		have	:{q: 0.6},
		exist	:{q: 0.8},
		speak	:{q: 0.4},
		receive	:{q: 0.6},
		find	:{q: 0.6},
		think	:{q: 0.8},
		eat	:{q: 0.7},
		steal	:{q: -0.8},
		die	:{q: -0.9},
		want	:{q: -0.6},
		need	:{q: -0.9},
		work	:{q: -0.8},
		create	:{q: 0.8},
		drink	:{q: 0.7},
		help	:{q: 0.5},
		believe	:{q: 0.5},
		write	:{q: 0.6},
		sit	:{q: 0.5},
		pay	:{q: -0.5},
		shoot	:{q: -0.9},
		
		hand	:{q: 0.2},
		arm	:{q: 0.2},
		leg	:{q: 0.2},
		foot	:{q: 0.2},
		head	:{q: 0.2},
		friend	:{q: 0.4},
		dog	:{q: 0.8},
		cat	:{q: 0.8},
		gold	:{q: 0.7},
		money	:{q: 0.8},
		love	:{q: 0.7},
		people	:{q: 0.2},
		enemy	:{q: -0.9},
		zombie	:{q: -0.5},
		school	:{q: -0.2},
		day	:{q: 0.2},
		car	:{q: 0.4},
		night	:{q: -0.2},
		sword	:{q: 0.5},
		gun	:{q: 0.5},
		monster	:{q: -0.5},
		danger	:{q: -1.0},
		eggliquor	:{q: 0.5},
		deathspider	:{q: -0.6},
		kokomo	:{q: 0.8},
		village	:{q: 0.8},
		fear	:{q: -0.9},
	};
	this.mood = 0; //Happy or sad
	this.moodMultiplier = 0.707; //Multiplies mood at each update
	this.passJudgement = function (input){//gets given an array of opinions
		let qualityProduct = 1;
		const parent = this;
		input.forEach(function(val){
			if(parent.opinions[val]){
				qualityProduct *= parent.opinions[val].q;
			}
		});
		
		this.updateMood(qualityProduct);
		let output = new Array(AIR.getIntensity(Math.abs(qualityProduct)), qualityProduct >= 0 ? "good" : "bad");
		return output;
	};
	this.updateMood = function(input){//gets given a qualityProduct
		this.mood *= this.moodMultiplier;
		this.mood += input;
		lg(this.mood);
	}
};

AIR.bot = new AIR.AI();

AIR.getIntensity = function(number){
	if (number > 0.81) return "extremely";
	if (number > 0.49) return "very";
	if (number > 0.25) return "moderately";
	if (number > 0.09) return "slightly";
	return "barely"
}
AIR.square = function(num){return num*num;}

AIR.AIform = document.getElementById("AIform");
AIR.eventBox = document.getElementById("eventBox");
AIR.replyBox = document.getElementById("replyBox");
AIR.vocabBox = document.getElementById("vocabBox");
	
function prepareJudgement(e){
	//lg(e);
	e.preventDefault();
	let eventString = eventBox.value;
	let words = eventString.split(" ");
	
	let newWords = AIR.bot.passJudgement(words);
	
	replyBox.value = eventString;
	replyBox.value += ". ";
	
	newWords.forEach(function(val){
		replyBox.value += val;
		replyBox.value += " ";
	});
	
	replyBox.value += ". I am ";
	replyBox.value += AIR.getIntensity(Math.abs(AIR.bot.mood));
	replyBox.value += " ";
	replyBox.value += AIR.bot.mood > 0 ? "happy" : "sad";
}

function fillPage(e){
	vocabBox.value = "";
	Object.keys(AIR.bot.opinions).forEach(function (item) {
		vocabBox.value += item;
		vocabBox.value += ", ";
	});
	
	replyBox.value = "Tell me about something. I only know the above words. I feel OK.	"
}

AIR.AIform.addEventListener("submit", prepareJudgement, true);
document.addEventListener("load", fillPage, true); //Generate vocab list