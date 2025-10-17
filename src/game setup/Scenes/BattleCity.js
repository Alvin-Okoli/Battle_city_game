import Phaser from 'phaser';

export default class BattleCity extends Phaser.Scene {
    constructor() {
        super({ key:'BattleCity' });

        this.speed = 200
    }

    init(){
        this.cameras.main.setBackgroundColor('000000');
    }

    blockSetup(positionx, positiony, loopy, space = 0, scaleX=0.1, scaleY=0.2){        
        for(let i=0; i<loopy; i++){
            let cuurentSpace = space * i;
            const block = this.physics.add.sprite(positionx, positiony + cuurentSpace, 'block').setScale(scaleX, scaleY);
            this.blockGroup.add(block);
        }
    }

    ironBlockSetup({x = this.game.config.width, y = this.game.config.height, setOriginx= 1, setOriginy = 0.5}){
        const block = this.physics.add.sprite(x, y, 'ironBlock').setScale(0.25).setOrigin(setOriginx, setOriginy);
        this.ironBlockGroup.add(block);
    }

    createEnemy({x=this.game.config.width/2, y=this.game.config.height-900}){
        const enemy = this.enemyTank = this.physics.add.sprite(x, y, 'enemyTank').setScale(0.5).setAngle(180);
        enemy.setData({
            nextTurn: 0,
            speed: 160,
            direction: 'down',
            health: 3
        })
        enemy.bullet = this.physics.add.group();
        this.enemyGroup.add(enemy)
    }

    changeDirection(enemy){
        const direction = ['down', 'up', 'right', 'left']
        let newDirection = direction[Phaser.Math.Between(0, 3)]
        enemy.setData('direction', newDirection)
    }

    create(){
        // GROUPS
        this.blockGroup = this.physics.add.group({immovable: true});
        this.ironBlockGroup = this.physics.add.group({immovable: true})
        this.playerBulletGroup = this.physics.add.group();
        this.enemyGroup = this.physics.add.group({collideWorldBounds: true})
        this.enemyBulletGroup = this.physics.add.group()

        // enviroment Setup   

        // RED BLOCKS
        //first wall
        let topGap = 450;
        for(let i=0; i<5; i++){
            this.blockSetup(this.game.config.width - topGap, this.game.config.height-850, 3, 60);
            topGap-=120;
        }

        //second wall
        let secondGap = 0;
        for(let i=0; i<2; i++){
            this.blockSetup(340 + secondGap, this.game.config.height-550, 1, 100);
            secondGap-=120;
        }        

        // third wall
        let middleGaP = 330;
        for(let i=0; i<2; i++){
            this.blockSetup(this.game.config.width - middleGaP, this.game.config.height-350, 2, 60);
            middleGaP-=120;
        }

        //fourth wall

        //IRON BLOCKS
        const ironBlockArray = [
            {
                    x: 318,
                    y: this.game.config.height-800
                },
                {
                    x: this.game.config.width,
                    y: this.game.config.height/2,
                    setOriginx: 1,
                    setOriginy: 0.5,
                },
                {
                    x: 0,
                    y: this.game.config.height/2,
                    setOriginx: 0,
                    setOriginy: 0.5,
                }
        ]
        console.log(ironBlockArray[1].x)
        for(let i =0; i<3; i++){
            this.ironBlockSetup(ironBlockArray[i])
        }

        // SPRITES

        // player sprites
        this.player = this.physics.add.sprite(this.game.config.width/2, this.game.config.height-100, 'player').setScale(0.5);
        this.player.setCollideWorldBounds(true);
        this.player.setBodySize(80, 120, true);
        this.player.angleFacing = 0;

        // Target position (start as current player position)
        this.target = new Phaser.Math.Vector2(this.player.x, this.player.y);

        // Listen for pointer (click or tap)
        this.input.on('pointerdown', (pointer) => {
        // Set the new target position to where the user clicked
        this.target.set(pointer.x, pointer.y);
        });

        //bullet
        this.time.addEvent({
            delay: 400,
            callback:()=>{
                const rad = Phaser.Math.DegToRad(this.player.angleFacing);
                const speed = 400;

                // spawn bullet slightly in front of tank
                // const offsetX = Math.cos(rad); 
                // const offsetY = Math.sin(rad);

                const bullet = this.physics.add.sprite(this.player.x, this.player.y, 'bullet').setScale(0.1, 0.03);

                bullet.rotation = rad;
                bullet.angleFacing = this.player.angleFacing;
                bullet.body.setSize(100, 0.2)

                // this.physics.velocityFromRotation(40, speed, bullet.body.velocity);
                this.playerBulletGroup.add(bullet);
            },
            loop: true
        })

        // enemy sprites
        this.enemyTank1 = this.createEnemy({});
        this.enemyTank2 = this.createEnemy({x:this.game.config.width-50, y:this.game.config.height-900});
        this.enemyTank3 = this.createEnemy({x:50, y:this.game.config.height-900});
        // this.physics.add.world.on('worldbounds', ()=>{

        // })

        // COLLISIONS
        // Collision to red blocks
        this.physics.add.collider(this.blockGroup, this.player);
        this.physics.add.collider(this.blockGroup, this.enemyGroup, (block, enemy)=>{
            this.changeDirection(enemy)
        });
        this.physics.add.collider(this.blockGroup, this.playerBulletGroup, (block, bullet)=>{
            bullet.destroy();
        })

        // Collision to iron blocks
        this.physics.add.collider(this.ironBlockGroup, this.player)
        this.physics.add.collider(this.ironBlockGroup, this.enemyGroup, (block, enemy)=>{
            this.changeDirection(enemy)
        })
        this.physics.add.collider(this.ironBlockGroup, this.playerBulletGroup, ( block, bullet)=>{
            bullet.destroy();
        })

        //  Collision to Bullet and sprites
        this.physics.add.collider(this.playerBulletGroup, this.enemyGroup, (bullet, tank)=>{
            bullet.destroy();
            tank.destroy();
            this.createEnemy({x:Math.abs(Math.random()* this.game.config.width), y:this.game.config.height-950})
        })
    }

    update(time, delta) {
        // Move player towards target position
        const moveSpeed = this.speed

        this.distanceX = this.target.x - this.player.x;        
        this.distanceY = this.target.y - this.player.y;

        this.player.body.setVelocity(0);
        
        if(Math.abs(this.distanceX)>20){
            if(this.distanceX > 0){
                // move right
                this.player.body.setVelocityX(this.speed);
                this.player.rotation = Phaser.Math.DegToRad(90);
                this.player.angleFacing = 90;
            }
            else if(this.distanceX < 0){
                // move right
                this.player.body.setVelocityX(-this.speed);
                this.player.rotation = Phaser.Math.DegToRad(-90);
                this.player.angleFacing = -90;
            }
        }

        else if(Math.abs(this.distanceY) > 20){
            if(this.distanceY > 0){
                // // move down
                this.player.setVelocityY(moveSpeed);
                this.player.rotation = Phaser.Math.DegToRad(180);
                this.player.angleFacing = 180;
            }
            else if(this.distanceY < 0){
                // move up
                this.player.body.setVelocityY(-moveSpeed);
                this.player.rotation = Phaser.Math.DegToRad(0);
                this.player.angleFacing = 0;
            }
        }

        // Player bullet group
        // bullet movement
        this.playerBulletGroup.children.each(function(bullet){
            if(bullet.angleFacing === -90){
                bullet.body.setVelocityX(-200)
            }
            else if(bullet.angleFacing === 90){
                bullet.body.setVelocityX(200)
            }
            else if(bullet.angleFacing === 0){
                bullet.body.setVelocityY(-200)
            }
            else if(bullet.angleFacing === 180){
                bullet.body.setVelocityY(200)
            }

            // bullet clean up
            if(
                bullet.x < 0 || bullet.x > this.game.config.width ||
                bullet.y < 0 || bullet.y > this.game.config.height
            ){
                bullet.destroy();
            }
        }, this);

        // Enemy Sprites
        this.enemyGroup.children.each(function(enemy){

            let enemyNextTurn = enemy.getData('nextTurn')

            // movement logic       
            if(time > enemyNextTurn){
                // reset speed
                enemy.setVelocity(0, 0) 
                // Change direction for this specific enemy
                this.changeDirection(enemy);
                // get direction for this specific enemy
                const direction = enemy.getData('direction')
                // get speed for this specific enemy
                const speed = enemy.getData('speed')

                if(direction === 'down'){
                    enemy.rotation = Phaser.Math.DegToRad(180)
                    enemy.setVelocityY(speed)
                }
                else if(direction === 'up'){
                    enemy.rotation = Phaser.Math.DegToRad(0)
                    enemy.setVelocityY(-speed)
                }
                else if(direction === 'right'){
                    enemy.rotation = Phaser.Math.DegToRad(90)
                    enemy.setVelocityX(speed)
                }
                else if(direction === 'left'){
                    enemy.rotation = Phaser.Math.DegToRad(-90)
                    enemy.setVelocityX(-speed)
                }
                enemy.setData('nextTurn', time + Phaser.Math.Between(1000, 3000))

            // enemy shooting
            const bullet = enemy.bullet.create(enemy.x, enemy.y, 'bullet').setScale(0.1, 0.03);
            const dir = enemy.getData('direction');
            if (dir === 'up') bullet.setVelocityY(-300);
            else if (dir === 'down') bullet.setVelocityY(300);
            else if (dir === 'left') bullet.setVelocityX(-300);
            else if (dir === 'right') bullet.setVelocityX(300);
            }
        }, this)
    }
}
