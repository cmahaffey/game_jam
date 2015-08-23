var BedJam = BedJam || {};

BedJam.Character.prototype.hurt = function hurt(player, enemy){
  enemy.hp-= player.imn*1.5;
  player.mp-=2;
  return player.name + " used Hurt on " + enemy.name + "!<br>" + enemy.name + " lost "+player.imn*1.5+" health!";
}

BedJam.Character.prototype.heal = function heal(player){
  var hpGain = player.imn*1.5;
  if (player.hp + hpGain > player.maxHp){
    hpGain = player.maxHp - player.hp;
  }
  player.mp-=3;
  player.hp += hpGain;
  return player.name + " used Heal!<br>" + player.name + " gained " + hpGain + " health!";
}

BedJam.Character.prototype.bedtime = function bedtime(player,enemy){
  player.mp-=4;
  enemy.deBuff='sleep';
  enemy.deBTurns=Math.floor((Math.random()*2)+1);
  return player.name + " used Bedtime!<br>" + "... zzz ...<br>" + enemy.name + " has fallen asleep!";
}

BedJam.Character.prototype.temper = function temper(player){
  var hpGain = player.imn*1.5;
  player.mp-=5;
  if (player.hp + hpGain > player.maxHp){
    hpGain = player.maxHp - player.hp;
  }
  player.hp += hpGain;
  player.buff='temper';
  player.def *= 1.5;
  player.buffTurns=1;
  return player.name + " used Temper!<br>" + player.name + " gained " +hpGain+" health!<br>" + player.name + "'s Defense increased by 50%!";
}

BedJam.Character.prototype.tantrum = function tantrum(player,enemy){
  player.mp-=6;
  var tantrumDamage = player.imn * 4;
  enemy.hp -= tantrumDamage;
  return player.name + " threw a Tantrum!<br>" + enemy.name + " took "+player.imn*4+" damage!";
}
