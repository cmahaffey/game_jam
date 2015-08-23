var BedJam = BedJam || {};

BedJam.Game = function() {};

BedJam.Game.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', 'gameTiles');


    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');
    // this.theHole = this.map.createLayer('theHole');


    //collision on blockedLayer
    this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    this.createItems();
    this.createDoors();

    //create player
    var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    // this.player2 = this.game.add.sprite(this.player.x+30, this.player.y+10, 'player2');
    // this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.enable(this.player);
    this.player.body.collideWorldBounds=true;
    // this.game.physics.arcade.enable(this.player);

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);


    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.player.animations.add('left', [0, 1, 2, 3], 7, true);
    this.player.animations.add('right', [5, 6, 7, 8], 7, true);
    this.player.animations.add('up', [0, 1, 2, 3], 7, true);
    this.player.animations.add('down', [5, 6, 7, 8], 7, true);
    // this.player2.animations.add('left', [0, 1, 2, 3], 7, true);
    // this.player2.animations.add('right', [5, 6, 7, 8], 7, true);
    // this.player2.animations.add('up', [0, 1, 2, 3], 7, true);
    // this.player2.animations.add('down', [5, 6, 7, 8], 7, true);

  },
  createItems: function() {
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;
    var item;
    result = this.findObjectsByType('item', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.items);
    }, this);
  },
  createDoors: function() {
    //create doors
    this.doors = this.game.add.group();
    this.doors.enableBody = true;
    result = this.findObjectsByType('door', this.map, 'objectsLayer');

    result.forEach(function(element){
      this.createFromTiledObject(element, this.doors);
    }, this);
  },

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = [];
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }
    });
    return result;
  },
  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
  },
  update: function() {
    //collision
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
    this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

    //player movement

    this.player.body.velocity.x = 0;

    if(this.cursors.up.isDown) {
      if(this.player.body.velocity.y === 0)
      this.player.body.velocity.y -= 50;
    }
    else if(this.cursors.down.isDown) {
      if(this.player.body.velocity.y === 0)
      this.player.body.velocity.y += 50;
    }
    else {
      this.player.body.velocity.y = 0;
    }
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= 100;
      this.player.animations.play('left');
      // this.player2.animations.play('left');

    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += 100;
      this.player.animations.play('right');
      // this.player2.animations.play('right');

    }
    else
    {
        //  Stand still
        this.player.animations.stop();
        // this.player2.animations.stop();
        // this.player2.frame = 4;
        this.player.frame = 4;
    }
    // this.player2.x = this.player.x+0;
    // this.player2.y = this.player.y+40;


  },
  collect: function(player, collectable) {
    console.log('yummy!');

    //remove sprite
    collectable.destroy();
  },
  enterDoor: function(player, door) {
    this.player.animations.stop();
    this.player.body.velocity.x = 0;
    this.player.body.velocity.x = 0;

    console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
    this.game.add.tween(this.player).to( { angle:360 }, 300, Phaser.Easing.Linear.None, true);
    this.game.add.tween(this.player).to( { width:0, height:0 }, 1000, Phaser.Easing.Linear.None, true);

    scope = this.state;
    setTimeout(function(){
      scope.start('Level2');
    }, 2000);
  },
};
