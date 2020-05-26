air.slotChoices = [
	"undefined"	,
	"verbValence"	,
	"subjectEmotions"	,
	"subjectValence"	,
	"objectEmotions"	,
	"objectValence"	,
	"secondObjectEmotions"	,
	"secondObjectValence"	,
];
air.numberOfChoices = air.slotChoices.length;

air.mathsFuncs = {
	"*" : function(x,y){return x * y;},
	"/" : function(x,y){return x / y;},
	"+" : function(x,y){return x + y;},
	"-" : function(x,y){return x - y;},
};
air.functionNames = Object.keys(air.mathsFuncs);
air.numberOfFunctions = air.functionNames.length;

air.numberOfSlots = 4;
air.numberOfSlotOptions = Math.pow(air.numberOfChoices, air.numberOfSlots); //4096
air.numberOfFunctionOptions = Math.pow(air.numberOfFunctions, air.numberOfSlots-1); //64

air.generateEquation = function(key){//KEy to be incremented each time externally
	let returnEquation = new Object();
	
	let slotSelectionNumber = key % air.numberOfSlotOptions;
	let opSelectionNumber = Math.floor(key / air.numberOfSlotOptions) % air.numberOfFunctionOptions;
	
	//Do these auto:
	returnEquation.elements = [
		air.slotChoices[Math.floor(slotSelectionNumber / Math.pow(air.numberOfChoices, 0)) % air.numberOfChoices] ,
		air.slotChoices[Math.floor(slotSelectionNumber / Math.pow(air.numberOfChoices, 1)) % air.numberOfChoices] ,
		air.slotChoices[Math.floor(slotSelectionNumber / Math.pow(air.numberOfChoices, 2)) % air.numberOfChoices] ,
		air.slotChoices[Math.floor(slotSelectionNumber / Math.pow(air.numberOfChoices, 3)) % air.numberOfChoices] ,
	];
	//Do these auto:
	returnEquation.operations = [
		air.functionNames[Math.floor(opSelectionNumber / Math.pow(air.numberOfFunctions, 0)) % air.numberOfFunctions] ,
		air.functionNames[Math.floor(opSelectionNumber / Math.pow(air.numberOfFunctions, 1)) % air.numberOfFunctions] ,
		air.functionNames[Math.floor(opSelectionNumber / Math.pow(air.numberOfFunctions, 2)) % air.numberOfFunctions] ,
	];
	
	returnEquation.key = key;
	
	return returnEquation;
}

air.AIform = document.getElementById("AIform");
air.eventBox = document.getElementById("eventBox");
air.skipButton = document.getElementById("skipButton");

air.activeWord = "give";

air.checker = function(){
	let emotionClusters = localStorage["emotions"];
	
	let bestSlotNum = undefined;
	let bestFuncNum = undefined;
	let bestAccuracy = 0;
	
	for(let i = 0; i < air.numberOfSlotOptions * air.numberOfFunctionOptions ; i++){
		let equationObject = air.generateEquation(i);
		sentences.forEach(function(sentence){
			//Create a map for the key:
			let values = new Object();
			values[air.slotChoices[0]] = undefined;
			values[air.slotChoices[1]] = undefined;
			values[air.slotChoices[2]] = undefined;
			values[air.slotChoices[3]] = undefined;
			values[air.slotChoices[4]] = undefined;
			values[air.slotChoices[5]] = undefined;
			values[air.slotChoices[6]] = undefined;
			values[air.slotChoices[7]] = undefined;
			
			equationObject.elements
			equationObject.operations
			//Compare to human input emotion values (for this, emotions needs to be better mapped to one another)
			
		});
		Check each param, weighted, and if better than last iteration, save that combination
	}
}//End function
			
/*
function rep(variable, replacer){//If variable is undefined
	return variable == undefined ? replacer : variable;
}



let multiFunc = function(x, y, op){//Do functions to emotion objects and numbers
	let isXObject = false;
	let isYObject = false;
	if (typeof x === "object"){isObject = true;}
	if (typeof y === "object"){isObject = true;}
	let output = new Object();
	if(isXObject && isYObject){
		Object.keys(x).forEach(function(emotion){
			let product = mathsFuncs[op](x[emotion], y[emotion]);
			let saveEmotion = emotion;
			if (product < 0){ 
				product *= -1;
				let saveEmotion = air.emotions[emotion].getOpposite();
			}
			if(output[saveEmotion] == undefined){
				output[saveEmotion] = product;
			} else {
				output[saveEmotion] += product;
			}
		});
	}
	else if(isXObject && !isYObject){
		Object.keys(x).forEach(function(emotion){
			let product= mathsFuncs[op](x[emotion], y);
			let saveEmotion = emotion;
			if (product < 0){ 
				product *= -1;
				let saveEmotion = air.emotions[emotion].getOpposite();
			}
			if(output[saveEmotion] == undefined){
				output[saveEmotion] = product;
			} else {
				output[saveEmotion] += product;
			}
		});
	}
	else if(!isXObject && isYObject){
		Object.keys(x).forEach(function(emotion){
			let product = mathsFuncs[op](x, y[emotion]);
			let saveEmotion = emotion;
			if (product < 0){ 
				product *= -1;
				let saveEmotion = air.emotions[emotion].getOpposite();
			}
			if(output[saveEmotion] == undefined){
				output[saveEmotion] = product;
			} else {
				output[saveEmotion] += product;
			}
		}); 
	}
	else {
		return mathsFuncs[op](x, y);
	}
	
	return output;
	
}

let mathematicalFunctions = {
	"*" : function(x,y){return rep(x,1) * rep(y,1);},
	"/" : function(x,y){return rep(x,1) / rep(y,1);},
	"+" : function(x,y){return rep(x,0) + rep(y,0);},
	"-" : function(x,y){return rep(x,0) - rep(y,0);},
	// scale
	// invert
}; //Maybe need higher functions (powers etc)
let functionNames = Object.keys(mathematicalFunctions);
let nF = functionNames.length;

function cO(x, y, op){//Cluster operations
	let emotionCluster = new Object();
	Object.keys(x).forEach(function(emotion){
		emotionCluster[emotion] = mathematicalFunctions[op](x[emotion], y[emotion]);
	});
	return emotionCluster;
}
	
	let bestSlotNum = undefined;
	let bestFuncNum = undefined;
	let bestAccuracy = undefined
	
	for(let slotSelectionNumber; slotSelectionNumber < 4096; slotSelectionNumber++){
		for(let funcSelectionNumber; funcSelectionNumber < 64; funcSelectionNumber++){
		
			let slotSelectionNumber = 0; //Increment each time (up to 8^4 = 4096)
			let funcSelectionNumber = 0; //Increment each time (up to 4^3 = 64)
			

			
			let slots = new Array();
			
			slots[0] = slotChoices[(slotSelectionNumber / Math.power(nC, 0) % nC];
			slots[1] = slotChoices[(slotSelectionNumber / Math.power(nC, 1) % nC];
			slots[2] = slotChoices[(slotSelectionNumber / Math.power(nC, 2) % nC];
			slots[3] = slotChoices[(slotSelectionNumber / Math.power(nC, 3) % nC];
			
			air.functionNames
			
			let answer	= cO(slots[0]	, slots[1],functionNames[(funcSelectionNumber / Math.power(nF, 0) % nF]);
			answer	= cO(answer	, slots[2],functionNames[(funcSelectionNumber / Math.power(nF, 1) % nF]);
			answer	= cO(answer	, slots[3],functionNames[(funcSelectionNumber / Math.power(nF, 2) % nF]);
		
			
			
			//C
		}
	}
}
*/

//window.addEventListener("load", air.generatePage, true);