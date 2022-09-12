import React from "react";
import styles from "./Word.module.css";

const Word = (props) => {
	return props.answer
		.toLowerCase()
		.split("")
		.map((letter) => {
			return props.correctGuesses.join("").toLowerCase().includes(letter) ? (
				<span className="game-answer-letter">{letter}</span>
			) : (
				<span className="game-answer-letter hidden"></span>
			);
		});
};

export default Word;
