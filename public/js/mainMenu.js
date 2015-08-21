BedJam.MainMenu = function(){};

BedJam.MainMenu.prototype = {
  create: function() {
    // create the background
    var text = this.game.add.text(this.game.width/2, this.game.height/2, "Play!", {font: '30px Arial', align: 'center', fill: '#fff'});
  },

  update: function() {
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
};
