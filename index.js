const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const { solvePuzzle, getIterationTree } = require('./solver');


const app = express();
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.send('Welcome, Puzzle solver API!');
});

app.post('/api/solve', async (req, res) => {
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
