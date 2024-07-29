class enemy extends Phaser.GameObjects.Sprite{

    constructor(scene){
        super(scene,80,40);

       // scene.physics.add.sprite(120,40,'enemyIdle');
        this.play('EnemyIdle_anim');

       
        
        
        //scene.physics.add.collider(this,scene.stage);


        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        scene.enemies.add(this);
        this.canMove = true;
        
    }

    update(){


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
            }
            
        }
        else if (this.x > this.scene.player.x){
            this.body.setVelocityX(-this.scene.Enemy_Speed);
            this.anims.play('EnemyRun_anim',true);
            
            if(this.flipX == false){
            this.flipX=true;
            this.x -=20;
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






}
