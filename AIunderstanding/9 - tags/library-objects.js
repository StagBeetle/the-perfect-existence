"use strict";
air.defaultObjects = new Object();
//let air.defaultObjects = new Object();
air.defaultObjects["i"	] = new air.object({v: 1.5, animation: 1.0	});
air.defaultObjects["apple"	] = new air.object({v: 0.3, edible: 1.0	});
air.defaultObjects["lettuce"	] = new air.object({v:-0.3, disgust: 0.3, edible: 0.5	});
air.defaultObjects["rum"	] = new air.object({v: 0.5, calm:0.2, joy:0.3, edible: 0.8	});
air.defaultObjects["fish"	] = new air.object({v: 0.5, nostalgia: 0.3, animation: 0.3, edible: 0.7	});
air.defaultObjects["hand"	] = new air.object({v: 0.3	});
air.defaultObjects["arm"	] = new air.object({v: 0.3	});
air.defaultObjects["leg"	] = new air.object({v: 0.2	});
air.defaultObjects["foot"	] = new air.object({v: 0.2	});
air.defaultObjects["head"	] = new air.object({v: 0.6	});
air.defaultObjects["torso"	] = new air.object({v: 0.5	});
air.defaultObjects["friend"	] = new air.object({v: 0.8, admiration:0.4, adoration:0.4, animation: 1.0	});
air.defaultObjects["dog"	] = new air.object({v: 0.7, adoration:0.4, joy: 0.4, animation: 0.6	});
air.defaultObjects["cat"	] = new air.object({v: 0.7, adoration:0.4, animation: 0.6	});
air.defaultObjects["money"	] = new air.object({v: 0.8, joy: 0.4	});
air.defaultObjects["people"	] = new air.object({v: 0.4, boredom: 0.3, awkward: 0.3, animation: 1.0	});
air.defaultObjects["enemy"	] = new air.object({v:-1.0, fear:1.0, animation: 1.0	});
air.defaultObjects["love"	] = new air.object({v: 0.8, romance:0.9, joy:0.8	});
air.defaultObjects["day"	] = new air.object({v: 0.2, calm: 0.3	});
air.defaultObjects["night"	] = new air.object({v:-0.2, fear: 0.2	});
air.defaultObjects["sword"	] = new air.object({v: 0.4, interest: 0.5	});
air.defaultObjects["gun"	] = new air.object({v: 0.6, interest: 0.5, excitement: 0.3	});
air.defaultObjects["village"	] = new air.object({v: 0.7, interest: 0.2, excitement: 0.3, animation: 0.8	});
air.defaultObjects["monster"	] = new air.object({v:-0.8, fear:1.0, horror: 1.0, animation: 0.6	});
air.defaultObjects["bandit"	] = new air.object({v:-0.5, fear:1.0, animation: 1.0	});
air.defaultObjects["man"	] = new air.object({v: 0.4, animation: 1.0	});
air.defaultObjects["stranger"	] = new air.object({v:-0.2, anxiety:0.2, fear:0.1, animation: 1.0	});
air.defaultObjects["job"	] = new air.object({v:-0.3, boredom:0.4	});
air.defaultObjects["rock"	] = new air.object({v: 0.0, calm :0.1	});
//Need-based words	//	///
air.defaultObjects["hunger"	] = new air.object({v:-0.7, anxiety:0.5	});
air.defaultObjects["thirst"	] = new air.object({v:-0.8, anxiety:0.5	});
air.defaultObjects["cold"	] = new air.object({v:-0.6, anxiety: 0.5	});
air.defaultObjects["tiredness"	] = new air.object({v:-0.6, anger: 0.4	});
air.defaultObjects["desperation"	] = new air.object({v:-0.8, anxiety: 0.4	});//(toilet)
air.defaultObjects["danger"	] = new air.object({v:-1.0, anxiety: 0.7	});
air.defaultObjects["loneliness"	] = new air.object({v:-0.5, anxiety: 0.3, sadness:0.5	});
air.defaultObjects["worthlessness"	] = new air.object({v:-0.7, anxiety: 0.5, sadness: 0.5	});
//Emotion-based words	//	//
// pupil.vocab.nouns["fear"	] = new air.object({v:-0.9	});
// pupil.vocab.nouns["sadness"	] = new air.object({v:-0.9	});
// pupil.vocab.nouns["disgust"	] = new air.object({v:-0.7	});
// pupil.vocab.nouns["rage"	] = new air.object({v:-0.4	});
// pupil.vocab.nouns["surprise"	] = new air.object({v:-0.1	});
	
