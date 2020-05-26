air.AIform = document.getElementById("AIform");
air.eventBox = document.getElementById("eventBox");
air.replyBox = document.getElementById("replyBox");
//air.vocabBox = document.getElementById("vocabBox");
air.memoryCanvasHTML = document.getElementById("memoryCanvas");
air.memoryCanvas = air.memoryCanvasHTML.getContext("2d");

air.prepareJudgement = function(e){//e = form or string
	let eventString = undefined;
	const type = typeof e;
	switch(type){
		case "object" :
			e.preventDefault();
			eventString = eventBox.value;
			break;
		case "string" :
			eventString = e;
			break;
	}
	
	let reply = air.bot.parseSentence(eventString);
	
	//Form reply
	replyBox.value = eventString;
	replyBox.value += ". ";
	replyBox.value += reply;
	replyBox.value += ". I feel ";
	replyBox.value += air.getFullMood(air.bot.getValence());
	//lg(air.bot);
	
	air.drawMemoryLinks();
	air.bot.growOlder();
}



air.setup = function(e){//Runs on document load
	air.teachWordsTo(air.bot);
	air.draw();	
}

window.addEventListener("resize", air.draw, true);

air.AIform.addEventListener("submit", air.prepareJudgement, true);
window.addEventListener("load", air.setup, true);