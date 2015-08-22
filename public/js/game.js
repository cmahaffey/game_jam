var BedJam = BedJam || {};

BedJam.Game = function() {};

BedJam.Game.prototype = {
  create: function() {
    console.log('game state loaded');
    $('.battle').remove();
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.wasd = {
                up: BedJam.game.input.keyboard.addKey(Phaser.Keyboard.W),
                down: BedJam.game.input.keyboard.addKey(Phaser.Keyboard.S),
                left: BedJam.game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: BedJam.game.input.keyboard.addKey(Phaser.Keyboard.D),
                };
    pauseKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    pauseKey.onDown.add(this.pause, this);
  },

  update: function() {
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('Battle');
    }
  },

  pause: function() {
    this.game.paused = true;
    pauseKey.onDown.removeAll();
    pauseKey.onDown.add(this.unpause, this);
    this.pauseMenu = this.game.add.text(10, 0, 'Pause!', {font: '30px Arial', align: 'center', fill: '#fff'});
    console.log(BedJam.girl);
  },

  unpause: function() {
    this.game.paused = false;
    pauseKey.onDown.removeAll();
    pauseKey.onDown.add(this.pause, this);
    this.pauseMenu.destroy();
    console.log('unpause');
  }
};
