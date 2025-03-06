
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, Copy, ExternalLink } from 'lucide-react';
import { generateRoomId } from '@/lib/gameUtils';
import { useToast } from "sonner";

const OnlineGame: React.FC = () => {
  const [roomId, setRoomId] = useState<string>("");
  const [joinRoomId, setJoinRoomId] = useState<string>("");
  
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
    
    window.location.href = `/online/${joinRoomId}`;
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

  return (
    <div className="animate-fade-in flex flex-col w-full max-w-md mx-auto p-6 rounded-xl glass-card">
      <h2 className="text-xl font-medium text-gray-800 mb-6 text-center">Play Online</h2>
      
      <div className="space-y-6">
        <div className="flex flex-col space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Create a new game</h3>
          <Button 
            onClick={handleCreateRoom}
            className="w-full button-press"
          >
            Create Game Room
          </Button>
          
          {roomId && (
            <div className="animate-scale-in flex flex-col space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Room ID:</span>
                <code className="px-2 py-1 bg-white rounded text-sm font-mono">{roomId}</code>
                <Button variant="ghost" size="icon" onClick={handleCopyRoomId}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                className="mt-2 w-full flex items-center justify-center gap-2 button-press"
                onClick={shareGame}
              >
                <Share2 className="h-4 w-4" />
                Share Game Link
              </Button>
              
              <Button 
                variant="default" 
                className="w-full flex items-center justify-center gap-2 button-press"
                onClick={() => window.location.href = `/online/${roomId}`}
              >
                <ExternalLink className="h-4 w-4" />
                Enter Game Room
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-3">
          <div className="h-px bg-gray-200 my-2"></div>
          <h3 className="text-sm font-medium text-gray-700">Join an existing game</h3>
          <div className="flex space-x-2">
            <Input
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              placeholder="Enter Room ID"
              className="flex-1"
            />
            <Button onClick={handleJoinGame} className="button-press">
              Join
            </Button>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-xs text-gray-500 text-center">
        Share the Room ID with a friend to play together.
      </p>
    </div>
  );
};

export default OnlineGame;
