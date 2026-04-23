# 03 · Arquitectura del Sistema — Quiniela Mundialista Almer 2026

## Visión general

El sistema está compuesto por cuatro capas que se comunican entre sí. El frontend en React sirve como interfaz de usuario, una API REST actúa como puente seguro hacia la base de datos MySQL, y Power Automate automatiza la actualización de resultados oficiales consultando la API de football-data.org.

---

## Diagrama de flujo completo

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO FINAL                           │
│              (Cliente Almer desde navegador o móvil)            │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTPS
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND — React + TypeScript                 │
│                                                                 │
│  Pantallas:                                                     │
│  • Registro (nickname + número de cliente)                      │
│  • Quiniela (72 partidos con banderas, selección A/EMPATE/B)    │
│  • Ranking en tiempo real (posición, nombre, empresa, puntos)   │
│                                                                 │
│  Repositorio: github.com/.../App-de-quiniela-mundialista-almer  │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTP REST (JSON)
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND — API REST                           │
│                    (Node.js + Express / Azure Functions)        │
│                                                                 │
│  Endpoints principales:                                         │
│  POST /registro       → llama SP registrar_participante()       │
│  POST /predicciones   → guarda las 72 predicciones              │
│  GET  /ranking        → consulta VIEW ranking_general           │
│  GET  /partidos       → lista los 72 partidos con banderas      │
└─────────────────────────┬───────────────────────────────────────┘
                          │ MySQL Protocol (puerto 3306)
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BASE DE DATOS — MySQL 8.0                    │
│                    (Local o Azure SQL compatible)               │
│                                                                 │
│  Tablas:                                                        │
│  • clientes_autorizados   • partidos                            │
│  • participantes          • resultados_oficiales                │
│  • predicciones                                                 │
│                                                                 │
│  Vista: ranking_general (recalcula puntos en tiempo real)       │
│  SP:    registrar_participante (valida límite de 3 por cliente) │
└─────────────────────────▲───────────────────────────────────────┘
                          │ INSERT INTO resultados_oficiales
                          │
┌─────────────────────────┴───────────────────────────────────────┐
│                    POWER AUTOMATE                               │
│                    (Flujo programado cada 5 min durante partidos)│
│                                                                 │
│  1. Consulta: GET https://api.football-data.org/v4/             │
│               competitions/WC/matches?status=FINISHED           │
│  2. Filtra partidos recién terminados                           │
│  3. Mapea resultado a ENUM ('A','EMPATE','B')                   │
│  4. Inserta / actualiza en resultados_oficiales                 │
│  5. El ranking_general se actualiza automáticamente             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo de registro de un participante

```
1. Usuario llena el formulario en React
   (nickname + número de cliente)
         │
2. React hace POST /registro al backend
         │
3. Backend ejecuta SP registrar_participante()
         │
   ┌─────┴──────────────────────────────────┐
   │ ¿Número de cliente autorizado?          │
   │   NO → retorna error → React muestra   │
   │         "Número no válido"              │
   │   SI → continúa                        │
   └─────┬──────────────────────────────────┘
         │
   ┌─────┴──────────────────────────────────┐
   │ ¿Ya hay 3 participantes registrados?   │
   │   SI → retorna error → React muestra   │
   │         "Has excedido el límite de     │
   │          registros para este cliente"  │
   │   NO → inserta en participantes        │
   └─────┬──────────────────────────────────┘
         │
4. React redirige a la pantalla de quiniela
5. Usuario selecciona resultado para los 72 partidos
6. React hace POST /predicciones (batch de 72 registros)
7. Backend inserta en tabla predicciones
8. Confirmación al usuario
```

---

## Flujo de actualización de resultados (Power Automate)

```
Cada 5 minutos durante la fase de grupos:

1. Power Automate dispara el flujo
2. GET https://api.football-data.org/v4/competitions/WC/matches
   ?status=FINISHED
   Header: X-Auth-Token: {API_KEY}
         │
3. Respuesta JSON con partidos terminados:
   {
     "matches": [{
       "id": 10001,
       "score": {
         "fullTime": { "home": 2, "away": 1 }
       },
       "status": "FINISHED"
     }]
   }
         │
4. Power Automate mapea el resultado:
   home > away  → 'A'
   home = away  → 'EMPATE'
   home < away  → 'B'
         │
5. SQL Connector de Power Automate ejecuta:
   INSERT INTO resultados_oficiales
     (partido_id, resultado, goles_a, goles_b, finalizado)
   VALUES (?, ?, ?, ?, 1)
   ON DUPLICATE KEY UPDATE
     resultado = VALUES(resultado),
     goles_a = VALUES(goles_a),
     goles_b = VALUES(goles_b),
     finalizado = 1;
         │
6. La VIEW ranking_general recalcula puntos automáticamente
7. El frontend que consulta GET /ranking ve el ranking actualizado
```

---

## Tecnologías y versiones

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | React + TypeScript | 18+ |
| Backend | Node.js + Express | 20 LTS |
| Base de datos | MySQL Community | 8.0.46 |
| Automatización | Power Automate | Microsoft 365 |
| API externa | football-data.org | v4 |
| Repositorio | GitHub | — |

---

> **Nota deseable:** En una versión futura, el sistema puede extenderse para cubrir la fase eliminatoria (32 partidos adicionales hasta la Final). Solo requiere agregar partidos a la tabla `partidos` conforme se definan los cruces, y ajustar el frontend para mostrar las nuevas predicciones. La lógica de puntos y ranking no requiere cambios.
