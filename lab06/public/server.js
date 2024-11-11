const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Game state endpoint (example)
app.get('/game', (req, res) => {
    // Example game state
    const gameState = {
        rollCount: 3,
        scores: {
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
        }
    };
    res.json(gameState);
});

// Reset game state
app.post('/game/reset', (req, res) => {
    // Reset the game state here
    res.json({ message: 'Game reset!' });
});

// Start server on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
