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

air.prepositionNames = ["sub", "obj", "ind"];

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
	"awkwardness"	: new air.emotion(-0.2	, "anxiety"	, "calm"	),
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
		this.lastUse = undefined;
	};
	//constructFromObject
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
		this.timesUsed = 0;
		this.links = new Array();
		this.links[0] = new Array();
		this.links[1] = new Array();
		this.links[2] = new Array();
	};
	
	getPreposition(){return this.preposition;}
	getValence(){return this.emotions['v'];}
	getNumberOfParameters(){
		let parameters = this.verbField.reduce((a,b)=> (a += (b>=1) , a), 0);
		//lg(parameters);
		return parameters;
		}
	getVerbField(name){return this.verbField;}
	incrementTimesUsed(){this.timesUsed++;}
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

air.wordsNumMap = [undefined, 2 ,3, 5];//Map number of nouns a verb takes to the number of verb a sentence with that verb in it will take (including verb + prepositions)

air.ai = class { //Class
	constructor(){
		this.storage = new Object();
		this.storage.mood = 0; //Happy or sad
		this.storage.moodMultiplier = 0.707; //Multiplies mood at each update
		
		this.storage.emotions = new Object();
		//lg(this.storage.emotions);
		Object.keys(air.emotions).forEach(function(emotion){
			this.storage.emotions[emotion] = 0;
		}.bind(this));
		
		//Memory
		//this.memory = new Array();
		
		//Words
			
		this.storage.vocab = new Object();
		this.storage.vocab.nouns = new Object();
		this.storage.vocab.verbs = new Object();
		this.storage.vocab.adjectives = new Object();
		this.storage.vocab.prepositions = new Object();	
		this.storage.age = 0;
		this.storage.memorySpan = 7; //Currently based on brain cycles but should be shifted to real world time.
		
		this.storage.settings = new Object();
		this.storage.settings.infiniteMemory = true;
	}
	
	getValence () {return this.storage.mood;};
	adjustMood (change){this.storage.mood += change;}

	processEmotions(input){
		this.storage.mood *= this.storage.moodMultiplier; //Mood normalises to zero over time.
		
		let words = input.split(" ");
		let subject = words[0] ? words[0] : undefined;
		let verb = words[1] ? words[1] : undefined;
		let object = words[2] ? words[2] : undefined;
		let preposition = words[3] ? words[3] : undefined;
		let secondobject = words[4] ? words[4] : undefined;
		
		let returnMoods = new Object();
		returnMoods['v'] = undefined; //This is first so it appears first in the object - does it work that way?
		
		let subWord = this.storage.vocab.nouns[subject];
		let objWord = this.storage.vocab.nouns[object];
		let secWord = this.storage.vocab.nouns[secondobject];
		
		let verbField = [...this.storage.vocab.verbs[verb].getVerbField()];
		verbField.forEach(function(item, index){
			this[index] = item <= 1 ? 0 : 1;
		}, verbField);
		
		let verbValence = this.storage.vocab.verbs[verb].getValence();
		
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
				// lg(emotion);
				// lg(subEmo);
				// lg(objEmo);
				// lg(secEmo);
				// lg(emotion); lg(valence); lg(subEmo); lg(objEmo); lg(secEmo);
				
				let emotionValue = verbValence * (subEmo||1.0) * (objEmo||1.0) * (secEmo||1.0);
				let returnEmotion = emotion;
				//lg(emotionValue);
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
		
		if(!this.storage.vocab.verbs[verb]){
			reply+= "That is not a verb. ";
			return reply;
		}
		
		let emotions = this.processEmotions(input);
		
		reply += "That's " + air.getFullMood(emotions['v']) + ". ";
		reply += "I feel ";
		Object.keys(emotions).forEach(function(emotion){
			if(emotion!='v'){
				reply += emotion + " and ";
			}
		});
		reply += "no more";
		
		// let mem = new air.memory(input, emotions['v']);
		// this.addMemory(mem);
		
		//lg(emotions);
		
		this.addMemory(input);

		return reply;
		}
	
	doIKnow (word){
		return this.storage.vocab.nouns[word] ||	this.storage.vocab.verbs[word] ||	this.storage.vocab.prepositions[word] ;
	}
	
	growOlder(){
		this.storage.age++;
	}
	
	learnWords(nouns, verbs, adjectives, prepositions){
		this.storage.vocab.nouns = nouns;
		this.storage.vocab.verbs = verbs;
		this.storage.vocab.adjectives = adjectives;
		this.storage.vocab.prepositions = prepositions;
	}
	
	addMemory(eventString){
	//TODO: have links as a keys rather than an array?
	//Get the words in the sentence:
		let nouns = air.getNouns(eventString);
		let verb = air.getVerb(eventString);
		
		this.storage.vocab.verbs[verb].incrementTimesUsed();
		
		
		//For the nouns...
		//For each noun, see when the last use was and add correlation
		let verbPosition = 0;
		nouns.forEach(function(noun){
			// ...Record this use
			let thisUse = new Object();
			thisUse.verb = verb;
			thisUse.position = verbPosition;
			thisUse.age = this.storage.age;
			
			//See where it was used last:
			let lastUse = this.storage.vocab.nouns[noun].lastUse;
			if(lastUse){
				//Make a link between where it was used last and this time, remembering how long ago it was.
				const timePassed = this.storage.age - lastUse.age;
				let copyUse = JSON.parse(JSON.stringify(thisUse));
				//If the noun is still in memory
				if(timePassed < this.memorySpan || this.storage.settings.infiniteMemory){
					
					copyUse.age = 1/timePassed;
					
					//Either add a new link or update the old one
					let theseLinks = this.storage.vocab.verbs[lastUse.verb].links[lastUse.position];
					let foundPosition = undefined;
					let positionCounter = 0
					if(theseLinks){
						theseLinks.forEach(function(link){
							if (link.verb == copyUse.verb && link.position == copyUse.position){
								foundPosition = positionCounter;
							}
							positionCounter ++;
						});
						if(foundPosition == undefined){//Add new 
							theseLinks.push(copyUse);
						} else {//Update old
							theseLinks[positionCounter].age += copyUse.age;
						}
					} else {
						theseLinks.push(copyUse);
					}
				
				}
			}
			this.storage.vocab.nouns[noun].lastUse = thisUse;
			verbPosition++;
		}.bind(this));
	}
	
	saveSelfToLocal(){
		localStorage.setItem('bot', JSON.stringify(this.storage));
	}
	
	reloadClasses(obj, type){//Recreate each of the word groups from the function class
		let names = Object.keys(obj);
		names.forEach(function(element){
			let newObj = new type;
			
			Object.assign(newObj, obj[element]);
			obj[element] = newObj;
		});
	}
	
	loadSelfFromLocal(){ 
		let storage = JSON.parse(localStorage.getItem('bot'));
		this.storage = storage;
		
		//Recreate the proper function class:
		this.reloadClasses(this.storage.vocab.nouns, air.noun);
		this.reloadClasses(this.storage.vocab.verbs, air.verb);
		this.reloadClasses(this.storage.vocab.adjectives, air.adjective);
	}

};//End AI

air.bot = new air.ai();

air.generateHslaColors = function (amount, saturation=100, lightness=50, alpha=1.0) {
  let colors = []
  let huedelta = Math.trunc(360 / amount)

  for (let i = 0; i < amount; i++) {
    let hue = i * huedelta
    colors.push(`hsla(${hue},${saturation}%,${lightness}%,${alpha})`)
  }

  return colors
}


air.getIntensity = function(number){
	const absoluteNumber = Math.abs(number);
	if (absoluteNumber > 0.81) return "extremely";
	if (absoluteNumber > 0.49) return "very";
	if (absoluteNumber > 0.25) return "moderately";
	if (absoluteNumber > 0.09) return "slightly";
	return "very slightly"
}

air.getValence = function(number){
	if (number >  0.09) return "good";
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

air.getVerb = function(sentence){
	let words = sentence.split(" ");
	return words[1]; 
}

air.getNouns = function(sentence){
	let words = sentence.split(" ");
	let verb = words[1];
	let parameters = air.defaultVerbs[verb].getVerbField().reduce((a,b)=> (a += (b>=1) , a), 0);
	//air.wordsNumMap
	let nouns = new Array();
	for(let i = 0; i < parameters; i++){
		nouns.push(words[i*2]); //Get the 0th, 2nd then 5th words which will be the noujds
	}
	return nouns;
}

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
	