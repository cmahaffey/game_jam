<<<<<<< HEAD
<<<<<<< HEAD
$(document).ready(function() {
  console.log("All loaded!");
});
=======
<<<<<<< HEAD
$(document).ready(function() {
  console.log("All loaded!");
});
=======
=======
>>>>>>> 9f1f1c73f33b1a05671a303853f83e63d62af009
var BedJam = BedJam || {};

BedJam.game = new Phaser.Game(320, 320, Phaser.CANVAS, '');

// Adds game states
BedJam.game.state.add('Boot', BedJam.Boot);
BedJam.game.state.add('Preload', BedJam.Preload);
BedJam.game.state.add('MainMenu', BedJam.MainMenu);
BedJam.game.state.add('Game', BedJam.Game);
BedJam.game.state.add('Game2', BedJam.Game2);

// Starts game
BedJam.game.state.start('Boot');
<<<<<<< HEAD
>>>>>>> raymond
>>>>>>> a6dfee29511a7d0036303a6cfe3424d8954bfe98
=======
>>>>>>> 9f1f1c73f33b1a05671a303853f83e63d62af009
