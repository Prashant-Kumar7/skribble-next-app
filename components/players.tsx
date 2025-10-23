import React from 'react';
import { PenTool, Crown } from 'lucide-react';

interface PlayersProps {
  player: string;
  currentUser: string;
  wordGuessed: boolean;
  score: number;
  avatar: string;
}

export const Players: React.FC<PlayersProps> = ({ 
  player, 
  currentUser, 
  wordGuessed, 
  score, 
  avatar 
}) => {
  const isCurrentDrawer = player === currentUser;
  
  return (
    <div className={`
      flex justify-between items-center p-3 rounded-lg mb-2 transition-all duration-300 hover:scale-[1.02]
      ${wordGuessed 
        ? "bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 shadow-green-500/10 shadow-lg" 
        : isCurrentDrawer
        ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 shadow-blue-500/10 shadow-lg"
        : "bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-700/50"
      }
    `}>
      <div className="flex items-center gap-3">
        <div className="relative">
          <div 
            className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg"
            dangerouslySetInnerHTML={{ __html: avatar }}
          />
          {wordGuessed && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <Crown className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <span className={`font-semibold ${
            isCurrentDrawer ? "text-blue-400" : wordGuessed ? "text-green-400" : "text-white"
          }`}>
            {player}
          </span>
          <span className="text-sm text-zinc-400">
            {score} points
          </span>
        </div>
      </div>
      
      {isCurrentDrawer && (
        <div className="flex items-center gap-2">
          <PenTool className="w-5 h-5 text-blue-400 animate-pulse" />
          <span className="text-xs text-blue-400 font-medium">Drawing</span>
        </div>
      )}
    </div>
  );
};