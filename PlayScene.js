class PlayScene extends Phaser.Scene {
    constructor() {
      super("PlayScene");
    }
   
  
    preload(){
        this.load.image("ground", 'Assets/sprites/ground.PNG');
        this.load.spritesheet("PlayerIdle",'Assets/sprites/playerSprites/Gunner_Blue_Idle.png',{
          frameWidth:48,
          frameHeight:48
        });
        this.load.spritesheet('PlayerRun','Assets/sprites/playerSprites/Gunner_Blue_Run.png',{
          frameWidth:48,
          frameHeight:48 
        });
        this.load.spritesheet('PlayerJump','Assets/sprites/playerSprites/Gunner_Blue_Jump.png',{
          frameWidth:48,
          frameHeight:48 
        });
        this.load.image('MuzzleFlash','Assets/sprites/playerSprites/MuzzleFlash.png');
        this.load.image('BulletStream','Assets/sprites/playerSprites/BulletStream.png');
        this.load.image('SpongeBullet','Assets/sprites/playerSprites/SpongeBullet.png');
    }

    
    create(){
      
      this.scene.start("Playing");

      this.anims.create({
        key: "PlayerIdle_anim",
        frames: this.anims.generateFrameNumbers("PlayerIdle"),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: "PlayerRun_anim",
        frames: this.anims.generateFrameNumbers("PlayerRun"),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: "PlayerJump_anim",
        frames: this.anims.generateFrameNumbers("PlayerJump"),
        frameRate: 10,
        repeat: -1
      });

    }
   
        

    }
  