// dice.js
class Dice {
    constructor(numDice = 5) {
        this.numDice = numDice; // Number of dice
        this.values = Array(numDice).fill(1); // Initialize dice values
    }

    roll() {
        // Roll each die and update values
        for (let i = 0; i < this.numDice; i++) {
            this.values[i] = Math.floor(Math.random() * 6) + 1; // Roll a die (1-6)
        }
        return this.values;
    }

    getValues() {
        return this.values; // Return current values of the dice
    }
}

export default Dice; // Export the Dice class
