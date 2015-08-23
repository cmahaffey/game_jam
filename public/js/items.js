var BedJam = BedJam || {};

BedJam.ToyChest = function ToyChest(options) {
  this.item = options.item || null,
  this.trapActive = options.trapActive || false,
  this.damage = options.damage || 0,
  this.canHeal = options.canHeal || false,
  this.heal = options.heal || 0
}

BedJam.ToyChest.prototype.trapTriggered = function trapTriggered(player) {
  console.log("It\'s a trap!")
  // hurt player by this.damage
};

BedJam.ToyChest.prototype.healTriggered = function healTriggered(player) {
  console.log("Heal!")
  // heal player by this.heal
};

BedJam.Item = function Item(options){
  this.name = options.name || "Unnamed Item",
  this.type = options.type || "Type Undefined",
  this.usableItem = options.usableItem || false,
  this.uses = options.uses || null,
  this.description = options.description || null;

  this.atkModifier = options.atkModifier || 0,
  this.defModifier = options.defModifier || 0,
  this.imnModifier = options.imnModifier || 0,
  this.spdModifier = options.spdModifier || 0,

  this.raiseHealth = options.raiseHealth || 0,
  this.raiseImagination = options.raiseImagination || 0,
  this.canFlee = options.canFlee || false
};

// Weapons

// Princess Wand (Imagination + 2)
BedJam.princessWand = new BedJam.Item({
  name: "Princess Wand",
  type: "weapons",
  description: "Imagination + 2",
  imnModifier: 2,
});

// Wiffle Ball Bat (Atk +1)
BedJam.wiffleBallBat = new BedJam.Item({
  name: "Wiffle Ball Bat",
  type: "weapons",
  description: "Attack + 1",
  atkModifier: 1,
});

// Toy Sword (Atk + 2)
BedJam.toySword = new BedJam.Item({
  name: "Toy Sword",
  type: "weapons",
  description: "Attack + 2",
  atkModifier: 2,
});

// Baseball (Atk +1) (Speed +1)
BedJam.baseball = new BedJam.Item({
  name: "Baseball",
  type: "weapons",
  description: "Atk + 1, Spd + 1",
  atkModifier: 1,
  spdModifier: 1,
});

// Jump Rope (Atk + 2)(Speed +1)
BedJam.jumpRope = new BedJam.Item({
  name: "Jump Rope",
  type: "weapons",
  description: "Atk + 2, Spd + 1",
  atkModifier: 2,
  spdModifier: 1,
});

// Pillow (Def +1)
BedJam.pillow = new BedJam.Item({
  name: "Pillow",
  type: "weapons",
  description: "Defense + 1",
  defModifier: 1,
});

// Yo-Yo (Atk + 1)
BedJam.yoYo = new BedJam.Item({
  name: "Yo Yo",
  type: "weapons",
  description: "Atk + 1",
  atkModifier: 1,
});

// Frisbee
BedJam.frisbee = new BedJam.Item({
  name: "Frisbee",
  type: "weapons",
  description: "Atk + 1, Spd + 1",
  atkModifier: 1,
  spdModifier: 1,
});


// Roller Skates - Spd + 2
BedJam.rollerSkates = new BedJam.Item({
  name: "Roller Skates",
  type: "equipment",
  description: "Spd + 2",
  spdModifier: 2,
});

// Princess Crown - Imagination + 1
BedJam.princessCrown = new BedJam.Item({
  name: "Princess Crown",
  type: "equipment",
  description: "Imagination + 1",
  imnModifier: 1,
});

// Onesie - Def +1, Spd + 1
BedJam.onesie = new BedJam.Item({
  name: "Onesie",
  type: "equipment",
  description: "Def + 1, Spd + 1",
  defModifier: 1,
  spdModifier: 1,
});

// Blanket - Def + 2
BedJam.blanket = new BedJam.Item({
  name: "Blanket",
  type: "equipment",
  description: "Def + 2",
  defModifier: 2,
});

// Halloween Costume - Imagination + 2
BedJam.halloweenCostume = new BedJam.Item({
  name: "Halloween Costume",
  type: "equipment",
  description: "Imagination + 2",
  imnModifier: 2,
});

// Usables

// Juice Box - Health Potion
BedJam.juiceBox = new BedJam.Item({
  name: "Juice Box",
  type: "usables",
  usableItem: true,
  uses: 1,
  raiseHealth: 25,
});

// Book - Replenishes MP
BedJam.storyBook = new BedJam.Item({
  name: "Story Box",
  type: "usables",
  usableItem: true,
  uses: 1,
  raiseImagination: 5,
});

// Cootie Shot - defense * 1.5 for 5 turns.
// Marbles - Automatic Flee

// All the Items
BedJam.weapons = [BedJam.princessWand, BedJam.wiffleBallBat, BedJam.toySword, BedJam.baseball, BedJam.jumpRope, BedJam.yoYo, BedJam.frisbee];

BedJam.equipment = [BedJam.rollerSkates, BedJam.princessCrown, BedJam.onesie, BedJam.halloweenCostume];

BedJam.usables = [BedJam.juiceBox, BedJam.storyBook];

BedJam.allTheItems = {
  weapons: BedJam.weapons,
  equipment: BedJam.equipment,
  usables: BedJam.usables,
  types: ["weapons", "equipment", "usables"]
};

BedJam.generateItem = function generateItem(type) {
  var randomItem;

  console.log(BedJam.allTheItems);

    if (type === "weapons"){
      randomItem = BedJam.sample(BedJam.allTheItems.weapons);
      console.log(randomItem);
      return randomItem;
    } else if (type === "equipment") {
      randomItem = BedJam.sample(BedJam.allTheItems.equipment);
      console.log(randomItem);
      return randomItem;
    } else if (type === "usables") {
      randomItem = BedJam.sample(BedJam.allTheItems.usables);
      console.log(randomItem);
      return randomItem;
    }
};

BedJam.sample = function sample(array) {
  return array[Math.floor(Math.random()) * array.length];
}

BedJam.randomBoolean = function randomBoolean() {
  var booleans = [true, false];
  return BedJam.sample(booleans);
}

BedJam.randomItemType = function randomItemType() {
  var modifier = Math.random() * 1;
  var weaponsOrArmor;

  if (modifier < 0.66) {
    return BedJam.allTheItems.types[2];
  } else if (modifier >= 0.66) {
    weaponsOrArmor = Math.floor(Math.random() * (BedJam.allTheItems.types.length-1));
    return BedJam.allTheItems.types[weaponsOrArmor];
  }
};

BedJam.generateRandomItem = function generateRandomItem() {
  var randomItemType = BedJam.randomItemType();
  return BedJam.generateItem(randomItemType);
};

BedJam.generateRandomToyChest = function generateRandomToyChest() {
  var randomItem = BedJam.generateRandomItem();

  // var newToyChest = new BedJam.ToyChest({item: randomItem, trapActive: randomBoolean(), canHeal: randomBoolean()});

  var newToyChest = new BedJam.ToyChest({item: randomItem});

  return newToyChest;
};
  // // Item Template
  // var newItemTemplate = new BedJam.Item({
  //   name: "name",
  //   type: "type",
  //   usableItem: false,
  //   uses: null,
  //   atkModifier: 0,
  //   defModifier: 0,
  //   imnModifier: 0,
  //   spdModifier: 0,
  //   maxHealthModifier: 0,
  //   imnPointsModifier: 0,
  //   xpModifier: 0,
  //   raiseHealth: 0,
  //   raiseImagination: 0,
  //   canFlee: false
  // });
