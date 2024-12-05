const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

// Handle cell click
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');

        if (board[index] === '' && !cell.classList.contains('taken')) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add('taken');
            if (checkWin(currentPlayer)) {
                setTimeout(() => alert(`${currentPlayer} wins!`), 100);
                return;
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

// Check win conditions
function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}

// Reset game
resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
});