	"use strict";
	air.teachWordsTo = function (pupil){
//Prepositions
	let prepositions = ["for", "with", "from", "to"];
	pupil.vocab.prepositions = prepositions.reduce((a,b)=> (a[b]=true,a),{});
		
//Nouns
	pupil.vocab.nouns["i"	] = new air.noun({v:1.5, 	});
	pupil.vocab.nouns["apple"	] = new air.noun({v:0.3, sati: 0.2	}, ["edible"]);
	pupil.vocab.nouns["lettuce"	] = new air.noun({v:-0.3, disg: 0.3	}, ["edible"]);
	pupil.vocab.nouns["fish"	] = new air.noun({v:0.5, sati: 0.4, nost: 0.3	}, ["edible", "sea-based"	]);
	pupil.vocab.nouns["hand"	] = new air.noun({v:0.3, sati: 0.3	});
	pupil.vocab.nouns["arm"	] = new air.noun({v:0.3, sati: 0.3	});
	pupil.vocab.nouns["leg"	] = new air.noun({v:0.2, sati: 0.3	});
	pupil.vocab.nouns["foot"	] = new air.noun({v:0.2, sati: 0.3	});
	pupil.vocab.nouns["head"	] = new air.noun({v:0.6, sati: 0.4	});
	pupil.vocab.nouns["torso"	] = new air.noun({v:0.5, sati: 0.4	});
	pupil.vocab.nouns["friend"	] = new air.noun({v:0.8, admi:0.4, ador:0.4	});
	pupil.vocab.nouns["dog"	] = new air.noun({v:0.8, ador:0.7 	});
	pupil.vocab.nouns["cat"	] = new air.noun({v:0.8, ador:0.7	});
	pupil.vocab.nouns["money"	] = new air.noun({v:0.8, joy: 0.4	});
	pupil.vocab.nouns["people"	] = new air.noun({v:0.4, bore: 0.3, akwa: 0.3	});
	pupil.vocab.nouns["enemy"	] = new air.noun({v:-1.0, fear:1.0	}, ["threat"	]);
	pupil.vocab.nouns["love"	] = new air.noun({v:0.8, sexu: 0.3, roma:0.3	});
	pupil.vocab.nouns["day"	] = new air.noun({v:0.2, calm: 0.3	});
	pupil.vocab.nouns["night"	] = new air.noun({v:-0.2, fear: 0.2	});
	pupil.vocab.nouns["sword"	] = new air.noun({v:0.4, inte: 0.5	});
	pupil.vocab.nouns["gun"	] = new air.noun({v:0.6, inte: 0.5, exci: 0.3	});
	pupil.vocab.nouns["village"	] = new air.noun({v:0.7, inte: 0.2, exci: 0.3	});
	pupil.vocab.nouns["monster"	] = new air.noun({v:-0.8, fear:1.0, horror: 1.0	}, ["threat"	]);
	pupil.vocab.nouns["bandit"	] = new air.noun({v:-0.5, fear:1.0	}, ["threat"	]);
	pupil.vocab.nouns["man"	] = new air.noun({v:0.4, exci: 0.1	});
	pupil.vocab.nouns["stranger"	] = new air.noun({v:-0.1, surp:0.2, fear:0.1	});
	//Need-based words	//	//
	pupil.vocab.nouns["hunger"	] = new air.noun({v:-0.7, crav: 0.5, anxi:0.5	});
	pupil.vocab.nouns["thirst"	] = new air.noun({v:-0.8, crav: 0.5, anxi:0.5	});
	pupil.vocab.nouns["cold"	] = new air.noun({v:-0.6, anxi: 0.5	});
	pupil.vocab.nouns["tiredness"	] = new air.noun({v:-0.6, anger: 0.4	});
	pupil.vocab.nouns["desperation"	] = new air.noun({v:-0.8, anxi: 0.4	});//(toilet)
	pupil.vocab.nouns["danger"	] = new air.noun({v:-1.0, anxi: 0.7	}, ["threat"	]);
	pupil.vocab.nouns["loneliness"	] = new air.noun({v:-0.5, anxi: 0.3, bore: 0.4, sad:0.5	});
	pupil.vocab.nouns["worthlessness"	] = new air.noun({v:-0.7, anxi: 0.5, sad: 0.5	});
	//Emotion-based words	//	//
	// pupil.vocab.nouns["fear"	] = new air.noun({v:-0.9	});
	// pupil.vocab.nouns["sadness"	] = new air.noun({v:-0.9	});
	// pupil.vocab.nouns["disgust"	] = new air.noun({v:-0.7	});
	// pupil.vocab.nouns["rage"	] = new air.noun({v:-0.4	});
	// pupil.vocab.nouns["surprise"	] = new air.noun({v:-0.1	});
		

//ADJECTIVES
	pupil.vocab.adjectives["my"	] = new air.adjective(1.5);
	pupil.vocab.adjectives["broken"	] = new air.adjective(0.75);
	pupil.vocab.adjectives["dead"	] = new air.adjective(-1.0);
	pupil.vocab.adjectives["near"	] = new air.adjective(1.25);
	
//VERBS
	//Default Verbs
	pupil.defaultVerb_good_so = function (subject, object){
		let mood = object.getValence() * subject.getValence();
		pupil.adjustMood(mood); //Affect ai mood
		return mood;
	}
	
	pupil.defaultVerb_bad_so = function (subject, object){
		let mood = object.getValence() * subject.getValence() * -1;
		pupil.adjustMood(mood); //Affect ai mood
		return mood;
	}
	
	pupil.defaultVerb_good = function (subject){
		let mood = subject.getValence();
		pupil.adjustMood(mood); //Affect ai mood
		return mood;
	}
	
	pupil.defaultVerb_bad = function (subject){
		let mood = -subject.getValence();
		pupil.adjustMood(mood); //Affect ai mood
		return mood;
	}
	
	pupil.eatDrink = function(subject, object){
		let mood = undefined;
		const edible = object.hasFlag("edible");
		const subGood = subject.isGood();
		const objGood = object.isGood();
		
		//If it's not edible, it's bad to eat it, but better to eat (and therefore  destroy) something bad than good
		let howGoodItIsToEat = edible ? object.getValence() : object.getValence() * -0.5 -0.5; 
		mood = subject.getValence() * howGoodItIsToEat;
		pupil.adjustMood(mood); //Affect ai mood
		return mood;
	}
	
	//Verbs
	pupil.vocab.verbs["give"] = new air.verb(function(subject, object, secondobject) {
		let mood = object.getValence() * secondobject.getValence(); //Initialise event mood
		pupil.adjustMood(mood); //Affect ai mood
		
		//Surprised and fearful if something good does something bad or vice versa - this may be important to be hard coded for all verbs
		if(mood != subject.getValence()){
			pupil.surprise += Math.abs(mood - subject.getValence());
			pupil.fear += Math.abs(mood- subject.getValence()) / 2; //Not really scary
			};
		return mood;
		}, 0.6, "to"
	);

	pupil.vocab.verbs["eat"	] = new air.verb(pupil.eatDrink, {v:0.5});
	pupil.vocab.verbs["drink"	] = new air.verb(pupil.eatDrink, {v:0.5});
	

	pupil.vocab.verbs["see"	] = new air.verb(pupil.defaultVerb_good_so, {v:0.9});
	pupil.vocab.verbs["hear"	] = new air.verb(pupil.defaultVerb_good_so, {v:0.9});
	pupil.vocab.verbs["feel"	] = new air.verb(pupil.defaultVerb_good_so, {v:0.9});
	pupil.vocab.verbs["smell"	] = new air.verb(pupil.defaultVerb_good_so, {v:0.7});
	pupil.vocab.verbs["taste"	] = new air.verb(pupil.defaultVerb_good_so, {v:0.8});
	pupil.vocab.verbs["have"	] = new air.verb(pupil.defaultVerb_good_so, {v:0.8});
	pupil.vocab.verbs["help"	] = new air.verb(pupil.defaultVerb_good_so, {v:0.7});//suspciion
	pupil.vocab.verbs["find"	] = new air.verb(pupil.defaultVerb_good_so, {v:0.7});
	pupil.vocab.verbs["receive"	] = new air.verb(pupil.defaultVerb_good_so, {v:0.9});
	pupil.vocab.verbs["believe"	] = new air.verb(pupil.defaultVerb_good_so, {v:0.9});
	
	pupil.vocab.verbs["shoot"	] = new air.verb(pupil.defaultVerb_bad_so,{v:-0.9	});
	pupil.vocab.verbs["punch"	] = new air.verb(pupil.defaultVerb_bad_so,{v:-0.5	});
	pupil.vocab.verbs["escape"	] = new air.verb(pupil.defaultVerb_bad_so,{v:-0.5	});
	
	pupil.vocab.verbs["exist"	] = new air.verb(pupil.defaultVerb_good , {v:0.8	});
	pupil.vocab.verbs["speak"	] = new air.verb(pupil.defaultVerb_good , {v:0.4	});
	pupil.vocab.verbs["sit"	] = new air.verb(pupil.defaultVerb_good , {v:0.2	});
	
	pupil.vocab.verbs["die"	] = new air.verb(pupil.defaultVerb_bad, {v:-1	});
	pupil.vocab.verbs["work"	] = new air.verb(pupil.defaultVerb_bad, {v:-0.4	});
	pupil.vocab.verbs["stand"	] = new air.verb(pupil.defaultVerb_bad, {v:-0.2	});
	pupil.vocab.verbs["run"	] = new air.verb(pupil.defaultVerb_bad, {v:-0.8	});
	
	pupil.vocab.verbs["steal"] = new air.verb(function(subject, object, secondobject) {
		let submood = subject.getValence();
		let objmood = object.getValence();
		let secondobjmood = secondobject.getValence();
		// lg(submood);
		// lg(secondobjmood);
		// lg(objmood);
		
		let mood = (subject.getValence() - secondobject.getValence() - 0.5) * object.getValence(); //Initialise event mood
		pupil.adjustMood(mood); //Affect ai mood
		
		//Surprised and fearful if something good does something bad or vice versa - this may be important?
		if(object.isBad() || subject.isGood()){
			pupil.surprise += mood*mood //Not checked this
			pupil.fear += mood*mood / 2;
		};
		return mood;
		}, -0.8, "from"
	);
	
	// pupil.vocab.verbs["receive"	] = new air.verb(from);
	
	// pupil.vocab.verbs["want"	] = new air.verb(cant want something bad);
	// pupil.vocab.verbs["need"	] = new air.verb(cant want something bad);
	
	// pupil.vocab.verbs["pay"	] = new air.verb(bad person pay someone good.);
	// pupil.vocab.verbs["plot"	] = new air.verb( );
	
	// pupil.vocab.verbs["create"	] = new air.verb();
	// pupil.vocab.verbs["write"	] = new air.verb();
	
}