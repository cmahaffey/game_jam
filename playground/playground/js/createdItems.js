
  // Item Template
  var newItemTemplate = new Item({
    name: "name",
    type: "type",
    usableItem: false,
    uses: null,
    atkModifier: 0,
    defModifier: 0,
    imnModifier: 0,
    spdModifier: 0,
    maxHealthModifier: 0,
    imnPointsModifier: 0,
    xpModifier: 0,
    raiseHealth: 0,
    raiseImagination: 0,
    canFlee: false
  });



  // Weapons

  // Princess Wand (Imagination + 2)
    var princessWand = new Item({
      name: "Princess Wand",
      type: "weapons",
      usableItem: false,
      uses: null,
      atkModifier: 0,
      defModifier: 0,
      imnModifier: 2,
      spdModifier: 0,
      maxHealthModifier: 0,
      imnPointsModifier: 0,
      xpModifier: 0,
      raiseHealth: 0,
      raiseImagination: 0,
      canFlee: false
    });

  // Wiffle Ball Bat (Atk +1)
    var wiffleBallBat = new Item({
      name: "Wiffle Ball Bat",
      type: "weapons",
      usableItem: false,
      uses: null,
      atkModifier: 1,
      defModifier: 0,
      imnModifier: 0,
      spdModifier: 0,
      maxHealthModifier: 0,
      imnPointsModifier: 0,
      xpModifier: 0,
      raiseHealth: 0,
      raiseImagination: 0,
      canFlee: false
    });

  // Toy Sword (Atk + 2)
    var toySword = new Item({
      name: "Toy Sword",
      type: "weapons",
      usableItem: false,
      uses: null,
      atkModifier: 2,
      defModifier: 0,
      imnModifier: 0,
      spdModifier: 0,
      maxHealthModifier: 0,
      imnPointsModifier: 0,
      xpModifier: 0,
      raiseHealth: 0,
      raiseImagination: 0,
      canFlee: false
    });

  // Baseball (Atk +1) (Speed +1)
    var baseball = new Item({
      name: "Baseball",
      type: "weapons",
      usableItem: false,
      uses: 1,
      atkModifier: 0,
      defModifier: 0,
      imnModifier: 0,
      spdModifier: 0,
      maxHealthModifier: 0,
      imnPointsModifier: 0,
      xpModifier: 0,
      raiseHealth: 0,
      raiseImagination: 0,
      canFlee: false
    });

  // Jump Rope (Atk + 2)(Speed +1)
    var jumpRope = new Item({
      name: "Jump Rope",
      type: "weapons",
      usableItem: false,
      uses: null,
      atkModifier: 2,
      defModifier: 0,
      imnModifier: 0,
      spdModifier: 1,
      maxHealthModifier: 0,
      imnPointsModifier: 0,
      xpModifier: 0,
      raiseHealth: 0,
      raiseImagination: 0,
      canFlee: false
    });

  // Pillow (Def +1)
    var pillow = new Item({
      name: "Pillow",
      type: "weapons",
      usableItem: false,
      uses: null,
      atkModifier: 0,
      defModifier: 1,
      imnModifier: 0,
      spdModifier: 0,
      maxHealthModifier: 0,
      imnPointsModifier: 0,
      xpModifier: 0,
      raiseHealth: 0,
      raiseImagination: 0,
      canFlee: false
    });

  // Yo-Yo (Atk + 1)
    var yoYo = new Item({
      name: "Yo Yo",
      type: "weapons",
      usableItem: false,
      uses: null,
      atkModifier: 1,
      defModifier: 0,
      imnModifier: 0,
      spdModifier: 0,
      maxHealthModifier: 0,
      imnPointsModifier: 0,
      xpModifier: 0,
      raiseHealth: 0,
      raiseImagination: 0,
      canFlee: false
    });

  // Frisbee
  var frisbee = new Item({
      name: "Frisbee",
      type: "weapons",
      usableItem: false,
      uses: null,
      atkModifier: 1,
      defModifier: 0,
      imnModifier: 0,
      spdModifier: 1,
      maxHealthModifier: 0,
      imnPointsModifier: 0,
      xpModifier: 0,
      raiseHealth: 0,
      raiseImagination: 0,
      canFlee: false
    });


  // Roller Skates - Spd + 1
    var rollerSkates = new Item({
      name: "Roller Skates",
      type: "equipment",
      usableItem: false,
      uses: null,
      atkModifier: 0,
      defModifier: 0,
      imnModifier: 0,
      spdModifier: 1,
      maxHealthModifier: 0,
      imnPointsModifier: 0,
      xpModifier: 0,
      raiseHealth: 0,
      raiseImagination: 0,
      canFlee: false
    });

  // Princess Crown - Imagination + 1
    var princessCrown = new Item({
      name: "Princess Crown",
      type: "equipment",
      usableItem: false,
      uses: null,
      atkModifier: 0,
      defModifier: 0,
      imnModifier: 1,
      spdModifier: 0,
      maxHealthModifier: 0,
      imnPointsModifier: 0,
      xpModifier: 0,
      raiseHealth: 0,
      raiseImagination: 0,
      canFlee: false
    });

  // Onesie - Def +1
    var onesie = new Item({
      name: "Onsie",
      type: "weapons",
      usableItem: false,
      uses: null,
      atkModifier: 0,
      defModifier: 1,
      imnModifier: 0,
      spdModifier: 0,
      maxHealthModifier: 0,
      imnPointsModifier: 0,
      xpModifier: 0,
      raiseHealth: 0,
      raiseImagination: 0,
      canFlee: false
    });

  // Blanket - Def + 2
    var blanket = new Item({
      name: "Blanket",
      type: "equipment",
      usableItem: false,
      uses: null,
      atkModifier: 0,
      defModifier: 2,
      imnModifier: 0,
      spdModifier: 0,
      maxHealthModifier: 0,
      imnPointsModifier: 0,
      xpModifier: 0,
      raiseHealth: 0,
      raiseImagination: 0,
      canFlee: false
    });

  // Halloween Costume - Imagination + 2
    var halloweenCostume = new Item({
      name: "Halloween Costume",
      type: "equipment",
      usableItem: false,
      uses: null,
      atkModifier: 0,
      defModifier: 0,
      imnModifier: 2,
      spdModifier: 0,
      maxHealthModifier: 0,
      imnPointsModifier: 0,
      xpModifier: 0,
      raiseHealth: 0,
      raiseImagination: 0,
      canFlee: false
    });



// Usables

  // Juice Box - Health Potion
    var juiceBox = new Item({
      name: "Juice Box",
      type: "usables",
      usableItem: true,
      uses: 1,
      atkModifier: 0,
      defModifier: 0,
      imnModifier: 0,
      spdModifier: 0,
      maxHealthModifier: 5,
      imnPointsModifier: 0,
      raiseHealth: 0,
      raiseImagination: false,
      canFlee: false,
      xpModifier: 0,
      raiseHealth: 0,
      raiseImagination: 0,
      canFlee: false
    });

  // Book - Replenishes MP
    var storyBook = new Item({
      name: "Story Box",
      type: "usables",
      usableItem: true,
      uses: 1,
      atkModifier: 0,
      defModifier: 0,
      imnModifier: 0,
      spdModifier: 0,
      maxHealthModifier: 0,
      imnPointsModifier: 5,
      raiseHealth: 0,
      raiseImagination: true,
      canFlee: false,
      xpModifier: 0,
      raiseHealth: 0,
      raiseImagination: 0,
      canFlee: false
    });


// Coodie Shot - defense * 1.5 for 5 turns.
// Marbles - Automatic Flee


// All the Item
var weapons = [princessWand, wiffleBallBat, toySword, baseball, jumpRope, pillow, yoYo, frisbee];

var equipment = [rollerSkates, princessCrown, onesie, blanket, halloweenCostume];

var usables = [juiceBox, storyBook];

var allTheItems = new GamestateItems({
  weapons: weapons,
  equipment: equipment,
  usables: usables
});
