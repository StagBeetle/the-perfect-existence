"use strict";
let lg = console.log;
let air = {}; //Main project

air.noun = class{
	constructor(c_mood, c_flags = []) {
		this.mood = c_mood;
		this.flags = c_flags.reduce((a,b)=> (a[b]='',a),{});
		this.getMood = function(){return this.mood;};
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
	getMood(){return this.mood;}
	getNumberOfParameters(){return this.processFunction.length;}
	
	// getMood(){return this.mood;};
	// setMood(p_mood){mood = p_mood;};
}

air.adjective = class{
	//Use mood as as multiplier as some verbs are more important?
	constructor(c_multiplier){
		this.multiplier = c_multiplier;
	};
	
	geMultiplier(){return this.multiplier;}
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
		
		//Words
			
		this.vocab = new Object();
		this.vocab.nouns = new Object();
		this.vocab.verbs = new Object();
		this.vocab.adjectives = new Object();
		this.vocab.prepositions = new Object();
		
		let prepositions = ["for", "with", "from", "to"];
		this.vocab.prepositions = prepositions.reduce((a,b)=> (a[b]=true,a),{});
		
		//Nouns
		this.vocab.nouns["i"	] = new air.noun(1.5);
		this.vocab.nouns["apple"	] = new air.noun(0.3, ["edible"]);
		this.vocab.nouns["lettuce"	] = new air.noun(-0.3, ["edible"]);
		this.vocab.nouns["fish"	] = new air.noun(0.5, ["edible", "sea-based"	]);
		this.vocab.nouns["hand"	] = new air.noun(0.3);
		this.vocab.nouns["arm"	] = new air.noun(0.3);
		this.vocab.nouns["leg"	] = new air.noun(0.2);
		this.vocab.nouns["foot"	] = new air.noun(0.2);
		this.vocab.nouns["head"	] = new air.noun(0.6);
		this.vocab.nouns["torso"	] = new air.noun(0.5);
		this.vocab.nouns["friend"	] = new air.noun(0.8);
		this.vocab.nouns["dog"	] = new air.noun(0.8);
		this.vocab.nouns["cat"	] = new air.noun(0.8);
		this.vocab.nouns["money"	] = new air.noun(0.8);
		this.vocab.nouns["people"	] = new air.noun(0.4);
		this.vocab.nouns["enemy"	] = new air.noun(-1.0, ["threat"	]);
		this.vocab.nouns["love"	] = new air.noun(0.8);
		this.vocab.nouns["day"	] = new air.noun(0.2);
		this.vocab.nouns["night"	] = new air.noun(-0.2);
		this.vocab.nouns["sword"	] = new air.noun(0.4);
		this.vocab.nouns["gun"	] = new air.noun(0.6);
		this.vocab.nouns["village"	] = new air.noun(0.7);
		this.vocab.nouns["monster"	] = new air.noun(-0.8, ["threat"	]);
		this.vocab.nouns["bandit"	] = new air.noun(-0.5, ["threat"	]);
		this.vocab.nouns["man"	] = new air.noun(0.4);
		this.vocab.nouns["stranger"	] = new air.noun(-0.1);
		//Need-based words
		this.vocab.nouns["hunger"	] = new air.noun(-0.7);
		this.vocab.nouns["thirst"	] = new air.noun(-0.8);
		this.vocab.nouns["cold"	] = new air.noun(-0.6);
		this.vocab.nouns["tiredness"	] = new air.noun(-0.6);
		this.vocab.nouns["tiredness"	] = new air.noun(-0.6);
		this.vocab.nouns["desperation"	] = new air.noun(-0.8);//(toilet)
		this.vocab.nouns["danger"	] = new air.noun(-1.0, ["threat"	]);
		this.vocab.nouns["loneliness"	] = new air.noun(-0.5);
		this.vocab.nouns["worthlessness"	] = new air.noun(-0.7);
		//Emotion-based words
		this.vocab.nouns["fear"	] = new air.noun(-0.9);
		this.vocab.nouns["sadness"	] = new air.noun(-0.9);
		this.vocab.nouns["disgust"	] = new air.noun(-0.7);
		this.vocab.nouns["rage"	] = new air.noun(-0.4);
		this.vocab.nouns["surprise"	] = new air.noun(-0.1);
		
		
		//ADJECTIVES
		this.vocab.adjectives["my"	] = new air.adjective(1.5);
		this.vocab.adjectives["broken"	] = new air.adjective(0.75);
		this.vocab.adjectives["dead"	] = new air.adjective(-1.0);
		
		//VERBS
		//Default Verbs
		this.defaultVerb_good_so = function (subject, object){
			let mood = object.getMood() * subject.getMood();
			this.adjustMood(mood); //Affect ai mood
			return mood;
		}
		
		this.defaultVerb_bad_so = function (subject, object){
			let mood = object.getMood() * subject.getMood() * -1;
			this.adjustMood(mood); //Affect ai mood
			return mood;
		}
		
		this.defaultVerb_good = function (subject){
			let mood = subject.getMood();
			this.adjustMood(mood); //Affect ai mood
			return mood;
		}
		
		this.defaultVerb_bad = function (subject){
			let mood = -subject.getMood();
			this.adjustMood(mood); //Affect ai mood
			return mood;
		}
		
		this.eatDrink = function(subject, object){
			let mood = undefined;
			const edible = object.hasFlag("edible");
			const subGood = subject.isGood();
			const objGood = object.isGood();
			
			//If it's not edible, it's bad to eat it, but better to eat (and therefore  destroy) something bad than good
			let howGoodItIsToEat = edible ? object.getMood() : object.getMood() * -0.5 -0.5; 
			mood = subject.getMood() * howGoodItIsToEat;
			this.adjustMood(mood); //Affect ai mood
			return mood;
		}
		
		//Verbs
		this.vocab.verbs["give"] = new air.verb(function(subject, object, secondobject) {
			let mood = object.getMood() * secondobject.getMood(); //Initialise event mood
			this.adjustMood(mood); //Affect ai mood
			
			//Surprised and fearful if something good does something bad or vice versa - this may be important to be hard coded for all verbs
			if(mood != subject.getMood()){
				this.surprise += Math.abs(mood - subject.getMood());
				this.fear += Math.abs(mood- subject.getMood()) / 2; //Not really scary
				};
			return mood;
			}, 0.6, "to"
		);

		this.vocab.verbs["eat"	] = new air.verb(this.eatDrink, 0.5);
		this.vocab.verbs["drink"	] = new air.verb(this.eatDrink, 0.5);
		

		this.vocab.verbs["see"	] = new air.verb(this.defaultVerb_good_so, 0.9);
		this.vocab.verbs["hear"	] = new air.verb(this.defaultVerb_good_so, 0.9);
		this.vocab.verbs["feel"	] = new air.verb(this.defaultVerb_good_so, 0.9);
		this.vocab.verbs["smell"	] = new air.verb(this.defaultVerb_good_so, 0.7);
		this.vocab.verbs["taste"	] = new air.verb(this.defaultVerb_good_so, 0.8);
		this.vocab.verbs["have"	] = new air.verb(this.defaultVerb_good_so, 0.9);
		this.vocab.verbs["help"	] = new air.verb(this.defaultVerb_good_so, 0.7);//suspciion
		this.vocab.verbs["find"	] = new air.verb(this.defaultVerb_good_so, 0.7);
		this.vocab.verbs["receive"	] = new air.verb(this.defaultVerb_good_so, 0.8);
		this.vocab.verbs["believe"	] = new air.verb(this.defaultVerb_good_so, 0.9);
		
		this.vocab.verbs["shoot"	] = new air.verb(this.defaultVerb_bad_so, -0.9);
		this.vocab.verbs["punch"	] = new air.verb(this.defaultVerb_bad_so, -0.5);
		this.vocab.verbs["escape"	] = new air.verb(this.defaultVerb_bad_so, -0.5);
		
		this.vocab.verbs["exist"	] = new air.verb(this.defaultVerb_good , 0.8);
		this.vocab.verbs["speak"	] = new air.verb(this.defaultVerb_good , 0.4);
		this.vocab.verbs["sit"	] = new air.verb(this.defaultVerb_good , 0.2);
		
		this.vocab.verbs["die"	] = new air.verb(this.defaultVerb_bad, -1);
		this.vocab.verbs["work"	] = new air.verb(this.defaultVerb_bad, -0.4);
		this.vocab.verbs["stand"	] = new air.verb(this.defaultVerb_bad, -0.2);
		this.vocab.verbs["run"	] = new air.verb(this.defaultVerb_bad, -0.8);
		
		this.vocab.verbs["steal"] = new air.verb(function(subject, object, secondobject) {
			let submood = subject.getMood();
			let objmood = object.getMood();
			let secondobjmood = secondobject.getMood();
			// lg(submood);
			// lg(secondobjmood);
			// lg(objmood);
			
			let mood = (subject.getMood() - secondobject.getMood() - 0.5) * object.getMood(); //Initialise event mood
			this.adjustMood(mood); //Affect ai mood
			
			//Surprised and fearful if something good does something bad or vice versa - this may be important?
			if(object.isBad() || subject.isGood()){
				this.surprise += mood*mood //Not checked this
				this.fear += mood*mood / 2;
			};
			return mood;
			}, -0.8, "from"
		);
		
		// this.vocab.verbs["receive"	] = new air.verb(from);
		
		// this.vocab.verbs["want"	] = new air.verb(cant want something bad);
		// this.vocab.verbs["need"	] = new air.verb(cant want something bad);
		
		// this.vocab.verbs["pay"	] = new air.verb(bad person pay someone good.);
		
		// this.vocab.verbs["create"	] = new air.verb(bad person pay someone good.);
		// this.vocab.verbs["write"	] = new air.verb(bad person pay someone good.);
		
		
		
		
		
	}
	
	getMood () {return this.mood;};
	adjustMood (change){this.mood += change;};
	
	//Other stuff
	passJudgement (input){//gets given an array of words
		this.mood *= this.moodMultiplier; //Mood normalises to zero over time.
		
		let subject = input[0] ? input[0] : undefined;
		let verb = input[1] ? input[1] : undefined;
		let object = input[2] ? input[2] : undefined;
		let preposition = input[3] ? input[3] : undefined;
		let secondobject = input[4] ? input[4] : undefined;
		
		const wordsNumMap = [undefined, 2 ,3, 5];//Map number of nouns a verb takes to the number of verb a sentence with that verb in it will take (including verb + prepositions)
		
		
		//Check for word after preposition
		
		let reply = "";
		
		
		let knowsAllWords = true;
		input.forEach(function (item) {
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
		
		if(input.length != wordsNumMap[this.vocab.verbs[verb].getNumberOfParameters()]){
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

air.getMood = function(number){
	if (number > 0.09) return "good";
	if (number > -0.09) return "average";
	return "bad";
}

air.getFullMood = function (number){
	const intensity = air.getIntensity(number);
	const mood = air.getMood(number);
	
	let reply = (mood != "average" ? intensity + " " : "") + mood;
	return reply;
}
air.square = function(num){return num*num;}

air.AIform = document.getElementById("AIform");
air.eventBox = document.getElementById("eventBox");
air.replyBox = document.getElementById("replyBox");
air.vocabBox = document.getElementById("vocabBox");
	
function prepareJudgement(e){
	//lg(e);
	e.preventDefault();
	let eventString = eventBox.value;
	let words = eventString.split(" ");
	let reply = air.bot.passJudgement(words);
	replyBox.value = eventString;
	replyBox.value += ". ";
	replyBox.value += reply;
	replyBox.value += ". I feel ";
	replyBox.value += air.getFullMood(air.bot.getMood());
}

function fillPage(e){
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
document.addEventListener("load", fillPage, true); //Generate vocab list