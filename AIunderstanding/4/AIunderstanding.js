"use strict";
let lg = console.log;
let air = {}; //Main project

air.noun = class{
	constructor(emotions, c_flags = []) {
		this.emotions = emotions;
		this.flags = c_flags.reduce((a,b)=> (a[b]='',a),{});
		this.getValence = function(){return this.emotions["v"];};
		this.hasFlag = function(name){return typeof this.flags[name] !== 'undefined';};
	};
	isGood(){return this.mood > 0;};
	isBad(){return this.mood < 0;};
}

air.verb = class{
	//Use mood as as multiplier as some verbs are more important?
	constructor(c_processFunction, mood, c_preposition){
		this.processFunction = c_processFunction;
		this.preposition = c_preposition;
		this.mood = mood;
	};
	
	getPreposition(){return this.preposition;}
	getValence(){return this.mood;}
	getNumberOfParameters(){return this.processFunction.length;}
	
	// getValence(){return this.mood;};
	// setMood(p_mood){mood = p_mood;};
}

air.adjective = class{
	//Use mood as as multiplier as some verbs are more important?
	constructor(c_multiplier){
		this.multiplier = c_multiplier;
	};
	
	geMultiplier(){return this.multiplier;}
}

air.memory = class{
	constructor(mem, scale){
		this.mem = mem;
		this.scale = scale;
		this.age = 0;
		this.occurence = 1;
	}
	getMemory(){return this.mem;}
	getScale(){return this.scale;}
	getAge(){return this.age;}
	getOccurence(){return this.occurence;}
	increaseAge(){this.age ++;}
	resetAge(){this.age = 0;}
	increaseOccurence(){this.occurence ++;}
	getImportance(){return this.scale * this.occurence * 1/(this.age+1);}
}

air.ai = class { //Class
	constructor(){
		this.mood = 0; //Happy or sad
		this.moodMultiplier = 0.707; //Multiplies mood at each update
		
		this.fear	= 0;
		this.disgust	= 0;
		this.surprise	= 0;
		this.anger	= 0;
		
		//Memory
		this.memory = new Array();
		
		//Words
			
		this.vocab = new Object();
		this.vocab.nouns = new Object();
		this.vocab.verbs = new Object();
		this.vocab.adjectives = new Object();
		this.vocab.prepositions = new Object();	
	}
	
	getValence () {return this.mood;};
	adjustMood (change){this.mood += change;}
	addMemory (mem){
		let foundMemory = false;
		for(let i = 0; i<this.memory.length; i++){
			this.memory[i].increaseAge();
			if(this.memory[i].getMemory() == mem.getMemory()){
				this.memory[i].increaseOccurence();
				this.memory[i].resetAge();
				foundMemory = true;
			}
		}
		if(!foundMemory){
			this.memory.push(mem);
		}
	}
	
	//Other stuff
	passJudgement (input){//gets given an array of words
		let words = input.split(" ");
		this.mood *= this.moodMultiplier; //Mood normalises to zero over time.
		
		let subject = words[0] ? words[0] : undefined;
		let verb = words[1] ? words[1] : undefined;
		let object = words[2] ? words[2] : undefined;
		let preposition = words[3] ? words[3] : undefined;
		let secondobject = words[4] ? words[4] : undefined;
		
		const wordsNumMap = [undefined, 2 ,3, 5];//Map number of nouns a verb takes to the number of verb a sentence with that verb in it will take (including verb + prepositions)
		
		
		//Check for word after preposition
		
		let reply = "";
		
		
		let knowsAllWords = true;
		words.forEach(function (item) {
			if(!this.doIKnow(item)){
				reply += "I do not know " + item + ". ";
				knowsAllWords = false;
			}
		}.bind(this));
		if(!knowsAllWords){
			return reply;
		}
		
		if(!this.vocab.verbs[verb]){
			reply+= "That is not a verb. ";
			return reply;
		}
		
		if(words.length != wordsNumMap[this.vocab.verbs[verb].getNumberOfParameters()]){
			reply += "I am confused by your choice of words. ";
			return reply;
		}
		
		if(this.vocab.verbs[verb].getNumberOfParameters() == 3){
			if (preposition != this.vocab.verbs[verb].getPreposition()){
				reply += "Wrong preposition. ";
				return reply;
			}
		}
		
		let verbFunc = this.vocab.verbs[verb].processFunction;
		let eventMood = verbFunc.bind(
			this, 
			this.vocab.nouns[subject], 
			this.vocab.nouns[object], 
			this.vocab.nouns[secondobject]
		)(); //MAYBE FIX THIS so it checks the words are right
		//return eventMood;
		
		reply += "That's " + air.getFullMood(eventMood);
		
		let mem = new air.memory(input, eventMood);
		this.addMemory(mem);

		return reply;
		}
	
	doIKnow (word){
		return this.vocab.nouns[word] ||	this.vocab.verbs[word] ||	this.vocab.prepositions[word] ;
	}
	


};//End AI

air.bot = new air.ai();

air.getIntensity = function(number){
	const absoluteNumber = Math.abs(number);
	if (absoluteNumber > 0.81) return "extremely";
	if (absoluteNumber > 0.49) return "very";
	if (absoluteNumber > 0.25) return "moderately";
	if (absoluteNumber > 0.09) return "slightly";
	return "very slightly"
}

air.getValence = function(number){
	if (number > 0.09) return "good";
	if (number > -0.09) return "average";
	return "bad";
}

air.getFullMood = function (number){
	const intensity = air.getIntensity(number);
	const mood = air.getValence(number);
	
	let reply = (mood != "average" ? intensity + " " : "") + mood;
	return reply;
}
air.square = function(num){return num*num;}

air.AIform = document.getElementById("AIform");
air.eventBox = document.getElementById("eventBox");
air.replyBox = document.getElementById("replyBox");
air.vocabBox = document.getElementById("vocabBox");
air.memoryBox = document.getElementById("memoryBox");
	
function prepareJudgement(e){
	//lg(e);
	e.preventDefault();
	let eventString = eventBox.value;
	let reply = air.bot.passJudgement(eventString);
	replyBox.value = eventString;
	replyBox.value += ". ";
	replyBox.value += reply;
	replyBox.value += ". I feel ";
	replyBox.value += air.getFullMood(air.bot.getValence());
	lg(air.bot);
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

function fillPage(e){//Runs on document load
	air.teachWordsTo(air.bot);
	vocabBox.value = "";
	let allWords = {...air.bot.vocab.verbs, ...air.bot.vocab.nouns};
	Object.keys(allWords).forEach(function (item) {
		vocabBox.value += item;
		vocabBox.value += ", ";
	});
	
	replyBox.value = "subject verb object preposition secondObject";
	eventBox.value = "i eat fish";
}

air.AIform.addEventListener("submit", prepareJudgement, true);
window.addEventListener("load", fillPage, true); //Generate vocab list