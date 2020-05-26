"use strict";
air.teachWordsTo = function (pupil){
	pupil.vocab.nouns = air.defaultNouns;
	pupil.vocab.verbs = air.defaultVerbs;
	pupil.vocab.adjectives = air.defaultAdjectives;
	
	let prepositions = ["for", "with", "from", "to"];
	pupil.vocab.prepositions = prepositions.reduce((a,b)=> (a[b]=true,a),{});
}