function hurt(player, enemy){
  enemy.hp-= player.imn*2;

}

function fortyWinks(player){
  player.hp+= player.imn*1.5;
}

// function hurtMore(player,enemy){
//   enemy.hp-= player.imn*4;
// }

function tantrum(player,enemy){
  enemy.hp-= player.imn*2;
}

// function eightyWinks(player){
//   player.hp+= player.imn*3;
// }

function beBrave(player,enemy){
  enemy.hp-= player.imn*2;
  player.hp+= player.imn*1.5;
}
