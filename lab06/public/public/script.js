document.addEventListener('DOMContentLoaded', () => {
    let rollCount = 3;
    let scores = {
        ones: 0,
        twos: 0,
        threes: 0,
        fours: 0,
        fives: 0,
        sixes: 0,
        threeOfAKind: 0,
        fourOfAKind: 0,
        fullHouse: 0,
        smallStraight: 0,
        largeStraight: 0,
        chance: 0,
        yatzy: 0
    };

    // Fetch game state from the server when the page loads
    fetch('/game')
        .then(response => response.json())
        .then(data => {
            rollCount = data.rollCount;
            scores = data.scores;
            updateScorecard();
            document.getElementById('rollButton').innerText = `Roll Dice (${rollCount} Rolls Left)`;
        })
        .catch(error => console.error('Error fetching game state:', error));

    document.getElementById('rollButton').addEventListener('click', rollDice);
    document.getElementById('restartButton').addEventListener('click', restartGame);

    function rollDice() {
        if (rollCount > 0) {
            rollCount--;
            document.getElementById('rollButton').innerText = `Roll Dice (${rollCount} Rolls Left)`;
            const diceValues = [];

            // Roll the dice and update their values on the page
            for (let i = 1; i <= 5; i++) {
                const dieValue = Math.floor(Math.random() * 6) + 1;
                document.getElementById(`die${i}`).innerText = dieValue;
                diceValues.push(dieValue);
            }

            // Calculate the scores based on the rolled dice
            calculateScores(diceValues);
            updateTotalScore();

            // Send updated game state to the server
            updateGameState();
        } else {
            alert("No rolls left! Please restart the game.");
        }
    }

    function calculateScores(diceValues) {
        scores.ones = countOccurrences(diceValues, 1);
        scores.twos = countOccurrences(diceValues, 2);
        scores.threes = countOccurrences(diceValues, 3);
        scores.fours = countOccurrences(diceValues, 4);
        scores.fives = countOccurrences(diceValues, 5);
        scores.sixes = countOccurrences(diceValues, 6);

        scores.threeOfAKind = (hasMultiple(diceValues, 3)) ? sumArray(diceValues) : 0;
        scores.fourOfAKind = (hasMultiple(diceValues, 4)) ? sumArray(diceValues) : 0;
        scores.fullHouse = (isFullHouse(diceValues)) ? 25 : 0;
        scores.smallStraight = (hasStraight(diceValues, 4)) ? 30 : 0;
        scores.largeStraight = (hasStraight(diceValues, 5)) ? 40 : 0;
        scores.yatzy = (hasMultiple(diceValues, 5)) ? 50 : 0;
        scores.chance = sumArray(diceValues);

        updateScorecard();
    }

    function countOccurrences(array, value) {
        return array.filter(val => val === value).length * value;
    }

    function hasMultiple(array, count) {
        const occurrences = {};
        for (const num of array) {
            occurrences[num] = (occurrences[num] || 0) + 1;
        }
        return Object.values(occurrences).some(val => val >= count);
    }

    function isFullHouse(array) {
        const occurrences = {};
        for (const num of array) {
            occurrences[num] = (occurrences[num] || 0) + 1;
        }
        return Object.values(occurrences).includes(3) && Object.values(occurrences).includes(2);
    }

    function hasStraight(array, length) {
        const uniqueSorted = [...new Set(array)].sort((a, b) => a - b);
        for (let i = 0; i <= uniqueSorted.length - length; i++) {
            const straight = uniqueSorted.slice(i, i + length);
            if (straight[straight.length - 1] - straight[0] === length - 1) {
                return true;
            }
        }
        return false;
    }

    function sumArray(array) {
        return array.reduce((acc, val) => acc + val, 0);
    }

    function updateScorecard() {
        document.getElementById('scoreOnes').innerText = scores.ones;
        document.getElementById('scoreTwos').innerText = scores.twos;
        document.getElementById('scoreThrees').innerText = scores.threes;
        document.getElementById('scoreFours').innerText = scores.fours;
        document.getElementById('scoreFives').innerText = scores.fives;
        document.getElementById('scoreSixes').innerText = scores.sixes;
        document.getElementById('scoreThreeOfAKind').innerText = scores.threeOfAKind;
        document.getElementById('scoreFourOfAKind').innerText = scores.fourOfAKind;
        document.getElementById('scoreFullHouse').innerText = scores.fullHouse;
        document.getElementById('scoreSmallStraight').innerText = scores.smallStraight;
        document.getElementById('scoreLargeStraight').innerText = scores.largeStraight;
        document.getElementById('scoreChance').innerText = scores.chance;
        document.getElementById('scoreYatzy').innerText = scores.yatzy;
    }

    function updateTotalScore() {
        let total = Object.values(scores).reduce((acc, score) => acc + score, 0);
        document.getElementById('totalScore').innerText = total;
    }

    function updateGameState() {
        fetch('/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rollCount: rollCount,
                scores: scores
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Game state updated:", data);
        })
        .catch(error => console.error('Error updating game state:', error));
    }

    function restartGame() {
        rollCount = 3;
        scores = Object.fromEntries(Object.keys(scores).map(key => [key, 0]));
        document.getElementById('rollButton').innerText = `Roll Dice (${rollCount} Rolls Left)`;
        updateScorecard();
        document.getElementById('totalScore').innerText = '0';

        // Send the reset game state to the server
        fetch('/game/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rollCount: rollCount, scores: scores })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Game reset:", data);
        })
        .catch(error => console.error('Error resetting game:', error));
    }
});
