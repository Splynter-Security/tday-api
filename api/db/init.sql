CREATE TABLE lightbulbs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status BOOLEAN DEFAULT false,
  owner VARCHAR(255)  -- The user who owns the lightbulb
);
