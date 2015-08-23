//Toy Chest - Generates Item and can have traps

function ToyChest(options) {
  this.item = options.item || null,
  this.trapActive = options.trapActive || false,
  this.damage = options.damage || 1,
  this.canHeal = options.canHeal || false,
  this.heal = options.heal || 0
}

ToyChest.prototype.trapTriggered = function trapTriggered(player) {
  console.log("Its a trap!")
  // hurt player by this.damage
};

ToyChest.prototype.healTriggered = function healTriggered(player) {
  console.log("Heal!")
  // heal player by this.heal
};
