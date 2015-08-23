BedJam.MainMenu = function(){};

BedJam.MainMenu.prototype = {
  create: function() {
    // create the background
    var text = this.game.add.text(10, 0, "Congratulations!", {font: '30px Arial', align: 'center', fill: '#fff'});
  }
};
