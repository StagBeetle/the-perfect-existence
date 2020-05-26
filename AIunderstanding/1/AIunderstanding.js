"use strict";
let lg = console.log;

let AI = new Object();

AI.words = new Array();

//q=0 for good or q=1 for bad
AI.words = {
	give	:{q: 0},
	see	:{q: 0},
	hear	:{q: 0},
	have	:{q: 0},
	exist	:{q: 0},
	speak	:{q: 0},
	receive	:{q: 0},
	find	:{q: 0},
	think	:{q: 0},
	eat	:{q: 0},
	steal	:{q: 1},
	die	:{q: 1},
	want	:{q: 1},
	need	:{q: 1},
	work	:{q: 1},
	keep	:{q: 0},
	create	:{q: 0},
	drink	:{q: 0},
	help	:{q: 0},
	believe	:{q: 0},
	write	:{q: 0},
	sit	:{q: 0},
	pay	:{q: 1},
	
	hand	:{q: 0},
	arm	:{q: 0},
	leg	:{q: 0},
	foot	:{q: 0},
	head	:{q: 0},
	friend	:{q: 0},
	dog	:{q: 0},
	cat	:{q: 0},
	gold	:{q: 0},
	love	:{q: 0},
	people	:{q: 0},
	enemy	:{q: 1},
	zombie	:{q: 1},
	school	:{q: 1},
	day	:{q: 0},
	car	:{q: 0},
	night	:{q: 1},
	sword	:{q: 0},
	gun	:{q: 0},
	monster	:{q: 1},
	danger	:{q: 1},
	eggliquor	:{q: 0},
	deathspider	:{q: 1},
};
AI.AIform = document.getElementById("AIform");
AI.eventBox = document.getElementById("eventBox");
AI.replyBox = document.getElementById("replyBox");
AI.vocabBox = document.getElementById("vocabBox");

function passJudgement(e){
	//lg(e);
	e.preventDefault();
	let eventString = eventBox.value;
	let words = eventString.split(" ");
	let qualitySum = 0;
	
	replyBox.value = eventString;
	replyBox.value += ". ";
	
	words.forEach(function(val){
		if(AI.words[val]){
			qualitySum += AI.words[val].q;
		}
	});
	if(qualitySum % 2 == 0){
		replyBox.value += "I am happy."
	} else {
		replyBox.value += "I am sad."
	}
}

function fillVocab(e){
	vocabBox.value = "";
	Object.keys(AI.words).forEach(function (item) {
		vocabBox.value += item;
		vocabBox.value += ", ";
	});

}

AI.AIform.addEventListener("submit", passJudgement, true);
document.addEventListener("load", fillVocab, true);