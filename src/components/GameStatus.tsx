
import React from 'react';
import { useGame } from '../context/GameContext';
import { Button } from '@/components/ui/button';
import { X, Circle, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const GameStatus: React.FC = () => {
  const { currentPlayer, status, winner, resetGame, playerChoice } = useGame();

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center mt-8">
      {status === 'playing' && (
        <div className="flex items-center space-x-2 mb-4 glass-card px-4 py-2 rounded-full">
          <span className="text-sm font-medium text-white/90">Current turn:</span>
          <div className={cn(
            "player-indicator flex items-center justify-center h-8 w-8 rounded-full",
            currentPlayer === 'X' ? "bg-game-x/30" : "bg-game-o/30"
          )}>
            {currentPlayer === 'X' ? (
              <X className="h-5 w-5 text-game-x animate-pulse drop-shadow-glow-blue" />
            ) : (
              <Circle className="h-5 w-5 text-game-o animate-pulse drop-shadow-glow-pink" />
            )}
          </div>
          <span className={cn(
            "font-medium",
            currentPlayer === 'X' ? "text-game-x drop-shadow-glow-blue" : "text-game-o drop-shadow-glow-pink"
          )}>
            {currentPlayer}'s turn
          </span>
        </div>
      )}
      
      {status === 'won' && (
        <div className="animate-scale-in flex flex-col items-center mb-4">
          <div className={cn(
            "flex items-center space-x-2 py-2 px-4 rounded-full mb-2 glass-card",
            winner === 'X' ? "bg-game-x/30" : "bg-game-o/30"
          )}>
            {winner === 'X' ? (
              <X className="h-5 w-5 text-game-x drop-shadow-glow-blue" />
            ) : (
              <Circle className="h-5 w-5 text-game-o drop-shadow-glow-pink" />
            )}
            <span className={cn(
              "font-semibold text-white",
              winner === 'X' ? "text-game-x drop-shadow-glow-blue" : "text-game-o drop-shadow-glow-pink"
            )}>
              {winner} wins!
            </span>
          </div>
        </div>
      )}
      
      {status === 'draw' && (
        <div className="animate-scale-in flex items-center mb-4">
          <div className="glass-card flex items-center space-x-2 py-2 px-4 rounded-full">
            <span className="font-semibold text-white">
              It's a draw!
            </span>
          </div>
        </div>
      )}
      
      {(status === 'won' || status === 'draw') && (
        <Button
          onClick={resetGame}
          className="animate-slide-up button-press mt-2 transition-all duration-200 flex items-center gap-2 border border-white/30 bg-white/20 text-white hover:bg-white/30"
          variant="outline"
        >
          <RotateCw className="h-4 w-4" />
          Play Again
        </Button>
      )}
    </div>
  );
};

export default GameStatus;
