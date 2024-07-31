class PlayScene extends Phaser.Scene {
    constructor() {
      super("PlayScene");
    }
   
  
    preload(){
      //load health bar
      this.load.spritesheet("healthBar", "Assets/sprites/helth bar.png",{
        frameWidth: 32 ,
        frameHeight: 32
      });

      //load stage asset
        this.load.image("ground", 'Assets/sprites/Platform.png');
        this.load.spritesheet("PlayerIdle",'Assets/sprites/playerSprites/Gunner_Blue_Idle.png',{
          frameWidth:48,
          frameHeight:48
        });
        this.load.image("Background", 'Assets/sprites/frame0026.png');



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
        this.load.spritesheet('MuzzleFlash_sprite','Assets/sprites/playerSprites/MuzzleFlash.png',
          {
            frameWidth:8,
            frameHeight: 8
          }
        );
        this.load.spritesheet('BulletStream_sprite','Assets/sprites/playerSprites/BulletStream.png',
          {
            frameWidth:80,
            frameHeight: 16
          }
        );
        this.load.spritesheet('SpongeBullet_sprite','Assets/sprites/playerSprites/SpongeBullet.png',
          {
            frameWidth: 3,
            frameHeight: 1
          }
        );
        this.load.image('SpongeBullet_image','Assets/sprites/playerSprites/SpongeBullet.png');

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
        this.load.spritesheet('enemyDeath','Assets/sprites/enemySprites/xeno-grunt-knockback.png',{
          frameWidth:128,
          frameHeight:128,
        });
        this.load.spritesheet('enemyDead','Assets/sprites/enemySprites/xeno-grunt-death-grounded.png',{
          frameWidth:128,
          frameHeight:128,
        });

        //powerup assets
        this.load.image('powerup','Assets/sprites/powerupSprites/powerup1.png');

        this.load.audio('pickup','Assets/audio/pickup.mp3');

    }

    
    create(){
      
      this.scene.start("startMenu");


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

      this.anims.create({
        key: "HealthFrames",
        frames: this.anims.generateFrameNumbers("healthBar"),
        frameRate: 1,
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
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: "EnemyAttack_anim",
        frames: this.anims.generateFrameNumbers("enemyAttack"),
        frameRate: 5,
        repeat: 0
      });
      this.anims.create({
        key: 'EnemyDeath_anim',
        frames: 
        [{key: 'enemyDeath'},
          {key: 'enemyDead'}
        ]
        ,
        frameRate: 5,
        repeat: 0
      })

    }
   
        

    }
  