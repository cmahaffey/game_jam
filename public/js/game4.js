var BedJam = BedJam || {};

BedJam.Game4 = function() {};

BedJam.Game4.prototype = {
  init: function(playerx, playery) {
    this.playerx = playerx;
    this.playery = playery;
  },

  create: function() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.wasd = {
      up: BedJam.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: BedJam.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: BedJam.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: BedJam.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
    pauseKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.map = this.game.add.tilemap('level4');
    this.map.addTilesetImage('level3', 'level3');
    this.map.addTilesetImage('madclown', 'madclown');


    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.invisible = this.map.createLayer('invisible');
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

    this.movementEnabled = true;
    pauseKey.onDown.add(this.pause, this);
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
    if (this.movementEnabled) {
      if (this.cursors.up.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.W) || this.cursors.down.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.S) || this.cursors.left.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.A) || this.cursors.right.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        this.randomBattle();
      }

      this.player.body.velocity.x = 0;

      if ((this.cursors.up.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.W)) && (this.cursors.left.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.A))) {
      if(this.player.body.velocity.y === 0)
      this.player.body.velocity.y -= 100;
      this.player.animations.play('left');
      this.player.body.velocity.x -= 100;
    } else if ((this.cursors.up.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.W)) && (this.cursors.right.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.D))) {
      if(this.player.body.velocity.y === 0)
      this.player.body.velocity.y -= 100;
      this.player.animations.play('right');
      this.player.body.velocity.x += 100;
    } else if ((this.cursors.down.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.S)) && (this.cursors.left.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.A))) {
      if(this.player.body.velocity.y === 0)
      this.player.body.velocity.y += 100;
      this.player.animations.play('left');
      this.player.body.velocity.x -= 100;
    } else if ((this.cursors.down.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.S)) && (this.cursors.right.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.D))) {
      if(this.player.body.velocity.y === 0)
      this.player.body.velocity.y += 100;
      this.player.animations.play('right');
      this.player.body.velocity.x += 100;
    } else if (this.cursors.up.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        if(this.player.body.velocity.y === 0)
        this.player.body.velocity.y -= 100;
        this.player.animations.play('up');
    } else if (this.cursors.down.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        if(this.player.body.velocity.y === 0)
        this.player.body.velocity.y += 100;
        this.player.animations.play('down');
    } else if (this.cursors.left.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        this.player.body.velocity.x -= 100;
        this.player.animations.play('left');
    } else if (this.cursors.right.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        this.player.body.velocity.x += 100;
        this.player.animations.play('right');
    } else {
      this.player.body.velocity.y = 0;
      this.player.animations.stop();
      this.player.frame = 4;
    }

    }
  },

  randomBattle: function() {
    BedJam.stepCounter++;
    if (Math.floor(Math.random() * 255) < (BedJam.stepCounter / 256)) {
      BedJam.stepCounter = 0;
      this.game.paused = true;
      pauseKey.onDown.removeAll();
      this.battle = new BedJam.Battle();
      pauseKey.onDown.add(this.pause, this);
    };
  },

  collect: function(player, collectable) {
    var chest = BedJam.generateRandomToyChest();
    if (chest.item) {
      BedJam.girl.getItem(chest.item);
    }
    collectable.destroy();
  },

  enterDoor: function(player, door) {
    this.player.animations.stop();
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    // this.game.add.tween(this.player).to( { angle:360 }, 300, Phaser.Easing.Linear.None, true);
    this.game.add.tween(this.player).to( { alpha:0 }, 1000, Phaser.Easing.Linear.None, true);

    scope = this.state;
    setTimeout(function(){
      console.log('whoo');
    }, 500);
  },

  pause: function() {
    console.log('pause');
    var scope = this;

    this.movementEnabled = false;
    this.player.animations.stop();
    // frame for now
    this.player.frame = 4;
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    this.pauseMenu = $('<div>').addClass('pauseMenu');
    this.pauseMenu.css({width: '22%'});

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

    this.equipmentOption.on('click', function() {
      scope.viewEquipment();
    });

    this.itemsOption.on('click', function() {
      scope.menuPosition = 0;
      scope.viewItems();
    });

    this.exitOption.on('click', function() {
      scope.unpause();
    });

    pauseKey.onDown.removeAll();
    pauseKey.onDown.add(this.unpause, this);
  },

  unpause: function() {
    this.movementEnabled = true;
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
    this.abilitiesOption.css({opacity: '1', cursor: 'pointer'});

    this.clearMenuClicks();
    this.statusOption.html("<b>Sofia</b>");
    this.abilitiesOption.html("Attack: " + BedJam.girl.att);
    this.equipmentOption.html("Defense: " + BedJam.girl.def);
    this.itemsOption.html("Imagination: " + BedJam.girl.imn);
    this.exitOption.html("Speed: " + BedJam.girl.spd);
  },

  viewAbilities: function() {
    pauseKey.onDown.removeAll();
    pauseKey.onDown.add(function() {
      this.pauseMenu.remove();
      this.pause();
    }, this);

    this.clearMenuClicks();
    this.abilitiesOption.css({opacity: '1', cursor: 'pointer'});

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
  },

  viewEquipment: function() {
    pauseKey.onDown.removeAll();
    pauseKey.onDown.add(function() {
      this.pauseMenu.remove();
      this.pause();
    }, this);
    this.pauseMenu.css({width: '35%'});
    this.clearMenuClicks();
    this.abilitiesOption.css({opacity: '1'});
    this.statusOption.html("<b>Equipment</b>");
    this.abilitiesOption.html('Weapon: ' + BedJam.girl.weapon.name);
    this.equipmentOption.html(BedJam.girl.weapon.description);
    this.itemsOption.html('Armor: ' + BedJam.girl.equipment.name);
    this.exitOption.html(BedJam.girl.equipment.description);
  },

  viewItems: function() {
    pauseKey.onDown.removeAll();
    pauseKey.onDown.add(function() {
      this.pauseMenu.remove();
      this.pause();
    }, this);

    this.clearMenuClicks();
    this.abilitiesOption.css({opacity: '1'});
    var scope = this;
    var items = BedJam.girl.inventory.length;

    if (items >= scope.menuPosition) {
      this.statusOption.html(BedJam.girl.inventory[scope.menuPosition].name);
    }
    if (items >= scope.menuPosition + 1) {
      this.abilitiesOption.html(BedJam.girl.inventory[scope.menuPosition + 1].name);
    } else {
      this.abilitiesOption.html();
    }
    if (items >= scope.menuPosition + 2) {
      this.equipmentOption.html(BedJam.girl.inventory[scope.menuPosition + 2].name);
    } else {
      this.equipmentOption.html();
    }
    if (items >= scope.menuPosition + 3) {
      this.itemsOption.html(BedJam.girl.inventory[scope.menuPosition + 3].name);
    } else {
      this.itemsOption.html();
    }
    if (items >= scope.menuPosition + 4) {
      this.exitOption.html(BedJam.girl.inventory[scope.menuPosition + 4].name);
    } else {
      this.exitOption.html();
    }

    if (items >= scope.menuPosition + 5) {
      if (this.cursors.down.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        scope.menuPosition += 5;
      }
    }
    if (scope.menuPosition - 5 >= 0) {
      if (this.cursors.up.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        scope.menuPosition -=5;
      }
    }
  }
};
