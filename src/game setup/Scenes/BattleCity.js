export default class BattleCity extends Phaser.Scene {
    constructor() {
        super({ key: 'BattleCity' });
    }

    init(){
        this.cameras.main.setBackgroundColor('000000')
    }

    create(){
        this.player = this.physics.add.sprite(this.game.config.width/2, this.game.config.height-100, 'player').setScale(0.5);
        this.enemyTank = this.physics.add.sprite(this.game.config.width/2, this.game.config.height-900, 'enemyTank').setScale(0.5).setAngle(180);
        this.block = this.physics.add.sprite(this.game.config.width/2, this.game.config.height-400, 'block').setScale(0.2);
        this.ironBlock = this.physics.add.sprite(this.game.config.width/4, this.game.config.height-400, 'ironBlock').setScale(0.4);
    }
}


