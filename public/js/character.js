function Character(options){
  this.name=(options.name)
  this.lvl=(options.lvl),
  this.hp=(5*options.def),
  this.mp=(3*options.imn),
  this.att=options.att,
  this.def=options.def,
  this.imn=options.imn,
  this.spd=options.spd,
  this.inventory=options.inventory || [],
  this.abilities=options.abilities || [],
  this.equipment=options.equipment || [],
  this.player= options.play || false,
  this.exp=0,
  this.expMax=lvl*10;
}
Character.prototype.critCheck= function critCheck(enemy){
  console.log(this.name+'attacked'+enemy.name);
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
  if (success>(0.03*enemy.spd)){
    this.dmgDealt(dmg, enemy,crit,false);
  }else{
    this.dmgDealt(0,enemy,crit,true);
  }
};

Character.prototype.dmgDealt= function dmgDealt(dmg, enemy, crit, dodge){
  if (dodge){
    console.log(enemy.name+'dodged the attack!')
    //dodge
  }else if (dmg<=0){
      if (crit){
        console.log('It\'s a critical hit!');
        enemy.hp--;
        console.log(enemy.name + 'lost 1 health');
      }else{
        dmg=Math.floor(Math.random()*2);
        enemy.hp-=dmg;
        if (dmg===1){
          console.log(enemy.name+ 'lost 1 health');
        }else{
          console.log('but it did no damage!');
        }
      }

  }else {
      console.log(enemy.name+ "lost "+dmg+" health");
      enemy.hp-=dmg;
    }
  }
  this.turnEnd();

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
        enemy.critCheck(this);
    }else{
      //wait for selection
    }
  }
};
Character.prototype.magic= function magic(enemy){

};

Character.prototype.flee= function flee(enemy){
  console.log (this.name+'tried to runaway')
  var success=Math.random();
  if ((this.lvl/enemy.lvl)>success){
    console.log(this.name+'got away safely!')
    //back to overhead screen
  }
  else{
    console.log(this.name+'failed to get away');
    enemy.critCheck(this);
  }
};

Character.prototype.win= function win(enemy){
  console.log(this.name+"won the battle!")
  if (this.lvl<10){
    var gain=Math.floor((enemy.lvl*5)/2)
    console.log(this.name+"gained"+gain+"experience points")
    this.exp+=gain;

    if (this.exp===this.expMax){
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
    console.log(this.name+"leveled up!")
    this.lvl+=1;
  }
  this.ptSelect();
  this.exp=0;
};

var player={lvl:1,att:2,def:50,imn:2,spd:1,play: true};
var enemy={lvl:2,att:2,def:2,imn:2,spd:33};
var girl = new Character(player);
var fear = new Character(enemy);
