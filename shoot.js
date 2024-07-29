class shoot extends Phaser.GameObjects.Sprite{

    constructor(scene){
        var x = scene.player.x;
        var y = scene.player.y;
        super(scene, x, y,);
        y-=3;
        this.flash = scene.add.image(x,y,'MuzzleFlash');
        
        this.bullet = scene.physics.add.image(x,y,'SpongeBullet');
        this.bullet.setScale(2);
        this.stream = scene.add.image(x,y + 1,'BulletStream');
        this.stream.setScale(2);
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



       this.destroyFlash =  scene.time.addEvent({
            delay: 50, 
            callback: () => {
                this.flash.destroy(); 
            },
            callbackScope: this 
        });

        this.blinkBullet = scene.time.addEvent({
            delay: 7000, 
            callback: () => {
                this.blinking = scene.time.addEvent({
                    delay: 250, 
                    loop: true,
                   
                    callback: () => {
                        
                        if(this.bullet.tintFill){
                            this.bullet.tintFill = false;
                            
                        }
                        else{
                            this.bullet.setTintFill(0xFFFFFF); 
                            
                        }
                        
                        
                    },
                    callbackScope: this 
                });
            },
            callbackScope: this 
        });

        scene.time.addEvent({
            delay: 10000, 
            callback: () => {
                this.bullet.destroy(); 
                this.stream.destroy();
                scene.time.removeEvent(this.blinkBullet);
                scene.time.removeEvent(this.blinking);
            },
            callbackScope: this 
        });

        scene.add.existing(this);
        scene.projectiles.add(this);
    }
    update(){
        //logic for stream follow
        if(this.stream.flipX==true){
        this.stream.x=this.bullet.x - 80;}
        else{
        this.stream.x=this.bullet.x + 80;}

        //logic for bullet looping through screen
        if(this.bullet.x < 0){
            this.bullet.x = 800;
        }
        else if(this.bullet.x > 800){
            this.bullet.x = 0;
        }
    }

}