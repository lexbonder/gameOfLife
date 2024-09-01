// Set up
let board = Array(10)
    .fill('row')
    .map(() => Array(10).fill('.'));

const printBoard = () => {
    board.forEach((row) => {
        console.log(row.join(''));
    });
};

const addSeedsToBoard = () => {
    const numSeeds = 50;

    for (let i = 0; i < numSeeds; i++) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);

        board[x][y] = '*';
    }
};

// Each Phase
const isAlive = (cell) => {
    return cell === '*';
};

const getNumLiveNeighbors = (x, y) => {
    let liveNeighbors = 0;

    for (let offsetX = -1; offsetX < 2; offsetX++) {
        for (let offsetY = -1; offsetY < 2; offsetY++) {
            // Omit self
            if (offsetX === 0 && offsetY === 0) continue;
            // inside boundaries
            if (x + offsetX > 0 && x + offsetX < 9 && y + offsetY > 0 && y + offsetY < 9) {
                liveNeighbors += isAlive(board[x + offsetX][y + offsetY]) ? 1 : 0;
            }
        }
    }

    return liveNeighbors;
};

const getNextBoard = () => {
    const nextBoard = Array(10)
        .fill('row')
        .map(() => Array(10).fill('.'));

    board.forEach((row, rowI) => {
        row.forEach((cell, cellI) => {
            const alive = isAlive(cell);
            const numAliveNeighbors = getNumLiveNeighbors(rowI, cellI);

            nextBoard[rowI][cellI] = alive ? handleLiveCell(numAliveNeighbors) : handleDeadCell(numAliveNeighbors);
        });
    });

    board = nextBoard;
};

const handleLiveCell = (numAliveNeighbors) => {
    return numAliveNeighbors < 2 || numAliveNeighbors > 3 ? '.' : '*';
};

const handleDeadCell = (numAliveNeighbors) => {
    return numAliveNeighbors === 3 ? '*' : '.';
};

// In Action
addSeedsToBoard();

setInterval(() => {
    console.clear();
    printBoard();
    getNextBoard();
}, 600);
