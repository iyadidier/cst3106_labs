$(document).ready(function() {
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
            $('#rollButton').text(`Roll Dice (${rollCount} Rolls Left)`);
        })
        .catch(error => console.error('Error fetching game state:', error));

    $('#rollButton').on('click', rollDice);
    $('#restartButton').on('click', restartGame);

    function rollDice() {
        if (rollCount > 0) {
            rollCount--;
            $('#rollButton').text(`Roll Dice (${rollCount} Rolls Left)`);
            
            // Rolling animation
            $('.dice').each(function(index) {
                $(this).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            });

            // Wait for the animation to complete, then display random values
            setTimeout(function() {
                const diceValues = [];
                $('.dice').each(function(index) {
                    const dieValue = Math.floor(Math.random() * 6) + 1;
                    $(this).text(dieValue);
                    diceValues.push(dieValue);
                });

                // Calculate the scores based on the rolled dice
                calculateScores(diceValues);
                updateTotalScore();
                updateGameState();
            }, 400); // This time matches the duration of the animation

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
        $('#scoreOnes').text(scores.ones);
        $('#scoreTwos').text(scores.twos);
        $('#scoreThrees').text(scores.threes);
        $('#scoreFours').text(scores.fours);
        $('#scoreFives').text(scores.fives);
        $('#scoreSixes').text(scores.sixes);
        $('#scoreThreeOfAKind').text(scores.threeOfAKind);
        $('#scoreFourOfAKind').text(scores.fourOfAKind);
        $('#scoreFullHouse').text(scores.fullHouse);
        $('#scoreSmallStraight').text(scores.smallStraight);
        $('#scoreLargeStraight').text(scores.largeStraight);
        $('#scoreChance').text(scores.chance);
        $('#scoreYatzy').text(scores.yatzy);
    }

    function updateTotalScore() {
        let total = Object.values(scores).reduce((acc, score) => acc + score, 0);
        $('#totalScore').text(total);
    }

    function updateGameState() {
        fetch('/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rollCount, scores })
        })
        .then(response => response.json())
        .catch(error => console.error('Error updating game state:', error));
    }

    function restartGame() {
        rollCount = 3;
        scores = {
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
        updateScorecard();
        updateTotalScore();
        $('#rollButton').text(`Roll Dice (${rollCount} Rolls Left)`);
    }
});
