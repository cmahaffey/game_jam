var BedJam = BedJam || {};

BedJam.girl = new BedJam.Character({
  name: 'Sofia',
  lvl: 1,
  play: true,
  stats: [
    [3, 3, 1, 2],
    [6, 6, 2, 4],
    [9, 9, 3, 6],
    [12, 12, 4, 8],
    [16, 16, 5, 10],
    [20, 20, 6, 14],
    [25, 24, 7, 20],
    [31, 28, 8, 24],
    [36, 33, 9, 30],
    [40, 38, 10, 36]
  ]
});

BedJam.girl.getStats();

// Enemy Template

// BedJam.enemyTemplate = new BedJam.Character({
//   name: "Unnamed Enemy",
//   lvl: 0,
// });
// BedJam.enemyTemplate.playerStats(BedJam.enemyTemplate.lvl, playerStats);

// Enemies

BedJam.dustMite = new BedJam.Character({
  name: "Dust Mite",
  lvl: 1,
  image: '/assets/images/dustmites.png'
});

BedJam.bedBugs = new BedJam.Character({
  name: "Bed Bugs",
  lvl: 2,
  image: '/assets/images/bedBugs.png'
});

BedJam.brokenDoll = new BedJam.Character({
  name: "Broken Doll",
  lvl: 3,
  image: '/assets/images/brokenDoll.png'
});

BedJam.brokenTruck = new BedJam.Character({
  name: "Broken Truck",
  lvl: 4,
  image: '/assets/images/toyTruck.png'
});

BedJam.scaryClown = new BedJam.Character({
  name: "Scary Clown",
  lvl: 5,
  image: '/assets/images/clown.png'
});

BedJam.lesserMonster = new BedJam.Character({
  name: "Lesser Monster",
  lvl: 6,
  image: '/assets/images/lesserMonster.png'
});

BedJam.greaterMonster = new BedJam.Character({
  name: "Greater Monster",
  lvl: 7,
  image: '/assets/images/greaterMonster.png'
});

BedJam.bogeyMan = new BedJam.Character({
  name: "Bogey Man",
  lvl: 8,
  image: '/assets/images/bogeyMan.png'
});

BedJam.mrSandman = new BedJam.Character({
  name: "Mr. Sandman",
  lvl: 9,
  image: '/assets/images/mrSandman.png'
});

BedJam.ghost = new BedJam.Character({
  name: "Level Ten",
  lvl: 10,
  image: '/assets/images/ghost.png'
});


//ONLY CALL MANUALLY
BedJam.evilBear = new BedJam.Character({
  name: "Corrupted Teddy Bear",
  lvl: 11,
  hp: 200,
  maxHp: 200,

  att: 40,
  def: 40,
  imn: 0,
  spd: 30,
  image: '/assets/images/teddyBear.png'
});

//  All the Enemies

BedJam.enemies = [BedJam.dustMite, BedJam.bedBugs, BedJam.brokenDoll, BedJam.brokenTruck, BedJam.scaryClown, BedJam.lesserMonster, BedJam.greaterMonster, BedJam.bogeyMan, BedJam.mrSandman, BedJam.ghost, BedJam.evilBear];

// Generate Enemies
//
// BedJam.generateEnemy = function generateEnemy(gameLevel, enemies) {
//   var enemyOptions = [];
//   var maxLevel = 3;
//
//   if (gameLevel === 1){
//     enemyOptions = [enemies[gameLevel - 1], enemies[gameLevel]];
//   } else if (gameLevel > 1 && gameLevel < maxLevel) {
//     enemyOptions = [enemies[gameLevel - 2], enemies[gameLevel - 1], enemies[gameLevel]];
//   } else if (gameLevel === maxLevel) {
//     return enemies[maxLevel];
//   }
//
//   return sample(enemyOptions);
// };
