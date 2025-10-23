import React from 'react';

interface MessageProps {
  message: string;
  index: number;
}

export const Message: React.FC<MessageProps> = ({ message, index }) => {
  const getMessageStyle = () => {
    if (message.includes("Guessed the word")) {
      return "text-green-400 font-semibold bg-green-500/10 border-l-4 border-green-500";
    }
    if (message.includes("Close guess")) {
      return "text-orange-400 font-semibold bg-orange-500/10 border-l-4 border-orange-500";
    }
    return "";
  };

  return (
    <div className={`p-3 transition-colors hover:bg-zinc-700/50 ${
      index % 2 === 0 ? "bg-zinc-800/50" : "bg-zinc-900/50"
    } ${getMessageStyle()}`}>
      {message}
    </div>
  );
};