const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.querySelector('.restart-button');
const winnerMessage = document.querySelector('.winner-message');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    if (gameBoard.includes('')) return null;

    return 'T';
}

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cell.parentNode.children).indexOf(cell);

    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cell.innerText = currentPlayer;
        cell.classList.add(currentPlayer);
        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            if (winner === 'T') {
                winnerMessage.innerText = 'Ничья!';
            } else {
                winnerMessage.innerText = `Победитель: ${winner}`;
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function handleRestart() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X', 'O');
    });
    winnerMessage.innerText = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestart);
