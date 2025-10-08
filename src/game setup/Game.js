import Phaser, { Physics } from "phaser";

import LoadingScene from "./Scenes/LoadingScene";
import BattleCity from "./Scenes/BattleCity";

export default function Game({parent, width= 550, height= 1000}) {
    return new Phaser.Game({
        type: Phaser.AUTO,
        width,
        height,
        parent,
        physics: {
            default: 'arcade',
            arcade: {
                debug: true
            }
        },
        scene: [LoadingScene,  BattleCity],
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
        },
    });
};

//
