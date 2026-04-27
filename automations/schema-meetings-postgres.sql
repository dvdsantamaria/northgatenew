-- Northgate Meetings Schema — PostgreSQL (Supabase)
-- Run this in Supabase SQL Editor before importing the workflow

CREATE TABLE IF NOT EXISTS meetings (
    id BIGSERIAL PRIMARY KEY,
    recording_id TEXT UNIQUE NOT NULL,
    meeting_title TEXT,
    meeting_date DATE,
    participants TEXT,
    duration_seconds INTEGER DEFAULT 0,
    transcript TEXT,
    summary TEXT,
    action_items JSONB DEFAULT '[]'::jsonb,
    decisions JSONB DEFAULT '[]'::jsonb,
    follow_up JSONB DEFAULT '[]'::jsonb,
    project_name TEXT,
    flag TEXT CHECK (flag IN ('green', 'orange', 'red')),
    flag_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para queries que harán otros workflows (WF-03, WF-04, etc.)
CREATE INDEX IF NOT EXISTS idx_meetings_project_name ON meetings(project_name);
CREATE INDEX IF NOT EXISTS idx_meetings_flag ON meetings(flag);
CREATE INDEX IF NOT EXISTS idx_meetings_meeting_date ON meetings(meeting_date DESC);
CREATE INDEX IF NOT EXISTS idx_meetings_project_date ON meetings(project_name, meeting_date DESC);

-- Búsqueda de texto en transcript y summary (para queries tipo: "meetings donde se habló de estructura")
CREATE INDEX IF NOT EXISTS idx_meetings_transcript_fts ON meetings USING gin(to_tsvector('english', transcript));
CREATE INDEX IF NOT EXISTS idx_meetings_summary_fts ON meetings USING gin(to_tsvector('english', summary));

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER IF NOT EXISTS update_meetings_updated_at
    BEFORE UPDATE ON meetings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Política RLS básica (opcional para MVP — deshabilitar si da problemas)
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow all" ON meetings
    FOR ALL USING (true) WITH CHECK (true);
