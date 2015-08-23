var BedJam = BedJam || {};

BedJam.Battle = function Battle() {
// Battle Overlay
  var battleOverlay = $('<div>').addClass('battleOverlay');
  $('.overlay').append(battleOverlay);
  // Battle text & menu
  this.battleText = $('.battleText');

  // pass in encountered monster

  this.createEnemy();

  this.battleResults(this.enemy.name + ' has appeared!');

  var scope = this;

  $(window).keydown(function(e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      scope.actionsMenu(scope);
    }
  });
};

BedJam.Battle.prototype.fillBars = function() {
  this.hp = BedJam.girl.hp * (150 / BedJam.girl.maxHp);
  this.mp = BedJam.girl.mp * (150 / BedJam.girl.maxMp);
  this.exp = BedJam.girl.exp * (150 / BedJam.girl.expMax);
  $('.hpAmount').html(BedJam.girl.hp + ' / ' + BedJam.girl.maxHp);
  $('.mpAmount').html(BedJam.girl.mp + ' / ' + BedJam.girl.maxMp);
  $('.expAmount').html(BedJam.girl.exp + ' / ' + BedJam.girl.expMax);
  $('.hpFill').animate({width: this.hp + 'px'}, 500);
  $('.mpFill').animate({width: this.mp + 'px'}, 500);

  // doesnt work lol
  if (BedJam.girl.exp >= BedJam.girl.expMax) {
    $('.expFill').animate({width: '150px'}, 500, 'linear', function() {
      $('.expFill').css({backgroundColor: 'yellow'});
    });
    setTimeout(function() {
      $('.expFill').css({backgroundColor: 'gold'}).animate({width: this.exp + 'px'}, 200);
    }, 500);
  } else {
    $('.expFill').animate({width: this.exp + 'px'}, 500);
  }
};

BedJam.Battle.prototype.createEnemy = function createEnemy() {

  var randomEnemy = 0;
  var floorFactor = 0;
  var rng = Math.floor(Math.random() * 100);

  if (BedJam.game.state.getCurrentState().key[4] != 5) {
    if (BedJam.game.state.getCurrentState().key[4] == 2) {
      floorFactor = 0;
    } else if (BedJam.game.state.getCurrentState().key[4] == 3) {
      floorFactor = 3;
    } else if (BedJam.game.state.getCurrentState().key[4] == 4) {
      floorFactor = 6;
    }

    if (rng < 20) {
      if (floorFactor > 0) {
        randomEnemy = -1;
      } else {
        randomEnemy = 0;
      }
    } else if (rng < 50) {
      randomEnemy = 0;
    } else if (rng < 85) {
      randomEnemy = 1;
    } else {
      randomEnemy = 2;
    }
    console.log(rng);
    this.enemy = BedJam.enemies[randomEnemy + floorFactor];
  } else {
    this.enemy = BedJam.evilBear;
  }

  this.enemy.getStats();

  this.enemyPic = $('<img>').attr('src', this.enemy.image).addClass('enemyPic');
   this.enemyLvl= $('<h3>').html("Level: "+this.enemy.lvl).addClass('enemyText');
  $('.battleOverlay').append(this.enemyLvl, this.enemyPic);
};

BedJam.Battle.prototype.actionsMenu = function actionsMenu(scope) {
  // Create the actions menu
  $(window).off();
  var scope = scope;
  this.battleText.html('');
  this.actions = $('<table>').addClass('actionsMenu');
  this.hit = $('<td>').addClass('actions').html('<u>H</u>it');
  this.powers = $('<td>').addClass('actions').html('<u>P</u>owers');
  this.actionsRow = $('<tr>').addClass('actionsRow');
  this.items = $('<td>').addClass('actions').html('<u>I</u>tems');
  this.run = $('<td>').addClass('actions').html('<u>R</u>un');
  this.actions.append(this.hit, this.powers, this.actionsRow, this.items, this.run);
  this.battleText.append(this.actions);

  this.actionsListeners(scope);
};

BedJam.Battle.prototype.actionsListeners = function actionsListeners(scope) {
  $(window).keydown(function(e) {
    if (e.keyCode === 72) {
      scope.attack(scope);
    } else if (e.keyCode === 80) {
      scope.powersList(scope);
    } else if (e.keyCode === 73) {
      scope.itemsList(scope);
    } else if (e.keyCode === 82) {
      scope.runAway(scope);
    }
  });

  this.hit.on('click', function() {
    scope.attack(scope);
  });
  this.powers.on('click', function() {
    scope.powersList(scope);
  });
  this.items.on('click', function() {
    scope.itemsList(scope);
  });
  this.run.on('click', function() {
    scope.runAway(scope);
  });
};

BedJam.Battle.prototype.battleResults = function(results) {
  $(window).off();
  this.battleText.empty();
  this.battleText.css({display: 'block'});
  this.battleText.html(results);
};

BedJam.Battle.prototype.attack = function attack(scope) {
  $(window).off();
  var scope = scope;
  this.statusMessage = BedJam.girl.battle(this.enemy);

  if (this.statusMessage) {
    this.damageDealt = this.statusMessage + "<br>" + BedJam.girl.critCheck(this.enemy);
  } else {
    this.damageDealt = BedJam.girl.critCheck(this.enemy);
  }

  if (BedJam.girl.win(this.enemy)) {
    this.expMessage = BedJam.girl.win(this.enemy) + "<br>" + (BedJam.girl.calculateExp(this.enemy));
    this.battleResults(this.damageDealt);

    $(window).keydown(function(e) {
      if (e.keyCode === 0 || e.keyCode === 32) {
        scope.battleResults(scope.expMessage);
        scope.fillBars();
        $(window).keydown(function(e) {
          if (e.keyCode === 0 || e.keyCode === 32) {
            scope.endBattle();
          }
        });
      }
    });
  } else {
    this.battleResults(this.damageDealt);
    $(window).keydown(function(e) {
      if (e.keyCode === 0 || e.keyCode === 32) {
        scope.enemyAttack();
      }
    });
  }
};

BedJam.Battle.prototype.enemyAttack = function enemyAttack() {
  var scope = this;

  this.statusMessage = this.enemy.battle(BedJam.girl);

  if (this.statusMessage) {
    if (this.statusMessage == this.enemy.name + " is fast asleep!") {
      this.damageDealt = this.statusMessage;
    } else {
      this.damageDealt = this.statusMessage + "<br>" + this.enemy.critCheck(BedJam.girl);
    }
  } else {
    this.damageDealt = this.enemy.critCheck(BedJam.girl);
  }

  if (this.enemy.win(BedJam.girl)) {
    this.expMessage = "Sofia fainted.";
    this.battleResults(this.damageDealt);
    this.fillBars();
    $(window).keydown(function(e) {
      if (e.keyCode === 0 || e.keyCode === 32) {
        scope.battleResults(scope.expMessage);
        $(window).keydown(function(e) {
          if (e.keyCode === 0 || e.keyCode === 32) {
            $(window).off();
            BedJam.girl.getStats();
            scope.endBattle();
            scope.fillBars();
            // Starts Game from beginning; need to find a way to make it so items don't reset
            BedJam.game.state.start('Game');
          }
        });
      }
    });
  } else {
    this.battleResults(this.damageDealt);
    this.fillBars();
    $(window).keydown(function(e) {
      if (e.keyCode === 0 || e.keyCode === 32) {
        scope.actionsMenu(scope);
      }
    });
  }
};

BedJam.Battle.prototype.powersList = function powersList(scope) {
  $(window).off();

  this.powersDiv = $('<div>').addClass('powersDiv');
  this.powersUl = $('<ul>').addClass('powersUl');
  this.hurt = $('<li>').addClass('selectPower').html('Hurt');
  this.heal = $('<li>').addClass('selectPower').html('Heal');
  this.bedtime = $('<li>').addClass('selectPower').html('Bedtime');
  this.temper = $('<li>').addClass('selectPower').html('Temper');
  this.tantrum = $('<li>').addClass('selectPower').html('Tantrum');
  this.powerList=[this.hurt, this.heal, this.bedtime, this.temper, this.tantrum];

  // you can set them to display: none and as char levels, have them display
    // maybe a boolean once unlocked
  for (var i = 0; i < BedJam.girl.abilities.length; i++) {
    this.powersUl.append(this.powerList[i]);
  }

  this.powersDiv.append(this.powersUl);
  $('.battleOverlay').append(this.powersDiv);
  this.enablePowers();
};

BedJam.Battle.prototype.enablePowers = function enablePowers() {
  var scope = this;
  $(window).keydown(function(e) {
    if (e.keyCode === 49 && BedJam.girl.lvl >= 2) {
      scope.usePower('hurt');
    } else if (e.keyCode === 50 && BedJam.girl.lvl >= 4) {
      scope.usePower('heal');
    } else if (e.keyCode === 51 && BedJam.girl.lvl >= 6) {
      scope.usePower('bedtime');
    } else if (e.keyCode === 52 && BedJam.girl.lvl >= 8) {
      scope.usePower('temper');
    } else if (e.keyCode === 53 && BedJam.girl.lvl === 10) {
      scope.usePower('tantrum');
    } else if (e.keyCode === 0 || e.keyCode === 32 || e.keyCode === 27) {
      scope.usePower('cancel');
    }
  });

  // maybe a click cancel

  this.hurt.on('click', function() {
    scope.usePower('hurt');
  });
  this.heal.on('click', function() {
    scope.usePower('heal');
  });
  this.bedtime.on('click', function() {
    scope.usePower('bedtime');
  });
  this.temper.on('click', function() {
    scope.usePower('temper');
  });
  this.tantrum.on('click', function() {
    scope.usePower('tantrum');
  });
};

BedJam.Battle.prototype.usePower = function usePower(power) {
  $(window).off();
  this.clearPowers();

  if (power === 'cancel') {
    this.actionsListeners(this);
  } else {
    var message = BedJam.girl.battle(this.enemy);
    if (typeof message != 'undefined') {
      message.concat('<br>');
    }
    var scope = this;
    switch (power) {
      case 'hurt':
        message += BedJam.girl.hurt(BedJam.girl, this.enemy);
        break;
      case 'heal': {
        message += BedJam.girl.heal(BedJam.girl);
        break;
      }
      case 'bedtime': {
        message += BedJam.girl.bedtime(BedJam.girl, this.enemy);
        break;
      }
      case 'temper': {
        message += BedJam.girl.temper(BedJam.girl);
        break;
      }
      case 'tantrum': {
        message += BedJam.girl.tantrum(BedJam.girl, this.enemy);
        break;
      }
    }

    if (BedJam.girl.win(this.enemy)) {
      this.expMessage = BedJam.girl.win(this.enemy) + "<br>" + (BedJam.girl.calculateExp(this.enemy));
      this.battleResults(message);

      $(window).keydown(function(e) {
        if (e.keyCode === 0 || e.keyCode === 32) {
          scope.battleResults(scope.expMessage);
          scope.fillBars();
          $(window).keydown(function(e) {
            if (e.keyCode === 0 || e.keyCode === 32) {
              scope.endBattle();
            }
          });
        }
      });
    } else {
      this.battleResults(message);
      $(window).keydown(function(e) {
        if (e.keyCode === 0 || e.keyCode === 32) {
          scope.enemyAttack();
        }
      });
    }
  }
}

BedJam.Battle.prototype.clearPowers = function clearPowers() {
  $('.powersDiv').remove();
};

BedJam.Battle.prototype.itemsList = function itemsList(scope) {
  // this.clearActions();
  console.log('items!');
};

BedJam.Battle.prototype.runAway = function runAway(scope) {
  // this.clearActions();
  scope.battleResults('Ran away!');
  $(window).keydown(function(e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      scope.endBattle();
    }
  });
};

BedJam.Battle.prototype.endBattle = function endBattle() {
  $('.battleOverlay').remove();
  $('.battleText').html('');
  $('.battleText').css({display: 'none'});
  BedJam.game.paused = false;
};
