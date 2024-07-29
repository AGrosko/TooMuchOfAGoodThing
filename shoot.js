class shoot extends Phaser.GameObjects.Image{

    constructor(scene){
        var x = scene.player.x;
        var y = scene.player.y;
        super(scene, x, y-3, 'SpongeBullet_image');
        
        this.flash = scene.add.image(x,y-3,'MuzzleFlash_sprite');
        

        this.stream = scene.add.image(x,y -2,'BulletStream_sprite');
        this.stream.setScale(2);
        this.setScale(2);
        scene.physics.world.enableBody(this);

        scene.add.existing(this);
        scene.projectiles.add(this);
        
        this.remainingPeirces = scene.Bullet_Peircing;

        //handles bullet direction

        if(scene.player.flipX==false){
             this.flash.x+=20;
             this.flash.flipX=false;

             this.x+=20;
             this.flipX=false;

             this.body.velocity.x= scene.Bullet_Speed;

             this.stream.flipX=true;
        }
        else{
            this.flash.x-=21;
            this.flash.flipX=true;

            this.x-=21;
            this.flipX=true;
            this.body.velocity.x= - scene.Bullet_Speed;
        }



        //time events for showing muzzel flash and blinking bullet
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
                        
                        if(this.tintFill){
                            this.tintFill = false;
                            
                        }
                        else{
                            this.setTintFill(0xFFFFFF); 
                            
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

                this.stream.destroy();
                scene.time.removeEvent(this.blinkBullet);
                scene.time.removeEvent(this.blinking);
                this.destroy(); 
            },
            callbackScope: this 
        });


    }
    update(){
        //logic for stream follow
        if(this.stream.flipX==true){
        this.stream.x=this.x - 80;}
        else{
        this.stream.x=this.x + 80;}

        //logic for bullet looping through screen
        if(this.x < 0){
            this.x = 800;
        }
        else if(this.x > 800){
            this.x = 0;
        }
    }

    bulletContact(){
        console.log("bullet contact");
        this.remainingPeirces--;
        console.log(this.remainingPeirces);

        if(this.remainingPeirces <= 0){
            this.stream.destroy();
            this.scene.time.removeEvent(this.blinkBullet);
            this.scene.time.removeEvent(this.blinking);
            this.destroy(); 
        }

    }

}