var BedJam = BedJam || {};

BedJam.Preload = function(){};

BedJam.Preload.prototype = {
  preload: function() {
    // shows loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

  // load game assets
  this.load.tilemap('level1', '/assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
  this.load.tilemap('level2', '/assets/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
  this.load.spritesheet('player', '/assets/images/dude.png', 32, 48);
  this.load.image('level1Tiles', '/assets/images/level1tiles.png');
  this.load.image('level2Tiles', '/assets/images/basictiles.png');
  this.load.image('thehole', '/assets/images/thehole.png');
  this.load.image('treasure', '/assets/images/treasure.png');
  this.load.image('bug', '/assets/images/bug.png');
  this.load.image('bug1', '/assets/images/bug1.png');
  this.load.image('bug2', '/assets/images/bug2.png');
  this.load.image('bug3', '/assets/images/bug3.png');
  this.load.image('bug4', '/assets/images/bug4.png');
  },

  create: function() {
    console.log('preload state loaded');
    this.state.start('MainMenu');
  }
};
