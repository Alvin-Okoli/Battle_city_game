export default class LoadingScene extends Phaser.Scene{
    constructor(){
        super({key: 'LoadingScene'});
    }

    preload(){
        this.load.image('bg', 'assets/wallpaper.jpeg');
        this.load.image('player', 'assets/player tank.png');
        this.load.image('block', 'assets/Red Brick Wall.jpeg');
        this.load.image('ironBlock', 'assets/iron_block.png');
        this.load.image('enemyTank', 'assets/enemy tank.png');
        this.load.image('bullet', 'assets/bullet.png');
    }

    create(){
        this.add.image(280, 350, 'bg').setScale(1.4, 2);
        this.time.delayedCall(1000, ()=>{this.scene.start('BattleCity');})
    }
}