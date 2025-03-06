
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { ArrowLeft, Copy, Users } from 'lucide-react';

const OnlineGamePage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [isConnected, setIsConnected] = useState(false);
  const [opponentConnected, setOpponentConnected] = useState(false);
  
  useEffect(() => {
    if (roomId) {
      // This would be implemented with a real-time connection
      // to a server using something like Firebase, Socket.io, etc.
      setTimeout(() => {
        setIsConnected(true);
        toast.success("Connected to game room!");
      }, 1000);
      
      // Simulate opponent joining after 5 seconds
      setTimeout(() => {
        setOpponentConnected(true);
        toast.success("Opponent has joined the game!");
      }, 5000);
    }
  }, [roomId]);
  
  const handleCopyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Game link copied to clipboard!");
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="w-full max-w-lg mx-auto flex items-center justify-between mb-8">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        
        <h1 className="text-2xl font-bold text-gray-800">
          Room: {roomId}
        </h1>
        
        <Button variant="ghost" size="icon" onClick={handleCopyRoomLink}>
          <Copy className="h-4 w-4" />
        </Button>
      </header>
      
      <main className="w-full max-w-lg mx-auto flex-1 flex flex-col items-center justify-center">
        <div className="glass-card p-8 rounded-xl w-full max-w-sm mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className={`flex items-center justify-center h-16 w-16 rounded-full ${isConnected ? 'bg-green-100' : 'bg-gray-100'}`}>
              <Users className={`h-8 w-8 ${isConnected ? 'text-green-600' : 'text-gray-400'}`} />
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">
            {isConnected ? 'Connected to Game Room' : 'Connecting...'}
          </h2>
          
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="font-medium">You</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="font-medium">Opponent</span>
              {opponentConnected ? (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
              ) : (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Waiting...</span>
              )}
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-4">
              {opponentConnected 
                ? "Both players connected! You can now play." 
                : "Waiting for opponent to join..."}
            </p>
            
            <Button
              className="w-full"
              disabled={!opponentConnected}
            >
              {opponentConnected ? "Start Game" : "Waiting for opponent..."}
            </Button>
          </div>
        </div>
      </main>
      
      <footer className="w-full max-w-lg mx-auto py-6 mt-8">
        <p className="text-xs text-gray-400 text-center">
          Share this room ID with your friend to play together
        </p>
      </footer>
    </div>
  );
};

export default OnlineGamePage;
