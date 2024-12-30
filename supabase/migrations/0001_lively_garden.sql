/*
  # Initial Schema Setup

  1. Tables
    - keyword_history
      - Stores historical keyword analysis data
      - Tracks search volume and difficulty over time
    - competitors
      - Stores competitor information
      - Tracks competitor keywords and websites

  2. Security
    - RLS enabled on all tables
    - Users can only access their own data
*/

-- Create keyword_history table
CREATE TABLE IF NOT EXISTS keyword_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  keyword text NOT NULL,
  search_volume integer NOT NULL,
  difficulty integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE keyword_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own keyword history"
  ON keyword_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own keyword history"
  ON keyword_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create competitors table
CREATE TABLE IF NOT EXISTS competitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  name text NOT NULL,
  website text NOT NULL,
  keywords text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE competitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own competitors"
  ON competitors
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own competitors"
  ON competitors
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own competitors"
  ON competitors
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);