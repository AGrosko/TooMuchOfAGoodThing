class enemy extends Phaser.GameObjects.Sprite{

    constructor(scene){
        // x and y are random positions on the scene
        const x = Phaser.Math.Between(30, config.width - 30);
        const y = Phaser.Math.Between(40, config.height /2);
        super(scene,x,y);


  
        this.play('EnemyIdle_anim');

       


        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        scene.enemies.add(this);
        this.canMove = true;
        this.body.setGravityY(300);
        this.setOrigin(0.5,0.5);
       this.body.setSize(36,36);
       this.body.setOffset(30,93);
    }

    update(){

        if(!this.isDead){

        this.distanceFromPlayer= Math.abs(this.scene.player.x - this.x );
        this.playerHeight = (this.scene.player.y - this.y);

        
        //enemy movement
        if(this.canMove){
        if (this.x < this.scene.player.x){
            this.body.setVelocityX(this.scene.Enemy_Speed);
            this.anims.play('EnemyRun_anim',true);
            
            if(this.flipX == true){
                this.flipX=false;
                this.x += 20;
                this.body.setOffset(30,93);
            }
            
        }
        else if (this.x > this.scene.player.x){
            this.body.setVelocityX(-this.scene.Enemy_Speed);
            this.anims.play('EnemyRun_anim',true);
            
            if(this.flipX == false){
            this.flipX=true;
            this.x -=20;
            this.body.setOffset(60,93);
            }
            
        }

    }
    }

        //enemy attack
        //if enemy is close it will stop and play the attack animation
        if( this.distanceFromPlayer < 20){
            this.canMove = false;
            this.body.setVelocityX(0);
            this.anims.play('EnemyAttack_anim', true);
            if (this.anims.currentFrame.index == 1){
                this.alreadyHurt = false;
                
            }
        }
        else{
            //locks enemy into completing the full animation
            if(this.anims.currentFrame.index == 9 ){
            this.canMove = true;
            }
            
        }
        if (!this.canMove && 
            this.anims.currentFrame.index > 4 && 
            this.anims.currentFrame.index < 8 &&
            this.distanceFromPlayer <30 && 
            !this.alreadyHurt &&
            (this.playerHeight > 35) ){
            this.scene.hurtPlayer();
            
            this.alreadyHurt = true;

        }

        

    }

    hurt(){
        console.log("enemy is hurt");


        this.body.enable = false;
        this.anims.play("EnemyDeath_anim");
        this.isDead = true;

        this.scene.time.addEvent({
            delay: 500, 
            callback: () => {

                this.destroy(); 
            },
            callbackScope: this 
        });

    }






}
