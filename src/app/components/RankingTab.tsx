import { motion } from 'motion/react';
import { Trophy, Medal, TrendingUp, Award } from 'lucide-react';

interface Player {
  id: string;
  clientNumber: string;
  clientName: string;
  companyName: string;
  correctPredictions: number;
  totalPredictions: number;
  accuracy: number;
}

interface RankingTabProps {
  currentPlayer?: Player;
}

export function RankingTab({ currentPlayer }: RankingTabProps) {
  // Datos de ejemplo para el ranking
  const mockPlayers: Player[] = [
    { id: '1', clientNumber: 'C001', clientName: 'Juan Pérez', companyName: 'Empresa Alpha', correctPredictions: 45, totalPredictions: 72, accuracy: 62.5 },
    { id: '2', clientNumber: 'C002', clientName: 'María González', companyName: 'Beta Corp', correctPredictions: 43, totalPredictions: 72, accuracy: 59.7 },
    { id: '3', clientNumber: 'C003', clientName: 'Carlos Ramírez', companyName: 'Gamma Industries', correctPredictions: 42, totalPredictions: 72, accuracy: 58.3 },
    { id: '4', clientNumber: 'C004', clientName: 'Ana Martínez', companyName: 'Delta Solutions', correctPredictions: 40, totalPredictions: 72, accuracy: 55.6 },
    { id: '5', clientNumber: 'C005', clientName: 'Luis Torres', companyName: 'Epsilon Group', correctPredictions: 39, totalPredictions: 72, accuracy: 54.2 },
    { id: '6', clientNumber: 'C006', clientName: 'Patricia Hernández', companyName: 'Zeta Tech', correctPredictions: 38, totalPredictions: 72, accuracy: 52.8 },
    { id: '7', clientNumber: 'C007', clientName: 'Roberto Sánchez', companyName: 'Eta Ventures', correctPredictions: 37, totalPredictions: 72, accuracy: 51.4 },
    { id: '8', clientNumber: 'C008', clientName: 'Laura Díaz', companyName: 'Theta Inc', correctPredictions: 36, totalPredictions: 72, accuracy: 50.0 },
  ];

  const getRankIcon = (position: number) => {
    if (position === 1) return <Trophy className="w-6 h-6 text-accent" />;
    if (position === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (position === 3) return <Medal className="w-6 h-6 text-amber-700" />;
    return null;
  };

  const getRankBadge = (position: number) => {
    const badges = {
      1: 'bg-gradient-to-br from-accent to-yellow-600 text-primary shadow-xl scale-110',
      2: 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800 shadow-lg scale-105',
      3: 'bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-lg scale-105',
    };
    return badges[position as keyof typeof badges] || 'bg-primary/10 text-primary';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary to-[#013580] rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 opacity-10">
          <Trophy className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 -translate-y-6 sm:-translate-y-12 translate-x-6 sm:translate-x-12" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
            <h2 className="display-font text-2xl sm:text-3xl md:text-4xl">Ranking</h2>
          </div>
          <p className="text-white/80 text-xs sm:text-sm md:text-base">Tabla de Posiciones del Concurso Mundial 2026</p>
        </div>
      </motion.div>

      {/* Podio - Top 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {mockPlayers.slice(0, 3).map((player, index) => {
          const position = index + 1;
          const heights = ['sm:h-64', 'sm:h-56', 'sm:h-52'];
          const orders = ['sm:order-2', 'sm:order-1', 'sm:order-3']; // Segundo lugar a la izquierda, primero al centro, tercero a la derecha

          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={orders[index]}
            >
              <div className={`bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border-2 sm:border-4 ${
                position === 1 ? 'border-accent' : position === 2 ? 'border-gray-300' : 'border-amber-700'
              } ${heights[index]} flex flex-col`}>
                <div className={`${getRankBadge(position)} p-3 sm:p-4 text-center flex-shrink-0`}>
                  <div className="display-font text-4xl sm:text-5xl mb-1">{position}</div>
                  <div className="flex justify-center mb-2">{getRankIcon(position)}</div>
                </div>
                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-primary text-base sm:text-lg mb-1 line-clamp-1">
                      {player.clientName}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground line-clamp-1 mb-2">
                      {player.companyName}
                    </div>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-2 sm:p-3 text-center">
                    <div className="display-font text-2xl sm:text-3xl text-primary">
                      {player.correctPredictions}
                    </div>
                    <div className="text-xs text-muted-foreground">Aciertos</div>
                    <div className="text-xs sm:text-sm font-bold text-accent mt-1">
                      {player.accuracy.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Resto de la tabla */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-primary/5 px-4 sm:px-6 py-3 sm:py-4 border-b border-primary/10">
          <h3 className="font-bold text-sm sm:text-base text-primary flex items-center gap-2">
            <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            Clasificación General
          </h3>
        </div>
        <div className="divide-y divide-primary/10">
          {mockPlayers.slice(3).map((player, index) => {
            const position = index + 4;
            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="px-4 sm:px-6 py-3 sm:py-4 hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${getRankBadge(position)} flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0`}>
                      {position}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm sm:text-base text-primary truncate">{player.clientName}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground truncate">{player.companyName}</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="display-font text-xl sm:text-2xl text-primary">
                      {player.correctPredictions}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                      {player.accuracy.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Información adicional */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-accent/20 to-accent/5 rounded-xl p-4 sm:p-6 border-2 border-accent/30"
      >
        <div className="flex items-start gap-2 sm:gap-3">
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-0.5 sm:mt-1" />
          <div>
            <h4 className="font-bold text-sm sm:text-base text-primary mb-1 sm:mb-2">¿Cómo se calcula el ranking?</h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              El ranking se actualiza automáticamente después de cada partido. Los puntos se otorgan por cada
              predicción correcta. En caso de empate, se considera el porcentaje de acierto general.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
