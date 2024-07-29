class Playing extends Phaser.Scene{
    constructor(){
        super('Playing');
    }
    Bullet_Speed = 150;
    Player_Speed = 100;
    Player_Jump = -150;

    Enemy_Speed = 75;


    
    create(){

        //creating the stage
        this.stage = this.add.tileSprite(400,350, 600, 70, 'ground');
        this.staticGroup = this.physics.add.staticGroup();
        this.staticGroup.add(this.stage);

        //adding player sprite, starting idle animation and setting physics for player
        this.player = this.physics.add.sprite(config.width/2 -50, config.height/2, "PlayerIdle");
        this.player.play("PlayerIdle_anim");
        this.player.setBodySize(30,30);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(300);
        this.physics.add.collider(this.player,this.stage);

        //creating projectiles group and initializing physics
        this.projectiles = this.physics.add.group();


        //initializing keyboard inputs
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //creating enemy group
        this.enemies = this.physics.add.group();
        this.spawnTestEnemy();
  


        this.physics.add.collider(this.projectiles, this.enemies, this.enemyHit ,null, this ); 
       
       console.log(this.enemies);

        
    }

    update(){



             //updating projectiles

             for(var i = 0; i < this.projectiles.getChildren().length; i++){
                var bullet = this.projectiles.getChildren()[i];
                bullet.update();
              }

              //updating enemies
              for(var i = 0; i < this.enemies.getChildren().length; i++){
                var Enemy = this.enemies.getChildren()[i];
                Enemy.update();
              }
             


         //inputs for player 

 
        if (!this.player.body.touching.down){
            this.player.anims.play('PlayerJump_anim');
        }
       else if (this.cursors.left.isDown)
            {
                this.player.setVelocityX(- this.Player_Speed);
                this.player.flipX=true;
                this.player.anims.play('PlayerRun_anim', true);
                
            }
            else if (this.cursors.right.isDown)
            {
                this.player.setVelocityX(this.Player_Speed);
                this.player.flipX=false;
                this.player.anims.play('PlayerRun_anim', true);

            }
            else
            {
                this.player.setVelocityX(0);
            
                this.player.anims.play('PlayerIdle_anim',true);
                
            }
            
            if (this.cursors.up.isDown && this.player.body.touching.down)
            {
                this.player.setVelocityY(this.Player_Jump);

            }
            
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
           
                if(this.player.active){
                 this.shootGun();}
             }




    }

        shootGun(){
         var bullet =   new shoot(this);
        }
        spawnTestEnemy(){
            var Enemy= new enemy(this);

        }

        hurtPlayer(){
            console.log("Player Hurt");
        }

        enemyHit(){
            console.log("enemy hit");
        }

}