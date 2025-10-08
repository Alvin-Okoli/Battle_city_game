export default class LoadingScene extends Phaser.Scene{
    constructor(){
        super({key: 'LoadingScene'});
    }

    preload(){
        console.log("Loading Scene");
        console.log(this.game.config.width)
        this.load.image('bg', './assets/wallpaper.jpeg');
        this.load.image('player', './assets/player tank.png');
        this.load.image('block', './assets/iron_block.png');
        this.load.image('enemyTank', './assets/enemy tank.png');
    }

    create(){
        this.add.image(280, 350, 'bg').setScale(1.4, 2);
        this.time.delayedCall(1000, ()=>{this.scene.start('BattleCity');})
    }
}
