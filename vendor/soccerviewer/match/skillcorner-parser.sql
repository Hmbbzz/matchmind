-- one row per player + ball per frame
-- we set the ball's player_id = 0 and team_id = 0
-- note the player_id is always positive
CREATE TABLE frames_t AS
WITH raw AS (
  SELECT * FROM read_ndjson('tracking.jsonl', columns = {
    frame: 'BIGINT',
    period: 'BIGINT',
    timestamp: 'TIME',
    ball_data: 'STRUCT(x DOUBLE, y DOUBLE, z DOUBLE, is_detected BOOLEAN)',
    possession: 'STRUCT(player_id BIGINT)',
    image_corners_projection: 'STRUCT(x_top_left DOUBLE, y_top_left DOUBLE,
                                      x_bottom_left DOUBLE, y_bottom_left DOUBLE,
                                      x_bottom_right DOUBLE, y_bottom_right DOUBLE,
                                      x_top_right DOUBLE, y_top_right DOUBLE)',
    player_data: 'STRUCT(x DOUBLE, y DOUBLE, player_id BIGINT, is_detected BOOLEAN)[]'
  })
  WHERE period IS NOT NULL AND timestamp IS NOT NULL
),

ents AS (
  SELECT frame, period, timestamp,
         0 AS player_id,
         ball_data.x AS x, ball_data.y AS y,
         coalesce(ball_data.z, 0.0) AS z,
         coalesce(ball_data.is_detected, FALSE) AS detected,
         FALSE AS has_ball,
         image_corners_projection AS cam
  FROM raw WHERE ball_data.x IS NOT NULL
  UNION ALL
  SELECT frame, period, timestamp,
         p.player_id, p.x, p.y, 0.0, coalesce(p.is_detected, FALSE),
         coalesce(p.player_id = possession.player_id, FALSE),
         NULL
  FROM raw, UNNEST(player_data) AS t(p)
  WHERE p.x IS NOT NULL
),

team_by_pid AS (
  SELECT p.id AS pid,
         CASE WHEN p.team_id = m.home_team.id THEN 1 ELSE 2 END AS tid
  FROM read_json_auto('match.json') m, UNNEST(m.players) AS u(p)
)

SELECT CAST(DENSE_RANK() OVER (ORDER BY frame) - 1 AS INT) AS seq,
       CAST(frame AS INT) AS frame_id,
       CAST(period AS TINYINT) AS period,
       CAST(epoch(timestamp) AS FLOAT) AS time_s,
       CAST(e.player_id AS INT) AS player_id,
       CAST(coalesce(t.tid, 0) AS TINYINT) AS team_id,
       CAST(e.x AS FLOAT) AS x, CAST(e.y AS FLOAT) AS y, CAST(e.z AS FLOAT) AS z,
       e.detected,
       e.has_ball,
       CAST(e.cam.x_top_left     AS FLOAT) AS cam_tlx,
       CAST(e.cam.y_top_left     AS FLOAT) AS cam_tly,
       CAST(e.cam.x_top_right    AS FLOAT) AS cam_trx,
       CAST(e.cam.y_top_right    AS FLOAT) AS cam_try,
       CAST(e.cam.x_bottom_right AS FLOAT) AS cam_brx,
       CAST(e.cam.y_bottom_right AS FLOAT) AS cam_bry,
       CAST(e.cam.x_bottom_left  AS FLOAT) AS cam_blx,
       CAST(e.cam.y_bottom_left  AS FLOAT) AS cam_bly,
       'tracked' AS source, CAST(2 AS TINYINT) AS schema_version
FROM ents e LEFT JOIN team_by_pid t ON e.player_id = t.pid;

-- players ---------------------------------------------------------------
CREATE TABLE players_t AS
SELECT CAST(p.id AS INT) AS player_id,
       CAST(p.number AS SMALLINT) AS number,
       p.short_name AS name,
       CAST(CASE WHEN p.team_id = m.home_team.id THEN 1 ELSE 2 END AS TINYINT) AS team_id,
       coalesce(p.player_role.name = 'Goalkeeper', FALSE) AS gk
FROM read_json_auto('match.json') m, UNNEST(m.players) AS u(p);

-- matches (one row) ------------------------------------------------------
CREATE TABLE matches_t AS
SELECT CAST(m.id AS INT) AS match_id,
       CAST(10.0 AS FLOAT) AS fps,
       CAST(m.pitch_length AS FLOAT) AS pitch_length,
       CAST(m.pitch_width AS FLOAT) AS pitch_width,
       'skillcorner' AS provider,
       (SELECT CAST(max(seq) + 1 AS INT) FROM frames_t) AS n_frames,
       m.home_team.short_name AS home_name,
       -- the official 3-letter code
       m.home_team.acronym AS home_acr,
       m.home_team_kit.jersey_color AS home_kit,
       -- the club's real number colour, straight from the feed, rather than
       m.home_team_kit.number_color AS home_number,
       m.away_team.short_name AS away_name,
       m.away_team.acronym AS away_acr,
       m.away_team_kit.jersey_color AS away_kit,
       m.away_team_kit.number_color AS away_number,
       CAST(m.home_team_score AS TINYINT) AS home_score,
       CAST(m.away_team_score AS TINYINT) AS away_score,
       CAST(2 AS TINYINT) AS schema_version
FROM read_json_auto('match.json') m;
