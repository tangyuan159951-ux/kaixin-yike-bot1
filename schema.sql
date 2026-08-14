CREATE TABLE IF NOT EXISTS subscribers (
  chat_id INTEGER PRIMARY KEY,
  last_push TEXT
);
CREATE TABLE IF NOT EXISTS user_state (
  chat_id INTEGER PRIMARY KEY,
  kind TEXT NOT NULL,
  data TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS seen (
  chat_id INTEGER NOT NULL,
  content_type TEXT NOT NULL,
  content_id INTEGER NOT NULL,
  seen_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (chat_id, content_type, content_id)
);
CREATE INDEX IF NOT EXISTS idx_seen_user_type ON seen(chat_id, content_type, seen_at);
CREATE TABLE IF NOT EXISTS content_cursor (
  chat_id INTEGER NOT NULL,
  content_type TEXT NOT NULL,
  offset INTEGER NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (chat_id, content_type)
);
CREATE TABLE IF NOT EXISTS history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chat_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_history_user ON history(chat_id, created_at);
CREATE TABLE IF NOT EXISTS feedback (
  chat_id INTEGER NOT NULL,
  content_type TEXT NOT NULL,
  content_id INTEGER NOT NULL,
  value INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (chat_id, content_type, content_id)
);
