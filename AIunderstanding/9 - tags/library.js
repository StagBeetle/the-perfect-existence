"use strict";
air.teachWordsTo = function (pupil){
	air.defaultPrepositions = new Object();
	air.defaultPrepositions["for"	] = new air.preposition();
	air.defaultPrepositions["with"	] = new air.preposition();
	air.defaultPrepositions["from"	] = new air.preposition();
	air.defaultPrepositions["to"	] = new air.preposition();
	
	pupil.learnWords(air.defaultObjects, air.defaultActions, air.defaultDescriptors, air.defaultPrepositions);
}