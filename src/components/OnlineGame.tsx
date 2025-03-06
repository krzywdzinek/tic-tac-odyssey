
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, Copy, ExternalLink, RotateCw } from 'lucide-react';
import { generateRoomId } from '@/lib/gameUtils';
import { toast } from "sonner";

const OnlineGame: React.FC = () => {
  const [roomId, setRoomId] = useState<string>("");
  const [joinRoomId, setJoinRoomId] = useState<string>("");
  const [inRoom, setInRoom] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  
  const handleCreateRoom = () => {
    const newRoomId = generateRoomId();
    setRoomId(newRoomId);
  };
  
  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    toast.success("Room ID copied to clipboard!");
  };
  
  const handleJoinGame = () => {
    if (!joinRoomId.trim()) {
      toast.error("Please enter a room ID");
      return;
    }
    
    setInRoom(true);
    toast.success(`Joining room ${joinRoomId}`);
  };
  
  const shareGame = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join my Tic Tac Toe game!',
        text: 'Join me for a game of Tic Tac Toe!',
        url: `${window.location.origin}/online/${roomId}`,
      });
    } else {
      handleCopyRoomId();
    }
  };
  
  const startNewRound = () => {
    toast.success("Starting a new round!");
    // This would connect to a real backend in a production app
  };
  
  const leaveRoom = () => {
    setInRoom(false);
    setGameStarted(false);
    setRoomId("");
    setJoinRoomId("");
    toast.info("Left the game room");
  };

  // Show the room UI if in a room
  if (inRoom) {
    return (
      <div className="animate-fade-in flex flex-col w-full max-w-md mx-auto p-6 rounded-xl glass-card border border-white/20 tilt-card">
        <h2 className="text-xl font-fira font-medium text-white mb-6 text-center">Game Room: <span className="text-game-o">{roomId || joinRoomId}</span></h2>
        
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-between w-full p-3 glass-card rounded-lg">
              <span className="font-medium font-fira text-white">Player 1 (You)</span>
              <span className="px-2 py-1 bg-game-x/30 text-game-x text-xs rounded-full font-poppins">Connected</span>
            </div>
            
            <div className="flex items-center justify-between w-full p-3 glass-card rounded-lg">
              <span className="font-medium font-fira text-white">Player 2</span>
              <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full font-poppins animate-pulse">Waiting...</span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 mt-6">
            {gameStarted ? (
              <Button 
                onClick={startNewRound}
                className="w-full button-press bg-gradient-to-r from-game-gradient4 to-game-gradient8 hover:opacity-90 text-white border border-white/20 font-fira"
              >
                <RotateCw className="h-4 w-4 mr-2" />
                Start New Round
              </Button>
            ) : (
              <Button 
                className="w-full button-press bg-gradient-to-r from-game-gradient4 to-game-gradient8 hover:opacity-90 text-white border border-white/20 font-fira"
                onClick={() => setGameStarted(true)}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Start Game
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="w-full button-press text-white border-white/20 bg-white/10 hover:bg-white/20 font-fira"
              onClick={leaveRoom}
            >
              Leave Room
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Original room creation UI
  return (
    <div className="animate-fade-in flex flex-col w-full max-w-md mx-auto p-6 rounded-xl glass-card border border-white/20 tilt-card">
      <h2 className="text-xl font-fira font-medium text-white mb-6 text-center">Play Online</h2>
      
      <div className="space-y-6">
        <div className="flex flex-col space-y-3">
          <h3 className="text-sm font-medium font-fira text-white/90">Create a new game</h3>
          <Button 
            onClick={handleCreateRoom}
            className="w-full button-press bg-gradient-to-r from-game-gradient4 to-game-gradient8 hover:opacity-90 text-white border border-white/20 font-fira"
          >
            Create Game Room
          </Button>
          
          {roomId && (
            <div className="animate-scale-in flex flex-col space-y-2 p-4 glass-card rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium font-fira text-white/80">Room ID:</span>
                <code className="px-2 py-1 bg-white/20 rounded text-sm font-mono text-white">{roomId}</code>
                <Button variant="ghost" size="icon" onClick={handleCopyRoomId} className="text-white hover:bg-white/20">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                className="mt-2 w-full flex items-center justify-center gap-2 button-press text-white border-white/20 hover:bg-white/20 font-fira"
                onClick={shareGame}
              >
                <Share2 className="h-4 w-4" />
                Share Game Link
              </Button>
              
              <Button 
                variant="default" 
                className="w-full flex items-center justify-center gap-2 button-press bg-gradient-to-r from-game-gradient7 to-game-gradient3 hover:opacity-90 text-white border border-white/20 font-fira"
                onClick={() => setInRoom(true)}
              >
                <ExternalLink className="h-4 w-4" />
                Enter Game Room
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-3">
          <div className="h-px bg-white/20 my-2"></div>
          <h3 className="text-sm font-medium font-fira text-white/90">Join an existing game</h3>
          <div className="flex space-x-2">
            <Input
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              placeholder="Enter Room ID"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 font-poppins"
            />
            <Button 
              onClick={handleJoinGame} 
              className="button-press bg-gradient-to-r from-game-gradient8 to-game-gradient6 hover:opacity-90 text-white border border-white/20 font-fira"
            >
              Join
            </Button>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-xs text-white/70 text-center font-poppins">
        Share the Room ID with a friend to play together.
      </p>
    </div>
  );
};

export default OnlineGame;
