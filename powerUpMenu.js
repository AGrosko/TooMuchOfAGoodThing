class powerUpMenu extends Phaser.Scene{

    constructor(){
        super("powerUpMenu");
        
    }
    create(powerUpOptions){

        this.ready = false;
        this.backGround = this.add.image(0,0, "Background");
        this.backGround.setOrigin(0,0);
        this.backGround.setScale(1.67);

        this.add.text(330, 100, "Select a Power Up");

        this.add.text(70,200, '['+ powerUpOptions[0] +']');
        this.add.text(320,200, '['+ powerUpOptions[1] +']');
        this.add.text(575,200, '['+ powerUpOptions[2] +']');

        this.add.text(100, 300, "(Left)");
        this.add.text(360, 300, "(Space)");
        this.add.text(600, 300, "(Right)");

        console.log(powerUpOptions);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.ready = true;
            },
            callbackScope: this

        });


    }


    update(){

        if(this.ready){

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            console.log("Space Pressed");
            this.scene.resume("Playing",1);
            this.scene.stop();
        }
        if (Phaser.Input.Keyboard.JustDown(this.leftKey)){
            console.log("Left pressed");
            this.scene.resume("Playing",0);
            this.scene.stop();

        }
        if (Phaser.Input.Keyboard.JustDown(this.rightKey)){
            console.log("Right pressed");
            this.scene.resume("Playing",2);
            this.scene.stop();

        }

    }
    }




}