var config = {
    width: 800,
    height: 450,
    backgroundColor: 0x000000,
    scene: [PlayScene,Playing,startMenu],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
  }
  var gameSettings = {
    playerSpeed: 200,
  }
  
  
  var game = new Phaser.Game(config);