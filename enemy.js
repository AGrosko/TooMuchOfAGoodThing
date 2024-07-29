class enemy extends Phaser.GameObjects.Sprite{

    constructor(scene){
        super(scene,80,40);

        this.curEnemy =scene.physics.add.sprite(120,40,'enemyIdle');
        this.curEnemy.play('EnemyIdle_anim');
        scene.physics.world.enableBody(this.curEnemy);
        this.curEnemy.body.setGravityY(300);
        
        this.curEnemy.setCollideWorldBounds(true);
        scene.physics.add.collider(this.curEnemy,scene.stage);


        scene.add.existing(this);
        scene.enemies.add(this);
        this.canMove = true;
        
    }

    update(){


        this.distanceFromPlayer= Math.abs(this.scene.player.x - this.curEnemy.x );
        this.playerHeight = (this.scene.player.y - this.curEnemy.y);

        
        //enemy movement
        if(this.canMove){
        if (this.curEnemy.x < this.scene.player.x){
            this.curEnemy.setVelocityX(this.scene.Enemy_Speed);
            this.curEnemy.anims.play('EnemyRun_anim',true);
            
            if(this.curEnemy.flipX == true){
                this.curEnemy.flipX=false;
                this.curEnemy.x += 20;
            }
            
        }
        else if (this.curEnemy.x > this.scene.player.x){
            this.curEnemy.setVelocityX(-this.scene.Enemy_Speed);
            this.curEnemy.anims.play('EnemyRun_anim',true);
            
            if(this.curEnemy.flipX == false){
            this.curEnemy.flipX=true;
            this.curEnemy.x -=20;
            }
            
        }
    }

        //enemy attack
        //if enemy is close it will stop and play the attack animation
        if( this.distanceFromPlayer < 20){
            this.canMove = false;
            this.curEnemy.setVelocityX(0);
            this.curEnemy.anims.play('EnemyAttack_anim', true);
            if (this.curEnemy.anims.currentFrame.index == 1){
                this.alreadyHurt = false;
                
            }
        }
        else{
            //locks enemy into completing the full animation
            if(this.curEnemy.anims.currentFrame.index == 9 ){
            this.canMove = true;
            }
            
        }
        if (!this.canMove && 
            this.curEnemy.anims.currentFrame.index > 4 && 
            this.curEnemy.anims.currentFrame.index < 8 &&
            this.distanceFromPlayer <30 && 
            !this.alreadyHurt &&
            (this.playerHeight > 35) ){
            this.scene.hurtPlayer();
            
            this.alreadyHurt = true;

        }

        

    }






}