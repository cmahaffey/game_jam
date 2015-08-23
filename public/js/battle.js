var BedJam = BedJam || {};

BedJam.Battle = function Battle() {
  console.log('battle state loaded');
// Battle Overlay
  var battleOverlay = $('<div>').addClass('battleOverlay');
  $('.overlay').append(battleOverlay);
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

  battleOverlay.append(this.battleText, this.hpDisplayText, this.hpDisplay, this.hpDisplayFill, this.mpDisplayText, this.mpDisplay, this.mpDisplayFill, this.expDisplayText, this.expDisplay, this.expDisplayFill);

  // pass in encountered monster

  this.createEnemy();

  this.battleResults(this.enemy.name + ' has appeared!');

  var scope = this;

  $(window).keydown(function(e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      scope.actionsMenu();
    }
  });
};

BedJam.Battle.prototype.createEnemy = function createEnemy() {
  this.enemy = BedJam.enemyTest;
};

BedJam.Battle.prototype.actionsMenu = function actionsMenu() {
  // Create the actions menu
  $(window).off();
  this.battleText.html('');
  this.actions = $('<table>').addClass('actionsMenu');
  this.hit = $('<td>').addClass('actions').html('<u>H</u>it');
  this.powers = $('<td>').addClass('actions').html('<u>P</u>owers');
  this.actionsRow = $('<tr>').addClass('actionsRow');
  this.items = $('<td>').addClass('actions').html('<u>I</u>tems');
  this.run = $('<td>').addClass('actions').html('<u>R</u>un');
  this.actions.append(this.hit, this.powers, this.actionsRow, this.items, this.run);
  this.battleText.append(this.actions);

  this.actionsListeners();
};

BedJam.Battle.prototype.actionsListeners = function actionsListeners() {
  var scope = this;

  console.log('actions made');
  $(window).keydown(function(e) {
    if (e.keyCode === 72) {
      scope.attack();
    } else if (e.keyCode === 80) {
      scope.powersList();
    } else if (e.keyCode === 73) {
      scope.itemsList();
    } else if (e.keyCode === 82) {
      scope.runAway();
    }
  });

  this.hit.on('click', this.attack);
  this.powers.on('click', this.powersList);
  this.items.on('click', this.itemsList);
  this.run.on('click', this.runAway);
};

BedJam.Battle.prototype.battleResults = function(results) {
  $(window).off();
  this.battleText.empty();
  this.battleText.html(results);
};

BedJam.Battle.prototype.attack = function attack() {
  $(window).off();
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

    $(window).keydown(function(e) {
      if (e.keyCode === 0 || e.keyCode === 32) {
        scope.battleResults(scope.expMessage);
        $(window).keydown(function(e) {
          if (e.keyCode === 0 || e.keyCode === 32) {
            $('.battleOverlay').remove();
            BedJam.game.paused = false;
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
    this.damageDealt = this.statusMessage + "<br>" + this.enemy.critCheck(BedJam.girl);
  } else {
    this.damageDealt = this.enemy.critCheck(BedJam.girl);
  }

  if (this.enemy.win(BedJam.girl)) {
    this.expMessage = "Enemy wins! You lose!";
    this.battleResults(this.damageDealt);
    $(window).keydown(function(e) {
      if (e.keyCode === 0 || e.keyCode === 32) {
        this.battleResults(this.expMessage);
        // WINDOW KEYDOWN GAME OVER
      }
    });
  } else {
    this.battleResults(this.damageDealt);
    $(window).keydown(function(e) {
      if (e.keyCode === 0 || e.keyCode === 32) {
        scope.actionsMenu();
      }
    });
  }
};

BedJam.Battle.prototype.powersList = function powersList() {
  // need to write this in a separate function
  var scope = this;

  scope.clearActions();
  console.log('pow!');

  this.powersDiv = $('<div>').addClass('powersDiv');
  this.powersUl = $('<ul>').addClass('powersUl');
  this.hurt = $('<li>').addClass('selectPower').html('Hurt');
  this.heal = $('<li>').addClass('selectPower').html('Heal');
  this.winks = $('<li>').addClass('selectPower').html('40 Winks');
  this.beBrave = $('<li>').addClass('selectPower').html('Be Brave');
  this.tantrum = $('<li>').addClass('selectPower').html('Tantrum');

  // you can set them to display: none and as char levels, have them display
    // maybe a boolean once unlocked
  this.powersUl.append(this.hurt, this.heal, this.winks, this.beBrave, this.tantrum);
  this.powersDiv.append(this.powersUl);
  $('.overlay').append(this.powersDiv);

  this.powersDiv.on('click', this.clearPowers);

  // format for on click:
  // this.POWERNAME.on('click', this.POWERFUNCTION);
  // after every click: this.clearPowers;

  // populate length based on amount of powers
};

BedJam.Battle.prototype.clearPowers = function clearPowers() {
  $('.powersDiv').empty();
};

BedJam.Battle.prototype.itemsList = function itemsList() {
  // this.clearActions();
  console.log('items!');
};

BedJam.Battle.prototype.runAway = function runAway() {
  // this.clearActions();
  console.log('run!');
  this.battleResults('Ran away!');
};
