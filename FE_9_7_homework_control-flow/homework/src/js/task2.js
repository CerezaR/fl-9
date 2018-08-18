if (confirm('Do you want to play a game?')) {
	let play = true;
	const firstPrize = 10;
	const firstRange = 5;
	const attempts = 3;
	let winning = 0;
	let prize = firstPrize;
	let range = firstRange;
	let num, usersNum, currentPrize;
	while (play) {
		play = false;
		num = getNumber(range);
		console.log(num);
		currentPrize = prize;
		for (let currentAttempt = 1; currentAttempt <= attempts; currentAttempt++) {
			usersNum = parseFloat(prompt(result(range, attempts - currentAttempt, prize, currentPrize), ''));
			if (usersNum === num) {
				winning += currentPrize;
				if (confirm(`Congratulation! Your prize is: ${winning}$. Do you want to continue?`)) {
          prize *= 3;
          range *= 2;
          play = true;
          break;
        } else {
						alert(`Thank you for a game. Your prize is: ${winning}$`);
						break;
				}
			} else if (currentAttempt < attempts) {
					currentPrize = Math.floor(currentPrize / 2)
			} else if (currentAttempt === attempts) {
					alert(`Thank you for a game. Your prize is: ${winning}$`);
					if (confirm('Do you want to play again?')) {
						prize = firstPrize;
						range = firstRange;
						winning = 0;
						play = true;
						break;
					} else {
							break;
				}
			}
		}
	}
} else {
	alert('You did not become a millionaire, but can.');
}

function getNumber(range) {
	return Math.floor(Math.random() * ++range);
}

function result(range, attemptsLeft, prize, currentPrize) {
	return `  Enter a number from 0 to ${range}
  Attempts left: ${attemptsLeft}
  Total prize: ${prize}$
  Possible prize on current attempt: ${currentPrize}$`;
}