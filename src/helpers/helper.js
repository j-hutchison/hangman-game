export const checkWin = (answer, wrongGuesses, correctGuesses) => {
	const answerSet = new Set(answer.split(""));
	const wrongCharacterSet = new Set(wrongGuesses);
	const correctCharacterSet = new Set(correctGuesses);

	if (wrongCharacterSet.size > 5) {
		return "lose";
	}

	if (correctCharacterSet.size < answerSet.size) {
		return "inprogress";
	}

	for (let char in answerSet) {
		if (!correctCharacterSet.includes(char)) {
			return "inprogress";
		}
	}

	return "win";
};
