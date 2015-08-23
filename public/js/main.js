var BedJam = BedJam || {};

BedJam.game = new Phaser.Game(320, 320, Phaser.AUTO, '');

// Adds game states
BedJam.game.state.add('Boot', BedJam.Boot);
BedJam.game.state.add('Preload', BedJam.Preload);
BedJam.game.state.add('MainMenu', BedJam.MainMenu);
BedJam.game.state.add('Level1', BedJam.Game);
BedJam.game.state.add('Level2', BedJam.Game2);
BedJam.game.state.add('Level3', BedJam.Game3);

BedJam.game.state.add('Battle', BedJam.Battle);

// Starts game
BedJam.game.state.start('Boot');
