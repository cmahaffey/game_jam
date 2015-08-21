var BedJam = BedJam || {};

BedJam.Game = function() {};

BedJam.Game.prototype = {
  create: function() {
    console.log('game state loaded');
  },

  update: function() {
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('Battle');
    }
  }
};
