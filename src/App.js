import { useState, useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import "./App.css";
import Canvas from "./components/canvas";
import useGlobalState from "./hooks/use-global-state";

function App() {
	const ANSWER_DECK = [
		"COLOMBIA",
		"JAMAICA",
		"SWITZERLAND",
		"AUSTRALIA",
		"ARGENTINA",
		"MEXICO",
		"MOZAMBIQUE",
	];

	/* Global event listeners are created at initial render and do not get updates to state on rerender, refs can be used to store updates and give access to event listeners */
	const answerState = useGlobalState("");
	const { value: answer, setState: setAnswer } = answerState;

	const letterState = useGlobalState([{ letter: "", show: false }]);
	const { value: letterArray, setState: setLetterArray } = letterState;

	const winnerState = useGlobalState(false);
	const { value: winner, setState: setWinner } = winnerState;
	const loserState = useGlobalState(false);
	const { value: loser, setState: setLoser } = loserState;

	const [wrongGuesses, _setWrongGuesses] = useState([]);
	const wrongGuessesRef = useRef(wrongGuesses);
	const setWrongGuesses = (data) => {
		const updatedArray = [...wrongGuessesRef.current, data];
		wrongGuessesRef.current = updatedArray;
		_setWrongGuesses(updatedArray);
	};

	const [correctGuesses, _setCorrectGuesses] = useState([]);
	const correctGuessesRef = useRef(correctGuesses);
	const setCorrectGuesses = (data) => {
		const updatedArray = [...correctGuessesRef.current, data];
		correctGuessesRef.current = updatedArray;
		_setCorrectGuesses(updatedArray);
	};

	//TODO - UPDATE TO STILL RUN ON INITIAL RENDER ONLY BUT ALSO W NECESSARY DEPENDENCIES
	useEffect(() => {
		const randomAnswer =
			ANSWER_DECK[Math.floor(Math.random() * ANSWER_DECK.length)];

		const letterArray = randomAnswer.split("").map((letter) => ({
			letter: letter,
			show: false,
		}));
		setAnswer(randomAnswer);
		setLetterArray(letterArray);

		window.addEventListener("keydown", handleKeyboardInput);

		return () => {
			window.removeEventListener("keydown", handleKeyboardInput);
		};
	}, []);

	const handleKeyboardInput = (e) => {
		if (!loser.current && !winner.current) {
			const input = e.key;
			console.log(`User Input: ${e.key}`);

			if (
				!answer.current.toLowerCase().includes(input) &&
				!wrongGuessesRef.current.includes(input)
			) {
				setWrongGuesses(input);
				console.log(`${answer.current} does not contain ${input}`);
				if (wrongGuessesRef.current.length > 5) {
					setLoser(true);
				}
			}
			if (
				answer.current.toLowerCase().includes(input) &&
				!correctGuessesRef.current.includes(input)
			) {
				setCorrectGuesses(input);

				const updatedResults = letterArray.current.map((el) => {
					if (input.toLowerCase() === el.letter.toLowerCase()) {
						return { ...el, show: true };
					}
					return { ...el };
				});

				setLetterArray(updatedResults);
				console.log(`${answer.current} contains ${input}`);

				let letterState = true;
				for (let letter of letterArray.current) {
					if (!letter.show) letterState = false;
				}
				letterState && setWinner(true);
			}
		}
	};

	return (
		<div className="app">
			<header>
				<h1 className="primary-heading">Hangman</h1>
				<p className="primary-description">
					Find the hidden word - Enter a letter
				</p>
				<div className="result">
					{loser.current ? <h1>You LOSE!</h1> : ""}
					{winner.current ? <h1>You WIN!</h1> : ""}
				</div>
			</header>
			<main className="game">
				<div className="game-presentation">
					<Canvas wrongGuesses={wrongGuessesRef.current} />
					<aside className="game-wrong-letters">
						<h2>Wrong Letters</h2>
						<span>{wrongGuessesRef.current.join(", ")}</span>
					</aside>
				</div>
				<div className="game-answer">
					{letterArray.current.map((el) => {
						return loser.current || el.show ? (
							<span className="game-answer-letter">{el.letter}</span>
						) : (
							<span className="game-answer-letter hidden"></span>
						);
					})}
				</div>
			</main>
		</div>
	);
}

export default App;
