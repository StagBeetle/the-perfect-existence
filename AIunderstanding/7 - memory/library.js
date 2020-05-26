"use strict";
air.teachWordsTo = function (pupil){
	let prepositions = ["for", "with", "from", "to"];
	
	pupil.learnWords(air.defaultNouns, air.defaultVerbs, air.defaultAdjectives, prepositions);
}