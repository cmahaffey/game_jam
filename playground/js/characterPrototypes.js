function Character(options) {
  this.name = options.name || "Sofia",
  this.lvl=(options.lvl)
  this.hp= (5*options.def),
  this.maxHp = (5*options.def),
  this.mp= (3*options.imn),
  this.maxMp = (5*options.imn),

  this.att=options.att,
  this.def=options.def,
  this.imn=options.imn,
  this.spd=options.spd,

  this.weapon = options.weapon || null,
  this.equipment= options.equipment || null,
  this.inventory=options.inventory || [],

  this.abilities=options.abilities || [],
  this.player= options.play || false,
  this.exp=0,
  this.expMax= this.lvl*10
}

Character.prototype.getItem = function getItem(item){
  this.inventory.push(item);
};

Character.prototype.checkIfInInventory = function checkIfInInventory(item) {
  if (this.inventory.indexOf(item) !== -1) {
    return true;
  } else {
    return false;
  }
};

Character.prototype.applyItemStats = function applyItemStats(equippedItem) {
  this.hp += equippedItem.raiseHealth,
  this.maxHp += equippedItem.maxHealthModifier,
  this.mp += equippedItem.raiseImagination,
  this.maxMp += equippedItem.imnPointsModifier,
  this.exp += equippedItem.xpModifier,

  this.att += equippedItem.atkModifier,
  this.def += equippedItem.defModifier,
  this.imn += equippedItem.imnModifier,
  this.spd += equippedItem.spdModifier
};

Character.prototype.removeItemStats = function removeItemStats(removedItem) {
  this.hp -= removedItem.raiseHealth,
  this.maxHp -= removedItem.maxHealthModifier,
  this.mp -= removedItem.raiseImagination,
  this.maxMp -= removedItem.imnPointsModifier,
  this.exp -= removedItem.xpModifier,

  this.att -= removedItem.atkModifier,
  this.def -= removedItem.defModifier,
  this.imn -= removedItem.imnModifier,
  this.spd -= removedItem.spdModifier
};

Character.prototype.equipWeapon = function equipWeapon(item) {
    this.weapon = item;
    this.applyItemStats(this.weapon);
};

Character.prototype.equipEquipment = function equipEquipment(item) {
    this.equipment = item;
    this.applyItemStats(this.equipment);
};

Character.prototype.equipItem = function equipItem(item){

  if (this.checkIfInInventory(item)) {

    if (item.type === "weapons") {
      this.equipWeapon(item);
    } else if (item.type === "equipment") {
      this.equipEquipment(item);
    } else {
      console.log("This Item is not equipable.")
    }

  } else {
    console.log("Equip Item:  This item is not in your inventory.")
  }

};

Character.prototype.unequipWeapon = function unequipWeapon(item) {
    this.removeItemStats(this.weapon);
    this.weapon = null;
};

Character.prototype.unequipEquipment = function unequipEquipment(item) {
    this.removeItemStats(this.equipment);
    this.equipment = null;
};

Character.prototype.unequipItem = function unequipItem(item){

  if (this.weapon === item || this.equipment === item) {

    if (item.type === "weapons") {
      this.unequipWeapon(item);
    } else if (item.type === "equipment") {
      this.unequipEquipment(item);
    } else {
      console.log("This Item is not equipable.")
    }

  } else {
    console.log("Remove Item:  This item is not equipped.")
  }

};
