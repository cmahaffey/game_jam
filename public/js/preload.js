var BedJam = BedJam || {};

BedJam.Preload = function(){};

BedJam.Preload.prototype = {
  preload: function() {
    // shows loading screen
  //  this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
  //  this.preloadBar.anchor.setTo(0.5);
  //  this.load.setPreloadSprite(this.preloadBar);

  // load game assets

  },

  create: function() {
    console.log('preload state loaded');
    this.state.start('MainMenu');
  }
};
