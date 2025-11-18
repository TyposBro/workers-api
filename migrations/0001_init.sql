-- Migration number: 0001 	 2025-11-18T06:42:27.244Z
-- Create users table for D1
CREATE TABLE IF NOT EXISTS users (
	id TEXT PRIMARY KEY,
	email TEXT NOT NULL UNIQUE,
	name TEXT NOT NULL,
	createdAt TEXT NOT NULL
);

-- Helpful index for lookup by email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
