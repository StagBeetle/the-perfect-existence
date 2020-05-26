"use strict";
let lg = console.log;
let air = {}; //Main project

air.emotion = class{
	constructor(valence, parent, opposite){
		this.valence = valence;
		this.parent = parent;
		this.opposite = opposite;
	};
	getOpposite(){return this.opposite;}
	getParent(){return this.opposite;}
}

air.rand = function(limit){
	return Math.floor(Math.random()*limit);
}


air.emotions = new Object();
air.emotions = {
	"good"	: new air.emotion( 1.0	, null	, "bad"	),
	"bad"	: new air.emotion(-1.0	, null	, "good"	),
	"admiration"	: new air.emotion( 0.3	, "awe"	, "disgust"	),
	"adoration"	: new air.emotion( 0.3	, "awe"	, "disgust"	),
	"aestheticappreciation"	: new air.emotion( 0.3	, "excitement"	, "sadness"	),
	"amusement"	: new air.emotion( 0.3	, "excitement"	, "sadness"	),
	"anger"	: new air.emotion(-0.8	, "bad"	, "calm"	),
	"anxiety"	: new air.emotion(-0.5	, "fear"	, "calm"	),
	"awe"	: new air.emotion( 0.5	, "joy"	, "disgust"	),
	"akwardness"	: new air.emotion(-0.2	, "anxiety"	, "calm"	),
	"boredom"	: new air.emotion(-0.3	, "sadness"	, "joy"	),
	"calm"	: new air.emotion( 0.7	, "good"	, "fear"	),
	"confusion"	: new air.emotion(-0.3	, "anxiety"	, "calm"	),
	"craving"	: new air.emotion(-0.3	, "anxiety"	, "calm"	),
	"disgust"	: new air.emotion(-0.7	, "bad"	, "joy"	),
	"empathicpain"	: new air.emotion(-0.5	, "sadness"	, "joy"	),
	"entrancement"	: new air.emotion( 0.3	, "awe"	, "disgust"	),
	"excitement"	: new air.emotion( 0.5	, "joy"	, "sadness"	),
	"fear"	: new air.emotion(-0.8	, "bad"	, "calm"	),
	"horror"	: new air.emotion(-0.7	, "fear"	, "calm"	),
	"interest"	: new air.emotion( 0.2	, "awe"	, "disgust"	),
	"joy"	: new air.emotion( 0.7	, "good"	, "sadness"	),
	"nostalgia"	: new air.emotion( 0.5	, "calm"	, "anxiety"	),
	"relief"	: new air.emotion( 0.5	, "calm"	, "anxiety"	),
	"romance"	: new air.emotion( 0.5	, "sexualdesire"	, "sadness"	),
	"sadness"	: new air.emotion(-0.8	, "bad"	, "joy"	),
	"satisfaction"	: new air.emotion( 0.5	, "calm"	, "fear"	),
	"sexualdesire"	: new air.emotion( 0.7	, "good"	, "sadness"	),
	"surprise"	: new air.emotion( 0.0	, null	, null	),
};//is hope an emotion
air.emotionNames = Object.keys(air.emotions);

air.noun = class{
	constructor(emotions, objClass, c_flags = []) {
		this.tangiblity = objClass;
		this.emotions = emotions;
		this.flags = c_flags.reduce((a,b)=> (a[b]='',a),{});
		this.getValence = function(){return this.emotions["v"];};
		this.hasFlag = function(name){return typeof this.flags[name] !== 'undefined';};
	};
	isGood(){return this.mood > 0;};
	isBad(){return this.mood < 0;};
	getEmotion(emotion){return this.emotions[emotion];}
	getTangibility(){return this.tangiblity;}
}

air.verb = class{
	//Use mood as as multiplier as some verbs are more important?
	constructor(verbField, emotions, c_preposition){
		this.verbField = verbField; //{object, subject, secondObject} 0 if unused, 1 if not relevant to emotion and 2 if relevant
		this.preposition = c_preposition;
		this.emotions = emotions;
	};
	
	getPreposition(){return this.preposition;}
	getValence(){return this.emotions['v'];}
	getNumberOfParameters(){
		let parameters = this.verbField.reduce((a,b)=> (a += (b>=1) , a), 0);
		//lg(parameters);
		return parameters;
		}
	getVerbField(name){return this.verbField;}
	
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
		
		this.emotions = new Object();
		//lg(this.emotions);
		Object.keys(air.emotions).forEach(function(emotion){
			this.emotions[emotion] = 0;
		}.bind(this));
		
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
	processEmotions(input){
		this.mood *= this.moodMultiplier; //Mood normalises to zero over time.
		
		let words = input.split(" ");
		let subject = words[0] ? words[0] : undefined;
		let verb = words[1] ? words[1] : undefined;
		let object = words[2] ? words[2] : undefined;
		let preposition = words[3] ? words[3] : undefined;
		let secondobject = words[4] ? words[4] : undefined;
		
		let returnMoods = new Object();
		returnMoods['v'] = undefined; //This is first so it appears first in the object - does it work that way?
		
		let subWord = this.vocab.nouns[subject];
		let objWord = this.vocab.nouns[object];
		let secWord = this.vocab.nouns[secondobject];
		
		let verbField = [...this.vocab.verbs[verb].getVerbField()];
		verbField.forEach(function(item, index){
			this[index] = item <= 1 ? 0 : 1;
		}, verbField);
		
		let verbValence = this.vocab.verbs[verb].getValence();
		
		let eventMood = 
			(subWord && verbField[0] ? subWord.getValence() : 1.0)	*
			(objWord && verbField[1] ? objWord.getValence() : 1.0)	*
			(secWord && verbField[2] ? secWord.getValence() : 1.0)	*
			verbValence ;
			
		let numberOfWords = verbField[0] + verbField[1] + verbField[2];
		eventMood *= numberOfWords;
		
		//This is so more things in a sentence dont make things less powerful
		
		// lg(subWord && verbField[0] ? subWord.getValence() : 1.0	);
		// lg(objWord && verbField[1] ? objWord.getValence() : 1.0	);
		// lg(secWord && verbField[2] ? secWord.getValence() : 1.0	);
		// lg(verbValence                                          );
		
		// if(Math.sign(subWord.getValence()) != Math.sign(verbValence)){
			// lg("object valence does not match verb valence");
		// }
		
		// if(subWord.getValence() > 0 && verbValence > 0 && objWord.getValence() < 0){
			// lg("good person does good thing to bad person");
		// }
		//bad person does good thing to good person
		//good person does bad thing
		
		//Each emotion:
		Object.keys(air.emotions).forEach(function(emotion){
			let subEmo = subWord && verbField[0] ? subWord.getEmotion(emotion) : undefined;
			let objEmo = objWord && verbField[1] ? objWord.getEmotion(emotion) : undefined;
			let secEmo = secWord && verbField[2] ? secWord.getEmotion(emotion) : undefined;
			if(subEmo || objEmo || secEmo){
				lg(emotion);
				lg(subEmo);
				lg(objEmo);
				lg(secEmo);
				// lg(emotion); lg(valence); lg(subEmo); lg(objEmo); lg(secEmo);
				
				let emotionValue = verbValence * (subEmo||1.0) * (objEmo||1.0) * (secEmo||1.0);
				let returnEmotion = emotion;
				lg(emotionValue);
				if(emotionValue < 0){//Do that special kind of flip
					returnEmotion = air.emotions[emotion].getOpposite();
					emotionValue *= -1;
				}
				emotionValue *= numberOfWords;
				returnMoods[returnEmotion] = (returnMoods[returnEmotion] ? returnMoods[returnEmotion]+emotionValue : emotionValue); //The emotion might be set from above (the good person / bad action premise)
			}
		}.bind(this));
		returnMoods['v'] = eventMood;
		return returnMoods;
	}
	//Other stuff
	parseSentence (input){//gets given a sentence
		let words = input.split(" ");
		
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
		
		// if(words.length != wordsNumMap[this.vocab.verbs[verb].getNumberOfParameters()]){
			// reply += "I am confused by your choice of words. ";
			// return reply;
		// }
		
		// if(this.vocab.verbs[verb].getNumberOfParameters() == 3){
			// if (preposition != this.vocab.verbs[verb].getPreposition()){
				// reply += "Wrong preposition. ";
				// return reply;
			// }
		// }
		
		//TAke this eout because handling emotions should be done in this function
		// let verbFunc = this.vocab.verbs[verb].getFunction('v');
		// let eventMood = verbFunc.bind(
			// this, 
			// this.vocab.nouns[subject], 
			// this.vocab.nouns[object], 
			// this.vocab.nouns[secondobject]
		// )(); //MAYBE FIX THIS so it checks the words are right
		//return eventMood;
		let emotions = this.processEmotions(input);
		
		reply += "That's " + air.getFullMood(emotions['v']) + ". ";
		reply += "I feel ";
		Object.keys(emotions).forEach(function(emotion){
			if(emotion!='v'){
				reply += emotion + " and ";
			}
		});
		reply += "no more";
		
		let mem = new air.memory(input, emotions['v']);
		this.addMemory(mem);
		
		lg(emotions);

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

air.generateSentence = function(verb){//Verb is string
	const nouns = Object.keys(air.defaultNouns);
	const numNouns = nouns.length;
			
	let numParams = air.defaultVerbs[verb].getNumberOfParameters();
	let sentenceNouns = new Array();
	let doesThisNounNeedToBeAnimate = true; //This is so the (currently) first noun is always something that can actually perform an action
	for(let j = 0; j<numParams; j++){//Generate nouns at random;
		let noun = undefined;
		let nounString = ""
		let counter = 0;
		do{
			nounString = nouns[air.rand(numNouns)];
			noun = air.defaultNouns[nounString];
			counter++;
			//lg(nounString);
			if(counter > 20){lg("err:calcTooLong");break;}//Unlikely to be needed
			
		} while (doesThisNounNeedToBeAnimate && noun.getTangibility() != "animate");//Make sure it's animate
		sentenceNouns[j] = nounString;
		doesThisNounNeedToBeAnimate = false; //Reset it so only the first noun needs to be animate
	}
	let sentence = sentenceNouns[0] + " " + verb;
	for(let j = 1; j<numParams; j++){
		sentence += " " + (j==2 ? air.defaultVerbs[verb].getPreposition() + " ":"") + sentenceNouns[j];
	}
	return sentence;
	}
	
air.getWordsFromSentence = function(sentence){
	
}