// yatzyGame.js
import Dice from './dice.js';
import YatzyEngine from './yatzyEngine.js';

class YatzyGame {
    constructor() {
        this.currentPlayer = 0;
        this.currentRound = 1;
        this.totalScore = 0;
        this.dice = new Dice();
        this.engine = new YatzyEngine();
    }

    startNewGame() {
        this.currentPlayer = 0;
        this.currentRound = 1;
        this.totalScore = 0;
        this.dice = new Dice();
        this.engine = new YatzyEngine();
        // Initialize other necessary states
    }

    endTurn() {
        // Logic for ending the turn and switching players
        this.currentPlayer = (this.currentPlayer + 1) % 2; // Assuming two players
        this.currentRound++;
    }

    endGame() {
        // Logic for determining the winner based on total scores
        // Display results
    }

    rollDice() {
        return this.dice.roll();
    }

    calculateScore(category) {
        const diceValues = this.dice.getValues();
        const score = this.engine.calculateScore(category, diceValues);
        this.engine.scores[category] = score; // Save score in the engine
        this.totalScore += score; // Update total score
        return score;
    }
}

export default YatzyGame; // Export the YatzyGame class
