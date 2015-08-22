var BedJam = BedJam || {};

BedJam.Battle = function() {};

BedJam.Battle.prototype = {
  create: function() {
    console.log('battle state loaded');

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

    // pass in encountered monster
    this.battleResults('Slime has appeared!');
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
    hitKey = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
    hitKey.onDown.add(this.attack, this);
    this.hit.on('click', this.attack);

    powersKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
    powersKey.onDown.add(this.powersList, this);
    this.powers.on('click', this.powersList);

    itemsKey = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
    itemsKey.onDown.add(this.itemsList, this);
    this.items.on('click', this.itemsList);

    runKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
    runKey.onDown.add(this.runAway, this);
    this.run.on('click', this.runAway);
  },

  battleResults: function(results) {
    this.battleText.empty();
    this.battleText.html(results);
    selectKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    selectKey.onDown.add(this.actionsMenu, this);
  },

  attack: function() {
    console.log('hit!');
    this.battleResults('Hit!');
  },

  powersList: function() {
    console.log('pow!');



    // populate length based on amount of powers
  },

  itemsList: function() {
    console.log('items!');
  },

  runAway: function() {
    console.log('run!');
    this.battleResults('Ran away!');
  }
}
