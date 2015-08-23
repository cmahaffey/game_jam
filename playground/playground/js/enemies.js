// requires character.js
// require utilityFunctions.js

var playerStats = [
  [1, 1, 0, 1],
  [3, 3, 1, 2],
  [5, 5, 2, 4],
  [8, 7, 3, 6],
  [12, 10, 4, 8],
  [14, 11, 5, 11],
  [18, 16, 6, 14],
  [26, 24, 7, 20],
  [31, 30, 8, 24],
  [36, 33, 9, 30]
];


Character.prototype.levelUp = function levelUp(playerStats){
  this.lvl += 1;
  this.playerStats(this.lvl, playerStats);

  return this;
};


Character.prototype.playerStats = function playerStats(level, playerStats) {

  // [level-1][0]att [1]def [2]imn [3]spd

  this.att = playerStats[level-1][0];
  this.def = playerStats[level-1][1];
  this.imn = playerStats[level-1][2];
  this.spd = playerStats[level-1][3];

  this.maxHp = ( 5 * this.def);
  this.maxMp = ( 3 * this.imn);

  this.hp = this.maxHp;
  this.mp = this.maxMp;

  return this;
};


// Enemy Template

var enemyTemplate = new Character({
  name: "Unnamed Enemy",
  lvl: 0,
});
enemyTemplate.playerStats(enemyTemplate.lvl, playerStats)


// Enemies

var dustMite = new Character({
  name: "Dust Mite",
  lvl: 1
});
dustMite.playerStats(dustMite.lvl, playerStats);

var bedBugs = new Character({
  name: "Bed Bugs",
  lvl: 2
});
bedBugs.playerStats(bedBugs.lvl, playerStats);


var brokenDoll = new Character({
  name: "Broken Doll",
  lvl: 3
});
brokenDoll.playerStats(brokenDoll.lvl, playerStats);

var brokenTruck = new Character({
  name: "Broken Truck",
  lvl: 4
});
brokenTruck.playerStats(brokenTruck.lvl, playerStats);

var scaryClown = new Character({
  name: "Scary Clown",
  lvl: 5
});
scaryClown.playerStats(scaryClown.lvl, playerStats);

var lesserMonster = new Character({
  name: "Lesser Monster",
  lvl: 6
});
lesserMonster.playerStats(lesserMonster.lvl, playerStats);

var greaterMonster = new Character({
  name: "Greater Monster",
  lvl: 7
});
greaterMonster.playerStats(greaterMonster.lvl, playerStats);

var bogeyMan = new Character({
  name: "Bogey Man",
  lvl: 8
});
bogeyMan.playerStats(bogeyMan.lvl, playerStats);

var mrSandman = new Character({
  name: "Mr. Sandman",
  lvl: 9
});
mrSandman.playerStats(mrSandman.lvl, playerStats);

var ghost = new Character({
  name: "Level Ten",
  lvl: 10
});
ghost.playerStats(ghost.lvl, playerStats);


var evilBear = new Character({
  name: "Corrupted Teddy Bear",
  lvl: 11,
  hp: 200,
  maxHp: 200,

  att: 40,
  def: 40,
  imn: 0,
  spd: 30
});


//  All the Enemies

var enemies = [dustMite, bedBugs, brokenDoll, brokenTruck, scaryClown, lesserMonster, greaterMonster, bogeyMan, mrSandman, ghost, evilBear];


// Generate Enemies

function generateEnemy(gameLevel, enemies) {
  var enemyOptions = [];
  var maxLevel = 10;

  if (gameLevel === 1){
    enemyOptions = [enemies[gameLevel - 1], enemies[gameLevel]];
  } else if (gameLevel > 1 && gameLevel < maxLevel) {
    enemyOptions = [enemies[gameLevel - 2], enemies[gameLevel - 1], enemies[gameLevel]];
  } else if (gameLevel === maxLevel) {
    return enemies[maxLevel];
  } else {
    console.log("Invalid enemy level option");
  }

  return sample(enemyOptions);
}


function generateMuliptleEnemies(gameLevel, enemies){
  var enemyParty = [];

  for (var i = 0; i < getRandomInteger(1, 3); i++) {
    enemyParty.push(generateEnemy(gameLevel,enemies))
  }

  return enemyParty;
};
