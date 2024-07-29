class PlayScene extends Phaser.Scene {
    constructor() {
      super("PlayScene");
    }
   
  
    preload(){
      //load stage asset
        this.load.image("ground", 'Assets/sprites/ground.PNG');
        this.load.spritesheet("PlayerIdle",'Assets/sprites/playerSprites/Gunner_Blue_Idle.png',{
          frameWidth:48,
          frameHeight:48
        });
        //load player assets
        this.load.spritesheet('PlayerRun','Assets/sprites/playerSprites/Gunner_Blue_Run.png',{
          frameWidth:48,
          frameHeight:48 
        });
        this.load.spritesheet('PlayerJump','Assets/sprites/playerSprites/Gunner_Blue_Jump.png',{
          frameWidth:48,
          frameHeight:48 
        });
        //player shooting assets
        this.load.image('MuzzleFlash','Assets/sprites/playerSprites/MuzzleFlash.png');
        this.load.image('BulletStream','Assets/sprites/playerSprites/BulletStream.png');
        this.load.image('SpongeBullet','Assets/sprites/playerSprites/SpongeBullet.png');

        //enemy assets
        this.load.spritesheet('enemyIdle','Assets/sprites/enemySprites/xeno-grunt-idle.png',{
          frameWidth:128,
          frameHeight:128,
        });
        this.load.spritesheet('enemyRun','Assets/sprites/enemySprites/xeno-grunt-run.png',{
          frameWidth:128,
          frameHeight:128,
        });
        this.load.spritesheet('enemyAttack','Assets/sprites/enemySprites/xeno-grunt-attack-1.png',{
          frameWidth:128,
          frameHeight:128,
        });
        this.load.spritesheet('enemyDeath','Assets/sprites/enemySprites/xeno-grunt-death-falling.png',{
          frameWidth:128,
          frameHeight:128,
        });
        this.load.spritesheet('enemyDead','Assets/sprites/enemySprites/xeno-grunt-death-grounded.png',{
          frameWidth:128,
          frameHeight:128,
        });

        //powerup assets
        this.load.image('powerup','Assets/sprites/powerupSprites/powerup1.png');

    }

    
    create(){
      
      this.scene.start("Playing");

      //player animations
      this.anims.create({
        key: "PlayerIdle_anim",
        frames: this.anims.generateFrameNumbers("PlayerIdle"),
        frameRate: 5,
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

      //enemy animations
      this.anims.create({
        key: "EnemyIdle_anim",
        frames: this.anims.generateFrameNumbers("enemyIdle"),
        frameRate: 5,
        repeat: -1
      });
      this.anims.create({
        key: "EnemyRun_anim",
        frames: this.anims.generateFrameNumbers("enemyRun"),
        frameRate: 5,
        repeat: -1
      });
      this.anims.create({
        key: "EnemyAttack_anim",
        frames: this.anims.generateFrameNumbers("enemyAttack"),
        frameRate: 5,
        repeat: -1
      });

    }
   
        

    }
  