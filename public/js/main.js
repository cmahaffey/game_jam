var BedJam = BedJam || {};

BedJam.game = new Phaser.Game(320, 320, Phaser.CANVAS, '');

// Adds game states
BedJam.game.state.add('Boot', BedJam.Boot);
BedJam.game.state.add('Preload', BedJam.Preload);
BedJam.game.state.add('MainMenu', BedJam.MainMenu);
BedJam.game.state.add('Game', BedJam.Game);
BedJam.game.state.add('Game2', BedJam.Game2);
BedJam.game.state.add('Game3', BedJam.Game3);
BedJam.game.state.add('Game4', BedJam.Game4);
// BedJam.game.state.add('Game5', BedJam.Game5);

// Starts game
BedJam.game.state.start('Boot');
