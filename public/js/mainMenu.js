BedJam.MainMenu = function(){};

BedJam.MainMenu.prototype = {
  create: function() {
    // create the background
    console.log('main menu loaded');
    var text = this.game.add.text(10, 0, "Play!", {font: '30px Arial', align: 'center', fill: '#fff'});
  },

  update: function() {
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
};
