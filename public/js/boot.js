var BedJam = BedJam || {};

BedJam.Boot = function() {};

BedJam.Boot.prototype = {
  preload: function() {
    //this.load.image(  'ANY IMAGES TO BE USED IN LOADING SCREEN' );
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');

  },

  create: function() {
    console.log('boot state loaded');
    // sets loading screen background color

    // Scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // Center game horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    // physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.state.start('Preload');
  }
};
