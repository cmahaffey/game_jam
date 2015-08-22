var BedJam = BedJam || {};

BedJam.game = new Phaser.Game(640, 640, Phaser.AUTO, '');

// Adds game states
BedJam.game.state.add('Boot', BedJam.Boot);
BedJam.game.state.add('Preload', BedJam.Preload);
BedJam.game.state.add('MainMenu', BedJam.MainMenu);
BedJam.game.state.add('Game', BedJam.Game);
BedJam.game.state.add('Battle', BedJam.Battle);

// Starts game
BedJam.game.state.start('Boot');
