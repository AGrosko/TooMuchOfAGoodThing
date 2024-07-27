class enemy extends Phaser.GameObjects.Sprite{

    constructor(scene){
        super(scene,80,40);

        this.curEnemy =scene.physics.add.sprite(120,40,'enemyIdle');
        this.curEnemy.play('EnemyIdle_anim');
        this.curEnemy.body.setGravityY(300);
        this.curEnemy.setCollideWorldBounds(true);
        scene.physics.add.collider(this.curEnemy,scene.stage);



        scene.enemies.add(this);
    }

    update(){

        if (this.curEnemy.x < this.scene.player.x){
            this.curEnemy.setVelocityX(this.scene.Enemy_Speed);
            this.curEnemy.anims.play('EnemyRun_anim',true);
            this.curEnemy.flipX=false;
        }
        if (this.curEnemy.x > this.scene.player.x){
            this.curEnemy.setVelocityX(-this.scene.Enemy_Speed);
            this.curEnemy.anims.play('EnemyRun_anim',true);
            this.curEnemy.flipX=true;
        }
        

    }






}