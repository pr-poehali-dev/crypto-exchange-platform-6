
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE balances (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    currency VARCHAR(20) NOT NULL,
    amount NUMERIC(20, 8) NOT NULL DEFAULT 0,
    UNIQUE(user_id, currency)
);

CREATE INDEX idx_balances_user_id ON balances(user_id);
