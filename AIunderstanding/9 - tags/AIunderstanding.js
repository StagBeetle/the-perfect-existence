"use strict";
let lg = console.log;
let air = {}; //Main project

/////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Concepts	/////////////////////////////////
///////////////////////////////////////////////////////////////////////////

air.emotion = class{
	constructor(valence, parent, opposite){
		this.valence = valence;
		this.parent = parent;
		this.opposite = opposite;
	};
	getOpposite(){return this.opposite;}
	getParent(){return this.opposite;}
}

//air.emotions = new Object();
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
	"surprise"	: new air.emotion( 0.0	, null	, null	)	
	
};//is hope an emotion, sympathy, triump, reflief.

air.emotionNames = Object.keys(air.emotions);

air.argNames = ["subject", "object", "indirect object"];
// air.argPositions = new Object();
// air.argNames.forEach(function(item, index){
	// air.argPositions[item] = index;
// });

// air.sub = 0;
// air.obj = 1;
// air.ind = 2;

air.object = class{
	constructor(tags) {
		this.tags = tags;
		this.lastUse = undefined;
		this.importance = 0;//The effect of al lthe sentences it has been in.
		this.timesUsed = 0;
	};
	//constructFromObject
	getValence = function(){return this.tags["v"];};
	hasFlag = function(name){return typeof this.tags[name] !== 'undefined';};
	getTag = function(name){return this.tags[name] ? this.tags[name] : -1;};
		
	isGood(){return this.tags["v"] > 0;};
	isBad(){return this.tags["v"] < 0;};
	getEmotion(tag){return this.tags[tag];}
	getAnimation(){return this.tags[animation] ? this.tags[animation] : -1;}
	increaseImportance(float){
		this.importance += Math.abs(float);
		this.timesUsed++;
		}
	getImportance(){return this.importance;}
}

air.link = class{
	constructor(action, argument, time, strength){
		this.action = action;
		this.argument = argument;
		this.time = time;
		this.strength = strength;
	}
}

air.action = class{
	//Use mood as as multiplier as some actions are more important?
	constructor(argumentField, emotions, c_preposition){
		this.argumentField = argumentField; //{object, subject, secondObject} 0 if unused, 1 if not relevant to emotion and 2 if relevant
		this.preposition = c_preposition;
		this.emotions = emotions;
		this.timesUsed = 0;
		this.links = new Object();
		this.links["subject"] = new Object();
		this.links["object"] = new Object();
		this.links["indirect object"] = new Object();
	};
	
	getPreposition(){return this.preposition;}
	getValence(){return this.emotions['v'];}
	getStrength(){return Math.abs(this.emotions['v']);}
	getNumberOfParameters(){
		let parameters = this.argumentField.reduce((a,b)=> (a += (b>=1) , a), 0);
		//lg(parameters);
		return parameters;
		}
	getEquation(arg){return this.argumentField[arg];}
	getArguments(){return Object.keys(this.argumentField)}
	getNumArguments(){return Object.keys(this.argumentField).length;}
	incrementTimesUsed(){this.timesUsed++;}
}

air.descriptor = class{
	//Use mood as as multiplier as some actions are more important?
	constructor(c_multiplier){
		this.multiplier = c_multiplier;
	};
	
	geMultiplier(){return this.multiplier;}
}

air.event = class{
	constructor(string){
		this.string = string;
		this.words = string.split(" ");
		this.getMap = {"subject":0,"action":1,"object":2,"preposition":3,"indirect object":4};
	}
	get(arg){
		let mapNum = this.getMap[arg];
		let word = this.words[mapNum] ? this.words[mapNum] : undefined;
		return air.getConcept(word);
	}
	subject	(){return this.words[0] ? this.words[0] : undefined;}
	action	(){return this.words[1] ? this.words[1] : undefined;}
	object	(){return this.words[2] ? this.words[2] : undefined;}
	preposition	(){return this.words[3] ? this.words[3] : undefined;}
	indirect	(){return this.words[4] ? this.words[4] : undefined;}
	
}

air.preposition = class{
	constructor(){}
}

air.memory = class{//I think this is unused.
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

air.wordsNumMap = [undefined, 2 ,3, 5];//Map number of objects a action takes to the number of action a sentence with that action in it will take (including action + prepositions)

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// Begin AI	///////////////////////////////
///////////////////////////////////////////////////////////////////////////

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
		this.storage.vocab.objects = new Object();
		this.storage.vocab.actions = new Object();
		this.storage.vocab.descriptors = new Object();
		this.storage.vocab.prepositions = new Object();	
		this.storage.age = 0;
		this.storage.memorySpan = 7; //Currently based on brain cycles but should be shifted to real world time.
		
		this.storage.settings = new Object();
		this.storage.settings.infiniteMemory = true;
	}
	
	getValence () {return this.storage.mood;};
	adjustMood (change){this.storage.mood += change;}
	
	

	processEmotions(inputSentence){
		lg("change this next line to out of parse emotions");
		this.storage.mood *= this.storage.moodMultiplier; //Mood normalises to zero over time.
		
		let e = new air.event(inputSentence);
		
		let returnMoods = new Object();
		returnMoods['v'] = undefined; //This is first so it appears first in the object - does it work that way?
		
		let subWord = this.getConcept(e.subject());
		let objWord = this.getConcept(e.object());
		let secWord = this.getConcept(e.indirect());
		let action = this.getConcept(e.action());
			
		let eventMood = 0; //Simple valence
		
		// let args = {};
		air.argNames.forEach(function(arg){
			if (action.getEquation(arg)){
				//lg(e);
				const mood = action.getEquation(arg)(e)
				//lg(mood);
				eventMood += mood;
			}
				//Call the function and give it the event 
		});
		
		let actionValence = this.getConcept(e.action()).getValence();
		
		//Each emotion:
		lg("I am working here on calculating emotions");
		
		// Object.keys(air.emotions).forEach(function(emotion){//For every emotion that exists:
			// let subEmo = subWord && actionField[0] ? subWord.getEmotion(emotion) : undefined;
			// let objEmo = objWord && actionField[1] ? objWord.getEmotion(emotion) : undefined;
			// let secEmo = secWord && actionField[2] ? secWord.getEmotion(emotion) : undefined;
			// if(subEmo || objEmo || secEmo){

				
				// let emotionValue = actionValence * (subEmo||1.0) * (objEmo||1.0) * (secEmo||1.0);
				// let returnEmotion = emotion;
				// //lg(emotionValue);
				// if(emotionValue < 0){//Do that special kind of flip
					// returnEmotion = air.emotions[emotion].getOpposite();
					// emotionValue *= -1;
				// }
				// emotionValue *= numberOfWords;
				// returnMoods[returnEmotion] = (returnMoods[returnEmotion] ? returnMoods[returnEmotion]+emotionValue : emotionValue); //The emotion might be set from above (the good person / bad action premise)
			// }
		// }.bind(this));
		
		
		returnMoods['v'] = eventMood;
		//lg(returnMoods);
		return returnMoods;
	}
	//Other stuff
	
	parseSentence (inputSentence){//gets given a sentence
		let e = new air.event(inputSentence);
		
		//Check for word after preposition
		
		let reply = "";
		
		let knowsAllWords = true;
		e.words.forEach(function (item) {
			if(!this.doIKnow(item)){
				reply += "I do not know " + item + ". ";
				knowsAllWords = false;
			}
		}.bind(this));
		if(!knowsAllWords){
			return reply;
		}
		
		if(!this.getConcept(e.action())){
			reply+= "That is not a action. ";
			return reply;
		}
		
		let emotions = this.processEmotions(inputSentence);
		
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
		
		this.addMemory(inputSentence, emotions);

		return reply;
		}
	
	doIKnow (concept){
		return this.getConcept(concept) ? true : false;
	}
	
	getConcept(concept){ //Lookup a word...
		return	this.storage.vocab.actions[concept] || 
			this.storage.vocab.objects[concept] ||
			this.storage.vocab.descriptors[concept] ||
			this.storage.vocab.prepositions[concept] ||
			undefined;
	}
	
	growOlder(){
		this.storage.age++;
	}
	
	learnWords(objects, actions, descriptors, prepositions){
		this.storage.vocab.objects = objects;
		this.storage.vocab.actions = actions;
		this.storage.vocab.descriptors = descriptors;
		this.storage.vocab.prepositions = prepositions;
	}
	
	addMemory(eventString, emotions){
	//Get the words in the sentence:
		let objects = air.getObjects(eventString);
		let action = air.getAction(eventString);
		//lg(objects); //Only works for there object words
		//lg(action);
		
		this.getConcept(action).incrementTimesUsed();
		
		//For the objects...
		//For each object, see when the last use was and add correlation
		
		objects.forEach(function(object, argumentNum){
			//Increase the importance:
			let obj = this.getConcept(object);
			obj.increaseImportance(emotions.v);
			
			let argumentName = air.argNames[argumentNum];
			let thisUse = new air.link(action, argumentName, this.storage.age, undefined);
			
			//See where it was used last:
			//lg(object);
			let lastUse = this.getConcept(object).lastUse;
			if(lastUse){
				//Make a link between where it was used last and this time, remembering how long ago it was.
				const timePassed = this.storage.age - lastUse.time;
				let copyUse = new air.link;

				Object.assign(copyUse, thisUse);
				
				if(timePassed < this.memorySpan || this.storage.settings.infiniteMemory){
					copyUse.strength = 1/timePassed;
					//lg(argumentNum);
					this.addLink(lastUse, copyUse);
				}
			}
			this.getConcept(object).lastUse = thisUse;
		}.bind(this));
	}
	
	saveSelfToLocal(){
		localStorage.setItem('bot', JSON.stringify(this.storage));
	}
	
	reloadClass(obj, type){//Recreate a class with members functions from a data struct
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
		this.reloadClass(this.storage.vocab.objects, air.object);
		this.reloadClass(this.storage.vocab.actions, air.action);
		this.reloadClass(this.storage.vocab.descriptors, air.descriptor);
	}
	
	processMultiple(events){//For training, to be run via the console
		//lg(events);
		//Takes the contents of a text file.
		//Remember to use backticks
		let e = events.split("\n");//This can contain blank strings
		//lg(e);
		let eventCounter = 0;
		e.forEach(function(event){
			if(event != ""){
				air.bot.parseSentence(event);
				air.bot.growOlder();
				eventCounter++;
			}
		});
		lg("Processed " + eventCounter + " events");
	}
	
	// tracePath(){
		// //Recursive or looped
		// let links = air.bot.getConcept(action).links;
		// lg(links);
	// }
	
	getPaths(actionName, argument){
		let action = this.getConcept(actionName);
		lg(actionName + " " + argument + " becomes:");
		let destinationActions = Object.keys(action.links[argument]);
		destinationActions.forEach(function(destAction){
			let actionDest = action.links[argument][destAction];
			let destArguments = Object.keys(actionDest);
			destArguments.forEach(function(destArgument){
				let strength = actionDest[destArgument];
				lg(destArgument + " of " + destAction + " with a certainty of " + strength / action.timesUsed);
			});
		});
	}
	
	getMemoryLinkValues(){
		let a = this.storage.vocab.actions;
		let actions = Object.keys(a);

		actions.forEach(function(name){
			let action = a[name];
			action.links.forEach(function(linkList){
				//lg(linkList);
				linkList.forEach(function(link){
					lg(link.strength / action.timesUsed);
				});
			});
		});
	}
	
	listVocab(){
		let types = ["actions", "objects", "descriptors", "prepositions"];
		types.forEach(function(type){
			lg(type + ":");
			let names = Object.keys(this.storage.vocab[type]);
			lg(...names);
		}.bind(this));

	}
	
	addLink(source, target){
		//lg(source, target);
		let linksFromArgument = this.getConcept(source.action).links[source.argument];
		//Check if there is a link to the verb and add if not
			let relevantAction = linksFromArgument[target.action];
			if(relevantAction == undefined){
				linksFromArgument[target.action] = new Object();
				relevantAction = linksFromArgument[target.action];
			}
		//lg(relevantAction);
		//Check if there is a link to the argument and add if not
			let relevantArgument = relevantAction[target.argument];
			if(relevantArgument == undefined){
				relevantAction[target.argument]	= target.strength;
				//relevantArgument = relevantAction[target.argument];
			}
		//Otherwise, update
			else{relevantArgument += target.strength;}
		//lg(relevantAction);
	}

};

/////////////////////////////////////////////////////////////////////////////
////////////////////////////// End AI Definition	///////////////////////////
///////////////////////////////////////////////////////////////////////////

air.bot = new air.ai();

air.rand = function(limit){
	return Math.floor(Math.random()*limit);
}

air.generateHslaColorArray = function (values, saturation=100, lightness=50, alpha=1.0) {
  let colors = []
  let huedelta = Math.trunc(360 / values)

  for (let i = 0; i < values; i++) {
    let hue = i * huedelta
    colors.push(`hsla(${hue},${saturation}%,${lightness}%,${alpha})`)
  }

  return colors
}

air.makeHslaColor = function(amount, saturation=100, lightness=50, alpha=1.0){//Amount between zero and one
	let hue = amount*360;
	return `hsla(${hue},${saturation}%,${lightness}%,${alpha})`;
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

air.getConcept = function(concept){ //Lookup a word...
	return	air.defaultActions	[concept] || 
		air.defaultObjects	[concept] ||
		air.defaultDescriptors	[concept] ||
		air.defaultPrepositions	[concept] ||
		undefined;
}

air.getAction = function(sentence){
	let words = sentence.split(" ");
	return words[1]; 
}

air.getObjects = function(sentence){
	let words = sentence.split(" ");
	let action = words[1];
	let parameters = air.defaultActions[action].getNumArguments();
	//air.wordsNumMap
	let objects = new Array();
	for(let i = 0; i < parameters; i++){
		objects.push(words[i*2]); //Get the 0th, 2nd then 4th words which will be the noujds
	}
	return objects;
}

air.generateSentence = function(action){//Action is string
	const objects = Object.keys(air.defaultObjects);
	const numObjects = objects.length;
			
	let numParams = air.defaultActions[action].getNumberOfParameters();
	let sentenceObjects = new Array();
	let doesThisObjectNeedToBeAnimate = true; //This is so the (currently) first object is always something that can actually perform an action
	for(let j = 0; j<numParams; j++){//Generate objects at random;
		let object = undefined;
		let objectString = ""
		let counter = 0;
		do{
			objectString = objects[air.rand(numObjects)];
			object = air.defaultObjects[objectString];
			counter++;
			//lg(objectString);
			if(counter > 20){lg("err:calcTooLong");break;}//Unlikely to be needed
			
		} while (doesThisObjectNeedToBeAnimate && object.getTangibility() != "animate");//Make sure it's animate
		sentenceObjects[j] = objectString;
		doesThisObjectNeedToBeAnimate = false; //Reset it so only the first object needs to be animate
	}
	let sentence = sentenceObjects[0] + " " + action;
	for(let j = 1; j<numParams; j++){
		sentence += " " + (j==2 ? air.defaultActions[action].getPreposition() + " ":"") + sentenceObjects[j];
	}
	return sentence;
	}
	
/////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Graphics	////////////////////////////////
///////////////////////////////////////////////////////////////////////////

air.getDrawPosition = function(action){
	let m = air.memoryCanvas;
	const actionsNames = Object.keys(air.defaultActions);
	const actionsLength = actionsNames.length;
	const elementsPerSide = Math.floor(Math.pow(actionsLength, 0.5));
	
	const width  = m.canvas.getClientRects()[0].width;
	const height = m.canvas.getClientRects()[0].height;	
	
	const margin = 60;
	
	const horizontalDistance	= (width	- 2*margin) / elementsPerSide;
	const verticalDistance	= (height	- 2*margin) / elementsPerSide;
	
	const index = actionsNames.indexOf(action);
	
	const xIndex = index % elementsPerSide;
	const yIndex = Math.floor(index / elementsPerSide);
	
	const yOffset = 20;
	const argumentSpacing = 40;
	
	let position = new Object();
	
	position['x'] = margin + horizontalDistance * xIndex;
	position['y'] = margin + verticalDistance * yIndex;
	
	position["objectY"] = margin + verticalDistance * yIndex + yOffset;
	
	position["subject"] = position['x'] + argumentSpacing * 0;
	position["object"] = position['x'] + argumentSpacing * 1;
	position["indirect object"] = position['x'] + argumentSpacing * 2;
	//lg(position);
	return position;
}

air.drawLine = function(ax, ay, bx, by, style = "parabolic"){
	//lg(ax, ay, bx, by);
	let m = air.memoryCanvas;
	m.beginPath();
	m.moveTo(ax, ay);
	switch(style){
		case "parabolic":
			let controlPointX = (ax+bx)/2;
			let controlPointY = Math.max(ay,by) + 40 + Math.random()*160;
			//lg(controlPointX, controlPointY);
			m.quadraticCurveTo(controlPointX, controlPointY, bx, by);
			break;
		default: //"linear"
			m.lineTo(bx, by);
			break;
	}
	m.stroke();
}

air.drawSetup = function(){
	let m = air.memoryCanvas;
	
	const width  = m.canvas.getClientRects()[0].width;
	const height = m.canvas.getClientRects()[0].height;	
	
	m.canvas.width	= width;
	m.canvas.height	= height;
	
	m.beginPath();
	m.rect(0,0,width,height);
	m.fillStyle = "black";
	m.fill();
	
	m.textBaseline = "top";
	m.fillStyle = "white";
	m.font = "10px Arial";
}

air.drawImportance = function(){
	lg("Color the more important (higher numbers) red");
	let m = air.memoryCanvas;
	//const objectNames = Object.keys(air.bot.storage.vocab.objects);
	const objects = air.bot.storage.vocab.objects;
	let orderedList = new Array();
	
	for (var obj in objects) {
		orderedList.push([obj, objects[obj].importance]);
	};
	
	orderedList.sort(function(a, b) {
		return b[1] - a[1];
	});

	orderedList.forEach(function (o, counter) {//action.links["object"]["shoot"]["subject"]
		//const object = air.bot.getConcept(o);
		const row = 20 + counter *15;
		m.fillText(o[0], 20, row);
		m.fillText(o[1], 100, row);
	});
}


air.drawEmotionChart = function(){
	lg("Color by importance");
	let m = air.memoryCanvas;
	//const objectNames = Object.keys(air.bot.storage.vocab.objects);
	const emotions = air.bot.storage.emotions;
	let orderedList = new Array();
	
	for (var emo in emotions) {
		orderedList.push([emo, emotions[emo]]);
	};
	
	orderedList.sort(function(a, b) {
		return b[1] - a[1];
	});

	orderedList.forEach(function (o, counter) {//action.links["object"]["shoot"]["subject"]
		//const object = air.bot.getConcept(o);
		const row = 20 + counter *15;
		m.fillText(o[0], 20, row);
		m.fillText(o[1], 100, row);
	});
}

air.drawMemoryLinks = function(){
	let m = air.memoryCanvas;
	const actionsNames = Object.keys(air.bot.storage.vocab.actions);
	
	actionsNames.forEach(function (a) {//action.links["object"]["shoot"]["subject"]
		let action = air.bot.getConcept(a);
		
		const position = air.getDrawPosition(a);
		m.font = "20px Arial";
		m.fillText(a, position.x, position.y);
		
		m.font = "10px Arial";
		
		air.argNames.forEach(function(sourceArgName, counter){ //if(value > 0){//If it uses this argument
	
			//action.getEquation
			
			//Draw argument name:
			if(action.getEquation(sourceArgName)){
				m.fillText(sourceArgName, position[sourceArgName], position["objectY"]);
			}
			
			//For this argument for this verb, get the links
			let linksOfVerbsFromIntialArgument = action.links[sourceArgName];
			let linksOfVerbsFromIntialArgumentNames = Object.keys(linksOfVerbsFromIntialArgument);
			
			//For each of the verbs, get the arguments 
			linksOfVerbsFromIntialArgumentNames.forEach(function(actionName){
				//lg(linksForIntialArgument[argName]);
				let argumentsOfVerb = linksOfVerbsFromIntialArgument[actionName];
				let argumentsOfVerbNames = Object.keys(argumentsOfVerb);
				
				argumentsOfVerbNames.forEach(function(destinationArgumentName){
					let strength = argumentsOfVerb[destinationArgumentName] / action.timesUsed;
					
					let otherPosition = air.getDrawPosition(actionName);
					
					let colour = air.makeHslaColor(strength);
					m.strokeStyle = colour;
					
					air.drawLine(
						position[sourceArgName]	+ 5,
						position["objectY"]	+ 5,
						otherPosition[destinationArgumentName]	+ 5,
						otherPosition["objectY"]	+ 5
						);
					m.beginPath();
					m.arc(otherPosition[destinationArgumentName] + 5, otherPosition["objectY"]	+ 5, 5, 0, 2 * Math.PI);
					m.stroke(); 
					
				});
				
			});
		/*}*/});
	});
}

air.drawViews = {
	"m"	: {func: air.drawMemoryLinks	, key: 'memoryLinks'},
	"i"	: {func: air.drawImportance	, key: 'importance'},
	"e"	: {func: air.drawEmotionChart	, key: 'emotions'},
};

air.activeView = "i";

air.changeView = function(string){
	air.activeView = string;
	air.draw();
}

air.switchViewKey = function(e){
	air.changeView(e.key);
}


air.draw = function(){
	const drawFunc = air.drawViews[air.activeView].func;
	air.drawSetup();
	if(drawFunc){drawFunc();}
}

/////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Keymappings//////////////////////////////
///////////////////////////////////////////////////////////////////////////

document.addEventListener("keypress", air.switchViewKey, true);