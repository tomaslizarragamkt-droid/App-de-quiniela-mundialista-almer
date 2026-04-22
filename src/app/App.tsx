import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RegistrationForm } from './components/RegistrationForm';
import { PredictionsTab } from './components/PredictionsTab';
import { RankingTab } from './components/RankingTab';
import { PrizesTab } from './components/PrizesTab';
import { Trophy, BarChart3, Gift, LogOut } from 'lucide-react';

type Tab = 'predictions' | 'ranking' | 'prizes';

interface UserData {
  clientNumber: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
}

export default function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('predictions');
  const [predictions, setPredictions] = useState<Record<string, 'A' | 'B' | 'DRAW'>>({});

  const handleRegistration = (data: UserData) => {
    setUserData(data);
    setIsRegistered(true);
  };

  const handlePredictionChange = (matchId: string, prediction: 'A' | 'B' | 'DRAW') => {
    setPredictions(prev => ({ ...prev, [matchId]: prediction }));
  };

  const handleLogout = () => {
    setIsRegistered(false);
    setUserData(null);
    setPredictions({});
    setActiveTab('predictions');
  };

  const tabs = [
    { id: 'predictions' as Tab, label: 'Crear Apuesta', icon: Trophy },
    { id: 'ranking' as Tab, label: 'Ranking', icon: BarChart3 },
    { id: 'prizes' as Tab, label: 'Premios', icon: Gift },
  ];

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-3 sm:p-4 md:p-6">
        <RegistrationForm onComplete={handleRegistration} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-[#013580] shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex items-start sm:items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="display-font text-xl sm:text-2xl md:text-3xl text-white">MUNDIAL 2026</h1>
              <p className="text-accent text-xs sm:text-sm">Jugamos en la Misma Cancha</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-white font-semibold text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">{userData?.clientName}</div>
              <div className="text-white/70 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">{userData?.companyName}</div>
              <button
                onClick={handleLogout}
                className="mt-1 sm:mt-2 text-accent hover:text-accent/80 text-xs flex items-center gap-1 ml-auto"
              >
                <LogOut className="w-3 h-3" />
                Salir
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex gap-1.5 sm:gap-2 mt-4 sm:mt-6 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 scrollbar-hide">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-bold transition-all whitespace-nowrap text-sm sm:text-base ${
                  activeTab === id
                    ? 'bg-white text-primary shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline sm:inline">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'predictions' && (
              <PredictionsTab
                predictions={predictions}
                onPredictionChange={handlePredictionChange}
              />
            )}
            {activeTab === 'ranking' && <RankingTab />}
            {activeTab === 'prizes' && <PrizesTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-primary/10 border-t border-primary/20 mt-8 sm:mt-12 md:mt-16 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 text-center">
          <div className="display-font text-xl sm:text-2xl text-primary mb-1 sm:mb-2">
            Jugamos en la Misma Cancha
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            El Marcador lo Hacemos Juntos
          </div>
          <div className="text-xs text-muted-foreground">
            Mundial 2026 • México 🇲🇽 Estados Unidos 🇺🇸 Canadá 🇨🇦
          </div>
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-primary/10">
            <p className="text-xs text-muted-foreground">
              © 2026 Concurso Mundial - Todos los derechos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}