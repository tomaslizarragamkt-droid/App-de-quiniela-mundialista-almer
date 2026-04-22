// Datos OFICIALES del Mundial 2026 - Fase de Grupos
// Fuente: FIFA / draw realizado el 5 de diciembre de 2025
export interface Team {
  name: string;
  code: string;
  flag: string;
}

export interface Match {
  id: string;
  group: string;
  matchday: number;
  date: string;
  teamA: Team;
  teamB: Team;
  result?: 'A' | 'B' | 'DRAW';
}

export const teams: Record<string, Team> = {
  // Grupo A
  MEX: { name: 'México', code: 'MEX', flag: '🇲🇽' },
  RSA: { name: 'Sudáfrica', code: 'RSA', flag: '🇿🇦' },
  KOR: { name: 'Corea del Sur', code: 'KOR', flag: '🇰🇷' },
  CZE: { name: 'Chequia', code: 'CZE', flag: '🇨🇿' },
  // Grupo B
  CAN: { name: 'Canadá', code: 'CAN', flag: '🇨🇦' },
  SUI: { name: 'Suiza', code: 'SUI', flag: '🇨🇭' },
  QAT: { name: 'Qatar', code: 'QAT', flag: '🇶🇦' },
  BIH: { name: 'Bosnia-Herzegovina', code: 'BIH', flag: '🇧🇦' },
  // Grupo C
  BRA: { name: 'Brasil', code: 'BRA', flag: '🇧🇷' },
  MAR: { name: 'Marruecos', code: 'MAR', flag: '🇲🇦' },
  SCO: { name: 'Escocia', code: 'SCO', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  HAI: { name: 'Haití', code: 'HAI', flag: '🇭🇹' },
  // Grupo D
  USA: { name: 'Estados Unidos', code: 'USA', flag: '🇺🇸' },
  PAR: { name: 'Paraguay', code: 'PAR', flag: '🇵🇾' },
  AUS: { name: 'Australia', code: 'AUS', flag: '🇦🇺' },
  TUR: { name: 'Turquía', code: 'TUR', flag: '🇹🇷' },
  // Grupo E
  GER: { name: 'Alemania', code: 'GER', flag: '🇩🇪' },
  CIV: { name: 'Costa de Marfil', code: 'CIV', flag: '🇨🇮' },
  ECU: { name: 'Ecuador', code: 'ECU', flag: '🇪🇨' },
  CUW: { name: 'Curaçao', code: 'CUW', flag: '🇨🇼' },
  // Grupo F
  NED: { name: 'Países Bajos', code: 'NED', flag: '🇳🇱' },
  JPN: { name: 'Japón', code: 'JPN', flag: '🇯🇵' },
  SWE: { name: 'Suecia', code: 'SWE', flag: '🇸🇪' },
  TUN: { name: 'Túnez', code: 'TUN', flag: '🇹🇳' },
  // Grupo G
  BEL: { name: 'Bélgica', code: 'BEL', flag: '🇧🇪' },
  IRN: { name: 'Irán', code: 'IRN', flag: '🇮🇷' },
  EGY: { name: 'Egipto', code: 'EGY', flag: '🇪🇬' },
  NZL: { name: 'Nueva Zelanda', code: 'NZL', flag: '🇳🇿' },
  // Grupo H
  ESP: { name: 'España', code: 'ESP', flag: '🇪🇸' },
  URU: { name: 'Uruguay', code: 'URU', flag: '🇺🇾' },
  KSA: { name: 'Arabia Saudita', code: 'KSA', flag: '🇸🇦' },
  CPV: { name: 'Cabo Verde', code: 'CPV', flag: '🇨🇻' },
  // Grupo I
  FRA: { name: 'Francia', code: 'FRA', flag: '🇫🇷' },
  SEN: { name: 'Senegal', code: 'SEN', flag: '🇸🇳' },
  NOR: { name: 'Noruega', code: 'NOR', flag: '🇳🇴' },
  IRQ: { name: 'Iraq', code: 'IRQ', flag: '🇮🇶' },
  // Grupo J
  ARG: { name: 'Argentina', code: 'ARG', flag: '🇦🇷' },
  ALG: { name: 'Argelia', code: 'ALG', flag: '🇩🇿' },
  AUT: { name: 'Austria', code: 'AUT', flag: '🇦🇹' },
  JOR: { name: 'Jordania', code: 'JOR', flag: '🇯🇴' },
  // Grupo K
  POR: { name: 'Portugal', code: 'POR', flag: '🇵🇹' },
  COL: { name: 'Colombia', code: 'COL', flag: '🇨🇴' },
  COD: { name: 'Congo DR', code: 'COD', flag: '🇨🇩' },
  UZB: { name: 'Uzbekistán', code: 'UZB', flag: '🇺🇿' },
  // Grupo L
  ENG: { name: 'Inglaterra', code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  CRO: { name: 'Croacia', code: 'CRO', flag: '🇭🇷' },
  PAN: { name: 'Panamá', code: 'PAN', flag: '🇵🇦' },
  GHA: { name: 'Ghana', code: 'GHA', flag: '🇬🇭' },
};

export const groupStageMatches: Match[] = [
  // ── GRUPO A ──
  { id: 'A1', group: 'A', matchday: 1, date: '2026-06-11', teamA: teams.MEX, teamB: teams.RSA },
  { id: 'A2', group: 'A', matchday: 1, date: '2026-06-11', teamA: teams.KOR, teamB: teams.CZE },
  { id: 'A3', group: 'A', matchday: 2, date: '2026-06-16', teamA: teams.MEX, teamB: teams.KOR },
  { id: 'A4', group: 'A', matchday: 2, date: '2026-06-16', teamA: teams.CZE, teamB: teams.RSA },
  { id: 'A5', group: 'A', matchday: 3, date: '2026-06-21', teamA: teams.CZE, teamB: teams.MEX },
  { id: 'A6', group: 'A', matchday: 3, date: '2026-06-21', teamA: teams.RSA, teamB: teams.KOR },

  // ── GRUPO B ──
  { id: 'B1', group: 'B', matchday: 1, date: '2026-06-12', teamA: teams.CAN, teamB: teams.BIH },
  { id: 'B2', group: 'B', matchday: 1, date: '2026-06-12', teamA: teams.QAT, teamB: teams.SUI },
  { id: 'B3', group: 'B', matchday: 2, date: '2026-06-17', teamA: teams.SUI, teamB: teams.CAN },
  { id: 'B4', group: 'B', matchday: 2, date: '2026-06-17', teamA: teams.BIH, teamB: teams.QAT },
  { id: 'B5', group: 'B', matchday: 3, date: '2026-06-22', teamA: teams.SUI, teamB: teams.BIH },
  { id: 'B6', group: 'B', matchday: 3, date: '2026-06-22', teamA: teams.QAT, teamB: teams.CAN },

  // ── GRUPO C ──
  { id: 'C1', group: 'C', matchday: 1, date: '2026-06-13', teamA: teams.BRA, teamB: teams.MAR },
  { id: 'C2', group: 'C', matchday: 1, date: '2026-06-13', teamA: teams.HAI, teamB: teams.SCO },
  { id: 'C3', group: 'C', matchday: 2, date: '2026-06-18', teamA: teams.SCO, teamB: teams.MAR },
  { id: 'C4', group: 'C', matchday: 2, date: '2026-06-18', teamA: teams.BRA, teamB: teams.HAI },
  { id: 'C5', group: 'C', matchday: 3, date: '2026-06-23', teamA: teams.SCO, teamB: teams.BRA },
  { id: 'C6', group: 'C', matchday: 3, date: '2026-06-23', teamA: teams.MAR, teamB: teams.HAI },

  // ── GRUPO D ──
  { id: 'D1', group: 'D', matchday: 1, date: '2026-06-12', teamA: teams.USA, teamB: teams.PAR },
  { id: 'D2', group: 'D', matchday: 1, date: '2026-06-12', teamA: teams.AUS, teamB: teams.TUR },
  { id: 'D3', group: 'D', matchday: 2, date: '2026-06-17', teamA: teams.TUR, teamB: teams.PAR },
  { id: 'D4', group: 'D', matchday: 2, date: '2026-06-17', teamA: teams.USA, teamB: teams.AUS },
  { id: 'D5', group: 'D', matchday: 3, date: '2026-06-22', teamA: teams.TUR, teamB: teams.USA },
  { id: 'D6', group: 'D', matchday: 3, date: '2026-06-22', teamA: teams.PAR, teamB: teams.AUS },

  // ── GRUPO E ──
  { id: 'E1', group: 'E', matchday: 1, date: '2026-06-14', teamA: teams.GER, teamB: teams.CIV },
  { id: 'E2', group: 'E', matchday: 1, date: '2026-06-14', teamA: teams.CUW, teamB: teams.ECU },
  { id: 'E3', group: 'E', matchday: 2, date: '2026-06-19', teamA: teams.GER, teamB: teams.CUW },
  { id: 'E4', group: 'E', matchday: 2, date: '2026-06-19', teamA: teams.ECU, teamB: teams.CIV },
  { id: 'E5', group: 'E', matchday: 3, date: '2026-06-24', teamA: teams.ECU, teamB: teams.GER },
  { id: 'E6', group: 'E', matchday: 3, date: '2026-06-24', teamA: teams.CIV, teamB: teams.CUW },

  // ── GRUPO F ──
  { id: 'F1', group: 'F', matchday: 1, date: '2026-06-14', teamA: teams.NED, teamB: teams.JPN },
  { id: 'F2', group: 'F', matchday: 1, date: '2026-06-14', teamA: teams.SWE, teamB: teams.TUN },
  { id: 'F3', group: 'F', matchday: 2, date: '2026-06-19', teamA: teams.NED, teamB: teams.SWE },
  { id: 'F4', group: 'F', matchday: 2, date: '2026-06-19', teamA: teams.TUN, teamB: teams.JPN },
  { id: 'F5', group: 'F', matchday: 3, date: '2026-06-24', teamA: teams.TUN, teamB: teams.NED },
  { id: 'F6', group: 'F', matchday: 3, date: '2026-06-24', teamA: teams.JPN, teamB: teams.SWE },

  // ── GRUPO G ──
  { id: 'G1', group: 'G', matchday: 1, date: '2026-06-15', teamA: teams.BEL, teamB: teams.EGY },
  { id: 'G2', group: 'G', matchday: 1, date: '2026-06-15', teamA: teams.IRN, teamB: teams.NZL },
  { id: 'G3', group: 'G', matchday: 2, date: '2026-06-20', teamA: teams.BEL, teamB: teams.IRN },
  { id: 'G4', group: 'G', matchday: 2, date: '2026-06-20', teamA: teams.NZL, teamB: teams.EGY },
  { id: 'G5', group: 'G', matchday: 3, date: '2026-06-25', teamA: teams.NZL, teamB: teams.BEL },
  { id: 'G6', group: 'G', matchday: 3, date: '2026-06-25', teamA: teams.EGY, teamB: teams.IRN },

  // ── GRUPO H ──
  { id: 'H1', group: 'H', matchday: 1, date: '2026-06-15', teamA: teams.ESP, teamB: teams.CPV },
  { id: 'H2', group: 'H', matchday: 1, date: '2026-06-15', teamA: teams.KSA, teamB: teams.URU },
  { id: 'H3', group: 'H', matchday: 2, date: '2026-06-20', teamA: teams.ESP, teamB: teams.KSA },
  { id: 'H4', group: 'H', matchday: 2, date: '2026-06-20', teamA: teams.URU, teamB: teams.CPV },
  { id: 'H5', group: 'H', matchday: 3, date: '2026-06-25', teamA: teams.URU, teamB: teams.ESP },
  { id: 'H6', group: 'H', matchday: 3, date: '2026-06-25', teamA: teams.CPV, teamB: teams.KSA },

  // ── GRUPO I ──
  { id: 'I1', group: 'I', matchday: 1, date: '2026-06-16', teamA: teams.FRA, teamB: teams.SEN },
  { id: 'I2', group: 'I', matchday: 1, date: '2026-06-16', teamA: teams.IRQ, teamB: teams.NOR },
  { id: 'I3', group: 'I', matchday: 2, date: '2026-06-21', teamA: teams.FRA, teamB: teams.IRQ },
  { id: 'I4', group: 'I', matchday: 2, date: '2026-06-21', teamA: teams.NOR, teamB: teams.SEN },
  { id: 'I5', group: 'I', matchday: 3, date: '2026-06-26', teamA: teams.NOR, teamB: teams.FRA },
  { id: 'I6', group: 'I', matchday: 3, date: '2026-06-26', teamA: teams.SEN, teamB: teams.IRQ },

  // ── GRUPO J ──
  { id: 'J1', group: 'J', matchday: 1, date: '2026-06-16', teamA: teams.ARG, teamB: teams.ALG },
  { id: 'J2', group: 'J', matchday: 1, date: '2026-06-16', teamA: teams.AUT, teamB: teams.JOR },
  { id: 'J3', group: 'J', matchday: 2, date: '2026-06-21', teamA: teams.ARG, teamB: teams.AUT },
  { id: 'J4', group: 'J', matchday: 2, date: '2026-06-21', teamA: teams.JOR, teamB: teams.ALG },
  { id: 'J5', group: 'J', matchday: 3, date: '2026-06-26', teamA: teams.JOR, teamB: teams.ARG },
  { id: 'J6', group: 'J', matchday: 3, date: '2026-06-26', teamA: teams.ALG, teamB: teams.AUT },

  // ── GRUPO K ──
  { id: 'K1', group: 'K', matchday: 1, date: '2026-06-17', teamA: teams.POR, teamB: teams.COD },
  { id: 'K2', group: 'K', matchday: 1, date: '2026-06-17', teamA: teams.UZB, teamB: teams.COL },
  { id: 'K3', group: 'K', matchday: 2, date: '2026-06-22', teamA: teams.POR, teamB: teams.UZB },
  { id: 'K4', group: 'K', matchday: 2, date: '2026-06-22', teamA: teams.COL, teamB: teams.COD },
  { id: 'K5', group: 'K', matchday: 3, date: '2026-06-27', teamA: teams.COL, teamB: teams.POR },
  { id: 'K6', group: 'K', matchday: 3, date: '2026-06-27', teamA: teams.COD, teamB: teams.UZB },

  // ── GRUPO L ──
  { id: 'L1', group: 'L', matchday: 1, date: '2026-06-17', teamA: teams.ENG, teamB: teams.CRO },
  { id: 'L2', group: 'L', matchday: 1, date: '2026-06-17', teamA: teams.GHA, teamB: teams.PAN },
  { id: 'L3', group: 'L', matchday: 2, date: '2026-06-22', teamA: teams.ENG, teamB: teams.GHA },
  { id: 'L4', group: 'L', matchday: 2, date: '2026-06-22', teamA: teams.PAN, teamB: teams.CRO },
  { id: 'L5', group: 'L', matchday: 3, date: '2026-06-27', teamA: teams.PAN, teamB: teams.ENG },
  { id: 'L6', group: 'L', matchday: 3, date: '2026-06-27', teamA: teams.CRO, teamB: teams.GHA },
];
