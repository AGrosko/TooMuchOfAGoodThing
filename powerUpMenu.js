class powerUpMenu extends Phaser.Scene{

    constructor(){
        super("powerUpMenu");

    }
    create(){

        this.backGround = this.add.image(0,0, "Background");
        this.backGround.setOrigin(0,0);
        this.backGround.setScale(1.67);

        this.add.text(330, 100, "Select a Power Up");

        this.add.text(210, 300, "(Left)");
        this.add.text(360, 300, "(Space)");
        this.add.text(510, 300, "(Right)");


        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursors = this.input.keyboard.createCursorKeys();

    }


    update(){
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            console.log("Space Pressed");
            this.scene.stop();
            this.scene.resume("Playing");

        }
        if (this.cursors.left.isDown){
            console.log("Left pressed");
        }
        if (this.cursors.right.isDown){
            console.log("Right pressed");
        }
    }




}