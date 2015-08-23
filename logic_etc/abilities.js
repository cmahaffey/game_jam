function hurt(player, enemy){
  enemy.hp-= player.imn*1.5;
  return enemy.name + " lost "+player.imn*1.5+" health"
}

function heal(player){
  player.hp+= player.imn*1.5;
  if (player.hp>player.maxHp){
    player.hp=player.maxHp;
  }
  return player.name " gained " +player.imn*1.5+" health"
}

function fortyWinks(player,enemy){

  enemy.deBuff='sleep';
  enemy.deBTurns=Math.floor((Math.random()*3)+1);
  return enemy.name + " has fallen asleep!"
}

function beBrave(player,enemy){
  player.hp+= player.imn*1.5;
  player.buff='brave';
  player.def=player.def*1.5
  player.buffTurns=1;
    return player.name " gained " +player.imn*1.5+" health, and has become brave (defense increased by 50%)"
}

function tantrum(player,enemy){
  enemy.hp-= player.imn*4;
  eturn enemy.name + " lost "+player.imn*1.5+" health"
}

// function hurtMore(player,enemy){
//   enemy.hp-= player.imn*4;
// }

// function eightyWinks(player){
//   player.hp+= player.imn*3;
// }
