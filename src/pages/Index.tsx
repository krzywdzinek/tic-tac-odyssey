
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GameProvider } from '@/context/GameContext';
import GameBoard from '@/components/GameBoard';
import PlayerSelection from '@/components/PlayerSelection';
import GameStatus from '@/components/GameStatus';
import OnlineGame from '@/components/OnlineGame';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitHubLogoIcon } from '@radix-ui/react-icons';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="animate-slide-down py-4 w-full max-w-lg mx-auto flex items-center justify-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
          <span className="text-game-x">Tic</span>
          <span className="text-gray-400">-</span>
          <span className="text-game-o">Tac</span>
          <span className="text-gray-400">-</span>
          <span className="text-primary">Toe</span>
        </h1>
      </header>
      
      <main className="w-full max-w-lg mx-auto flex-1">
        <Tabs defaultValue="local" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="local" className="flex-1">Local Game</TabsTrigger>
            <TabsTrigger value="online" className="flex-1">Online Multiplayer</TabsTrigger>
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
      
      <footer className="w-full max-w-lg mx-auto py-6 mt-8 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-800 transition-colors duration-200"
          >
            <GitHubLogoIcon className="h-5 w-5" />
          </a>
        </div>
        <p className="text-xs text-gray-400 text-center">
          Built with React, Tailwind CSS, and shadcn/ui
        </p>
      </footer>
    </div>
  );
};

export default Index;
