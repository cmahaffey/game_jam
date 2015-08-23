//  Store Game Items ---
// requires toyChest
// requires utilityFunctions

function GamestateItems(options) {
  this.weapons = options.weapons || null,
  this.equipment = options.equipment || null,
  this.usables = options.usables || null,

  this.types = ["weapons", "equipment", "usables"];
}

GamestateItems.prototype.generateItem = function generateItem(type) {
  var randomItem;

    if (type === "weapons"){
      randomItem = sample(this.weapons);
      return randomItem;
    } else if (type === "equipment") {
      randomItem = sample(this.equipment);
      return randomItem;
    } else if (type === "usables") {
      randomItem = sample(this.usables);
      return randomItem;
    } else {
      console.log("Invalid Item Type")
    }

};


GamestateItems.prototype.randomItemType = function randomItemType() {
  return this.types[getRandomInteger(0, (this.types.length))];
};


GamestateItems.prototype.generateRandomItem = function generateRandomItem() {
  var randomItemType = this.randomItemType();
  return this.generateItem(randomItemType);
};

GamestateItems.prototype.generateRandomToyChest = function generateRandomToyChest() {
  var randomItem = allTheItems.generateRandomItem();

  var newToyChest = new ToyChest({item: randomItem, trapActive: randomBoolean(), canHeal: randomBoolean()});

  return newToyChest;
};
