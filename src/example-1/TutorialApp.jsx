import { useMemo } from "react";
import { Board } from "./Board.jsx";
import { Game } from "./Game.jsx";
const containerStyle = {
    width: "100vw",
    height: "100vh",
    border: "1px solid gray",
};
/**
 * The Chessboard Tutorial Application
 */
export const TutorialApp = () => {
    const game = useMemo(() => new Game(), []);
    return (
        <div style={containerStyle}>
            <Board game={game} />
        </div>
    );
};
