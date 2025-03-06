
import React from 'react';
import Cell from './Cell';
import { useGame } from '../context/GameContext';
import { cn } from '@/lib/utils';

const GameBoard: React.FC = () => {
  const { board, winningLine } = useGame();

  return (
    <div className="board-container w-full max-w-sm mx-auto">
      <div 
        className="board-grid aspect-square bg-white/60 backdrop-blur-xs rounded-xl p-3 shadow-md border border-white/50"
      >
        {board.map((value, index) => (
          <Cell
            key={index}
            index={index}
            value={value}
            isWinningCell={winningLine ? winningLine.includes(index) : false}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
