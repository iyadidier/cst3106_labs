// yatzyEngine.js
class YatzyEngine {
    constructor() {
        this.scores = {
            threeOfAKind: null,
            fourOfAKind: null,
            fullHouse: null,
            smallStraight: null,
            largeStraight: null,
            yatzy: null,
            chance: null
        };
    }

    calculateScore(category, diceValues) {
        switch (category) {
            case 'threeOfAKind':
                return this.isThreeOfAKind(diceValues) ? this.getTotal(diceValues) : 0;
            case 'fourOfAKind':
                return this.isFourOfAKind(diceValues) ? this.getTotal(diceValues) : 0;
            case 'fullHouse':
                return this.isFullHouse(diceValues) ? 25 : 0;
            case 'smallStraight':
                return this.isSmallStraight(diceValues) ? 30 : 0;
            case 'largeStraight':
                return this.isLargeStraight(diceValues) ? 40 : 0;
            case 'yatzy':
                return this.isYatzy(diceValues) ? 50 : 0;
            case 'chance':
                return this.getTotal(diceValues);
            default:
                return 0;
        }
    }

    isValidSelection(category, diceValues) {
        // You can implement validation logic here
        return this.scores[category] === null;
    }

    // Scoring helper methods
    isThreeOfAKind(diceValues) {
        return this.hasMatchingDice(diceValues, 3);
    }

    isFourOfAKind(diceValues) {
        return this.hasMatchingDice(diceValues, 4);
    }

    isFullHouse(diceValues) {
        const counts = this.getCounts(diceValues);
        return Object.values(counts).includes(3) && Object.values(counts).includes(2);
    }

    isSmallStraight(diceValues) {
        return [1, 2, 3, 4].every(value => diceValues.includes(value)) ||
               [2, 3, 4, 5].every(value => diceValues.includes(value)) ||
               [3, 4, 5, 6].every(value => diceValues.includes(value));
    }

    isLargeStraight(diceValues) {
        return [1, 2, 3, 4, 5].every(value => diceValues.includes(value)) ||
               [2, 3, 4, 5, 6].every(value => diceValues.includes(value));
    }

    isYatzy(diceValues) {
        return new Set(diceValues).size === 1;
    }

    getCounts(diceValues) {
        return diceValues.reduce((acc, value) => {
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    }

    hasMatchingDice(diceValues, count) {
        const counts = this.getCounts(diceValues);
        return Object.values(counts).some(value => value >= count);
    }

    getTotal(diceValues) {
        return diceValues.reduce((sum, value) => sum + value, 0);
    }
}

export default YatzyEngine; // Export the YatzyEngine class
