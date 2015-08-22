//requires abilities.js
//require itemGenerations.js

function Character(options){
  this.name=(options.name),
  this.lvl=(options.lvl),
  this.maxHp=(5*options.def),
  this.maxMp=(3*options.imn),
  this.hp=this.maxHp,
  this.mp=this.maxMp,
  this.att=options.att,
  this.def=options.def,
  this.imn=options.imn,
  this.spd=options.spd,
  this.inventory=options.inventory || [],
  this.abilities=options.abilities || [],
  this.weapon=options.weapon|| null,
  this.equipment=options.equipment || null,
  this.player= options.play || false,
  this.exp=0,
  this.expMax=this.lvl*10,
  this.deBuff=null,
  this.buff=null,
  this.turn=0,
  this.buffTurns=0,
  this.deBTurns=0
}

Character.prototype.battle=function battle(enemy){
  this.turn++;
  if (this.buffTurns>1){
    this.buffTurns--;
    this.critCheck(enemy);
  }else if (this.buffTurns===1) {
    this.buffTurns--;
    console.log(this.name+" is no longer buffed!")
    if (buff==='brave'){
      this.def=Math.round(this.def/1.5);
      this.buff=null;
    }
    this.critCheck(enemy);
  }
  if (this.deBTurns>1){
    this.deBTurns--;
    console.log(this.name +" is fast asleep!")
    enemy.battle(this);
  }else if (this.deBTurns===1){
    this.deBTurns--;
    console.log(this.name +" woke up!");
    this.deBuff=null;
    this.critCheck(enemy);
  }
}
Character.prototype.critCheck= function critCheck(enemy){
  console.log(this.name+' attacked '+enemy.name);
  var success=Math.random();
  var crit;
  if (success<(0.03*this.spd)){
    crit=true;
    this.bam(crit, enemy);
  }else{
    crit=false;
    this.bam(crit, enemy);
  }

};
Character.prototype.bam= function bam(crit,enemy){

  if (crit){
    dmg=Math.floor((player.att-(enemy.def/2)))*3;
  }else{
    dmg=Math.floor((player.att-(enemy.def/2)));
  }
  this.dodge(dmg, enemy, crit);
};
Character.prototype.dodge = function dodge(dmg, enemy, crit) {
  var success=Math.random();
  if (success>(0.03*(enemy.spd))){
    this.dmgDealt(dmg, enemy,crit,false);
  }else{
    this.dmgDealt(0,enemy,crit,true);
  }
};

Character.prototype.dmgDealt= function dmgDealt(dmg, enemy, crit, dodge){
  if (dodge){
    console.log(enemy.name+' dodged the attack!')
    //dodge
  }else if (dmg<=0){
      if (crit){
        console.log('It\'s a critical hit!');
        enemy.hp--;
        console.log(enemy.name + ' lost 1 health');
      }else{
        dmg=Math.floor(Math.random()*2);
        enemy.hp-=dmg;
        if (dmg===1){
          console.log(enemy.name+ ' lost 1 health');
        }else{
          console.log('but it did no damage!');
        }
      }

  }else {
      console.log(enemy.name+ " lost "+dmg+" health");
      enemy.hp-=dmg;
    }
  this.turnEnd(enemy);

};
Character.prototype.turnEnd= function turnEnd(enemy){
  if (enemy.hp<=0){
    if (this.player){
        this.win(enemy)
    }else{
      console.log('GAME OVER')
    }
  }else{
    if (this.player){
        enemy.battle(this);
    }else{
      //wait for selection
    }
  }
};
Character.prototype.magic= function magic(enemy){
    //populate menu via this.abilities[i]
    //call abilities when clicked via girl.abilities[i].spell(this,enemy)
};

Character.prototype.flee= function flee(enemy){
  console.log (this.name+' tried to runaway')
  var success=Math.random();
  if ((this.lvl/enemy.lvl)>success){
    console.log(this.name+' got away safely!')
    //back to overhead screen
  }
  else{
    console.log(this.name+' failed to get away');
    enemy.critCheck(this);
  }
};

Character.prototype.win= function win(enemy){
  console.log(this.name+" won the battle!");
  this.deBuff=null;
  this.buff=null;
  this.turn=0;
  this.buffTurns=0;
  this.deBTurns=0;
  if (this.lvl<10){
    var gain=Math.floor((enemy.lvl*5)/2)
    console.log(this.name+" gained "+gain+" experience points")
    this.exp+=gain;
    if (this.exp>=this.expMax){
      this.lvlUp();
    }else{
      //return to game screen
    }
  }else{
    //return to game screen
  }
};

Character.prototype.lvlUp=function lvlUp(){
  if (this.lvl<10){
    console.log(this.name+" leveled up!")
    this.lvl+=1;
  }
  this.exp=0;
  this.expMax=this.lvl*10;
  if (this.lvl===2){this.abilities.push({name: 'hurt', spell:hurt})}
  if (this.lvl===4){this.abilities.push({name: 'heal', spell:heal})}
  if (this.lvl===6){this.abilities.push({name: 'fortyWinks', spell:fortyWinks})}
  if (this.lvl===8){this.abilities.push({name: 'beBrave', spell:beBrave})}
  if (this.lvl===10){this.abilities.push({name: 'tantrum', spell:tantrum})}
  //this.ptSelect(); menu for lvl up
};
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

// var player={name:'sophia',lvl:1,att:20,def:50,imn:2,spd:4,play: true};
// var enemy={name:'fear',lvl:200,att:2,def:2,imn:2,spd:2};
// var girl = new Character(player);
// var fear = new Character(enemy);
