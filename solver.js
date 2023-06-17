var iterationTree = null;

class Node {
    constructor(state, parent = null, cost = 0) {
        this.state = state;
        this.parent = parent;
        this.children = [];
        this.cost = cost;
        this.heuristic = this.calculateHeuristic();
        this.isSolutionPath = false;
    }

    calculateHeuristic() {
        let heuristic = 0;
        const goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0];

        for (let i = 0; i < this.state.length; i++) {
            if (this.state[i] !== goalState[i] && this.state[i] !== 0) {
                heuristic++;
            }
        }

        return heuristic;
    }

    calculateTotalCost() {
        return this.cost + this.heuristic;
    }
}

function printSolutionPath(node) {
    const path = [];

    if (node.parent === null) {
        path.push(node.state);
    } else {
        path.push(...printSolutionPath(node.parent));
        path.push(node.state);
    }

    return path;
}

function generateChildren(node) {
    const { state } = node;
    const emptyIndex = state.indexOf(0);
    const children = [];

    // move up
    if (emptyIndex > 2) {
        const newState = [...state];
        [newState[emptyIndex], newState[emptyIndex - 3]] = [
            newState[emptyIndex - 3],
            newState[emptyIndex],
        ];
        children.push(new Node(newState, node, node.cost + 1));
    }

    // move down
    if (emptyIndex < 6) {
        const newState = [...state];
        [newState[emptyIndex], newState[emptyIndex + 3]] = [
            newState[emptyIndex + 3],
            newState[emptyIndex],
        ];
        children.push(new Node(newState, node, node.cost + 1));
    }

    // move left
    if (emptyIndex % 3 !== 0) {
        const newState = [...state];
        [newState[emptyIndex], newState[emptyIndex - 1]] = [
            newState[emptyIndex - 1],
            newState[emptyIndex],
        ];
        children.push(new Node(newState, node, node.cost + 1));
    }

    // move right
    if ((emptyIndex + 1) % 3 !== 0) {
        const newState = [...state];
        [newState[emptyIndex], newState[emptyIndex + 1]] = [
            newState[emptyIndex + 1],
            newState[emptyIndex],
        ];
        children.push(new Node(newState, node, node.cost + 1));
    }

    return children;
}

function solvePuzzle(initialState) {
    iterationTree = { name: initialState.toString(), children: [] };

    const initialNode = new Node(initialState);
    const openSet = [initialNode];
    const closedSet = new Set();

    while (openSet.length > 0) {
        openSet.sort((a, b) => a.calculateTotalCost() - b.calculateTotalCost());
        const currentNode = openSet.shift();
        closedSet.add(currentNode.state.toString());

        if (currentNode.state.toString() === "1,2,3,4,5,6,7,8,0") {
            const solutionPath = printSolutionPath(currentNode);
            markSolutionPath(solutionPath);
            return solutionPath;
        }

        const children = generateChildren(currentNode);
        currentNode.children = children;
        const currentIterationNode = findNodeInIterationTree(
            iterationTree,
            currentNode.state.toString()
        );
        currentIterationNode.children = children.map((child) => ({
            name: child.state.toString(),
            children: [],
        }));

        for (const child of children) {
            if (!closedSet.has(child.state.toString())) {
                openSet.push(child);
                closedSet.add(child.state.toString());
            }
        }
    }

    return null;
}

function markSolutionPath(solutionPath) {
    for (const state of solutionPath) {
        const node = findNodeInIterationTree(iterationTree, state.toString());
        if (node) {
            node.isSolutionPath = true;
        }
    }
}

function findNodeInIterationTree(node, state) {
    if (node.name === state) {
        return node;
    } else {
        for (const child of node.children) {
            const foundNode = findNodeInIterationTree(child, state);
            if (foundNode) {
                return foundNode;
            }
        }
        return null;
    }
}

function getIterationTree() {
    return iterationTree;
}

module.exports = {
    solvePuzzle,
    getIterationTree,
};
