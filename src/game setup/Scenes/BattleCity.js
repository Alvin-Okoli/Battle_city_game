export default class BattleCity extends Phaser.Scene {
    constructor() {
        super({ key: 'BattleCity' });
    }

    preload(){
        this.load.image('player', 'assets/player tank.png');
        this.load.image('block', 'assets/Red Brick Wall.jpeg');
        this.load.image('ironBlock', 'assets/iron_block.png');
        this.load.image('enemyTank', 'assets/enemy tank.png');
    }

    init(){
        this.cameras.main.setBackgroundColor('000000')
    }

    create(){
        this.player = this.physics.add.sprite(this.game.config.width/2, this.game.config.height-100, 'player').setScale(0.5);
        this.enemyTank = this.physics.add.sprite(this.game.config.width/2, this.game.config.height-900, 'enemyTank').setScale(0.5).setAngle(180);
        this.block = this.physics.add.sprite(this.game.config.width/2, this.game.config.height-400, 'block').setScale(0.2);
    }
}


