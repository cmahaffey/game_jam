var BedJam = BedJam || {};

BedJam.game = new Phaser.Game(500, 500, Phaser.AUTO, '');

// Adds game states
BedJam.game.state.add('Boot', BedJam.Boot);
BedJam.game.state.add('Preload', BedJam.Preload);
BedJam.game.state.add('MainMenu', BedJam.MainMenu);
BedJam.game.state.add('Game', BedJam.Game);

// Starts game
BedJam.game.state.start('Boot');
