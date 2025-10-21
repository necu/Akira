import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { games } from './data/games';
import { GameList } from './components/GameList';
import { GameDetail } from './components/GameDetail';

const App: React.FC = () => {
  const [selectedGameId, setSelectedGameId] = useLocalStorage<string | null>('akira-selected-game', null);

  const selectedGame = games.find(g => g.id === selectedGameId);

  const handleSelectGame = (gameId: string) => {
    setSelectedGameId(gameId);
  };

  const handleGoBack = () => {
    setSelectedGameId(null);
  };

  if (selectedGame) {
    return <GameDetail game={selectedGame} onBack={handleGoBack} />;
  }

  return <GameList onSelectGame={handleSelectGame} />;
};

export default App;
