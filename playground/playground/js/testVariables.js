
var testItem = new Item({name: "Wiffle Ball Bat",type: "Weapon", atkModifier: 2});


// Toy Chest

var testToyChest = allTheItems.generateRandomToyChest();

// Test Character

var testChar = new Character({
  name: "Sophia",
  lvl: 1,
  att: 5,
  def: 5,
  imn: 5,
  spd: 5,
  weapon: null,
  equipment: null,
  inventory: null,
  exp: 0
});



/*

//Test sequence


var newItem = allTheItems.generateItem("weapons");
newItem;
testChar;
testChar.getItem(newItem);
testChar.inventory[0];
testChar;
testChar.equipItem(newItem);
testChar.weapon;
testChar;
testChar.removeItem(newItem);
testChar;

*/
