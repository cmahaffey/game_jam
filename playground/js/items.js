function Item(options){
  this.name = options.name || "Unnamed Item",
  this.type = options.type || "Type Undefined",
  this.usableItem = options.usableItem || false,
  this.uses = options.uses || 1,

  this.atkModifier = options.atkModifier,
  this.defModifier = options.defModifier,
  this.imnModifier = options.imnModifier,
  this.spdModifier = options.spdModifier,

  this.maxHealthModifier = options.maxHealthModifier,
  this.imnPointsModifier = options.imnPointsModifier,
  this.xpModifier = options.xpModifier,

  this.raiseHealth = options.raiseHealth || 0,
  this.raiseImagination = options.raiseImagination || 0,
  this.canFlee = options.canFlee || false
}

Item.prototype.examineItem = function examineItem() {
  console.log("You are looking at a " + this.name + ". It is of type " + this.type);
};


Item.prototype.causeFlee = function causeFlee(player) {
    //For marbles - player autoflees
};
