CREATE DATABASE IF NOT EXISTS welcome_app;
USE welcome_app;

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message_text VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default welcome message
INSERT INTO messages (message_text) VALUES ('Welcome to our Application!');