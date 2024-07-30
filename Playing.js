class Playing extends Phaser.Scene{
    constructor(){
        super('Playing');
    }
    Bullet_Speed = 150;
    Bullet_Peircing = 1;

    Player_Speed = 100;
    Player_Jump = -150;

    Player_Health = 4;

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
        this.physics.add.collider(this.enemies, this.stage);
        //this.enemies.body.setGravityY(300);
        this.spawnTestEnemy();

  


        this.physics.add.overlap(this.projectiles, this.enemies, (projectile, enemy) => {
            this.enemyHit(projectile, enemy);
        },null, this ); 
       
        //adding health bar
        this.healthBar = this.add.sprite(50,50, 'HealthFrames');
        this.healthBar.setScale(3.5);
        this.healthBar.play('HealthFrames');

        //creating powerup group and player/powerup physics
        this.powerup = this.physics.add.group();
        this.physics.add.overlap(this.player, this.powerup, this.collectPowerup, null, this);


    }

    update(){
        
        switch(this.Player_Health){
            case 4:  this.healthBar.setFrame(0);
                break;
            case 3: this.healthBar.setFrame(1);
                break;
            case 2: this.healthBar.setFrame(2);
                break;
            case 1: this.healthBar.setFrame(3);
                break;
            case 0: this.healthBar.setFrame(4);
                break;
            

        } 


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
            this.Player_Health --;
            if(this.Player_Health <= 0){
                this.playerDeath();
            }
        }

        playerDeath(){
            console.log("player dead");
        }


        enemyHit(projectile, enemy){
            console.log("enemy hit");
            enemy.hurt();
            projectile.bulletContact();
            this.spawnEnemy(); //spawns a new enemy when a enemy dies
            if (Phaser.Math.Between(1, 2) === 2) {
                //activate powerup function
                this.spawnPowerup(enemy.x, enemy.y);
            }
        }
        spawnEnemy() {
            //giving random positions in the game
            const x = Phaser.Math.Between(50, config.width - 20);
            const y = Phaser.Math.Between(40, config.height /2);
            //creates a new enemy
            const newEnemy = new enemy(this, x, y);
        }
        spawnPowerup(x, y) {
            this.powerup.create(x,y + 45, 'powerup');
        }
        collectPowerup(player, powerup) {
            powerup.disableBody(true, true);
        }



}