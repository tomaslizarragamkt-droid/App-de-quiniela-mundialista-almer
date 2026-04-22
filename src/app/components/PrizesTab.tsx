import { motion } from 'motion/react';
import { Gift, Trophy, Award, Star, Sparkles } from 'lucide-react';

interface Prize {
  position: number;
  title: string;
  description: string;
  value: string;
}

export function PrizesTab() {
  // Datos de ejemplo - en producción estos vendrían de Supabase y serían editables por admin
  const prizes: Prize[] = [
    {
      position: 1,
      title: 'Gran Premio',
      description: 'El ganador absoluto del concurso se lleva el premio mayor',
      value: 'Viaje todo pagado al próximo Mundial + Paquete VIP',
    },
    {
      position: 2,
      title: 'Segundo Lugar',
      description: 'Una experiencia inolvidable para celebrar tu segundo puesto',
      value: 'TV 75" Ultra HD + Sistema de Sonido Premium',
    },
    {
      position: 3,
      title: 'Tercer Lugar',
      description: 'Reconocimiento especial por alcanzar el podio',
      value: 'Consola de Videojuegos + 5 Juegos + Suscripción Anual',
    },
  ];

  const getPositionColor = (position: number) => {
    const colors = {
      1: 'from-accent to-yellow-600',
      2: 'from-gray-300 to-gray-500',
      3: 'from-amber-600 to-amber-800',
    };
    return colors[position as keyof typeof colors] || 'from-primary to-[#013580]';
  };

  const getPositionIcon = (position: number) => {
    if (position === 1) return <Trophy className="w-12 h-12" />;
    if (position === 2) return <Award className="w-12 h-12" />;
    if (position === 3) return <Star className="w-12 h-12" />;
    return <Gift className="w-12 h-12" />;
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
          <Gift className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 -translate-y-6 sm:-translate-y-12 translate-x-6 sm:translate-x-12" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
            <h2 className="display-font text-2xl sm:text-3xl md:text-4xl">Premios</h2>
          </div>
          <p className="text-white/80 text-xs sm:text-sm md:text-base">
            Premios increíbles para los mejores participantes del concurso
          </p>
        </div>
      </motion.div>

      {/* Banner informativo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-accent/20 via-accent/10 to-transparent rounded-xl p-4 sm:p-6 border-2 border-accent/30"
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="bg-accent rounded-full p-2 sm:p-3 flex-shrink-0">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm sm:text-base text-primary mb-1">¡Compite por Premios Increíbles!</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Los tres primeros lugares del ranking al finalizar la fase de grupos recibirán premios
              espectaculares. ¡Demuestra tu conocimiento futbolístico y gana!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tarjetas de premios */}
      <div className="grid gap-4 sm:gap-6">
        {prizes.map((prize, index) => (
          <motion.div
            key={prize.position}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="group"
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border-2 sm:border-4 border-primary/10 hover:border-primary/30 transition-all hover:shadow-2xl">
              <div className={`bg-gradient-to-r ${getPositionColor(prize.position)} p-4 sm:p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 opacity-20 transform translate-x-4 sm:translate-x-8 -translate-y-2 sm:-translate-y-4 rotate-12 scale-75 sm:scale-100">
                  {getPositionIcon(prize.position)}
                </div>
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 flex-shrink-0">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                        {getPositionIcon(prize.position)}
                      </div>
                    </div>
                    <div className="text-white min-w-0">
                      <div className="text-xs sm:text-sm font-semibold uppercase tracking-wide opacity-90">
                        {prize.position === 1 ? '1er Lugar' : prize.position === 2 ? '2do Lugar' : '3er Lugar'}
                      </div>
                      <h3 className="display-font text-xl sm:text-2xl md:text-3xl mt-0.5 sm:mt-1 truncate">{prize.title}</h3>
                    </div>
                  </div>
                  <div className="display-font text-4xl sm:text-5xl md:text-7xl text-white/20 flex-shrink-0">
                    {prize.position}
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm">
                  {prize.description}
                </p>
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-3 sm:p-4 border-2 border-primary/10">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                    Premio
                  </div>
                  <div className="font-bold text-sm sm:text-base md:text-lg text-primary">
                    {prize.value}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Términos y condiciones */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-primary/10"
      >
        <h4 className="font-bold text-sm sm:text-base text-primary mb-3 flex items-center gap-2">
          <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
          Términos y Condiciones
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>Los premios serán entregados al finalizar la fase de grupos del Mundial 2026.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>Solo clientes registrados en la plataforma pueden participar.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>Los premios no son transferibles ni canjeables por dinero en efectivo.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>En caso de empate, se realizará un sorteo entre los participantes empatados.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>La empresa se reserva el derecho de modificar los premios sin previo aviso.</span>
          </li>
        </ul>
      </motion.div>

      {/* Footer motivacional */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center bg-gradient-to-r from-primary to-[#013580] rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 text-white"
      >
        <div className="display-font text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">¡Jugamos en la Misma Cancha!</div>
        <div className="text-white/90 text-sm sm:text-base">El Marcador lo Hacemos Juntos</div>
        <div className="mt-3 sm:mt-4 text-accent font-bold text-xs sm:text-sm">Mundial 2026 • México, Estados Unidos, Canadá</div>
      </motion.div>
    </div>
  );
}
