// requires character.js
// require utilityFunctions.js


var enemyTemplate = new Character({

  name: "Unnamed Enemy",
  lvl: 0,
  hp: 0,
  maxHp: 0,
  mp: 0,
  maxMp: 0,

  att: 0,
  def: 0,
  imn: 0,
  spd: 0,

  weapon: null,
  equipment: null,
  inventory: null,

  abilities: [],
  player: false,
  exp: 0,
  expMax: 0

});


// Enemies

var dustMite = new Character({

  name: "Dust Mite",
  lvl: 1,
  hp: 10,
  maxHp: 10,
  mp: 0,
  maxMp: 0,

  att: 1,
  def: 1,
  imn: 0,
  spd: 1,

  weapon: null,
  equipment: null,
  inventory: null,

  abilities: [],
  player: false,
  exp: 0,
  expMax: 0

});

var bedBugs = new Character({

  name: "Bed Bugs",
  lvl: 2,
  hp: 20,
  maxHp: 20,
  mp: 0,
  maxMp: 0,

  att: 1,
  def: 2,
  imn: 0,
  spd: 3,

  weapon: null,
  equipment: null,
  inventory: null,

  abilities: [],
  player: false,
  exp: 0,
  expMax: 0

});

var brokenDoll = new Character({

  name: "Broken Doll",
  lvl: 3,
  hp: 30,
  maxHp: 30,
  mp: 0,
  maxMp: 0,

  att: 2,
  def: 4,
  imn: 0,
  spd: 3,

  weapon: null,
  equipment: null,
  inventory: null,

  abilities: [],
  player: false,
  exp: 0,
  expMax: 0

});

var brokenTruck = new Character({

  name: "Broken Truck",
  lvl: 4,
  hp: 40,
  maxHp: 40,
  mp: 0,
  maxMp: 0,

  att: 4,
  def: 5,
  imn: 0,
  spd: 3,

  weapon: null,
  equipment: null,
  inventory: null,

  abilities: [],
  player: false,
  exp: 0,
  expMax: 0

});

var scaryClown = new Character({

  name: "Scary Clown",
  lvl: 5,
  hp: 50,
  maxHp: 50,
  mp: 0,
  maxMp: 0,

  att: 6,
  def: 3,
  imn: 3,
  spd: 3,

  weapon: null,
  equipment: null,
  inventory: null,

  abilities: [],
  player: false,
  exp: 0,
  expMax: 0

});

var lesserMonster = new Character({

  name: "Lesser Monster",
  lvl: 6,
  hp: 80,
  maxHp: 80,
  mp: 0,
  maxMp: 0,

  att: 7,
  def: 6,
  imn: 0,
  spd: 3,

  weapon: null,
  equipment: null,
  inventory: null,

  abilities: [],
  player: false,
  exp: 0,
  expMax: 0

});

var greaterMonster = new Character({

  name: "Greater Monster",
  lvl: 7,
  hp: 100,
  maxHp: 100,
  mp: 0,
  maxMp: 0,

  att: 8,
  def: 7,
  imn: 0,
  spd: 4,

  weapon: null,
  equipment: null,
  inventory: null,

  abilities: [],
  player: false,
  exp: 0,
  expMax: 0

});

var bogeyMan = new Character({

  name: "Bogey Man",
  lvl: 8,
  hp: 90,
  maxHp: 90,
  mp: 0,
  maxMp: 0,

  att: 8,
  def: 8,
  imn: 0,
  spd: 7,

  weapon: null,
  equipment: null,
  inventory: null,

  abilities: [],
  player: false,
  exp: 0,
  expMax: 0

});

var mrSandman = new Character({

  name: "Mr. Sandman",
  lvl: 9,
  hp: 110,
  maxHp: 110,
  mp: 0,
  maxMp: 0,

  att: 10,
  def: 7,
  imn: 0,
  spd: 8,

  weapon: null,
  equipment: null,
  inventory: null,

  abilities: [],
  player: false,
  exp: 0,
  expMax: 0

});

var ghost = new Character({

  name: "Level Ten",
  lvl: 10,
  hp: 100,
  maxHp: 100,
  mp: 0,
  maxMp: 0,

  att: 11,
  def: 9,
  imn: 0,
  spd: 11,

  weapon: null,
  equipment: null,
  inventory: null,

  abilities: [],
  player: false,
  exp: 0,
  expMax: 0

});


var evilBear = new Character({

  name: "Corrupted Teddy Bear",
  lvl: 11,
  hp: 180,
  maxHp: 0,
  mp: 0,
  maxMp: 0,

  att: 12,
  def: 12,
  imn: 0,
  spd: 12,

  weapon: null,
  equipment: null,
  inventory: null,

  abilities: [],
  player: false,
  exp: 0,
  expMax: 0

});


var enemies = [dustMite, bedBugs, brokenDoll, brokenTruck, scaryClown, lesserMonster, greaterMonster, bogeyMan, mrSandman, ghost, evilBear];



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

generate muliptleEnemies(){

}



Character.prototype.levelUp = function levelUp(){
  this.lvl += 1,


}

levelOne


Character.prototype.raiseStats = function raiseStats(level) {

};

// [0]att [1]def [2]imn [3]spd [4]maxHP [5]maxMP
var statRaises = [
[]




]

//  2      7      1    1      0    0      7    6      -    -
//  3     23      3    3      2    2      9    8      -    -       HEAL
//  4     47      3    3      4   4      16   14     11   10       HURT
//  5    110      8    7      6   6      20   18     15   14
//  6    220     12   11      6   6      23   21     19   17
//  7    450     14   13     13   12     25   23     21   19      SLEEP
//  8    800     18   16     16   15     31   28     24   22
//  9   1300     26   24     18   16     35   32     31   28    RADIANT
// 10   2000     31   28     27   24     39   35     35   32  STOPSPELL
// 10   2000     31   28     27   24     39   35     35   32  STOPSPELL
