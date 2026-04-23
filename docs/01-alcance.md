# 01 · Alcance del Proyecto — Quiniela Mundialista Almer 2026

## Descripción general

La Quiniela Mundialista Almer es una competencia interna de predicciones deportivas dirigida a los **100 mejores clientes de Almer**, identificados por su número de cliente. Cada participante registra sus pronósticos para los partidos del Mundial FIFA 2026 y acumula puntos conforme acierta resultados. El sistema actualiza el ranking en tiempo real cruzando las predicciones contra los resultados oficiales obtenidos vía API.

---

## Participantes

- **Audiencia:** 100 números de cliente seleccionados por Almer.
- **Máximo de registros por número de cliente:** 3 personas. Cada número de cliente puede registrar hasta 3 participantes distintos (por ejemplo, socios o colaboradores del mismo cliente). El sistema valida esto en base de datos antes de permitir el registro y retorna un mensaje de error si se excede el límite.
- **Identificación del participante:** nombre real o apodo/nickname + número de cliente.

---

## Reglas del concurso

### Fase actual (MVP)
- La quiniela cubre los **72 partidos de la fase de grupos** (12 grupos × 6 partidos cada uno).
- Por cada partido, el participante elige uno de tres resultados posibles: victoria local (A), empate, o victoria visitante (B).
- **Sistema de puntos:** 1 punto por cada resultado acertado. No hay puntos parciales ni bonus por marcador exacto en esta versión.
- El ranking muestra: posición, nombre/nickname, empresa (número de cliente) y puntos acumulados.

### Deseable (versión futura)
- Extender las predicciones hasta la **Final** (104 partidos totales).
- Requiere desarrollo adicional en frontend y backend para las fases eliminatorias.
- El sistema de puntos podría incorporar puntos extra por acertar marcador exacto.

---

## Partidos incluidos (Fase de Grupos)

72 partidos distribuidos en 12 grupos (A–L), del **11 al 27 de junio de 2026**.

| Grupo | Equipos |
|-------|---------|
| A | México 🇲🇽, Sudáfrica 🇿🇦, Corea del Sur 🇰🇷, Chequia 🇨🇿 |
| B | Canadá 🇨🇦, Suiza 🇨🇭, Qatar 🇶🇦, Bosnia-Herzegovina 🇧🇦 |
| C | Brasil 🇧🇷, Marruecos 🇲🇦, Escocia 🏴󠁧󠁢󠁳󠁣󠁴󠁿, Haití 🇭🇹 |
| D | Estados Unidos 🇺🇸, Paraguay 🇵🇾, Australia 🇦🇺, Turquía 🇹🇷 |
| E | Alemania 🇩🇪, Costa de Marfil 🇨🇮, Ecuador 🇪🇨, Curaçao 🇨🇼 |
| F | Países Bajos 🇳🇱, Japón 🇯🇵, Suecia 🇸🇪, Túnez 🇹🇳 |
| G | Bélgica 🇧🇪, Irán 🇮🇷, Egipto 🇪🇬, Nueva Zelanda 🇳🇿 |
| H | España 🇪🇸, Uruguay 🇺🇾, Arabia Saudita 🇸🇦, Cabo Verde 🇨🇻 |
| I | Francia 🇫🇷, Senegal 🇸🇳, Noruega 🇳🇴, Iraq 🇮🇶 |
| J | Argentina 🇦🇷, Argelia 🇩🇿, Austria 🇦🇹, Jordania 🇯🇴 |
| K | Portugal 🇵🇹, Colombia 🇨🇴, Congo DR 🇨🇩, Uzbekistán 🇺🇿 |
| L | Inglaterra 🏴󠁧󠁢󠁥󠁮󠁧󠁿, Croacia 🇭🇷, Panamá 🇵🇦, Ghana 🇬🇭 |

---

## Fuente de resultados oficiales

Los resultados se obtienen en tiempo real de la API:

```
GET https://api.football-data.org/v4/competitions/WC/matches
```

Power Automate consulta esta API y actualiza la base de datos automáticamente al finalizar cada partido. Ver [04 - Power Automate](04-power-automate.md) para el detalle del flujo.

---

## Combinaciones posibles por participante

Cada participante elige entre 3 opciones (A, EMPATE, B) para cada uno de los 72 partidos:

```
3^72 = 150,094,635,296,999,121 combinaciones posibles
```

Esto garantiza que la competencia sea estadísticamente justa y que sea prácticamente imposible que dos participantes tengan predicciones idénticas.

---

> **Nota para TI:** Este documento define el alcance acordado con el área de negocio. Cualquier cambio de alcance debe ser documentado y versionado en este archivo mediante un Pull Request.
