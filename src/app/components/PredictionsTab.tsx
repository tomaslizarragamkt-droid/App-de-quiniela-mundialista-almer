import { useState } from 'react';
import { motion } from 'motion/react';
import { groupStageMatches, Match } from './worldcup-data';
import { Trophy, Calendar, Users } from 'lucide-react';

interface PredictionsTabProps {
  predictions: Record<string, 'A' | 'B' | 'DRAW'>;
  onPredictionChange: (matchId: string, prediction: 'A' | 'B' | 'DRAW') => void;
}

export function PredictionsTab({ predictions, onPredictionChange }: PredictionsTabProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>('A');

  const groups = Array.from(new Set(groupStageMatches.map(m => m.group))).sort();
  const groupMatches = groupStageMatches.filter(m => m.group === selectedGroup);

  const totalPredictions = Object.keys(predictions).length;
  const totalMatches = groupStageMatches.length;
  const progress = (totalPredictions / totalMatches) * 100;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header con progreso */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary to-[#013580] rounded-xl md:rounded-2xl p-4 sm:p-6 text-white shadow-xl"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-accent flex-shrink-0" />
            <div>
              <h2 className="display-font text-2xl sm:text-3xl">Crear Apuesta</h2>
              <p className="text-white/80 text-xs sm:text-sm">Predice los ganadores de cada partido</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="display-font text-3xl sm:text-4xl text-accent">{totalPredictions}</div>
            <div className="text-xs sm:text-sm text-white/80">de {totalMatches} partidos</div>
          </div>
        </div>

        <div className="bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="bg-accent h-full rounded-full"
          />
        </div>
      </motion.div>

      {/* Selector de grupos */}
      <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <h3 className="font-bold text-sm sm:text-base text-primary">Selecciona un Grupo</h3>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {groups.map((group) => {
            const groupPredictions = groupStageMatches
              .filter(m => m.group === group)
              .filter(m => predictions[m.id]).length;
            const isComplete = groupPredictions === 6;

            return (
              <motion.button
                key={group}
                onClick={() => setSelectedGroup(group)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative py-2 sm:py-3 rounded-lg font-bold transition-all ${
                  selectedGroup === group
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-secondary text-primary hover:bg-primary/10'
                }`}
              >
                <div className="display-font text-lg sm:text-xl md:text-2xl">GRUPO {group}</div>
                <div className="text-xs mt-0.5 sm:mt-1">{groupPredictions}/6</div>
                {isComplete && (
                  <div className="absolute -top-1 -right-1 bg-accent text-primary rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs">
                    ✓
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Partidos del grupo seleccionado */}
      <div className="space-y-4">
        {groupMatches.map((match, index) => (
          <MatchPredictionCard
            key={match.id}
            match={match}
            prediction={predictions[match.id]}
            onPredictionChange={onPredictionChange}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

interface MatchPredictionCardProps {
  match: Match;
  prediction?: 'A' | 'B' | 'DRAW';
  onPredictionChange: (matchId: string, prediction: 'A' | 'B' | 'DRAW') => void;
  index: number;
}

function MatchPredictionCard({ match, prediction, onPredictionChange, index }: MatchPredictionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-colors"
    >
      <div className="bg-gradient-to-r from-primary/5 to-transparent p-2 sm:p-3 border-b border-primary/10">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-1 sm:gap-2 text-primary font-semibold">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Jornada {match.matchday}</span>
          </div>
          <div className="text-muted-foreground">
            {new Date(match.date).toLocaleDateString('es-MX', {
              day: 'numeric',
              month: 'short'
            })}
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center">
          {/* Equipo A */}
          <motion.button
            onClick={() => onPredictionChange(match.id, 'A')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-2 sm:p-3 md:p-4 rounded-lg text-center transition-all ${
              prediction === 'A'
                ? 'bg-primary text-white shadow-lg ring-2 ring-accent'
                : 'bg-secondary/50 hover:bg-primary/10'
            }`}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">{match.teamA.flag}</div>
            <div className="font-bold text-xs sm:text-sm line-clamp-2">{match.teamA.name}</div>
            {prediction === 'A' && (
              <div className="mt-1 sm:mt-2 text-accent text-xs font-bold">✓</div>
            )}
          </motion.button>

          {/* VS / Empate */}
          <div className="text-center flex flex-col items-center justify-center gap-1 sm:gap-2">
            <div className="display-font text-lg sm:text-xl md:text-2xl text-primary">VS</div>
            <motion.button
              onClick={() => onPredictionChange(match.id, 'DRAW')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                prediction === 'DRAW'
                  ? 'bg-accent text-primary shadow-lg'
                  : 'bg-secondary text-primary hover:bg-secondary/70'
              }`}
            >
              EMPATE
            </motion.button>
          </div>

          {/* Equipo B */}
          <motion.button
            onClick={() => onPredictionChange(match.id, 'B')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-2 sm:p-3 md:p-4 rounded-lg text-center transition-all ${
              prediction === 'B'
                ? 'bg-primary text-white shadow-lg ring-2 ring-accent'
                : 'bg-secondary/50 hover:bg-primary/10'
            }`}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">{match.teamB.flag}</div>
            <div className="font-bold text-xs sm:text-sm line-clamp-2">{match.teamB.name}</div>
            {prediction === 'B' && (
              <div className="mt-1 sm:mt-2 text-accent text-xs font-bold">✓</div>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
