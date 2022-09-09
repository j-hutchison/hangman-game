import { useState, useEffect, useRef } from "react";
import "./App.css";
import Canvas from "./components/canvas";

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
	const [answer, _setAnswer] = useState({
		word: "",
		letterArray: [{ letter: "", show: false }],
	});
	const answerRef = useRef(answer);
	const setAnswer = (data) => {
		answerRef.current = data;
		_setAnswer(() => data);
	};

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
		setAnswer({ word: randomAnswer, letterArray: letterArray });

		window.addEventListener("keydown", handleKeyboardInput);

		return () => {
			window.removeEventListener("keydown", handleKeyboardInput);
		};
	}, []);

	const handleKeyboardInput = (e) => {
		console.log(e.key);
		const input = e.key;

		if (
			!answerRef.current.word.toLowerCase().includes(input) &&
			!wrongGuessesRef.current.includes(input)
		) {
			setWrongGuesses(input);
			console.log(`${answerRef.current.word} does not contain ${input}`);
		}
		if (
			answerRef.current.word.toLowerCase().includes(input) &&
			!correctGuessesRef.current.includes(input)
		) {
			setCorrectGuesses(input);

			const updatedResults = answerRef.current.letterArray.map((el) => {
				if (input.toLowerCase() === el.letter.toLowerCase()) {
					return { ...el, show: true };
				}
				return { ...el };
			});

			setAnswer({ word: answerRef.current.word, letterArray: updatedResults });

			console.log(`${answerRef.current.word} contains ${input}`);
		}

		console.log(`updated wrong array: ${wrongGuessesRef.current}`);
		console.log(`updated correct array: ${correctGuessesRef.current}`);
	};

	return (
		<div className="app">
			<header>
				<h1 className="primary-heading">Hangman</h1>
				<p className="primary-description">
					Find the hidden word - Enter a letter
				</p>
			</header>
			<main className="game">
				<div className="game-presentation">
					<Canvas wrongGuesses={wrongGuessesRef.current} />
					<aside className="game-wrong-letters">
						<h2>Wrong Letters</h2>
						<span>
							{wrongGuessesRef.current.map((letter) => {
								return <span>{letter}</span>;
							})}
						</span>
					</aside>
				</div>
				<div className="game-answer">
					{answer.letterArray.map((el) => {
						return el.show ? (
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
