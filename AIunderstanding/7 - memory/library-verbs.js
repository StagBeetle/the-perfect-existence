"use strict";
air.defaultVerbs = new Object();

// air.defaultVerbs.defaultVerb_good_so = function (subject, object){
	// let mood = object.getValence() * subject.getValence();
	// this.adjustMood(mood); //Affect ai mood
	// return mood;
// }

// air.defaultVerbs.defaultVerb_bad_so = function (subject, object){
	// let mood = object.getValence() * subject.getValence() * -1;
	// this.adjustMood(mood); //Affect ai mood
	// return mood;
// }

// air.defaultVerbs.defaultVerb_good = function (subject){
	// let mood = subject.getValence();
	// this.adjustMood(mood); //Affect ai mood
	// return mood;
// }

// air.defaultVerbs.defaultVerb_bad = function (subject){
	// let mood = -subject.getValence();
	// this.adjustMood(mood); //Affect ai mood
	// return mood;
// }

// air.defaultVerbs.eatDrink = function(subject, object){
	// let mood = undefined;
	// const edible = object.hasFlag("edible");
	// const subGood = subject.isGood();
	// const objGood = object.isGood();
	
	// //If it's not edible, it's bad to eat it, but better to eat (and therefore  destroy) something bad than good
	// let howGoodItIsToEat = edible ? object.getValence() : object.getValence() * -0.5 -0.5; 
	// mood = subject.getValence() * howGoodItIsToEat;
	// this.adjustMood(mood); //Affect ai mood
	// return mood;
// }


// air.defaultVerbs.attack = function(subject, object){
	// let mood = undefined;
	// const subGood = subject.isGood();
	// const objGood = object.isGood();
	
	// mood = -object.getBalance();
	// this.adjustMood(mood); //Affect ai mood
	// return mood;
// }

// //Verbs
// air.defaultVerbs["give"] = new air.verb({
// v: function(subject, object, secondobject) {
	// let mood = object.getValence() * secondobject.getValence(); //Initialise event mood
	// this.adjustMood(mood); //Affect ai mood
	
	// //Surprised and fearful if something good does something bad or vice versa - this may be important to be hard coded for all verbs
	// if(mood != subject.getValence()){
		// this.surprise += Math.abs(mood - subject.getValence());
		// this.fear += Math.abs(mood- subject.getValence()) / 2; //Not really scary
		// };
	// return mood;
	// }}, {v:0.6	}, "to"
// );

// air.defaultVerbs["steal"] = new air.verb({
// v: function(subject, object, secondobject) {
	// let submood = subject.getValence();
	// let objmood = object.getValence();
	// let secondobjmood = secondobject.getValence();
	// // lg(submood);
	// // lg(secondobjmood);
	// // lg(objmood);
	
	// let mood = (subject.getValence() - secondobject.getValence() - 0.5) * object.getValence(); //Initialise event mood
	// this.adjustMood(mood); //Affect ai mood
	
	// //Surprised and fearful if something good does something bad or vice versa - this may be important?
	// if(object.isBad() || subject.isGood()){
		// this.surprise += mood*mood //Not checked this
		// this.fear += mood*mood / 2;
	// };
	// return mood;
	// }}, {v:-0.8	}, "from"
// );

air.defaultVerbs["give"	] = new air.verb([1,2,2]	, {v: 0.6	},"to"	);
air.defaultVerbs["steal"	] = new air.verb([1,2,2]	, {v:-0.8 	},"from"	);
air.defaultVerbs["eat"	] = new air.verb([2,2,0]	, {v: 0.7	}	);
air.defaultVerbs["drink"	] = new air.verb([2,2,0]	, {v: 0.5	}	);
air.defaultVerbs["see"	] = new air.verb([2,2,0]	, {v: 0.7	}	);
air.defaultVerbs["hear"	] = new air.verb([2,2,0]	, {v: 0.7	}	);
air.defaultVerbs["feel"	] = new air.verb([2,2,0]	, {v: 0.7	}	);
air.defaultVerbs["smell"	] = new air.verb([2,2,0]	, {v: 0.5	}	);
air.defaultVerbs["taste"	] = new air.verb([2,2,0]	, {v: 0.6	}	);
air.defaultVerbs["have"	] = new air.verb([2,2,0]	, {v: 0.8	}	);
air.defaultVerbs["help"	] = new air.verb([1,2,0]	, {v: 0.7	}	);
air.defaultVerbs["find"	] = new air.verb([2,2,0]	, {v: 0.7	}	);
air.defaultVerbs["receive"	] = new air.verb([2,2,0]	, {v: 0.9	}	);
air.defaultVerbs["believe"	] = new air.verb([2,2,0]	, {v: 0.9	}	);
air.defaultVerbs["shoot"	] = new air.verb([1,2,0]	, {v:-0.9	}	);
air.defaultVerbs["kill"	] = new air.verb([1,2,0]	, {v:-1.1	}	);
air.defaultVerbs["punch"	] = new air.verb([1,2,0]	, {v:-0.5	}	);
air.defaultVerbs["escape"	] = new air.verb([2,0,0]	, {v:-0.5	}	);
air.defaultVerbs["exist"	] = new air.verb([2,0,0]	, {v: 0.8	}	);
air.defaultVerbs["speak"	] = new air.verb([2,0,0]	, {v: 0.4	}	);
air.defaultVerbs["sit"	] = new air.verb([2,0,0]	, {v: 0.2	}	);
air.defaultVerbs["die"	] = new air.verb([2,0,0]	, {v:-1.0	}	);
air.defaultVerbs["work"	] = new air.verb([2,0,0]	, {v:-0.4	}	);
air.defaultVerbs["stand"	] = new air.verb([2,0,0]	, {v:-0.2	}	);
air.defaultVerbs["run"	] = new air.verb([2,0,0]	, {v:-0.8	}	);
air.defaultVerbs["plead"	] = new air.verb([2,0,0]	, {v:-0.3	}	);
air.defaultVerbs["like"	] = new air.verb([1,2,0]	, {v: 0.6	}	);
air.defaultVerbs["hate"	] = new air.verb([1,2,0]	, {v:-0.8	}	);

/*
Examples
	Fish escape
	man steals broken car from friend


*/

//air.defaultVerbs.verbs["steal"	] = new air.verb({v:air.defaultVerbs.defaultVerb_bad}, {v:-1.0	});

// air.defaultVerbs.verbs["receive"	] = new air.verb(from);

// air.defaultVerbs.verbs["want"	] = new air.verb(cant want something bad);
// air.defaultVerbs.verbs["need"	] = new air.verb(cant want something bad);

// air.defaultVerbs.verbs["pay"	] = new air.verb(bad person pay someone good.);
// air.defaultVerbs.verbs["plot"	] = new air.verb( );

// air.defaultVerbs.verbs["create"	] = new air.verb();
// air.defaultVerbs.verbs["write"	] = new air.verb();