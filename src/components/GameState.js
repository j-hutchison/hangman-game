import React, { useEffect } from "react";
import { checkWin } from "../helpers/helper";
import styles from "./GameState.module.css";

const GameState = ({
	setIsPlaying,
	answer,
	gameState,
	setGameState,
	wrongGuesses,
	correctGuesses,
	resetGame,
}) => {
	useEffect(() => {
		const gameState = checkWin(answer, wrongGuesses, correctGuesses);
		if (gameState !== "inprogress") {
			setIsPlaying(() => false);
			setGameState(() => gameState);
		}
	}, [wrongGuesses, correctGuesses, answer, setIsPlaying, setGameState]);

	return (
		<div
			className={
				gameState === "inprogress"
					? `${styles["gamestate"]} ${styles["hide"]}`
					: `${styles["gamestate"]} ${styles["show"]}`
			}
		>
			<h1>
				{gameState === "win" && "Congratulations! You win!"}
				{gameState === "lose" && "You Lose! Try Again?"}
			</h1>
			<button onClick={resetGame}>Play Again</button>
		</div>
	);
};

export default GameState;
