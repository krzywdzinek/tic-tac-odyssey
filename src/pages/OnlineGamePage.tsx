import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { ArrowLeft, Copy, Users, Play, RefreshCw } from 'lucide-react';
import { useGame } from '../context/GameContext';

const OnlineGamePage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [isConnected, setIsConnected] = useState(false);
  const [opponentConnected, setOpponentConnected] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [isRoomCreator, setIsRoomCreator] = useState(false);
  const { resetGame, playNextRound } = useGame();
  
  useEffect(() => {
    if (roomId) {
      // Determine if this user created the room
      const createdRooms = localStorage.getItem('createdRooms');
      const createdRoomsList = createdRooms ? JSON.parse(createdRooms) : [];
      const isCreator = createdRoomsList.includes(roomId);
      setIsRoomCreator(isCreator);
      
      // Initialize or update room status
      let roomStatus;
      const roomStatusStr = localStorage.getItem(`room_${roomId}_status`);
      
      if (roomStatusStr) {
        roomStatus = JSON.parse(roomStatusStr);
        // Update the appropriate flag based on whether user is creator or joiner
        if (isCreator) {
          roomStatus.creatorPresent = true;
        } else {
          roomStatus.joinerPresent = true;
        }
      } else {
        // Initialize room status if it doesn't exist
        roomStatus = { 
          creatorPresent: isCreator, 
          joinerPresent: !isCreator, 
          gameActive: false 
        };
      }
      
      // Save updated status back to localStorage
      localStorage.setItem(`room_${roomId}_status`, JSON.stringify(roomStatus));
      
      // Set initial opponent connection status
      setOpponentConnected(isCreator ? roomStatus.joinerPresent : roomStatus.creatorPresent);
      setGameActive(roomStatus.gameActive || false);
      setIsConnected(true);
      
      toast.success("Connected to game room!");
      
      // Poll for changes in room status
      const checkInterval = setInterval(() => {
        const currentStatusStr = localStorage.getItem(`room_${roomId}_status`);
        if (currentStatusStr) {
          const currentStatus = JSON.parse(currentStatusStr);
          
          // Update opponent connected status
          const isOpponentConnected = isCreator ? currentStatus.joinerPresent : currentStatus.creatorPresent;
          setOpponentConnected(isOpponentConnected);
          
          // Update game active status
          if (currentStatus.gameActive && !gameActive) {
            setGameActive(true);
            playNextRound();
          }
        }
      }, 1000);
      
      // Cleanup function
      return () => {
        clearInterval(checkInterval);
        
        // Update room status when leaving
        const currentStatusStr = localStorage.getItem(`room_${roomId}_status`);
        if (currentStatusStr) {
          const currentStatus = JSON.parse(currentStatusStr);
          if (isCreator) {
            currentStatus.creatorPresent = false;
          } else {
            currentStatus.joinerPresent = false;
          }
          localStorage.setItem(`room_${roomId}_status`, JSON.stringify(currentStatus));
        }
      };
    }
    
    // Reset game state when entering room
    resetGame();
  }, [roomId, resetGame]);
  
  const handleCopyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Game link copied to clipboard!");
  };
  
  const handleStartGame = () => {
    if (!opponentConnected) {
      toast.error("Waiting for opponent to join");
      return;
    }
    
    setGameActive(true);
    playNextRound();
    
    // Update game status in localStorage
    const roomStatusStr = localStorage.getItem(`room_${roomId}_status`);
    if (roomStatusStr) {
      const roomStatus = JSON.parse(roomStatusStr);
      roomStatus.gameActive = true;
      localStorage.setItem(`room_${roomId}_status`, JSON.stringify(roomStatus));
      toast.success("Game started! X goes first.");
    }
  };
  
  const handlePlayNextRound = () => {
    playNextRound();
    toast.success("Starting next round!");
  };
  
  const handleRefreshStatus = () => {
    const roomStatusStr = localStorage.getItem(`room_${roomId}_status`);
    if (roomStatusStr) {
      const currentStatus = JSON.parse(roomStatusStr);
      setOpponentConnected(isRoomCreator ? currentStatus.joinerPresent : currentStatus.creatorPresent);
      toast.info("Connection status refreshed");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-gray-950 to-gray-950">
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
              <span className="font-medium font-fira text-white">{isRoomCreator ? 'You (Creator)' : 'Room Creator'}</span>
              <span className={`px-2 py-1 ${isRoomCreator ? 'bg-green-500/30 text-green-400' : (isConnected && !isRoomCreator) ? 'bg-green-500/30 text-green-400' : 'bg-yellow-500/30 text-yellow-400 animate-pulse'} text-xs rounded-full font-poppins`}>
                {isRoomCreator ? 'Connected' : ((isConnected && !isRoomCreator) ? 'Connected' : 'Waiting...')}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 glass-card rounded-lg border border-white/10">
              <span className="font-medium font-fira text-white">{isRoomCreator ? 'Opponent' : 'You (Joined)'}</span>
              {opponentConnected ? (
                <span className="px-2 py-1 bg-green-500/30 text-green-400 text-xs rounded-full font-poppins">Connected</span>
              ) : (
                <span className="px-2 py-1 bg-yellow-500/30 text-yellow-400 text-xs rounded-full font-poppins animate-pulse">Waiting...</span>
              )}
            </div>
          </div>
          
          <div className="mt-4 mb-4">
            <Button
              onClick={handleRefreshStatus}
              className="w-full button-press bg-white/10 hover:bg-white/20 text-white/90 border border-white/20 font-fira"
              size="sm"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-2" />
              Refresh Status
            </Button>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-white/70 mb-4 font-poppins">
              {opponentConnected 
                ? gameActive 
                  ? "Game in progress. Good luck!" 
                  : "Both players connected! You can now play." 
                : "Waiting for opponent to join..."}
            </p>
            
            {gameActive ? (
              <Button
                className="w-full button-press bg-gradient-to-r from-[#B64028] to-[#398EA2] hover:opacity-90 text-white border border-white/20 font-fira"
                onClick={handlePlayNextRound}
              >
                <Play className="h-4 w-4 mr-2" />
                Play Next Round
              </Button>
            ) : (
              <Button
                className="w-full button-press bg-gradient-to-r from-[#B64028] to-[#398EA2] hover:opacity-90 text-white border border-white/20 font-fira"
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
