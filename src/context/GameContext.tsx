
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { checkWinner, checkDraw } from '../lib/gameUtils';

type Player = 'X' | 'O';
type CellValue = Player | null;
type GameBoard = CellValue[];
type GameStatus = 'selecting' | 'playing' | 'won' | 'draw';

interface GameContextType {
  board: GameBoard;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
  winningLine: number[] | null;
  playerChoice: Player | null;
  moves: number;
  
  selectPlayer: (player: Player) => void;
  handleCellClick: (index: number) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [board, setBoard] = useState<GameBoard>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [status, setStatus] = useState<GameStatus>('selecting');
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [playerChoice, setPlayerChoice] = useState<Player | null>(null);
  const [moves, setMoves] = useState<number>(0);

  const selectPlayer = (player: Player) => {
    setPlayerChoice(player);
    setCurrentPlayer('X'); // Game always starts with X
    setStatus('playing');
    toast(`You selected ${player}. ${player === 'X' ? 'You go first!' : 'Computer goes first!'}`);
  };

  const handleCellClick = (index: number) => {
    if (board[index] || status === 'won' || status === 'draw' || status === 'selecting') {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setMoves(moves + 1);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(currentPlayer);
      setWinningLine(result);
      setStatus('won');
      toast.success(`${currentPlayer} wins!`);
      return;
    }

    if (checkDraw(newBoard)) {
      setStatus('draw');
      toast.info("It's a draw!");
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setStatus(playerChoice ? 'playing' : 'selecting');
    setWinner(null);
    setWinningLine(null);
    setMoves(0);
  };

  return (
    <GameContext.Provider
      value={{
        board,
        currentPlayer,
        status,
        winner,
        winningLine,
        playerChoice,
        moves,
        selectPlayer,
        handleCellClick,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
