
import React from 'react';
import { GameProvider } from '@/context/GameContext';
import GameBoard from '@/components/GameBoard';
import PlayerSelection from '@/components/PlayerSelection';
import GameStatus from '@/components/GameStatus';
import OnlineGame from '@/components/OnlineGame';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github } from 'lucide-react';
import Background3D from '@/components/Background3D';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* 3D Background */}
      <Background3D />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-800/60 to-pink-800/70 -z-10"></div>
      
      <header className="animate-slide-down py-6 w-full max-w-lg mx-auto flex items-center justify-center mb-8 relative z-10">
        <div className="glass-card px-6 py-4 rounded-full">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            <span className="text-game-x drop-shadow-glow-blue">Tic</span>
            <span className="text-white">-</span>
            <span className="text-game-o drop-shadow-glow-pink">Tac</span>
            <span className="text-white">-</span>
            <span className="text-primary drop-shadow-glow-purple">Toe</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-game-x to-game-o">3D</span>
          </h1>
        </div>
      </header>
      
      <main className="w-full max-w-lg mx-auto flex-1 relative z-10">
        <Tabs defaultValue="local" className="w-full">
          <TabsList className="w-full mb-6 glass-card border border-white/20 p-1">
            <TabsTrigger value="local" className="flex-1 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              Local Game
            </TabsTrigger>
            <TabsTrigger value="online" className="flex-1 text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              Online Multiplayer
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="local" className="animate-fade-in">
            <GameProvider>
              <div className="flex flex-col items-center justify-center space-y-8">
                <GameBoard />
                <GameStatus />
                <PlayerSelection />
              </div>
            </GameProvider>
          </TabsContent>
          
          <TabsContent value="online" className="animate-fade-in">
            <OnlineGame />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="w-full max-w-lg mx-auto py-6 mt-8 flex flex-col items-center justify-center relative z-10">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
        <p className="text-xs text-white/70 text-center">
          Built with React, Three.js, Tailwind CSS, and shadcn/ui
        </p>
      </footer>
    </div>
  );
};

export default Index;
