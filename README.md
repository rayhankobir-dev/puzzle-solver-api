

## Getting Started
```js
  https://puzzle-solver-api.vercel.app/solve
```
## Follow these steps
  - Make POST request to the below url
  ```
  // POST request
    https://puzzle-solver-api.vercel.app/solve
  ```
  - Provide solveable puzzle.
  - Provide initialState of the puzzle as array represntation
  ```
  { initialState: [1, 2, 0, 4, 5, 3, 7, 8, 6] };
  // here 0 indicate the empty tile of the puzzle
  ```
## Example code using fetch api call

```js
initialBoard = {
  initialState: [1, 2, 0, 4, 5, 3, 7, 8, 6]
};

fetch("https://puzzle-solver-api.vercel.app/solve", {
    method: "POST",
    body: JSON.stringify(initialBoard),
    headers: {
        "Content-Type": "application/json",
    },
}).then((response) => response.json())
  .then((data) => {
    console.log(data);
})
```
## Example Output
```
{
    "success": true,
    "totalStep": 3,
    "steps": [
        [1,2,0,4,5,3,7,8,6],
        [1,2,3,4,5,0,7,8,6],
        [1,2,3,4,5,6,7,8,0]
    ],
    "tree": {
        "name": "1,2,0,4,5,3,7,8,6",
        "children": [
            {
                "name": "1,2,3,4,5,0,7,8,6",
                "children": [
                    {
                        "name": "1,2,0,4,5,3,7,8,6",
                        "children": []
                    },
                    {
                        "name": "1,2,3,4,5,6,7,8,0",
                        "children": [],
                        "isSolutionPath": true
                    },
                    {
                        "name": "1,2,3,4,0,5,7,8,6",
                        "children": []
                    }
                ],
                "isSolutionPath": true
            },
            {
                "name": "1,0,2,4,5,3,7,8,6",
                "children": []
            }
        ],
        "isSolutionPath": true
    }
}
```
