
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
        "cell aspect-square w-full h-full cursor-pointer button-press select-none transition-all duration-300",
        isDisabled ? "cursor-default" : "hover:bg-white/30",
        isWinningCell ? "border-2 border-white/50 shadow-lg bg-white/30" : ""
      )}
      onClick={() => !isDisabled && handleCellClick(index)}
      aria-label={`Cell ${index}`}
      style={{ 
        transformStyle: 'preserve-3d', 
        transform: isWinningCell ? 'translateZ(10px)' : 'translateZ(0px)'
      }}
    >
      {value === 'X' && (
        <X 
          className="x-mark w-10 h-10 md:w-14 md:h-14 stroke-[2.5] animate-draw-x"
          style={{ 
            strokeDasharray: '100', 
            strokeDashoffset: '0',
            filter: 'drop-shadow(0 0 8px rgba(93, 95, 239, 0.7))'
          }}
        />
      )}
      {value === 'O' && (
        <Circle 
          className="o-mark w-10 h-10 md:w-14 md:h-14 stroke-[2.5] animate-draw-circle"
          style={{ 
            strokeDasharray: '283', 
            strokeDashoffset: '0', 
            fill: 'none',
            filter: 'drop-shadow(0 0 8px rgba(239, 93, 168, 0.7))'
          }}
        />
      )}
    </div>
  );
};

export default Cell;
