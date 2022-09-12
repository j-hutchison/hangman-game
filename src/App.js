import { useState, useEffect } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import Header from "./components/Header";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Notification from "./components/Notification";
import Popup from "./components/GameState";
import GameState from "./components/GameState";

/* GLOBAL VARIABLES SET ON INITIATE */
const ANSWER_DECK = [
	"COLOMBIA",
	"JAMAICA",
	"SWITZERLAND",
	"AUSTRALIA",
	"ARGENTINA",
	"MEXICO",
	"MOZAMBIQUE",
];
const randomAnswer =
	ANSWER_DECK[Math.floor(Math.random() * ANSWER_DECK.length)];

function App() {
	/* Global event listeners are created at initial render and do not get updates to state on rerender, refs can be used to store updates and give access to event listeners */
	console.log(ANSWER_DECK);
	console.log(randomAnswer);

	const [isPlaying, setIsPlaying] = useState(true); // control the game status, is game accepting input
	const [showNotification, setShowNotification] = useState(false);
	const [answer, setAnswer] = useState(randomAnswer);

	const [gameState, setGameState] = useState("inprogress");

	const [wrongGuesses, setWrongGuesses] = useState([]);
	const [correctGuesses, setCorrectGuesses] = useState([]);

	const resetGame = () => {
		setIsPlaying(() => true);
		setAnswer(
			() => ANSWER_DECK[Math.floor(Math.random() * ANSWER_DECK.length)]
		);
		setWrongGuesses(() => []);
		setCorrectGuesses(() => []);
		setGameState(() => "inprogress");
	};

	useEffect(() => {
		const handleKeyboardInput = (e) => {
			const input = e.key;
			if (
				isPlaying &&
				((e.keyCode > 64 && e.keyCode < 91) ||
					(e.keyCode > 96 && e.keyCode < 123) ||
					e.keyCode === 8)
			) {
				console.log(`User Input: ${e.key}`);

				if (wrongGuesses.includes(input) || correctGuesses.includes(input)) {
					setShowNotification(() => true);
				}

				if (
					!answer.toLowerCase().includes(input.toLowerCase()) &&
					!wrongGuesses.join("").toLowerCase().includes(input.toLowerCase())
				) {
					setWrongGuesses([...wrongGuesses, input]);
				}
				if (answer.toLowerCase().includes(input)) {
					setCorrectGuesses([...correctGuesses, input]);
				}
			}
		};

		window.addEventListener("keydown", handleKeyboardInput);

		return () => {
			window.removeEventListener("keydown", handleKeyboardInput);
		};
	}, [correctGuesses, wrongGuesses, answer, isPlaying]);

	return (
		<div className="app">
			<Header />
			<main className="game">
				<div className="game-presentation">
					<Canvas wrongGuesses={wrongGuesses} />
					<WrongLetters wrongGuesses={wrongGuesses} />
				</div>
				<div className="game-answer">
					<Word answer={answer} correctGuesses={correctGuesses} />
				</div>
			</main>
			<Notification
				showNotification={showNotification}
				setShowNotification={setShowNotification}
			/>
			<GameState
				setIsPlaying={setIsPlaying}
				answer={answer}
				gameState={gameState}
				setGameState={setGameState}
				wrongGuesses={wrongGuesses}
				correctGuesses={correctGuesses}
				resetGame={resetGame}
			/>
		</div>
	);
}

export default App;
