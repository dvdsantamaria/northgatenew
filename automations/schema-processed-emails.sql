-- Processed Emails Table
-- Tracks which Outlook emails have been processed by the AI draft workflow
-- Prevents reprocessing and provides audit trail

CREATE TABLE IF NOT EXISTS processed_emails (
    message_id TEXT PRIMARY KEY,
    processed_at TIMESTAMPTZ DEFAULT NOW(),
    sender_email TEXT,
    sender_name TEXT,
    subject TEXT,
    received_at TIMESTAMPTZ,
    action TEXT NOT NULL CHECK (action IN ('drafted', 'skipped', 'flagged')),
    reason TEXT NOT NULL,
    category TEXT,
    draft_id TEXT,
    ai_response TEXT
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_processed_emails_processed_at ON processed_emails(processed_at DESC);
CREATE INDEX IF NOT EXISTS idx_processed_emails_action ON processed_emails(action);
CREATE INDEX IF NOT EXISTS idx_processed_emails_sender ON processed_emails(sender_email);

-- View: emails drafted in last 7 days
CREATE OR REPLACE VIEW vw_recent_drafts AS
SELECT 
    message_id,
    sender_email,
    sender_name,
    subject,
    processed_at,
    reason,
    category
FROM processed_emails
WHERE action = 'drafted'
  AND processed_at > NOW() - INTERVAL '7 days'
ORDER BY processed_at DESC;
