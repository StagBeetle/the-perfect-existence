"use strict";
air.defaultObjects = new Object();
//let air.defaultObjects = new Object();
air.defaultObjects["i"	] = new air.object({v: 1.5, 	},"animate"	);
air.defaultObjects["apple"	] = new air.object({v: 0.3, 	},"inanimate"	, ["edible"]);
air.defaultObjects["lettuce"	] = new air.object({v:-0.3, disgust: 0.3	},"inanimate"	, ["edible"]);
air.defaultObjects["rum"	] = new air.object({v: 0.5, calm:0.2, joy:0.3	},"inanimate"	, ["edible"]);
air.defaultObjects["fish"	] = new air.object({v: 0.5, nostalgia: 0.3	},"animate"	, ["edible"]);
air.defaultObjects["hand"	] = new air.object({v: 0.3	},"inanimate"	);
air.defaultObjects["arm"	] = new air.object({v: 0.3	},"inanimate"	);
air.defaultObjects["leg"	] = new air.object({v: 0.2	},"inanimate"	);
air.defaultObjects["foot"	] = new air.object({v: 0.2	},"inanimate"	);
air.defaultObjects["head"	] = new air.object({v: 0.6	},"inanimate"	);
air.defaultObjects["torso"	] = new air.object({v: 0.5	},"inanimate"	);
air.defaultObjects["friend"	] = new air.object({v: 0.8, admiration:0.4, adoration:0.4	},"animate"	);
air.defaultObjects["dog"	] = new air.object({v: 0.7, adoration:0.4, joy: 0.4	},"animate"	);
air.defaultObjects["cat"	] = new air.object({v: 0.7, adoration:0.4	},"animate"	);
air.defaultObjects["money"	] = new air.object({v: 0.8, joy: 0.4	},"inanimate"	);
air.defaultObjects["people"	] = new air.object({v: 0.4, boredom: 0.3, awkward: 0.3	},"animate"	);
air.defaultObjects["enemy"	] = new air.object({v:-1.0, fear:1.0	},"animate"	);
air.defaultObjects["love"	] = new air.object({v: 0.8, romance:0.9, joy:0.8	},"concept"	);
air.defaultObjects["day"	] = new air.object({v: 0.2, calm: 0.3	},"concept"	);
air.defaultObjects["night"	] = new air.object({v:-0.2, fear: 0.2	},"concept"	);
air.defaultObjects["sword"	] = new air.object({v: 0.4, interest: 0.5	},"inanimate"	);
air.defaultObjects["gun"	] = new air.object({v: 0.6, interest: 0.5, excitement: 0.3	},"inanimate"	);
air.defaultObjects["village"	] = new air.object({v: 0.7, interest: 0.2, excitement: 0.3	},"animate"	);
air.defaultObjects["monster"	] = new air.object({v:-0.8, fear:1.0, horror: 1.0	},"animate"	);
air.defaultObjects["bandit"	] = new air.object({v:-0.5, fear:1.0	},"animate"	);
air.defaultObjects["man"	] = new air.object({v: 0.4	},"animate"	);
air.defaultObjects["stranger"	] = new air.object({v:-0.2, anxiety:0.2, fear:0.1	},"animate"	);
air.defaultObjects["job"	] = new air.object({v:-0.3, boredom:0.4	},"inanimate"	);
air.defaultObjects["rock"	] = new air.object({v: 0.0, calm :0.1	},"inanimate"	);
//Need-based words	//	//	//
air.defaultObjects["hunger"	] = new air.object({v:-0.7, anxiety:0.5	},"concept"	);
air.defaultObjects["thirst"	] = new air.object({v:-0.8, anxiety:0.5	},"concept"	);
air.defaultObjects["cold"	] = new air.object({v:-0.6, anxiety: 0.5	},"concept"	);
air.defaultObjects["tiredness"	] = new air.object({v:-0.6, anger: 0.4	},"concept"	);
air.defaultObjects["desperation"	] = new air.object({v:-0.8, anxiety: 0.4	},"concept"	);//(toilet)
air.defaultObjects["danger"	] = new air.object({v:-1.0, anxiety: 0.7	},"concept"	);
air.defaultObjects["loneliness"	] = new air.object({v:-0.5, anxiety: 0.3, sadness:0.5	},"concept"	);
air.defaultObjects["worthlessness"	] = new air.object({v:-0.7, anxiety: 0.5, sadness: 0.5	},"concept"	);
//Emotion-based words	//	//
// pupil.vocab.nouns["fear"	] = new air.object({v:-0.9	});
// pupil.vocab.nouns["sadness"	] = new air.object({v:-0.9	});
// pupil.vocab.nouns["disgust"	] = new air.object({v:-0.7	});
// pupil.vocab.nouns["rage"	] = new air.object({v:-0.4	});
// pupil.vocab.nouns["surprise"	] = new air.object({v:-0.1	});
	
