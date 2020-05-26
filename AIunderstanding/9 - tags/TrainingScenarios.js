let trainingScenarios = `
I see enemy
enemy shoot i
i hear enemy
i shoot enemy
friend help i
friend shoot enemy
enemy die

stranger give lettuce to village
stranger speak
village eat lettuce
stranger steal cat from village
man punch stranger
stranger run

bandit threaten friend
friend plead
bandit punch friend
bandit steal money from friend
bandit escape
friend hate bandit
friend find bandit
friend kill bandit
friend get money

man feel worthlessness
man feel loneliness
man feel desperation
man sit
man smell rum
man drink rum
man become monster
man punch dog
man have thirst
man kill man

friend work
friend stand
friend hate job
friend receive money
friend have money

i see friend
friend steal gun from bandit
friend give gun to i
i like friend

monster exist
monster kill cat
cat die
village hate monster
monster eat dog
monster taste dog
dog die
village hate monster
man kill monster
village like man
`;

	
window.addEventListener("load", function(){
	air.bot.processMultiple(trainingScenarios);
	air.draw();
}, true);