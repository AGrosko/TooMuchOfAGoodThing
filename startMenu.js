class startMenu extends Phaser.Scene{
    constructor(){
        super("startMenu");
    }

    create(){

        this.backGround = this.add.image(0,0, "Background");
        this.backGround.setOrigin(0,0);
        this.backGround.setScale(1.67);

       
       this.text =  this.add.text(280,100, "Too Much of a Good Thing");

        this.highScore = parseInt(localStorage.getItem('total_score')) || 0;

        this.highScoreText = "High Score: " + this.zeroPad(this.highScore, 6);

        this.add.text( 300, 200,
            this.highScoreText

        );

        this.add.text(280, 300,
            "(Press Space to Start)"
        );

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



        
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.scene.start("Playing");
        }
    }
    

    zeroPad(number, size){
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2)){
          stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }   

}