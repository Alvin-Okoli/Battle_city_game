import Phaser, { Physics } from "phaser";
import { useNavigate } from 'react-router-dom'

import LoadingScene from "./Scenes/LoadingScene";
import BattleCity from "./Scenes/BattleCity";
import { use, useContext, useEffect, useRef } from "react";
import { ScoreContext } from "../providers/AuthProvider";

export default function Game({parent, width= 550, height= 1000}) {
    const navigate = useNavigate();
    const gameContainer = useRef(null);
    const {setScore} = useContext(ScoreContext)

    useEffect(()=>{
        const game = new Phaser.Game({
            type: Phaser.AUTO,
            width,
            height,
            parent: gameContainer.current,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
            scene: [ LoadingScene, BattleCity],
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
            },
            // Pass navigate to scenes
            callbacks: {
                postBoot: (game)=> {
                    game.scene.keys.BattleCity.navigate = navigate;
                    game.playerScore = setScore;
                }
            }
        });

        return () => {
            game.destroy(true);
        }
    }, [navigate])

    return <div
        ref={gameContainer}
        style={{
                height: "800px",
            }}
        />
};
