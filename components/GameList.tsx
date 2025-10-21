import React from 'react';
import { games } from '../data/games';

interface GameListProps {
  onSelectGame: (gameId: string) => void;
}

export const GameList: React.FC<GameListProps> = ({ onSelectGame }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold tracking-tighter text-white sm:text-6xl md:text-7xl" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          AKIRA
        </h1>
        <p className="text-slate-400 text-lg mt-2">Tu asistente de estrategia para juegos RTS.</p>
        <p className="text-slate-500 text-md">Selecciona un juego para comenzar</p>
      </header>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => onSelectGame(game.id)}
            className="group relative rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            <img src={game.imageUrl} alt={game.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <h2 className="text-xl font-bold text-white">{game.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
