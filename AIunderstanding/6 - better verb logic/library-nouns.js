"use strict";
air.defaultNouns = new Object();
//let air.defaultNouns = new Object();
air.defaultNouns["i"	] = new air.noun({v: 1.5, 	},"animate"	);
air.defaultNouns["apple"	] = new air.noun({v: 0.3, 	},"inanimate"	, ["edible"]);
air.defaultNouns["lettuce"	] = new air.noun({v:-0.3, disgust: 0.3	},"inanimate"	, ["edible"]);
air.defaultNouns["rum"	] = new air.noun({v: 0.5, calm:0.2, joy:0.3	},"inanimate"	, ["edible"]);
air.defaultNouns["fish"	] = new air.noun({v: 0.5, nostalgia: 0.3	},"animate"	, ["edible"]);
air.defaultNouns["hand"	] = new air.noun({v: 0.3	},"inanimate"	);
air.defaultNouns["arm"	] = new air.noun({v: 0.3	},"inanimate"	);
air.defaultNouns["leg"	] = new air.noun({v: 0.2	},"inanimate"	);
air.defaultNouns["foot"	] = new air.noun({v: 0.2	},"inanimate"	);
air.defaultNouns["head"	] = new air.noun({v: 0.6	},"inanimate"	);
air.defaultNouns["torso"	] = new air.noun({v: 0.5	},"inanimate"	);
air.defaultNouns["friend"	] = new air.noun({v: 0.8, admiration:0.4, adoration:0.4	},"animate"	);
air.defaultNouns["dog"	] = new air.noun({v: 0.8, adoration:0.4 	},"animate"	);
air.defaultNouns["cat"	] = new air.noun({v: 0.8, adoration:0.4	},"animate"	);
air.defaultNouns["money"	] = new air.noun({v: 0.8, joy: 0.4	},"inanimate"	);
air.defaultNouns["people"	] = new air.noun({v: 0.4, boredom: 0.3, akward: 0.3	},"animate"	);
air.defaultNouns["enemy"	] = new air.noun({v:-1.0, fear:1.0	},"animate"	, ["threat"	]);
air.defaultNouns["love"	] = new air.noun({v: 0.8, romance:0.3	},"concept"	);
air.defaultNouns["day"	] = new air.noun({v: 0.2, calm: 0.3	},"concept"	);
air.defaultNouns["night"	] = new air.noun({v:-0.2, fear: 0.2	},"concept"	);
air.defaultNouns["sword"	] = new air.noun({v: 0.4, interest: 0.5	},"inanimate"	);
air.defaultNouns["gun"	] = new air.noun({v: 0.6, interest: 0.5, excitement: 0.3	},"inanimate"	);
air.defaultNouns["village"	] = new air.noun({v: 0.7, interest: 0.2, excitement: 0.3	},"animate"	);
air.defaultNouns["monster"	] = new air.noun({v:-0.8, fear:1.0, horror: 1.0	},"animate"	, ["threat"	]);
air.defaultNouns["bandit"	] = new air.noun({v:-0.5, fear:1.0	},"animate"	, ["threat"	]);
air.defaultNouns["man"	] = new air.noun({v: 0.4	},"animate"	);
air.defaultNouns["stranger"	] = new air.noun({v:-0.2, anxiety:0.2, fear:0.1	},"animate"	);
//Need-based words	//	//	//
air.defaultNouns["hunger"	] = new air.noun({v:-0.7, anxiety:0.5	},"concept"	);
air.defaultNouns["thirst"	] = new air.noun({v:-0.8, anxiety:0.5	},"concept"	);
air.defaultNouns["cold"	] = new air.noun({v:-0.6, anxiety: 0.5	},"concept"	);
air.defaultNouns["tiredness"	] = new air.noun({v:-0.6, anger: 0.4	},"concept"	);
air.defaultNouns["desperation"	] = new air.noun({v:-0.8, anxiety: 0.4	},"concept"	);//(toilet)
air.defaultNouns["danger"	] = new air.noun({v:-1.0, anxiety: 0.7	},"concept"	, ["threat"	]);
air.defaultNouns["loneliness"	] = new air.noun({v:-0.5, anxiety: 0.3, sadness:0.5	},"concept"	);
air.defaultNouns["worthlessness"	] = new air.noun({v:-0.7, anxiety: 0.5, sadness: 0.5	},"concept"	);
//Emotion-based words	//	//
// pupil.vocab.nouns["fear"	] = new air.noun({v:-0.9	});
// pupil.vocab.nouns["sadness"	] = new air.noun({v:-0.9	});
// pupil.vocab.nouns["disgust"	] = new air.noun({v:-0.7	});
// pupil.vocab.nouns["rage"	] = new air.noun({v:-0.4	});
// pupil.vocab.nouns["surprise"	] = new air.noun({v:-0.1	});
	
