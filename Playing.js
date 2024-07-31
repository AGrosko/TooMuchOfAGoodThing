class Playing extends Phaser.Scene{
    constructor(){
        super('Playing');
    }
    Bullet_Speed = 150;
    Bullet_Peircing = 1;

    Player_Speed = 100;
    Player_Jump = -150;

    Player_Health = 4;
    Player_Score = 0;
    Total_Score = 0;

    Player_CoolDown = 1000;
    Player_OnCoolDown = false;
    Player_ShootTime = 100;
    Player_isShooting = false;
    Player_NumBullets = 1;

    Enemy_Speed = 75;

    


    
    create(){


        //creating the stage
        this.backGround = this.add.image(0,0, "Background");
        this.backGround.setOrigin(0,0);
        this.backGround.setScale(1.67);
        this.stage = this.add.tileSprite(400,350, 600, 30, 'ground');
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
        
        this.spawnTestEnemy();

  


        this.physics.add.overlap(this.projectiles, this.enemies, (projectile, enemy) => {
            this.enemyHit(projectile, enemy);
        },null, this ); 

        
        this.physics.add.overlap(this.player,this.projectiles,  (player,projectile) => {
            this.playerSelfHit(projectile, player);
        },null, this ); 
       
        //adding health bar
        this.healthBar = this.add.sprite(50,50, 'HealthFrames');
        this.healthBar.setScale(3.5);
        this.healthBar.play('HealthFrames');

        //adding score counters
        this.scoreCounter = this.add.text(725,25, this.zeroPad(this.Player_Score, 6));
        this.Total_Score = parseInt(localStorage.getItem('total_score')) || 0; //gets the score from localstorage or 0 if nothing is found
        this.totalScoreCounter = this.add.text(610,7.5, "High Score: " + this.zeroPad(this.Total_Score, 6));



        //creating powerup group and player/powerup physics
        this.powerup = this.physics.add.group();
        this.physics.add.overlap(this.player, this.powerup, this.collectPowerup, null, this);

        //adding sounds and music
        this.pickup = this.sound.add('pickup');

        this.time.addEvent({ //every second the player's position is taken and checked
            delay: 1000,
            callback: this.checkPlayerPosition,
            callbackScope: this,
            loop: true
        });
        
     this.events.on('resume', () => console.log('game resumed'));
        
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
        //console.log(`Player Y position: ${this.player.y}`)


       else if(!this.Player_isShooting){
       if (this.cursors.left.isDown)
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
        }
            

            
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)){

                if(this.player.active){
                 this.shootGun();}




             }
             if( this.Player_isShooting && this.player.body.touching.down){
                this.player.setVelocityX(0);
                this.player.play('PlayerIdle_anim',true);
             }




    }

        shootGun(){

            if(!this.Player_OnCoolDown){ 

                this.Player_isShooting = true;

                this.time.addEvent({
                    delay: this.Player_ShootTime * this.Player_NumBullets,
                    callback: ()=>{
                        this.Player_isShooting = false;
                    }
                });

                var bullet =   new shoot(this);
                this.Player_OnCoolDown = true;

                this.time.addEvent({
                    delay: this.Player_CoolDown,
                    callback: ()=>{
                        this.Player_OnCoolDown = false;
                    }
                });
            }
            else{ console.log("gun on cooldown");}


        }
        spawnTestEnemy(){
            var Enemy= new enemy(this);
           
        }

        hurtPlayer(){

            this.Player_Health --;
            if(this.Player_Health <= 0){
                this.playerDeath();


            }
            
        }

        playerDeath(){
            console.log("player dead");
            //this.setPlayerPosition(config.width/2 -50, config.height/2);

        }


        enemyHit(projectile, enemy){
            enemy.hurt();
            projectile.bulletContact();
            this.Player_Score +=5;
            this.updateScore();
            this.spawnEnemy(); //spawns a new enemy when a enemy dies
            if (Phaser.Math.Between(1, 2) === 2) {
                //activate powerup function
                this.spawnPowerup(enemy.x, enemy.y);
            }
        }

        playerSelfHit(projectile, player){

            this.hurtPlayer();
            projectile.bulletContact();
        }

        zeroPad(number, size){
            var stringNumber = String(number);
            while(stringNumber.length < (size || 2)){
              stringNumber = "0" + stringNumber;
            }
            return stringNumber;
        }

        updateScore(){
            this.scoreCounter.text = this.zeroPad(this.Player_Score,6); //updates score counter text         
            if (this.Player_Score > this.Total_Score) { //if score is greater than total score, update total score to new score
                this.Total_Score = this.Player_Score; 
                console.log("added to total score")
                this.totalScoreCounter.text = this.zeroPad(this.Total_Score,6);
                localStorage.setItem('total_score', this.Total_Score);
            } 
        }


        spawnEnemy() {
            const delay = Phaser.Math.Between(1000, 3000); // adding a 1-3 second delay between spawns

            
            this.time.addEvent({ 
                delay: delay,
                callback: () => {
                    //giving random positions in the game
                    const x = Phaser.Math.Between(50, config.width - 50);
                    const y = Phaser.Math.Between(40, config.height /2);
                    //creates a new enemy
                    const newEnemy = new enemy(this, x, y);
                    //random chance to spawn new enemy whenever an enemy is spawned
                    if (Phaser.Math.Between(1, 5) === 5) {
                        this.spawnEnemy(); 
                    }
                },
                callbackScope: this
            });

        }
        spawnPowerup(x, y) {
            this.powerup.create(x,y + 45, 'powerup');
        }
        collectPowerup(player, powerup) {
            powerup.disableBody(true, true); //when player touches powerup it goes away
            this.sound.play('pickup');
            powerup.destroy();

                game.scene.pause();
                this.scene.launch("powerUpMenu");

                


        }
        setPlayerPosition(x,y) { //resets player to whatever x or y coordinates are set
            this.player.setX(x);
            this.player.setY(y);
        }
        checkPlayerPosition() { //checks the player position is above a certain y height
            if (this.player.y > 330) {
                this.setPlayerPosition(config.width/2 -50, config.height/2);
                this.hurtPlayer();
                console.log("player is off the map")
            }

        }

}