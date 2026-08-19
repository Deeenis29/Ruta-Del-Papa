/*
# Create feedback_submissions table

## Purpose
Stores voluntary visitor feedback for the "La Ruta del Papa" platform.
No authentication — visitors submit anonymously with optional email.

## New Tables
- `feedback_submissions`
  - `id` (uuid, primary key, default gen_random_uuid())
  - `experience` (text, not null) — visitor's experience description
  - `region` (text, not null) — which region/city was visited
  - `improvement` (text) — optional suggestions for improvement
  - `email` (text) — optional contact email
  - `lang` (text, default 'es') — language used during visit
  - `created_at` (timestamptz, default now())

## Security
- RLS enabled.
- INSERT only for anon + authenticated (public form, no login).
- No SELECT/UPDATE/DELETE for anon — visitors cannot read other people's feedback.
- This is a single-tenant public submission form, so INSERT is open but reads are locked down.

## Notes
1. The form is voluntary and does not require an account.
2. Email is optional and stored as plain text (no sensitive data beyond contact email).
3. Only platform operators with service-role access can read submissions.
*/

CREATE TABLE IF NOT EXISTS feedback_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  experience text NOT NULL,
  region text NOT NULL,
  improvement text,
  email text,
  lang text DEFAULT 'es',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE feedback_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon) to insert feedback — public form
DROP POLICY IF EXISTS "anon_insert_feedback" ON feedback_submissions;
CREATE POLICY "anon_insert_feedback"
ON feedback_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT, UPDATE, or DELETE for anon/authenticated — only service role can read
DROP POLICY IF EXISTS "anon_select_feedback" ON feedback_submissions;
DROP POLICY IF EXISTS "anon_update_feedback" ON feedback_submissions;
DROP POLICY IF EXISTS "anon_delete_feedback" ON feedback_submissions;
