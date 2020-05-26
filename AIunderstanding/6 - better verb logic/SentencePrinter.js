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

window.addEventListener("load", air.fillPage, true);