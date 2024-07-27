class shoot extends Phaser.GameObjects.Sprite{

    constructor(scene){
        var x = scene.player.x;
        var y = scene.player.y;
        super(scene, x, y,);
        y-=3;
        this.flash = scene.add.image(x,y,'MuzzleFlash');
        this.bullet = scene.add.image(x,y,'SpongeBullet');
        this.stream = scene.add.image(x,y,'BulletStream');
        scene.physics.world.enableBody(this.bullet);


        if(scene.player.flipX==false){
             this.flash.x+=20;
             this.flash.flipX=false;

             this.bullet.x+=20;
             this.bullet.flipX=false;

             this.bullet.body.velocity.x= scene.Bullet_Speed;

             this.stream.flipX=true;
        }
        else{
            this.flash.x-=21;
            this.flash.flipX=true;

            this.bullet.x-=21;
            this.bullet.flipX=true;
            this.bullet.body.velocity.x= - scene.Bullet_Speed;
        }



        scene.time.addEvent({
            delay: 50, 
            callback: () => {
                this.flash.destroy(); 
            },
            callbackScope: this 
        });

        
        scene.projectiles.add(this);
    }
    update(){
        if(this.stream.flipX==true){
        this.stream.x=this.bullet.x - 40;}
        else{
        this.stream.x=this.bullet.x + 50;}
    }

}