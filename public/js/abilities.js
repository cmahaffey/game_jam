function hurt(player, enemy){
  enemy.hp-= player.imn*1.5;

}

function heal(player){
  player.hp+= player.imn*1.5;
}

function fortyWinks(player,enemy){
  console.log(enemy.name + "has fallen asleep!")
  enemy.deBuff='sleep';
  enemy.deBTurns=Math.floor((Math.rand()*3)+1);
}

function beBrave(player,enemy){
  player.hp+= player.imn*1.5;
  player.buff='brave';
  player.buffTurns=1;
}

function tantrum(player,enemy){
  enemy.hp-= player.imn*4;
}

// function hurtMore(player,enemy){
//   enemy.hp-= player.imn*4;
// }

// function eightyWinks(player){
//   player.hp+= player.imn*3;
// }
