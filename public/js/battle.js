var BedJam = BedJam || {};

BedJam.Battle = function() {};

BedJam.Battle.prototype = {
  create: function() {
    console.log('battle state loaded');

    this.stage.backgroundColor = '#6BCAE2';
  // Battle Overlay
    // Battle text & menu
    this.battleText = $('<div>').addClass('battle battleText').html('Battle Text');

    // HP, MP, Exp
    this.hpDisplayText = $('<span>').addClass('battle displayBarText hpDisplay').html('HP:');
    this.mpDisplayText = $('<span>').addClass('battle displayBarText mpDisplay').html('MP:');
    this.expDisplayText = $('<span>').addClass('battle displayBarText expDisplay').html('EXP:');

    // Top left bars
    this.hpDisplay = $('<div>').addClass('battle displayBar hpDisplay');
    this.mpDisplay = $('<div>').addClass('battle displayBar mpDisplay');
    this.expDisplay = $('<div>').addClass('battle displayBar expDisplay');

    // Top left bar fills
    this.hpDisplayFill = $('<div>').addClass('battle displayBarFill hpFill');
    this.mpDisplayFill = $('<div>').addClass('battle displayBarFill mpFill');
    this.expDisplayFill = $('<div>').addClass('battle displayBarFill expFill');

    $('.overlay').append(this.battleText, this.hpDisplayText, this.hpDisplay, this.hpDisplayFill, this.mpDisplayText, this.mpDisplay, this.mpDisplayFill, this.expDisplayText, this.expDisplay, this.expDisplayFill);

    this.selectKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // pass in encountered monster

    this.enemy = BedJam.enemyTest;

    this.battleResults('Slime has appeared!');
    this.selectKey.onDown.add(this.actionsMenu, this);
  },

  createEnemy: function() {
    // create enemy
  },

  update: function() {
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  },

  actionsMenu: function() {
    // Create the actions menu
    this.battleText.html('');
    this.actions = $('<table>').addClass('actionsMenu');
    this.hit = $('<td>').addClass('actions').html('<u>H</u>it');
    this.powers = $('<td>').addClass('actions').html('<u>P</u>owers');
    this.actionsRow = $('<tr>').addClass('actionsRow');
    this.items = $('<td>').addClass('actions').html('<u>I</u>tems');
    this.run = $('<td>').addClass('actions').html('<u>R</u>un');
    this.actions.append(this.hit, this.powers, this.actionsRow, this.items, this.run);
    this.battleText.append(this.actions);
    this.hitKey = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
    this.hitKey.onDown.add(this.attack, this);
    this.hit.on('click', this.attack);

    this.powersKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
    this.powersKey.onDown.add(this.powersList, this);
    this.powers.on('click', this.powersList);

    this.itemsKey = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
    this.itemsKey.onDown.add(this.itemsList, this);
    this.items.on('click', this.itemsList);

    this.runKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
    this.runKey.onDown.add(this.runAway, this);
    this.run.on('click', this.runAway);
  },

  battleResults: function(results) {
    this.battleText.empty();
    this.battleText.html(results);
    this.selectKey.onDown.removeAll();
  },

  clearActions: function() {
    this.hitKey.onDown.removeAll();
    this.powersKey.onDown.removeAll();
    this.itemsKey.onDown.removeAll();
    this.runKey.onDown.removeAll();
  },

  attack: function() {
    this.clearActions();
    var scope = this;

    this.statusMessage = BedJam.girl.battle(this.enemy);

    if (this.statusMessage) {
      this.damageDealt = this.statusMessage + "<br>" + BedJam.girl.critCheck(this.enemy);
    } else {
      this.damageDealt = BedJam.girl.critCheck(this.enemy);
    }

    if (BedJam.girl.win(this.enemy)) {
      this.expMessage = BedJam.girl.win(this.enemy) + "<br>" + (BedJam.girl.calculateExp(this.enemy));
      this.battleResults(this.damageDealt);
      this.selectKey.onDown.add(function() {
        this.battleResults(this.expMessage);
        this.selectKey.onDown.add(function() {
          // this.enemyAttack();
        });
        // exit battle on select key
      }, this);
    } else {
      this.battleResults(this.damageDealt);
      this.selectKey.onDown.add(function() {
        console.log(this);
        scope.enemyAttack();
      })
    }
  },

  enemyAttack: function() {
    var scope = this;

    this.statusMessage = this.enemy.battle(BedJam.girl);

    if (this.statusMessage) {
      this.damageDealt = this.statusMessage + "<br>" + this.enemy.critCheck(BedJam.girl);
    } else {
      this.damageDealt = this.enemy.critCheck(BedJam.girl);
    }

    if (this.enemy.win(BedJam.girl)) {
      this.expMessage = "Enemy wins! You lose!";
      this.battleResults(this.damageDealt);
      this.selectKey.onDown.add(function() {
        this.battleResults(this.expMessage);
      }, this);
    } else {
      this.battleResults(this.damageDealt);
      this.selectKey.onDown.add(function() {
        scope.actionsMenu();
      });
    }
  },

  //check if you win
  powersList: function() {
    // this.clearActions();
    console.log('pow!');
    // populate length based on amount of powers
  },

  itemsList: function() {
    // this.clearActions();
    console.log('items!');
  },

  runAway: function() {
    // this.clearActions();
    console.log('run!');
    this.battleResults('Ran away!');
  }
}
