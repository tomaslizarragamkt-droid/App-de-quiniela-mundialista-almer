# 04 · Configuración Power Automate — Quiniela Mundialista Almer 2026

> **Destinatario:** Área de TI Almer  
> **Prerrequisito:** Licencia Microsoft 365 con Power Automate habilitado y acceso al servidor MySQL donde está montada la base de datos `quiniela_almer_2026`.

---

## Objetivo del flujo

Power Automate actúa como puente entre la API oficial de resultados y la base de datos. Su función es consultar automáticamente los partidos terminados del Mundial 2026, mapear el resultado al formato de la quiniela (A / EMPATE / B), e insertarlo en la tabla `resultados_oficiales` para que el ranking se actualice en tiempo real.

---

## Paso 1 — Obtener la API Key de football-data.org

1. Crear una cuenta gratuita en **https://www.football-data.org/client/register**
2. Copiar el token que aparece en el dashboard (formato: `abc123def456...`)
3. Guardar el token en Power Automate como **variable de entorno segura** (nunca en texto plano dentro del flujo)

El plan gratuito es suficiente para este proyecto: incluye el endpoint de la Copa del Mundo con delay de 1 minuto, que es aceptable para una quiniela interna.

---

## Paso 2 — Crear el conector a MySQL

En Power Automate → **Conexiones** → **Nueva conexión** → buscar **MySQL**

Configurar con los datos del servidor donde está `quiniela_almer_2026`:

| Campo | Valor |
|-------|-------|
| Servidor | IP o hostname del servidor MySQL |
| Puerto | 3306 |
| Base de datos | quiniela_almer_2026 |
| Usuario | usuario_powerautomate (crear usuario con permisos solo de INSERT/UPDATE en resultados_oficiales) |
| Contraseña | (credencial segura) |

> **Buena práctica de TI:** Crear un usuario MySQL exclusivo para Power Automate con permisos mínimos. No usar `root`.
```sql
-- Ejecutar en MySQL Workbench como root
CREATE USER 'pa_quiniela'@'%' IDENTIFIED BY 'contraseña_segura';
GRANT INSERT, UPDATE, SELECT ON quiniela_almer_2026.resultados_oficiales TO 'pa_quiniela'@'%';
GRANT SELECT ON quiniela_almer_2026.partidos TO 'pa_quiniela'@'%';
FLUSH PRIVILEGES;
```

---

## Paso 3 — Crear el flujo en Power Automate

### Tipo de flujo
**Flujo de nube programado** (Cloud flow → Scheduled)

### Configuración del disparador
- Frecuencia: cada **5 minutos**
- Activar solo durante el período del torneo: **11 junio – 27 junio 2026** (fase de grupos)

---

### Estructura del flujo (paso a paso)

```
[DISPARADOR] Recurrence — cada 5 minutos
        │
[ACCIÓN 1] HTTP — Consultar partidos terminados
  Método: GET
  URL: https://api.football-data.org/v4/competitions/WC/matches?status=FINISHED
  Headers:
    X-Auth-Token: [variable de entorno con el API Key]
        │
[ACCIÓN 2] Parse JSON
  Esquema basado en la respuesta de la API:
  {
    "matches": [
      {
        "id": 10001,
        "status": "FINISHED",
        "score": {
          "fullTime": {
            "home": 2,
            "away": 1
          }
        }
      }
    ]
  }
        │
[ACCIÓN 3] Apply to each — iterar sobre matches[]
        │
  [ACCIÓN 3a] Condition — ¿Ya existe este partido en resultados_oficiales?
    MySQL → Ejecutar consulta:
    SELECT COUNT(*) as total FROM resultados_oficiales
    WHERE partido_id = (
      SELECT id FROM partidos WHERE api_match_id = @match_id
    ) AND finalizado = 1
        │
    SI (ya existe y finalizado=1) → Saltar, no hacer nada
    NO → continuar
        │
  [ACCIÓN 3b] Condition — Determinar resultado
    IF score.fullTime.home > score.fullTime.away → resultado = 'A'
    IF score.fullTime.home = score.fullTime.away → resultado = 'EMPATE'
    IF score.fullTime.home < score.fullTime.away → resultado = 'B'
        │
  [ACCIÓN 3c] MySQL — Insertar resultado
    Ejecutar consulta:
    INSERT INTO resultados_oficiales
      (partido_id, resultado, goles_a, goles_b, finalizado, fuente)
    SELECT
      p.id,
      '@resultado',
      @goles_home,
      @goles_away,
      1,
      'football-data.org'
    FROM partidos p
    WHERE p.api_match_id = @match_id
    ON DUPLICATE KEY UPDATE
      resultado = '@resultado',
      goles_a = @goles_home,
      goles_b = @goles_away,
      finalizado = 1;
        │
[ACCIÓN 4] (Opcional) Notificación por Teams o Email
  Enviar mensaje al canal de TI:
  "Resultado registrado: [equipo_a] vs [equipo_b] → [resultado]"
```

---

## Paso 4 — Variables a configurar en el flujo

| Variable | Descripción | Dónde obtenerla |
|----------|-------------|-----------------|
| `API_KEY_FOOTBALL` | Token de football-data.org | Dashboard de la cuenta |
| `MYSQL_SERVER` | IP del servidor MySQL | TI interno |
| `MYSQL_USER` | Usuario `pa_quiniela` | Creado en el Paso 2 |
| `MYSQL_PASSWORD` | Contraseña del usuario | TI interno |

---

## Paso 5 — Verificación

Después de configurar el flujo, ejecutarlo manualmente una vez para verificar que:

1. La llamada HTTP a football-data.org retorna `200 OK`
2. El JSON se parsea correctamente
3. Un registro de prueba se inserta en `resultados_oficiales`
4. El ranking en la app React refleja el cambio

Para verificar en MySQL Workbench:
```sql
SELECT * FROM resultados_oficiales ORDER BY insertado_en DESC LIMIT 5;
SELECT * FROM ranking_general ORDER BY posicion LIMIT 10;
```

---

## Calendario de activación recomendado

| Período | Frecuencia del flujo | Motivo |
|---------|---------------------|--------|
| 11 jun – 27 jun 2026 (fase de grupos) | Cada 5 minutos | Partidos activos |
| Fuera del torneo | Pausar el flujo | Ahorrar llamadas a la API |

---

> **Nota para TI:** Si en el futuro se extiende la quiniela hasta la Final (deseable), solo es necesario reactivar el flujo durante las fechas de las fases eliminatorias (28 jun – 19 jul 2026) sin ningún otro cambio de configuración.
