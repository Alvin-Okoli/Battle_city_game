import Phaser from 'phaser';

export default class BattleCity extends Phaser.Scene {
    constructor() {
        super({ key: 'BattleCity' });
    }

    init(){
        this.cameras.main.setBackgroundColor('000000')
    }

    enviromentSetup(positionx, positiony, loopy, space = 0, scaleX=0.1, scaleY=0.2){        
        for(let i=0; i<loopy; i++){
            let cuurentSpace = space * i;
            this.physics.add.sprite(positionx, positiony + cuurentSpace, 'block').setScale(scaleX, scaleY);
        }
    }

    create(){
        // enviroment Setup

        //first wall
        let topGap = 450;
        for(let i=0; i<5; i++){
            this.enviromentSetup(this.game.config.width - topGap, this.game.config.height-850, 3, 60);
            topGap-=120;
        }

        //second wall
        let secondGap = 0;
        for(let i=0; i<2; i++){
            this.enviromentSetup(340 + secondGap, this.game.config.height-550, 1, 100);
            secondGap-=120;
        }        

        // third wall
        let middleGaP = 330;
        for(let i=0; i<2; i++){
            this.enviromentSetup(this.game.config.width - middleGaP, this.game.config.height-400, 2, 60);
            middleGaP-=120;
        }

        //fourth wall

        //iron blocks
        //top Iron brick
        this.ironBlock = this.add.sprite(this.game.config.width/2+5, this.game.config.height-800, 'ironBlock').setScale(0.25);
        //left Iron brick
        this.ironBlock = this.add.sprite(this.game.config.width, this.game.config.height/2, 'ironBlock').setScale(0.25).setOrigin(1,0.5);
        //right Iron brick
        this.ironBlock = this.add.sprite(0, this.game.config.height/2, 'ironBlock').setScale(0.25).setOrigin(0,0.5);

        // sprites
        // player sprites
        this.player = this.physics.add.sprite(this.game.config.width/2, this.game.config.height-100, 'player').setScale(0.5);

        // player controls
        this.player.setInteractive({draggable: true})
        this.player.on('drag', (pointer, dragX, dragY)=>{
            this.player.x = dragX;
            if(this.player.x === 5){
                this.player.x = 5;
            }
            if(this.player.x === this.game.config.width - 5){
                this.player.x = this.game.config.width - 5;
            }
            this.player.y = dragY;
            if(this.player.y=== 5){
                this.player.y=5;
            }
            if(this.player.y === this.game.config.height - 5){
                this.player.y = this.game.config.height - 5;
            }
        })        
        

        // enemy sprites
        this.enemyTank = this.physics.add.sprite(this.game.config.width/2, this.game.config.height-900, 'enemyTank').setScale(0.5).setAngle(180);
        
    }
}


