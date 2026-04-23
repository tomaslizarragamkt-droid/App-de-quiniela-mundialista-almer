# 02 · Base de Datos — Quiniela Mundialista Almer 2026

Motor: **MySQL 8.0** · Charset: `utf8mb4` · Collation: `utf8mb4_unicode_ci`

---

## Diagrama de relaciones

```
clientes_autorizados
        │
        │ 1:N (máx. 3)
        ▼
   participantes ──────────────────────────────────┐
        │                                           │
        │ 1:N (72 predicciones por participante)    │
        ▼                                           │
  predicciones                                      │
        │                                           │
        │ N:1                                       │
        ▼                                           │
    partidos ◄──────────────────────────────────────┘
        │
        │ 1:1 (resultado oficial)
        ▼
   resultados_oficiales
```

---

## Esquema SQL completo

```sql
-- ============================================================
-- BASE DE DATOS: quiniela_almer_2026
-- Proyecto: Quiniela Mundialista Almer — FIFA World Cup 2026
-- Motor: MySQL 8.0
-- Descripción: Schema completo para gestión de participantes,
--              predicciones y resultados del concurso interno.
-- ============================================================

CREATE DATABASE IF NOT EXISTS quiniela_almer_2026
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE quiniela_almer_2026;


-- ------------------------------------------------------------
-- TABLA: clientes_autorizados
-- Propósito: Catálogo de los 100 números de cliente elegibles
--            para participar. Solo los registrados aquí pueden
--            crear participantes. Control de acceso al concurso.
-- ------------------------------------------------------------
CREATE TABLE clientes_autorizados (
  id              INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
  numero_cliente  VARCHAR(20)     NOT NULL UNIQUE,   -- Ej: 'ALM-001234'
  empresa         VARCHAR(100)    NOT NULL,           -- Nombre de la empresa del cliente
  activo          TINYINT(1)      NOT NULL DEFAULT 1, -- 1=puede registrar, 0=bloqueado
  creado_en       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_numero_cliente (numero_cliente)
) COMMENT 'Catálogo de clientes autorizados a participar en el concurso. Solo TI puede insertar registros aquí.';


-- Datos de ejemplo — TI debe sustituir con los 100 clientes reales
INSERT INTO clientes_autorizados (numero_cliente, empresa) VALUES
  ('ALM-004821', 'Grupo Empresarial Zenith S.A.'),
  ('ALM-007392', 'Distribuidora del Pacífico S.C.'),
  ('ALM-012044', 'Corporativo Tres Ríos'),
  ('ALM-019873', 'Soluciones Industriales Norte'),
  ('ALM-025601', 'Importadora Global MX');
-- ... continuar hasta los 100 clientes


-- ------------------------------------------------------------
-- TABLA: participantes
-- Propósito: Usuarios registrados en la quiniela.
--            Un número de cliente puede tener máximo 3 filas
--            en esta tabla (invitado_a, invitado_b, invitado_c).
--            La columna 'slot' + numero_cliente forman la llave
--            única que evita duplicados más allá del límite.
-- ------------------------------------------------------------
CREATE TABLE participantes (
  id              INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
  numero_cliente  VARCHAR(20)     NOT NULL,           -- FK hacia clientes_autorizados
  slot            TINYINT         NOT NULL,           -- 1, 2 o 3 — slot ocupado por este participante
  nickname        VARCHAR(60)     NOT NULL,           -- Nombre o apodo visible en el ranking
  email           VARCHAR(120)    NULL,               -- Opcional, para notificaciones
  creado_en       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

  -- La combinación numero_cliente + slot es única: garantiza máximo 3 registros por cliente
  UNIQUE KEY uq_cliente_slot (numero_cliente, slot),

  -- Valida que slot solo sea 1, 2 o 3
  CONSTRAINT chk_slot CHECK (slot IN (1, 2, 3)),

  FOREIGN KEY (numero_cliente)
    REFERENCES clientes_autorizados(numero_cliente)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  INDEX idx_numero_cliente (numero_cliente)
) COMMENT 'Participantes del concurso. Máximo 3 por número de cliente, controlado por el campo slot y la restricción UNIQUE.';


-- ------------------------------------------------------------
-- TABLA: partidos
-- Propósito: Catálogo de los 72 partidos de la fase de grupos.
--            Esta tabla se carga una sola vez antes del torneo
--            y se usa como referencia para predicciones y
--            resultados. El campo api_match_id vincula cada
--            partido con el ID correspondiente en la API
--            football-data.org para que Power Automate pueda
--            hacer el cruce automáticamente.
-- ------------------------------------------------------------
CREATE TABLE partidos (
  id              INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
  api_match_id    INT             NOT NULL UNIQUE,   -- ID del partido en football-data.org
  grupo           CHAR(1)         NOT NULL,          -- 'A' a 'L'
  jornada         TINYINT         NOT NULL,          -- 1, 2 o 3
  fecha_partido   DATE            NOT NULL,
  equipo_a        VARCHAR(50)     NOT NULL,          -- Nombre equipo local
  equipo_b        VARCHAR(50)     NOT NULL,          -- Nombre equipo visitante
  codigo_a        CHAR(3)         NOT NULL,          -- Código FIFA (MEX, ARG, etc.)
  codigo_b        CHAR(3)         NOT NULL,
  bandera_a       VARCHAR(10)     NULL,              -- Emoji de bandera para el frontend
  bandera_b       VARCHAR(10)     NULL,

  INDEX idx_grupo_jornada (grupo, jornada),
  INDEX idx_fecha (fecha_partido)
) COMMENT 'Catálogo de partidos de la fase de grupos. Se carga antes del torneo. api_match_id vincula con football-data.org.';


-- Inserción de los 72 partidos de la fase de grupos
-- (api_match_id es placeholder — TI debe actualizarlo con los IDs reales de la API)
INSERT INTO partidos (api_match_id, grupo, jornada, fecha_partido, equipo_a, equipo_b, codigo_a, codigo_b, bandera_a, bandera_b) VALUES
-- GRUPO A
(10001, 'A', 1, '2026-06-11', 'México',        'Sudáfrica',       'MEX', 'RSA', '🇲🇽', '🇿🇦'),
(10002, 'A', 1, '2026-06-11', 'Corea del Sur', 'Chequia',         'KOR', 'CZE', '🇰🇷', '🇨🇿'),
(10003, 'A', 2, '2026-06-16', 'México',        'Corea del Sur',   'MEX', 'KOR', '🇲🇽', '🇰🇷'),
(10004, 'A', 2, '2026-06-16', 'Chequia',       'Sudáfrica',       'CZE', 'RSA', '🇨🇿', '🇿🇦'),
(10005, 'A', 3, '2026-06-21', 'Chequia',       'México',          'CZE', 'MEX', '🇨🇿', '🇲🇽'),
(10006, 'A', 3, '2026-06-21', 'Sudáfrica',     'Corea del Sur',   'RSA', 'KOR', '🇿🇦', '🇰🇷'),
-- GRUPO B
(10007, 'B', 1, '2026-06-12', 'Canadá',        'Bosnia-Herz.',    'CAN', 'BIH', '🇨🇦', '🇧🇦'),
(10008, 'B', 1, '2026-06-12', 'Qatar',         'Suiza',           'QAT', 'SUI', '🇶🇦', '🇨🇭'),
(10009, 'B', 2, '2026-06-17', 'Suiza',         'Canadá',          'SUI', 'CAN', '🇨🇭', '🇨🇦'),
(10010, 'B', 2, '2026-06-17', 'Bosnia-Herz.',  'Qatar',           'BIH', 'QAT', '🇧🇦', '🇶🇦'),
(10011, 'B', 3, '2026-06-22', 'Suiza',         'Bosnia-Herz.',    'SUI', 'BIH', '🇨🇭', '🇧🇦'),
(10012, 'B', 3, '2026-06-22', 'Qatar',         'Canadá',          'QAT', 'CAN', '🇶🇦', '🇨🇦'),
-- GRUPO C
(10013, 'C', 1, '2026-06-13', 'Brasil',        'Marruecos',       'BRA', 'MAR', '🇧🇷', '🇲🇦'),
(10014, 'C', 1, '2026-06-13', 'Haití',         'Escocia',         'HAI', 'SCO', '🇭🇹', '🏴󠁧󠁢󠁳󠁣󠁴󠁿'),
(10015, 'C', 2, '2026-06-18', 'Escocia',       'Marruecos',       'SCO', 'MAR', '🏴󠁧󠁢󠁳󠁣󠁴󠁿', '🇲🇦'),
(10016, 'C', 2, '2026-06-18', 'Brasil',        'Haití',           'BRA', 'HAI', '🇧🇷', '🇭🇹'),
(10017, 'C', 3, '2026-06-23', 'Escocia',       'Brasil',          'SCO', 'BRA', '🏴󠁧󠁢󠁳󠁣󠁴󠁿', '🇧🇷'),
(10018, 'C', 3, '2026-06-23', 'Marruecos',     'Haití',           'MAR', 'HAI', '🇲🇦', '🇭🇹'),
-- GRUPO D
(10019, 'D', 1, '2026-06-12', 'Estados Unidos','Paraguay',        'USA', 'PAR', '🇺🇸', '🇵🇾'),
(10020, 'D', 1, '2026-06-12', 'Australia',     'Turquía',         'AUS', 'TUR', '🇦🇺', '🇹🇷'),
(10021, 'D', 2, '2026-06-17', 'Turquía',       'Paraguay',        'TUR', 'PAR', '🇹🇷', '🇵🇾'),
(10022, 'D', 2, '2026-06-17', 'Estados Unidos','Australia',       'USA', 'AUS', '🇺🇸', '🇦🇺'),
(10023, 'D', 3, '2026-06-22', 'Turquía',       'Estados Unidos',  'TUR', 'USA', '🇹🇷', '🇺🇸'),
(10024, 'D', 3, '2026-06-22', 'Paraguay',      'Australia',       'PAR', 'AUS', '🇵🇾', '🇦🇺'),
-- GRUPO E
(10025, 'E', 1, '2026-06-14', 'Alemania',      'Costa de Marfil', 'GER', 'CIV', '🇩🇪', '🇨🇮'),
(10026, 'E', 1, '2026-06-14', 'Curaçao',       'Ecuador',         'CUW', 'ECU', '🇨🇼', '🇪🇨'),
(10027, 'E', 2, '2026-06-19', 'Alemania',      'Curaçao',         'GER', 'CUW', '🇩🇪', '🇨🇼'),
(10028, 'E', 2, '2026-06-19', 'Ecuador',       'Costa de Marfil', 'ECU', 'CIV', '🇪🇨', '🇨🇮'),
(10029, 'E', 3, '2026-06-24', 'Ecuador',       'Alemania',        'ECU', 'GER', '🇪🇨', '🇩🇪'),
(10030, 'E', 3, '2026-06-24', 'Costa de Marfil','Curaçao',        'CIV', 'CUW', '🇨🇮', '🇨🇼'),
-- GRUPO F
(10031, 'F', 1, '2026-06-14', 'Países Bajos',  'Japón',           'NED', 'JPN', '🇳🇱', '🇯🇵'),
(10032, 'F', 1, '2026-06-14', 'Suecia',        'Túnez',           'SWE', 'TUN', '🇸🇪', '🇹🇳'),
(10033, 'F', 2, '2026-06-19', 'Países Bajos',  'Suecia',          'NED', 'SWE', '🇳🇱', '🇸🇪'),
(10034, 'F', 2, '2026-06-19', 'Túnez',         'Japón',           'TUN', 'JPN', '🇹🇳', '🇯🇵'),
(10035, 'F', 3, '2026-06-24', 'Túnez',         'Países Bajos',    'TUN', 'NED', '🇹🇳', '🇳🇱'),
(10036, 'F', 3, '2026-06-24', 'Japón',         'Suecia',          'JPN', 'SWE', '🇯🇵', '🇸🇪'),
-- GRUPO G
(10037, 'G', 1, '2026-06-15', 'Bélgica',       'Egipto',          'BEL', 'EGY', '🇧🇪', '🇪🇬'),
(10038, 'G', 1, '2026-06-15', 'Irán',          'Nueva Zelanda',   'IRN', 'NZL', '🇮🇷', '🇳🇿'),
(10039, 'G', 2, '2026-06-20', 'Bélgica',       'Irán',            'BEL', 'IRN', '🇧🇪', '🇮🇷'),
(10040, 'G', 2, '2026-06-20', 'Nueva Zelanda', 'Egipto',          'NZL', 'EGY', '🇳🇿', '🇪🇬'),
(10041, 'G', 3, '2026-06-25', 'Nueva Zelanda', 'Bélgica',         'NZL', 'BEL', '🇳🇿', '🇧🇪'),
(10042, 'G', 3, '2026-06-25', 'Egipto',        'Irán',            'EGY', 'IRN', '🇪🇬', '🇮🇷'),
-- GRUPO H
(10043, 'H', 1, '2026-06-15', 'España',        'Cabo Verde',      'ESP', 'CPV', '🇪🇸', '🇨🇻'),
(10044, 'H', 1, '2026-06-15', 'Arabia Saudita','Uruguay',         'KSA', 'URU', '🇸🇦', '🇺🇾'),
(10045, 'H', 2, '2026-06-20', 'España',        'Arabia Saudita',  'ESP', 'KSA', '🇪🇸', '🇸🇦'),
(10046, 'H', 2, '2026-06-20', 'Uruguay',       'Cabo Verde',      'URU', 'CPV', '🇺🇾', '🇨🇻'),
(10047, 'H', 3, '2026-06-25', 'Uruguay',       'España',          'URU', 'ESP', '🇺🇾', '🇪🇸'),
(10048, 'H', 3, '2026-06-25', 'Cabo Verde',    'Arabia Saudita',  'CPV', 'KSA', '🇨🇻', '🇸🇦'),
-- GRUPO I
(10049, 'I', 1, '2026-06-16', 'Francia',       'Senegal',         'FRA', 'SEN', '🇫🇷', '🇸🇳'),
(10050, 'I', 1, '2026-06-16', 'Iraq',          'Noruega',         'IRQ', 'NOR', '🇮🇶', '🇳🇴'),
(10051, 'I', 2, '2026-06-21', 'Francia',       'Iraq',            'FRA', 'IRQ', '🇫🇷', '🇮🇶'),
(10052, 'I', 2, '2026-06-21', 'Noruega',       'Senegal',         'NOR', 'SEN', '🇳🇴', '🇸🇳'),
(10053, 'I', 3, '2026-06-26', 'Noruega',       'Francia',         'NOR', 'FRA', '🇳🇴', '🇫🇷'),
(10054, 'I', 3, '2026-06-26', 'Senegal',       'Iraq',            'SEN', 'IRQ', '🇸🇳', '🇮🇶'),
-- GRUPO J
(10055, 'J', 1, '2026-06-16', 'Argentina',     'Argelia',         'ARG', 'ALG', '🇦🇷', '🇩🇿'),
(10056, 'J', 1, '2026-06-16', 'Austria',       'Jordania',        'AUT', 'JOR', '🇦🇹', '🇯🇴'),
(10057, 'J', 2, '2026-06-21', 'Argentina',     'Austria',         'ARG', 'AUT', '🇦🇷', '🇦🇹'),
(10058, 'J', 2, '2026-06-21', 'Jordania',      'Argelia',         'JOR', 'ALG', '🇯🇴', '🇩🇿'),
(10059, 'J', 3, '2026-06-26', 'Jordania',      'Argentina',       'JOR', 'ARG', '🇯🇴', '🇦🇷'),
(10060, 'J', 3, '2026-06-26', 'Argelia',       'Austria',         'ALG', 'AUT', '🇩🇿', '🇦🇹'),
-- GRUPO K
(10061, 'K', 1, '2026-06-17', 'Portugal',      'Congo DR',        'POR', 'COD', '🇵🇹', '🇨🇩'),
(10062, 'K', 1, '2026-06-17', 'Uzbekistán',    'Colombia',        'UZB', 'COL', '🇺🇿', '🇨🇴'),
(10063, 'K', 2, '2026-06-22', 'Portugal',      'Uzbekistán',      'POR', 'UZB', '🇵🇹', '🇺🇿'),
(10064, 'K', 2, '2026-06-22', 'Colombia',      'Congo DR',        'COL', 'COD', '🇨🇴', '🇨🇩'),
(10065, 'K', 3, '2026-06-27', 'Colombia',      'Portugal',        'COL', 'POR', '🇨🇴', '🇵🇹'),
(10066, 'K', 3, '2026-06-27', 'Congo DR',      'Uzbekistán',      'COD', 'UZB', '🇨🇩', '🇺🇿'),
-- GRUPO L
(10067, 'L', 1, '2026-06-17', 'Inglaterra',    'Croacia',         'ENG', 'CRO', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🇭🇷'),
(10068, 'L', 1, '2026-06-17', 'Ghana',         'Panamá',          'GHA', 'PAN', '🇬🇭', '🇵🇦'),
(10069, 'L', 2, '2026-06-22', 'Inglaterra',    'Ghana',           'ENG', 'GHA', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🇬🇭'),
(10070, 'L', 2, '2026-06-22', 'Panamá',        'Croacia',         'PAN', 'CRO', '🇵🇦', '🇭🇷'),
(10071, 'L', 3, '2026-06-27', 'Panamá',        'Inglaterra',      'PAN', 'ENG', '🇵🇦', '🏴󠁧󠁢󠁥󠁮󠁧󠁿'),
(10072, 'L', 3, '2026-06-27', 'Croacia',       'Ghana',           'CRO', 'GHA', '🇭🇷', '🇬🇭');


-- ------------------------------------------------------------
-- TABLA: predicciones
-- Propósito: Almacena el pronóstico de cada participante para
--            cada partido. Un participante tiene exactamente
--            72 filas en esta tabla (una por partido).
--            La llave única (participante_id, partido_id) evita
--            que alguien envíe dos predicciones para el mismo
--            partido.
-- Volumen estimado: 300 participantes × 72 partidos = 21,600 filas
-- ------------------------------------------------------------
CREATE TABLE predicciones (
  id                INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
  participante_id   INT UNSIGNED    NOT NULL,
  partido_id        INT UNSIGNED    NOT NULL,
  prediccion        ENUM('A','EMPATE','B') NOT NULL, -- A=local gana, B=visitante gana
  creado_en         DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP
                                    ON UPDATE CURRENT_TIMESTAMP,

  -- Evita doble predicción para el mismo partido
  UNIQUE KEY uq_participante_partido (participante_id, partido_id),

  FOREIGN KEY (participante_id)
    REFERENCES participantes(id)
    ON DELETE CASCADE,

  FOREIGN KEY (partido_id)
    REFERENCES partidos(id)
    ON DELETE RESTRICT,

  INDEX idx_partido (partido_id),
  INDEX idx_participante (participante_id)
) COMMENT 'Predicciones de cada participante. 1 fila por partido por participante. Máx 21,600 filas para 300 participantes.';


-- ------------------------------------------------------------
-- TABLA: resultados_oficiales
-- Propósito: Resultado real de cada partido, insertado
--            automáticamente por Power Automate al terminar
--            cada partido usando la API football-data.org.
--            Solo existe una fila por partido (1:1 con partidos).
-- ------------------------------------------------------------
CREATE TABLE resultados_oficiales (
  id              INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
  partido_id      INT UNSIGNED    NOT NULL UNIQUE,   -- 1:1 con partidos
  resultado       ENUM('A','EMPATE','B') NOT NULL,   -- Resultado real del partido
  goles_a         TINYINT         NOT NULL DEFAULT 0,
  goles_b         TINYINT         NOT NULL DEFAULT 0,
  finalizado      TINYINT(1)      NOT NULL DEFAULT 0, -- 1=partido terminado y verificado
  insertado_en    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Cuándo lo insertó Power Automate
  fuente          VARCHAR(50)     NOT NULL DEFAULT 'football-data.org',

  FOREIGN KEY (partido_id)
    REFERENCES partidos(id)
    ON DELETE RESTRICT,

  INDEX idx_finalizado (finalizado)
) COMMENT 'Resultados oficiales insertados por Power Automate. Solo 1 fila por partido. Fuente: football-data.org API.';


-- ------------------------------------------------------------
-- VISTA: ranking_general
-- Propósito: Calcula en tiempo real los puntos de cada
--            participante cruzando sus predicciones contra
--            los resultados oficiales. El frontend consulta
--            esta vista directamente para mostrar el ranking.
--            Se recalcula automáticamente con cada SELECT.
-- ------------------------------------------------------------
CREATE VIEW ranking_general AS
SELECT
  p.id                          AS participante_id,
  p.nickname                    AS nombre,
  p.numero_cliente,
  ca.empresa,
  -- Suma 1 punto por cada predicción que coincide con el resultado oficial
  COUNT(CASE
    WHEN pr.prediccion = ro.resultado
    AND ro.finalizado = 1
    THEN 1
  END)                          AS puntos,
  -- Total de partidos ya terminados (denominador para el porcentaje de aciertos)
  COUNT(CASE WHEN ro.finalizado = 1 THEN 1 END) AS partidos_jugados,
  -- Ranking por puntos descendente (se ordena al consultar)
  RANK() OVER (ORDER BY COUNT(CASE
    WHEN pr.prediccion = ro.resultado AND ro.finalizado = 1
    THEN 1 END) DESC)           AS posicion
FROM participantes p
JOIN clientes_autorizados ca ON p.numero_cliente = ca.numero_cliente
LEFT JOIN predicciones pr     ON pr.participante_id = p.id
LEFT JOIN resultados_oficiales ro ON ro.partido_id = pr.partido_id
GROUP BY p.id, p.nickname, p.numero_cliente, ca.empresa;


-- ------------------------------------------------------------
-- STORED PROCEDURE: registrar_participante
-- Propósito: Encapsula la lógica de validación y registro de
--            un nuevo participante. Verifica que el número de
--            cliente esté autorizado, que no haya alcanzado el
--            límite de 3 participantes, y asigna el slot libre.
--            Retorna mensajes de error descriptivos para el
--            frontend via React / Power Automate.
-- ------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE registrar_participante(
  IN  p_numero_cliente  VARCHAR(20),
  IN  p_nickname        VARCHAR(60),
  IN  p_email           VARCHAR(120),
  OUT p_resultado       VARCHAR(200),  -- Mensaje de éxito o error
  OUT p_participante_id INT            -- ID asignado, NULL si error
)
BEGIN
  DECLARE v_activo      TINYINT DEFAULT 0;
  DECLARE v_slots_usados TINYINT DEFAULT 0;
  DECLARE v_slot_libre  TINYINT DEFAULT NULL;

  -- Verificar que el número de cliente existe y está activo
  SELECT activo INTO v_activo
  FROM clientes_autorizados
  WHERE numero_cliente = p_numero_cliente;

  IF v_activo IS NULL THEN
    SET p_resultado = 'ERROR: El número de cliente no está registrado en el concurso.';
    SET p_participante_id = NULL;

  ELSEIF v_activo = 0 THEN
    SET p_resultado = 'ERROR: El número de cliente está desactivado para este concurso.';
    SET p_participante_id = NULL;

  ELSE
    -- Contar cuántos slots ya están ocupados para este cliente
    SELECT COUNT(*) INTO v_slots_usados
    FROM participantes
    WHERE numero_cliente = p_numero_cliente;

    IF v_slots_usados >= 3 THEN
      -- Mensaje de límite excedido — se muestra en el frontend de registro
      SET p_resultado = 'ERROR: Has excedido el número máximo de registros para este número de cliente. Solo se permiten 3 participantes por cliente.';
      SET p_participante_id = NULL;

    ELSE
      -- Encontrar el primer slot libre (1, 2 o 3)
      SET v_slot_libre = (
        SELECT MIN(slot_candidato) FROM (
          SELECT 1 AS slot_candidato UNION SELECT 2 UNION SELECT 3
        ) slots
        WHERE slot_candidato NOT IN (
          SELECT slot FROM participantes WHERE numero_cliente = p_numero_cliente
        )
      );

      -- Insertar el nuevo participante
      INSERT INTO participantes (numero_cliente, slot, nickname, email)
      VALUES (p_numero_cliente, v_slot_libre, p_nickname, p_email);

      SET p_participante_id = LAST_INSERT_ID();
      SET p_resultado = CONCAT('OK: Participante registrado correctamente en el slot ', v_slot_libre, '.');
    END IF;
  END IF;
END$$

DELIMITER ;
```

---

## Uso del procedimiento de registro

Ejemplo de llamada desde backend Node.js o Power Automate:

```sql
-- Registro exitoso
CALL registrar_participante('ALM-004821', 'El Tigre GDL', 'tigre@empresa.com', @resultado, @id);
SELECT @resultado, @id;
-- OK: Participante registrado correctamente en el slot 1.

-- Límite excedido
CALL registrar_participante('ALM-004821', 'Cuarto intento', NULL, @resultado, @id);
SELECT @resultado, @id;
-- ERROR: Has excedido el número máximo de registros para este número de cliente.
```

---

## Consulta del ranking

```sql
-- Top 10 del ranking general
SELECT posicion, nombre, empresa, puntos, partidos_jugados
FROM ranking_general
ORDER BY posicion
LIMIT 10;
```

---

> **Nota para TI:** Los `api_match_id` en la tabla `partidos` son valores placeholder. Antes del 11 de junio deben actualizarse con los IDs reales de football-data.org consultando `GET https://api.football-data.org/v4/competitions/WC/matches`.
