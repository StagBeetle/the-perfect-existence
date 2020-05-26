"use strict";
air.defaultActions = new Object();

air.clusters = new Object();


//Where are this functions:
//Function within AI 

//Summarise this and decide where to put it
	//Argument and event should be reworked so al the argumenst are in the same place
	
let enableLog = true;
air.clusters.giveCluster = {
	"subject": function(event){
		//This shouldn't affect the object but should affect the AI's perception of the object.
		let object = event.get("object");
		let indirectObject = event.get("indirect object");
		let subject = event.get("subject");
		
		let effectOnArgument = object.getValence() - indirectObject.getValence() * event.get("action").getStrength();
		effectOnArgument *= 1; //Maybe increase this to 2 if two objects are multiplied
		// lg(	"eoa",
			// effectOnArgument,
			// object.getValence(),
			// indirectObject.getValence(),
			// event.get("action").getValence()
			// );
		
		let effectOnAI = effectOnArgument * subject.getValence() * 2; //Merge the emotions
		if(enableLog){lg("subject", effectOnArgument);}
		return effectOnAI;
		//How do emotions interact?
	},
	"object": function(event){
		//This is a mess and is doing nothing but I have kwept it because there may be something salvageable in there.
		//BEing given by a bad person tempers the feeling somewhat because you might be getting used
		let subject = event.get("subject");
		let indirectObject = event.get("indirect object");
		let object = event.get("object");
		
		//let effectOnArgument = object.getEmotion() + indirectObject.getEmotion().multiply(2)
		let effectOnArgument = (indirectObject.getValence() +  0.5 * subject.getValence()) * event.get("action").getStrength()
		effectOnArgument *= 1; //Because there were two multiplicative variables
		
		let effectOnAI = effectOnArgument * object.getValence() * 2; //Merge the emotions
		//if(enableLog){lg("object", effectOnAI);}
		return 0;//Ignore the feelings of the object
	},
	"indirect object": function(event){
		//lg(event);
		let object = event.get("object");
		let subject = event.get("subject");
		let indirect = event.get("indirect object");
		
		let effectOnArgument = (-object.getValence() - Math.abs(subject.getValence())) * event.get("action").getStrength(); //The more you hate or love someone, the worse it is
		//effectOnArgument *= 2; //Because there were two multiplicative variables
		let surprise = object.isGood() == subject.isGood() ? 0  : 
			Math.max(object.getValence(),subject.getValence() ) - 
			Math.min(object.getValence(),subject.getValence() ) ;
			
		let effectOnAI = effectOnArgument * indirect.getValence() * 2; //Merge the emotions
		if(enableLog){lg("indirect object", effectOnArgument);}
		return effectOnAI;
	}
}

air.clusters.eatCluster = {
	"subject": function(event){
		let object = event.get("object");
		let subject = event.get("subject");
		
		let effectOnArgument = object.getValence() * event.get("action").getValence() * objects.tagStrength;//Only consider valence
		effectOnArgument *= 2; //Because there were two variables
		
		let effectOnAI = effectOnArgument * subject.getValence(); //Merge the emotions
		lg("subject", effectOnArgument);
		return effectOnAI;
	},
	"object": function(event){
		let subject = event.get("subject");
		let object = event.get("object");
		
		let effectOnArgument = event.get("action").getValence();
		
		let effectOnAI = effectOnArgument * object.getValence(); //Merge the emotions
		lg("object", effectOnArgument);
		return effectOnAI;
	}
}

air.clusters.baseClusterTwo = {
	"subject": function(event){
		let object = event.get("object");
		let subject = event.get("subject");
		
		let effectOnArgument = object.getValence() * event.get("action").getValence();//Only consider valence
		effectOnArgument *= 2; //Because there were two variables
		
		let effectOnAI = effectOnArgument * subject.getValence(); //Merge the emotions
		lg("subject", effectOnArgument);
		return effectOnAI;
	},
	"object": function(event){
		let subject = event.get("subject");
		let object = event.get("object");
		
		let effectOnArgument = event.get("action").getValence();
		
		let effectOnAI = effectOnArgument * object.getValence(); //Merge the emotions
		lg("object", effectOnArgument);
		return effectOnAI;
	}
}

air.clusters.singleCluster = {
	"subject": function(event){
		let subject = event.get("subject");
		
		let effectOnArgument = event.get("action").getValence();//Only consider valence
		
		let effectOnAI = effectOnArgument * subject.getValence(); //Merge the emotions
		return effectOnAI;
	}
}





air.defaultActions["give"	] = new air.action(air.clusters.giveCluster	, {v: 0.6	},"to"	);
air.defaultActions["steal"	] = new air.action(air.clusters.giveCluster	, {v:-0.8 	},"from"	);
air.defaultActions["eat"	] = new air.action(air.clusters.eatCluster	, {v: 0.7	}	);
air.defaultActions["drink"	] = new air.action(air.clusters.eatCluster	, {v: 0.5	}	);
air.defaultActions["see"	] = new air.action(air.clusters.baseClusterTwo	, {v: 0.7	}	);
air.defaultActions["hear"	] = new air.action(air.clusters.baseClusterTwo	, {v: 0.7	}	);
air.defaultActions["feel"	] = new air.action(air.clusters.baseClusterTwo	, {v: 0.7	}	);
air.defaultActions["smell"	] = new air.action(air.clusters.baseClusterTwo	, {v: 0.5	}	);
air.defaultActions["taste"	] = new air.action(air.clusters.baseClusterTwo	, {v: 0.6	}	);
air.defaultActions["have"	] = new air.action(air.clusters.baseClusterTwo	, {v: 0.8	}	);
air.defaultActions["help"	] = new air.action(air.clusters.baseClusterTwo	, {v: 0.7	}	);
air.defaultActions["find"	] = new air.action(air.clusters.baseClusterTwo	, {v: 0.7	}	);
air.defaultActions["receive"	] = new air.action(air.clusters.baseClusterTwo	, {v: 0.9	}	);
air.defaultActions["believe"	] = new air.action(air.clusters.baseClusterTwo	, {v: 0.9	}	);
air.defaultActions["shoot"	] = new air.action(air.clusters.baseClusterTwo	, {v:-0.9	}	);
air.defaultActions["kill"	] = new air.action(air.clusters.baseClusterTwo	, {v:-1.0	}	);
air.defaultActions["punch"	] = new air.action(air.clusters.baseClusterTwo	, {v:-0.5	}	);
air.defaultActions["escape"	] = new air.action(air.clusters.singleCluster	, {v:-0.5	}	);
air.defaultActions["exist"	] = new air.action(air.clusters.singleCluster	, {v: 0.8	}	);
air.defaultActions["speak"	] = new air.action(air.clusters.singleCluster	, {v: 0.2	}	);
air.defaultActions["sit"	] = new air.action(air.clusters.singleCluster	, {v: 0.2	}	);
air.defaultActions["die"	] = new air.action(air.clusters.singleCluster	, {v:-1.0	}	);
air.defaultActions["work"	] = new air.action(air.clusters.singleCluster	, {v:-0.4	}	);
air.defaultActions["stand"	] = new air.action(air.clusters.singleCluster	, {v:-0.2	}	);
air.defaultActions["run"	] = new air.action(air.clusters.singleCluster	, {v:-0.8	}	);
air.defaultActions["plead"	] = new air.action(air.clusters.singleCluster	, {v:-0.3	}	);
air.defaultActions["like"	] = new air.action(air.clusters.singleCluster	, {v: 0.6	}	);
air.defaultActions["hate"	] = new air.action(air.clusters.singleCluster	, {v:-0.8	}	);
air.defaultActions["threaten"	] = new air.action(air.clusters.baseClusterTwo	, {v:-0.5	}	);
air.defaultActions["become"	] = new air.action(air.clusters.baseClusterTwo	, {v: 0.3	}	);
//Turn from / to - same verb but opposite meanings. This is something to perhaps consider
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