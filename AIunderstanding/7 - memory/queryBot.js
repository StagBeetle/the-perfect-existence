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
	
	air.drawMemory();
	air.bot.growOlder();
}

air.getDrawPosition = function(verb){
	let m = air.memoryCanvas;
	const verbsNames = Object.keys(air.defaultVerbs);
	const verbsLength = verbsNames.length;
	const elementsPerSide = Math.floor(Math.pow(verbsLength, 0.5));
	
	const width  = m.canvas.getClientRects()[0].width;
	const height = m.canvas.getClientRects()[0].height;	
	
	const margin = 60;
	
	const horizontalDistance	= (width	- 2*margin) / elementsPerSide;
	const verticalDistance	= (height	- 2*margin) / elementsPerSide;
	
	const index = verbsNames.indexOf(verb);
	
	const xIndex = index % elementsPerSide;
	const yIndex = Math.floor(index / elementsPerSide);
	
	let position = new Object();
	
	position['x'] = margin + horizontalDistance * xIndex;
	position['y'] = margin + verticalDistance * yIndex;
	
	position["nounY"] = margin + verticalDistance * yIndex + 20;
	
	position[0] = position['x'] + 20 * 0;
	position[1] = position['x'] + 20 * 1;
	position[2] = position['x'] + 20 * 2;
	//lg(position);
	return position;
}

air.drawLine = function(ax, ay, bx, by){
	let m = air.memoryCanvas;
	m.beginPath();
	m.moveTo(ax, ay);
	m.lineTo(bx, by);
	m.stroke();
}

air.drawMemory = function(){
	let m = air.memoryCanvas;
	
	const width  = m.canvas.getClientRects()[0].width;
	const height = m.canvas.getClientRects()[0].height;	
	
	m.canvas.width	= width;
	m.canvas.height	= height;
	
	const verbsNames = Object.keys(air.defaultVerbs);
	
	m.textBaseline = "top";
	
	//let counter = 0;
	verbsNames.forEach(function (verb) {
		const position = air.getDrawPosition(verb);
		m.font = "20px Arial";
		m.fillText(verb, position.x, position.y);

		let prepositions = air.defaultVerbs[verb].getVerbField();
		let prepCounter = 0;
		m.font = "10px Arial";
		prepositions.forEach(function(value){
			if(value > 0){//If it uses this obj/subj/indire
				
				m.fillText(air.prepositionNames[prepCounter], position[prepCounter], position["nounY"]);
				let links = air.bot.storage.vocab.verbs[verb].links;
				let linkCounter = 0;
				links.forEach(function(linksPerWord){
					linksPerWord.forEach(function(link){
						let otherPosition = air.getDrawPosition(link.verb);
						const age = link.age;
						//lg(age);
						if(age < 7){
							let colour = air.generateHslaColors(7)[age-1];
							m.strokeStyle = colour;
							
							air.drawLine(
								position[linkCounter]	+ 5,
								position["nounY"]	+ 5,
								otherPosition[link.position]	+ 5,
								otherPosition["nounY"]	+ 5
								);
							m.beginPath();
							m.arc(otherPosition[link.position]	+ 5, otherPosition["nounY"]	+ 5, 5, 0, 2 * Math.PI);
							m.stroke(); 
						}
					});
					linkCounter++;
				});
			}
			prepCounter++;
		});
	});
	
	//let allWords = {...air.bot.vocab.verbs, ...air.bot.vocab.nouns};
	// Object.keys(allWords).forEach(function (item) {
		// vocabBox.value += item;
		// vocabBox.value += ", ";
	// });	
	
}

air.setup = function(e){//Runs on document load
	air.teachWordsTo(air.bot);
	air.drawMemory();	
	air.prepareJudgement("i see fish");
	air.prepareJudgement("i eat fish");
}

window.addEventListener("resize", air.drawMemory, true);

air.AIform.addEventListener("submit", air.prepareJudgement, true);
window.addEventListener("load", air.setup, true);