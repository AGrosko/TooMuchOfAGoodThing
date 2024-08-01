class deathMenu extends Phaser.Scene{

    constructor(){
        super("deathMenu");
    }

    //recieves score from playing scene
    init(data){
        this.score = data.score;
    }

    create(score){
        
        //adding the background
        this.backGround = this.add.image(0,0, "Background");
        this.backGround.setOrigin(0,0);
        this.backGround.setScale(1.67);

        //adding the text for death and scores. will display a message if player beat their highscore
        this.add.text(370,100,"You died"); 
    
        this.add.text(100, 200, 'Your Score: ' + this.score);

        this.highScore = parseInt(localStorage.getItem('total_score'))
        this.highScoreText = "High Score: " + this.zeroPad(this.highScore, 6);
        this.add.text( 500, 200,
            this.highScoreText
        );

        if (this.score == this.highScore){
            this.add.text(330, 250, "NEW HIGH SCORE!");
        }

        this.add.text(280, 300,
            "(Press Space to Restart)"
        );

        //adding input
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }


    update(){
        //restart game if spacebar is pressed
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.scene.launch("Playing");
            this.scene.stop();
        }
    }

    //adds [size] number of character to given number
    zeroPad(number, size){
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2)){
          stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }  
}