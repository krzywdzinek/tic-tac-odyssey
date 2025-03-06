
import React, { useRef, useEffect } from 'react';
import Cell from './Cell';
import { useGame } from '../context/GameContext';
import { cn } from '@/lib/utils';

const GameBoard: React.FC = () => {
  const { board, winningLine } = useGame();
  const boardRef = useRef<HTMLDivElement>(null);
  
  // Add 3D tilt effect when mouse moves
  useEffect(() => {
    const boardElement = boardRef.current;
    if (!boardElement) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = boardElement.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element
      
      // Calculate rotation based on mouse position
      // We divide by 25 to reduce the effect for subtlety
      const rotateY = ((x - rect.width / 2) / rect.width) * 10;
      const rotateX = ((y - rect.height / 2) / rect.height) * -10;
      
      // Apply the transformation
      boardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const handleMouseLeave = () => {
      // Reset transform on mouse leave
      boardElement.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    };
    
    boardElement.addEventListener('mousemove', handleMouseMove);
    boardElement.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      boardElement.removeEventListener('mousemove', handleMouseMove);
      boardElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="board-container w-full max-w-sm mx-auto">
      <div 
        ref={boardRef}
        className="board-grid aspect-square glass-card rounded-xl p-3 shadow-lg border border-white/30 tilt-card transition-all duration-300"
        style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px)' }}
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
