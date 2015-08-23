var BedJam = BedJam || {};

BedJam.Game = function() {};

BedJam.Game.prototype = {
  init: function(playerx, playery) {
    this.playerx = playerx;
    this.playery = playery;
  },

  create: function() {
    $('.statsBox').css({display: 'block'});
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.wasd = {
      up: BedJam.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: BedJam.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: BedJam.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: BedJam.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
    pauseKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', 'gameTiles');


    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    this.createItems();
    this.createDoors();

    //create player
    var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');

    this.game.physics.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.game.camera.follow(this.player);

    this.player.animations.add('left', [0, 1, 2, 3], 7, true);
    this.player.animations.add('right', [5, 6, 7, 8], 7, true);
    this.player.animations.add('up', [0, 1, 2, 3], 7, true);
    this.player.animations.add('down', [5, 6, 7, 8], 7, true);

    pauseKey.onDown.add(this.pause, this);
    // this.openingDialogue();
  },

  openingDialogue: function() {
    this.game.paused = true;

    var scope = this;

    $('.battleText').css({display: 'block'});
    $('.battleText').html('Sofia: I can\'t fall asleep!');
    $(window).keydown(function(e) {
      if (e.keyCode === 0 || e.keyCode === 32) {
        $('.battleText').html('Sofia: Where\'s my teddy bear?');
        $(window).off();
        $(window).keydown(function(e) {
          if (e.keyCode === 0 || e.keyCode === 32) {
            $('.battleText').html('Mr. Cuddles, Esq.: Help! I\'m under the bed!');
            $(window).off();
            $(window).keydown(function(e) {
              if (e.keyCode === 0 || e.keyCode === 32) {
                $('.battleText').html('Sofia: Mr. Bear! But... there\'s monsters under there!');
                $(window).off();
                $(window).keydown(function(e) {
                  if (e.keyCode === 0 || e.keyCode === 32) {
                    $('.battleText').html('Sofia: I have to save him!');
                    $(window).keydown(function(e) {
                      if (e.keyCode === 0 || e.keyCode === 32) {
                        $(window).off();
                        $('.battleText').html('');
                        $('.battleText').css({display: 'none'});
                        BedJam.game.paused = false;
                        // prob wont work
                        pauseKey.onDown.add(scope.pause, scope);
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
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

    if (this.cursors.up.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
      if(this.player.body.velocity.y === 0)
      this.player.body.velocity.y -= 100;
    }
    else if (this.cursors.down.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
      if(this.player.body.velocity.y === 0)
      this.player.body.velocity.y += 100;
    }
    else {
      this.player.body.velocity.y = 0;
    }
    if (this.cursors.left.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      this.player.body.velocity.x -= 100;
      this.player.animations.play('left');
    }
    else if (this.cursors.right.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
      this.player.body.velocity.x += 100;
      this.player.animations.play('right');
    }
    else {
        // Stand still
        this.player.animations.stop();
        this.player.frame = 4;
    }
  },

  collect: function(player, collectable) {
    console.log('yummy!');

    //remove sprite
    collectable.destroy();
  },

  enterDoor: function(player, door) {
    this.player.animations.stop();
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    this.game.add.tween(this.player).to( { angle:360 }, 300, Phaser.Easing.Linear.None, true);
    this.game.add.tween(this.player).to( { width:0, height:0 }, 1000, Phaser.Easing.Linear.None, true);

    setTimeout(function() {
      BedJam.game.state.start('Game2');
    }, 2000);
  },

  pause: function() {
    console.log('pause');
    var scope = this;

    this.pauseMenu = $('<div>').addClass('pauseMenu');

    this.pauseOptions = $('<ul>').addClass('pauseOptions');

    this.statusOption = $('<li>').addClass('pauseMenuOptions').html('Status');
    this.abilitiesOption = $('<li>').addClass('pauseMenuOptions').html('Abilities');
    this.equipmentOption = $('<li>').addClass('pauseMenuOptions').html('Equipment');
    this.itemsOption = $('<li>').addClass('pauseMenuOptions').html('Items');
    this.exitOption = $('<li>').addClass('pauseMenuOptions').html('Exit');

    this.pauseOptions.append(this.statusOption, this.abilitiesOption, this.equipmentOption, this.itemsOption, this.exitOption);
    this.pauseMenu.append(this.pauseOptions);

    $('.overlay').append(this.pauseMenu);

    this.statusOption.on('click', function() {
      scope.viewStats();
    });

    if (BedJam.girl.lvl >= 2) {
      this.abilitiesOption.css({opacity: '1', cursor: 'pointer'}).on('click', function() {
        scope.viewAbilities();
      });
    } else {
      this.abilitiesOption.css({opacity: '0.5', cursor: 'auto'});
    }

    pauseKey.onDown.removeAll();
    pauseKey.onDown.add(this.unpause, this);
  },

  unpause: function() {
    pauseKey.onDown.removeAll();
    pauseKey.onDown.add(this.pause, this);
    this.pauseMenu.remove();
    console.log('unpause');
  },

  clearMenuClicks: function() {
    this.statusOption.html('').off();
    this.abilitiesOption.html('').off();
    this.equipmentOption.html('').off();
    this.itemsOption.html('').off();
    this.exitOption.html('').off();
  },

  viewStats: function() {
    pauseKey.onDown.removeAll();
    pauseKey.onDown.add(function() {
      this.pauseMenu.remove();
      this.pause();
    }, this);
    this.clearMenuClicks();
    this.statusOption.html("HP: " + BedJam.girl.hp + " / " + BedJam.girl.maxHp);
    this.abilitiesOption.html("MP: " + BedJam.girl.mp + " / " + BedJam.girl.maxMp);
    this.equipmentOption.html("EXP: " + BedJam.girl.exp + " / " + BedJam.girl.expMax);
    if (BedJam.girl.weapon) {
      this.itemsOption.html(BedJam.girl.weapon);
    } else {
      this.itemsOption.html("Unequipped");
    }
    if (BedJam.girl.equipment) {
      this.exitOption.html(BedJam.girl.equipment);
    } else {
      this.exitOption.html("Unequipped");
    }
  },

  viewAbilities: function() {
    pauseKey.onDown.removeAll();
    pauseKey.onDown.add(function() {
      this.pauseMenu.remove();
      this.pause();
    }, this);

    this.clearMenuClicks();

    if (BedJam.girl.lvl >= 2) {
      this.statusOption.html("Hurt");
    }
    if (BedJam.girl.lvl >= 4) {
      this.abilitiesOption.html("Heal");
    }
    if (BedJam.girl.lvl >= 6) {
      this.equipmentOption.html("Bedtime");
    }
    if (BedJam.girl.lvl >= 8) {
      this.itemsOption.html("Temper");
    }
    if (BedJam.girl.lvl === 10) {
      this.exitOption.html("Tantrum");
    }
  }
};
