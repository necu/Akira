import React, { useState } from 'react';
import { Game } from '../data/games';
import { getGameGuide } from '../services/geminiService';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SparklesIcon } from './SparklesIcon';
import { LoadingSpinner } from './LoadingSpinner';

const ArmyCalculator: React.FC = () => {
    // A simple placeholder UI
    const [cost, setCost] = useState(750);
    return (
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h4 className="font-bold text-lg text-cyan-400 mb-2">Calculadora de Ejército (Ejemplo)</h4>
            <p className="text-sm text-slate-400 mb-4">Planifica el costo de tus unidades. Esta es una herramienta de demostración.</p>
            <div className="flex items-center gap-4">
                <label htmlFor="units" className="text-slate-300">Unidades:</label>
                <input type="range" min="0" max="20" defaultValue="5" className="flex-grow" onChange={(e) => setCost(parseInt(e.target.value) * 150)} />
            </div>
            <div className="mt-4 text-center">
                <span className="text-slate-300">Costo estimado: </span>
                <span className="font-bold text-xl text-cyan-300">{cost}</span>
                <span className="text-slate-400"> oro</span>
            </div>
        </div>
    );
};

interface GameDetailProps {
  game: Game;
  onBack: () => void;
}

export const GameDetail: React.FC<GameDetailProps> = ({ game, onBack }) => {
  const [guide, setGuide] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const handleGenerateGuide = async (topic: string) => {
    setIsLoading(true);
    setError(null);
    setGuide('');
    setActiveTopic(topic);
    try {
      const result = await getGameGuide(game.name, topic);
      setGuide(result);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al generar la guía.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <div className="relative h-64 sm:h-80">
        <img src={game.imageUrl} alt={game.name} className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-slate-800/50 hover:bg-slate-700/70 text-white font-bold p-2 rounded-full transition-colors duration-200 backdrop-blur-sm"
          aria-label="Volver a la lista de juegos"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <div className="absolute bottom-0 left-0 p-4 sm:p-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">{game.name}</h1>
        </div>
      </div>

      <main className="p-4 sm:p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* AI Guides Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-cyan-400 pl-3">Guías con IA</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {game.guideTopics.map(topic => (
                    <button
                        key={topic}
                        onClick={() => handleGenerateGuide(topic)}
                        disabled={isLoading}
                        className="flex items-center justify-center text-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md transition-all duration-200 border border-slate-700 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
                    >
                        {isLoading && activeTopic === topic ? <LoadingSpinner/> : <SparklesIcon className="w-5 h-5 text-cyan-400"/>}
                        <span>{topic}</span>
                    </button>
                ))}
            </div>
             {(isLoading || error || guide) && (
              <div className="mt-6 p-4 sm:p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                {isLoading && <div className="text-center text-slate-400">Generando guía, por favor espera...</div>}
                {error && <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md" role="alert">{error}</div>}
                {guide && (
                  <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap font-sans">
                    {guide}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Tools Section */}
          {game.tools.length > 0 && (
            <section>
                 <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-cyan-400 pl-3">Herramientas</h2>
                 <div className="space-y-4">
                    {game.tools.map(tool => {
                        if (tool.id === 'army-calculator') return <ArmyCalculator key={tool.id} />;
                        return null;
                    })}
                 </div>
            </section>
          )}

        </div>
        <aside className="lg:col-span-1 space-y-8">
          {/* Overview Section */}
          <section>
            <h3 className="text-xl font-bold text-white mb-3">Descripción General</h3>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <p className="text-slate-400">{game.description}</p>
            </div>
          </section>
           {/* Pro Tips Section */}
           <section>
            <h3 className="text-xl font-bold text-white mb-3">Consejos Pro</h3>
             <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 space-y-3">
                <p className="text-slate-400"><strong>Economía primero:</strong> Asegúrate siempre de tener una economía sólida antes de construir un gran ejército.</p>
                <p className="text-slate-400"><strong>Explora el mapa:</strong> El conocimiento del mapa y la posición de tu enemigo es clave para la victoria.</p>
                <p className="text-slate-400"><strong>Conoce tus unidades:</strong> Entiende las fortalezas y debilidades de cada una de tus unidades y las de tu oponente.</p>
             </div>
          </section>
        </aside>
      </main>
    </div>
  );
};
