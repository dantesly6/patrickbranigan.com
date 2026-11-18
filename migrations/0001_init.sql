-- Flights table tracks every game's duration in seconds.
-- Rank for a given duration = 1 + count of flights with greater seconds.
CREATE TABLE IF NOT EXISTS flights (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  seconds    REAL    NOT NULL,
  created_at INTEGER NOT NULL
);

-- DESC index makes the rank query (COUNT WHERE seconds > ?) cheap.
CREATE INDEX IF NOT EXISTS idx_flights_seconds ON flights(seconds DESC);
