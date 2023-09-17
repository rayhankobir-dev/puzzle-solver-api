const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const { solvePuzzle, getIterationTree } = require('./solver');


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
    <h1>Welcome, Puzzle solver API!</h1>
    <p>Please read the documentation for API request</p>
    `);
});

app.post('/solve', async (req, res) => {
    const initialState = req.body.initialState;
    const solutionPath = solvePuzzle(initialState);
    const tree =  getIterationTree();

    if (solutionPath) {
        res.json({ success: true, totalStep: solutionPath.length, steps: solutionPath, tree:  tree});
    } else {
        res.json({ success: false, message: 'No solution found.' });
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running: ${port}`);
});
