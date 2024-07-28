class enemy extends Phaser.GameObjects.Sprite{

    constructor(scene){
        super(scene,80,40);

        this.curEnemy =scene.physics.add.sprite(120,40,'enemyIdle');
        this.curEnemy.play('EnemyIdle_anim');
        this.curEnemy.body.setGravityY(300);
        this.curEnemy.setCollideWorldBounds(true);
        scene.physics.add.collider(this.curEnemy,scene.stage);



        scene.enemies.add(this);
        this.canMove = true;
        
    }

    update(){


        this.distanceFromPlayer= Math.abs(this.scene.player.x - this.curEnemy.x );
        
        
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
        if( this.distanceFromPlayer < 20){
            this.canMove = false;
            this.curEnemy.setVelocityX(0);
            this.curEnemy.anims.play('EnemyAttack_anim', true);
        }
        else{
            if(this.curEnemy.anims.currentFrame.index == 9 ){
            this.canMove = true;
            }
        }

        

    }






}