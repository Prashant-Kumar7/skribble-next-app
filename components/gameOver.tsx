import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

interface GameOverProps {
  player: string;
  score: number;
  avatar: string;
  rank: number;
}

export const GameOver: React.FC<GameOverProps> = ({ player, score, avatar, rank }) => {
  const getRankIcon = () => {
    switch (rank) {
      case 1:
        return <Trophy className="w-8 h-8 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankSuffix = () => {
    switch (rank) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const getSizeClasses = () => {
    switch (rank) {
      case 1: return 'w-28 h-28 text-4xl';
      case 2: return 'w-20 h-20 text-2xl';
      case 3: return 'w-16 h-16 text-xl';
      default: return 'w-12 h-12 text-lg';
    }
  };

  const getContainerClasses = () => {
    if (rank === 1) {
      return 'col-start-2 transform -translate-y-4';
    }
    return '';
  };

  return (
    <div className={`flex justify-center mb-6 flex-col items-center w-full ${getContainerClasses()}`}>
      <div className="relative mb-4">
        <div 
          className={`${getSizeClasses()} rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg`}
          dangerouslySetInnerHTML={{ __html: avatar.replace(/style="[^"]*"/, `style="width:100%;height:100%;"`) }}
        />
        {getRankIcon() && (
          <div className="absolute -top-2 -right-2 bg-zinc-900 rounded-full p-1 shadow-lg">
            {getRankIcon()}
          </div>
        )}
      </div>
      
      <div className={`flex gap-2 items-center mb-2 ${
        rank === 1 ? 'text-3xl' : rank === 2 ? 'text-2xl' : 'text-xl'
      }`}>
        <span className={`font-bold ${
          rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-300' : rank === 3 ? 'text-amber-600' : 'text-zinc-400'
        }`}>
          #{rank}{getRankSuffix()}
        </span>
        <span className="text-white font-semibold">{player}</span>
      </div>
      
      <div className={`font-medium ${
        rank === 1 ? 'text-lg text-yellow-400' : 'text-zinc-400'
      }`}>
        {score} points
      </div>
    </div>
  );
};