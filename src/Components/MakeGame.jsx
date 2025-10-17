import { useRef, useEffect } from "react";
import Game from "../game setup/Game";

export default function MakeGame() {
    const gameRef = useRef(null);

    useEffect(()=>{
        const game = Game({parent: gameRef.current});

        return ()=>{
            game.destroy(true);
        }
    })

    return (
        <>
            {/* <div>Hello World!</div> */}
            <div
                ref={gameRef}
                style={{
                // width: "600px",
                height: "800px",
                // margin: "",
            }}/>
        </>
    )
};