air.AIform = document.getElementById("AIform");
air.eventBox = document.getElementById("eventBox");
air.replyBox = document.getElementById("replyBox");
air.vocabBox = document.getElementById("vocabBox");
air.memoryBox = document.getElementById("memoryBox");

air.prepareJudgement = function(e){
	e.preventDefault();
	let eventString = eventBox.value;
	let reply = air.bot.parseSentence(eventString);
	replyBox.value = eventString;
	replyBox.value += ". ";
	replyBox.value += reply;
	replyBox.value += ". I feel ";
	replyBox.value += air.getFullMood(air.bot.getValence());
	//lg(air.bot);
	air.memoryBox.value = "Memory:";
	air.bot.memory.forEach(function (item) {
		air.memoryBox.value += item.getMemory();
		air.memoryBox.value += " ";
		air.memoryBox.value += item.getScale();
		air.memoryBox.value += " ";
		air.memoryBox.value += item.getAge();
		air.memoryBox.value += " ";
		air.memoryBox.value += item.getOccurence();
		air.memoryBox.value += " ";
		air.memoryBox.value += item.getImportance();
		air.memoryBox.value += "\n";
	});
}

air.fillPage = function(e){//Runs on document load
	air.teachWordsTo(air.bot);
	switch(document.title){
		case "AI":
			vocabBox.value = "";
			let allWords = {...air.bot.vocab.verbs, ...air.bot.vocab.nouns};
			Object.keys(allWords).forEach(function (item) {
				vocabBox.value += item;
				vocabBox.value += ", ";
			});
			
			replyBox.value = "subject verb object preposition secondObject";
			eventBox.value = "i eat fish";
			break;
		case "AI Sentences":
			const verbs = Object.keys(air.defaultVerbs);
			verbs.forEach(function(verb){
				let numParams = air.defaultVerbs[verb].getNumberOfParameters();
				//for(let i = 0; i < 3; i ++){//Do each verb three times
					let sentence = air.generateSentence(verb);
					lg(sentence);
					lg(air.bot.processEmotions(sentence));
				//}
			});
		default:
			break;
	}
}

air.AIform.addEventListener("submit", air.prepareJudgement, true);
window.addEventListener("load", air.fillPage, true);