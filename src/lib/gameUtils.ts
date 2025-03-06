
// Winning combinations (rows, columns, diagonals)
const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6], // Diagonal from top-right to bottom-left
];

// Check if there's a winner based on the current board state
export const checkWinner = (board: (string | null)[]): number[] | null => {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combination;
    }
  }
  return null;
};

// Check if the game is a draw (all cells filled with no winner)
export const checkDraw = (board: (string | null)[]): boolean => {
  return board.every(cell => cell !== null);
};

// Generate a unique room ID for online multiplayer
export const generateRoomId = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Calculate the percentage of winning for each player based on board state
export const calculateWinningChance = (board: (string | null)[]): { X: number, O: number } => {
  // This is a simplified calculation for demonstration
  const emptySpaces = board.filter(cell => cell === null).length;
  const xCount = board.filter(cell => cell === 'X').length;
  const oCount = board.filter(cell => cell === 'O').length;
  
  if (emptySpaces === 0) return { X: 0, O: 0 };
  
  // This is a simple heuristic - in a real implementation you might use a more sophisticated algorithm
  const xAdvantage = xCount - oCount;
  const baseChance = 50;
  
  let xChance = baseChance + (xAdvantage * 10);
  let oChance = baseChance - (xAdvantage * 10);
  
  // Normalize chances to be between 0 and 100
  xChance = Math.max(0, Math.min(100, xChance));
  oChance = Math.max(0, Math.min(100, oChance));
  
  return { X: xChance, O: oChance };
};
