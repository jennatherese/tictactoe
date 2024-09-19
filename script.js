document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const modal = document.querySelector('.modal');
    const message = document.querySelector('.message');
    const restartBtn = document.getElementById('restartbtn');

    let currentPlayer = 'X';
    let boardState = Array(9).fill('');
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWin = () => {
        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }
        return boardState.includes('') ? null : 'T';
    };

    const handleClick = (event) => {
        if (!gameActive) return;

        const box = event.target;
        const index = box.id;

        if (boardState[index]) return; 

        boardState[index] = currentPlayer;
        box.textContent = currentPlayer;

        const winner = checkWin();

        if (winner) {
            gameActive = false;
            if (winner === 'T') {
                message.textContent = "It's a tie!";
            } else {
                message.textContent = `Congratulations player ${winner}`;
            }
            modal.style.display = 'flex'; 
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    const restartGame = () => {
        boardState = Array(9).fill('');
        currentPlayer = 'X';
        gameActive = true;
        boxes.forEach(box => box.textContent = '');
        modal.style.display = 'none'; // Hide modal
    };

    boxes.forEach(box => box.addEventListener('click', handleClick));
    restartBtn.addEventListener('click', restartGame);
});


