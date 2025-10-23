import React from 'react';

interface WordToGuessProps {
  letter: string;
}

export const WordToGuess: React.FC<WordToGuessProps> = ({ letter }) => {
  return (
    <span className="inline-block w-8 h-12 mx-1 text-2xl font-bold text-center text-white border-b-4 border-blue-400 animate-pulse">
      {letter}
    </span>
  );
};