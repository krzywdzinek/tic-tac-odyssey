
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, Copy, ExternalLink, RotateCw } from 'lucide-react';
import { generateRoomId } from '@/lib/gameUtils';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

const OnlineGame: React.FC = () => {
  const [roomId, setRoomId] = useState<string>("");
  const [joinRoomId, setJoinRoomId] = useState<string>("");
  const navigate = useNavigate();
  
  const handleCreateRoom = () => {
    const newRoomId = generateRoomId();
    setRoomId(newRoomId);
    
    // Store the created room ID in localStorage
    const createdRooms = localStorage.getItem('createdRooms');
    const createdRoomsList = createdRooms ? JSON.parse(createdRooms) : [];
    
    if (!createdRoomsList.includes(newRoomId)) {
      createdRoomsList.push(newRoomId);
      localStorage.setItem('createdRooms', JSON.stringify(createdRoomsList));
    }
    
    // Initialize room status with creator present
    const roomStatus = { 
      creatorPresent: true, 
      joinerPresent: false,
      gameActive: false,
      lastUpdated: Date.now()
    };
    localStorage.setItem(`room_${newRoomId}_status`, JSON.stringify(roomStatus));
    
    toast.success(`Room ${newRoomId} created!`);
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
    
    // Check if the room exists in localStorage
    const roomStatusStr = localStorage.getItem(`room_${joinRoomId}_status`);
    
    if (!roomStatusStr) {
      // Initialize room if it doesn't exist
      const roomStatus = { 
        creatorPresent: false, 
        joinerPresent: true,
        gameActive: false,
        lastUpdated: Date.now()
      };
      localStorage.setItem(`room_${joinRoomId}_status`, JSON.stringify(roomStatus));
    } else {
      // Update existing room
      const roomStatus = JSON.parse(roomStatusStr);
      roomStatus.joinerPresent = true;
      roomStatus.lastUpdated = Date.now();
      localStorage.setItem(`room_${joinRoomId}_status`, JSON.stringify(roomStatus));
    }
    
    toast.success(`Joining room ${joinRoomId}`);
    navigate(`/online/${joinRoomId}`);
  };
  
  const handleEnterRoom = () => {
    if (!roomId) {
      toast.error("No room created yet");
      return;
    }
    
    // Update room status to show creator is present
    const roomStatusStr = localStorage.getItem(`room_${roomId}_status`);
    if (roomStatusStr) {
      const roomStatus = JSON.parse(roomStatusStr);
      roomStatus.creatorPresent = true;
      roomStatus.lastUpdated = Date.now();
      localStorage.setItem(`room_${roomId}_status`, JSON.stringify(roomStatus));
    }
    
    navigate(`/online/${roomId}`);
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
  
  // Clean up stale room data on component mount
  useEffect(() => {
    const cleanupRooms = () => {
      const createdRoomsStr = localStorage.getItem('createdRooms');
      if (!createdRoomsStr) return;
      
      const createdRooms = JSON.parse(createdRoomsStr);
      // Remove room status for rooms that are over 24 hours old
      // For now, we'll keep this simple and not implement actual expiration
    };
    
    cleanupRooms();
  }, []);
  
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
                onClick={handleEnterRoom}
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
