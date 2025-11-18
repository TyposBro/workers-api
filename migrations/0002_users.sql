-- Migration number: 0002	2025-11-18T17:02:00Z
-- Create users table and index
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
