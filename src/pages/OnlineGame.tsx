
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { ArrowLeft, Copy, Users, Play } from 'lucide-react';
import { useGame } from '../context/GameContext';

const OnlineGamePage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [isConnected, setIsConnected] = useState(false);
  const [opponentConnected, setOpponentConnected] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const { resetGame, playNextRound } = useGame();
  
  useEffect(() => {
    if (roomId) {
      // This would be implemented with a real-time connection
      // to a server using something like Firebase, Socket.io, etc.
      setTimeout(() => {
        setIsConnected(true);
        toast.success("Connected to game room!");
        
        // For demo purposes, simulate opponent joining after 2 seconds (faster than before)
        setTimeout(() => {
          setOpponentConnected(true);
          toast.success("Opponent has joined the game!");
        }, 2000);
      }, 1000);
    }
    
    // Reset game state when entering room
    resetGame();
  }, [roomId, resetGame]);
  
  const handleCopyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Game link copied to clipboard!");
  };
  
  const handleStartGame = () => {
    setGameActive(true);
    playNextRound();
    toast.success("Game started! X goes first.");
  };
  
  const handlePlayNextRound = () => {
    playNextRound();
    toast.success("Starting next round!");
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-gray-900 to-gray-950">
      <header className="w-full max-w-lg mx-auto flex items-center justify-between mb-8">
        <Link to="/">
          <Button variant="ghost" className="gap-2 text-white hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        
        <h1 className="text-2xl font-bold font-fira text-white drop-shadow-glow-blue">
          Room: {roomId}
        </h1>
        
        <Button variant="ghost" size="icon" onClick={handleCopyRoomLink} className="text-white hover:bg-white/10">
          <Copy className="h-4 w-4" />
        </Button>
      </header>
      
      <main className="w-full max-w-lg mx-auto flex-1 flex flex-col items-center justify-center">
        <div className="glass-card p-8 rounded-xl w-full max-w-sm mx-auto text-center border border-white/20">
          <div className="flex items-center justify-center mb-6">
            <div className={`flex items-center justify-center h-16 w-16 rounded-full ${isConnected ? 'bg-green-500/30' : 'bg-gray-800'}`}>
              <Users className={`h-8 w-8 ${isConnected ? 'text-green-500' : 'text-gray-400'}`} />
            </div>
          </div>
          
          <h2 className="text-xl font-semibold font-fira mb-4 text-white">
            {isConnected ? 'Connected to Game Room' : 'Connecting...'}
          </h2>
          
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between p-3 glass-card rounded-lg border border-white/10">
              <span className="font-medium font-fira text-white">You</span>
              <span className="px-2 py-1 bg-green-500/30 text-green-400 text-xs rounded-full font-poppins">Connected</span>
            </div>
            
            <div className="flex items-center justify-between p-3 glass-card rounded-lg border border-white/10">
              <span className="font-medium font-fira text-white">Opponent</span>
              {opponentConnected ? (
                <span className="px-2 py-1 bg-green-500/30 text-green-400 text-xs rounded-full font-poppins">Connected</span>
              ) : (
                <span className="px-2 py-1 bg-yellow-500/30 text-yellow-400 text-xs rounded-full font-poppins animate-pulse">Waiting...</span>
              )}
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-sm text-white/70 mb-4 font-poppins">
              {opponentConnected 
                ? gameActive 
                  ? "Game in progress. Good luck!" 
                  : "Both players connected! You can now play." 
                : "Waiting for opponent to join..."}
            </p>
            
            {gameActive ? (
              <Button
                className="w-full button-press bg-gradient-to-r from-game-gradient4 to-game-gradient8 hover:opacity-90 text-white border border-white/20 font-fira"
                onClick={handlePlayNextRound}
              >
                <Play className="h-4 w-4 mr-2" />
                Play Next Round
              </Button>
            ) : (
              <Button
                className="w-full button-press bg-gradient-to-r from-game-gradient4 to-game-gradient8 hover:opacity-90 text-white border border-white/20 font-fira"
                disabled={!opponentConnected}
                onClick={handleStartGame}
              >
                {opponentConnected ? "Start Game" : "Waiting for opponent..."}
              </Button>
            )}
          </div>
        </div>
      </main>
      
      <footer className="w-full max-w-lg mx-auto py-6 mt-8">
        <p className="text-xs text-white/50 text-center font-poppins">
          Share this room ID with your friend to play together
        </p>
      </footer>
    </div>
  );
};

export default OnlineGamePage;
