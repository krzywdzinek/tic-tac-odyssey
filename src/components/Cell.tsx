
import React, { useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { X, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CellProps {
  index: number;
  value: string | null;
  isWinningCell: boolean;
}

const Cell: React.FC<CellProps> = ({ index, value, isWinningCell }) => {
  const { handleCellClick, status } = useGame();
  const cellRef = useRef<HTMLDivElement>(null);
  
  const isDisabled = value !== null || status === 'won' || status === 'draw';
  
  useEffect(() => {
    if (isWinningCell && cellRef.current) {
      cellRef.current.classList.add('animate-pulse');
    }
  }, [isWinningCell]);

  return (
    <div
      ref={cellRef}
      className={cn(
        "cell aspect-square w-full h-full cursor-pointer button-press select-none",
        isDisabled ? "cursor-default" : "hover:bg-gray-50",
        isWinningCell ? "border-2 border-primary shadow-lg" : ""
      )}
      onClick={() => handleCellClick(index)}
      aria-label={`Cell ${index}`}
    >
      {value === 'X' && (
        <X 
          className="x-mark w-10 h-10 md:w-14 md:h-14 stroke-[2.5] animate-draw-x"
          style={{ strokeDasharray: '100', strokeDashoffset: '0' }}
        />
      )}
      {value === 'O' && (
        <Circle 
          className="o-mark w-10 h-10 md:w-14 md:h-14 stroke-[2.5] animate-draw-circle"
          style={{ strokeDasharray: '283', strokeDashoffset: '0', fill: 'none' }}
        />
      )}
    </div>
  );
};

export default Cell;
