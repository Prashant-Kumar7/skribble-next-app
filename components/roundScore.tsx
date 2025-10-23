import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface RoundScoreProps {
  name: string;
  points: number | undefined;
}

export const RoundScore: React.FC<RoundScoreProps> = ({ name, points }) => {
  const getPointsColor = () => {
    if (typeof points !== "number") return "";
    return points > 0 ? "text-green-400" : "text-red-400";
  };

  const getIcon = () => {
    if (typeof points !== "number") return null;
    return points > 0 ? 
      <TrendingUp className="w-5 h-5 text-green-400" /> : 
      <TrendingDown className="w-5 h-5 text-red-400" />;
  };

  return (
    <div className="flex justify-between items-center w-full p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-700/50 transition-colors">
      <span className="text-white font-medium">{name}</span>
      <div className="flex items-center gap-2">
        {getIcon()}
        <span className={`font-bold text-lg ${getPointsColor()}`}>
          {typeof points === "number" ? `+${points}` : '0'}
        </span>
      </div>
    </div>
  );
};