import React from "react";
import styles from "./Header.module.css";

const Header = () => {
	return (
		<header>
			<h1 className={styles["primary-heading"]}>Hangman</h1>
			<p className={styles["primary-description"]}>
				Find the hidden word - Enter a letter
			</p>
		</header>
	);
};

export default Header;
