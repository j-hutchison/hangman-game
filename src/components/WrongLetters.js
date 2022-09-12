import React from "react";
import styles from "./WrongLetters.module.css";

const WrongLetters = (props) => {
	return (
		<aside className={styles["game-wrong-letters"]}>
			<h2>Wrong Letters</h2>
			<span>{props.wrongGuesses.join(", ")}</span>
		</aside>
	);
};

export default WrongLetters;
