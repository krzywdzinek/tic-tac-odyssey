
import React from 'react';
import { useGame } from '../context/GameContext';
import { Button } from '@/components/ui/button';
import { X, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const PlayerSelection: React.FC = () => {
  const { selectPlayer, playerChoice, status } = useGame();

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center p-6 rounded-xl glass-card border border-white/30 tilt-card">
      <h2 className="text-xl font-fira font-medium text-white mb-6">Choose Your Mark</h2>
      
      <div className="flex space-x-6 items-center justify-center">
        <Button
          variant="outline"
          className={cn(
            "group h-20 w-20 rounded-xl transition-all duration-200 hover:shadow-lg hover:bg-game-x/30 border border-white/40 bg-white/10",
            playerChoice === 'X' && "bg-game-x/50 shadow-lg border-game-x/70"
          )}
          onClick={() => selectPlayer('X')}
          disabled={status !== 'selecting'}
        >
          <X className="h-10 w-10 text-game-x group-hover:scale-110 transition-transform duration-200 drop-shadow-glow-blue" />
        </Button>
        
        <Button
          variant="outline"
          className={cn(
            "group h-20 w-20 rounded-xl transition-all duration-200 hover:shadow-lg hover:bg-game-o/30 border border-white/40 bg-white/10",
            playerChoice === 'O' && "bg-game-o/50 shadow-lg border-game-o/70"
          )}
          onClick={() => selectPlayer('O')}
          disabled={status !== 'selecting'}
        >
          <Circle className="h-10 w-10 text-game-o group-hover:scale-110 transition-transform duration-200 drop-shadow-glow-pink" />
        </Button>
      </div>
      
      <p className="mt-6 text-sm text-white/90 text-center font-poppins">
        X goes first. Choose who you want to be.
      </p>
    </div>
  );
};

export default PlayerSelection;
