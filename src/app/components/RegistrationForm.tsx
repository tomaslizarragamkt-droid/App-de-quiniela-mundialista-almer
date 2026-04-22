import { useState } from 'react';
import { motion } from 'motion/react';

interface RegistrationData {
  clientNumber: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
}

interface RegistrationFormProps {
  onComplete: (data: RegistrationData) => void;
}

export function RegistrationForm({ onComplete }: RegistrationFormProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    clientNumber: '',
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const handleChange = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isValid = Object.values(formData).every(val => val.trim() !== '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden border-2 md:border-4 border-primary">
        <div className="bg-gradient-to-r from-primary to-[#013580] p-4 sm:p-6 md:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-accent rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
          <h1 className="display-font text-3xl sm:text-4xl md:text-5xl text-white mb-2 relative z-10">MUNDIAL 2026</h1>
          <p className="text-accent text-base sm:text-lg relative z-10">Jugamos en la Misma Cancha</p>
          <p className="text-white/90 text-xs sm:text-sm mt-1 relative z-10">El Marcador lo Hacemos Juntos</p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-primary">
              Número de Cliente *
            </label>
            <input
              type="text"
              value={formData.clientNumber}
              onChange={(e) => handleChange('clientNumber', e.target.value)}
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-secondary/50 border-2 border-primary/20 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm sm:text-base"
              placeholder="Ingresa tu número de cliente"
              required
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-primary">
              Nombre del Cliente *
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => handleChange('clientName', e.target.value)}
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-secondary/50 border-2 border-primary/20 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm sm:text-base"
              placeholder="Tu nombre completo"
              required
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-primary">
              Nombre de Empresa *
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-secondary/50 border-2 border-primary/20 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm sm:text-base"
              placeholder="Nombre de tu empresa"
              required
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-primary">
              Correo Electrónico *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-secondary/50 border-2 border-primary/20 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm sm:text-base"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-primary">
              Teléfono de Contacto *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-secondary/50 border-2 border-primary/20 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm sm:text-base"
              placeholder="+52 123 456 7890"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={!isValid}
            whileHover={{ scale: isValid ? 1.02 : 1 }}
            whileTap={{ scale: isValid ? 0.98 : 1 }}
            className={`w-full py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all ${
              isValid
                ? 'bg-gradient-to-r from-primary to-[#013580] text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            ⚽ REGISTRARME AL CONCURSO
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
