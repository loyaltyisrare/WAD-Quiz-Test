import { sql } from '@vercel/postgres';
import fs from 'fs/promises';
import path from 'path';
import { SessionLead } from '../quiz/types';

const DB_PATH = path.join(process.cwd(), 'leads.json');

async function initLocalDb() {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify([], null, 2));
  }
}

async function initPostgresDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(255),
      instagram_handle VARCHAR(255),
      gender VARCHAR(50),
      age VARCHAR(50),
      consent BOOLEAN,
      score INTEGER,
      score_percentage INTEGER,
      session_id VARCHAR(255),
      recorded_at TIMESTAMP NOT NULL,
      emailed_at TIMESTAMP WITH TIME ZONE,
      scheduled_email_at TIMESTAMP WITH TIME ZONE,
      email_error TEXT
    );
  `;

  // Migration for existing tables: Ensure new columns exist
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS emailed_at TIMESTAMP WITH TIME ZONE;`.catch(() => {});
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS scheduled_email_at TIMESTAMP WITH TIME ZONE;`.catch(() => {});
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS email_error TEXT;`.catch(() => {});
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS recorded_at TIMESTAMP;`.catch(() => {});
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS score_percentage INTEGER;`.catch(() => {});

  await sql`
    CREATE TABLE IF NOT EXISTS broadcasts (
      id SERIAL PRIMARY KEY,
      subject TEXT NOT NULL,
      body TEXT NOT NULL,
      cta_text VARCHAR(255),
      cta_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS broadcast_delivery (
      broadcast_id INTEGER REFERENCES broadcasts(id) ON DELETE CASCADE,
      lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
      sent_at TIMESTAMP WITH TIME ZONE,
      error TEXT,
      PRIMARY KEY (broadcast_id, lead_id)
    );
  `;
}

export async function saveLead(leadData: any) {
  const { lead, score, sessionId, tracking, recordedAt } = leadData;
  const leadObj: SessionLead & { 
    score: number; 
    recordedAt: string; 
    scorePercentage?: number;
    sessionId: string;
  } = {
    ...lead,
    score: score,
    recordedAt: recordedAt || new Date().toISOString(),
    sessionId: sessionId
  };

  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    try {
      await initPostgresDb();
      const maxScore = 24; // WAD Max Score
      const scorePercentage = lead.scorePercentage || Math.round((lead.score / maxScore) * 100);
      await sql`
        INSERT INTO leads (
          first_name, email, phone, instagram_handle, gender, age, 
          consent, score, score_percentage, session_id, recorded_at,
          scheduled_email_at
        ) VALUES (
          ${leadObj.firstName}, ${leadObj.email}, ${leadObj.phone || ''}, ${leadObj.socialHandle || ''}, 
          ${leadObj.gender || ''}, ${leadObj.age || ''}, ${leadObj.consent}, 
          ${leadObj.score}, ${scorePercentage}, ${leadObj.sessionId}, ${new Date(leadObj.recordedAt).toISOString()},
          NOW() + INTERVAL '3 minutes'
        )
      `;
      return leadObj;
    } catch (error) {
      console.error("Database Error (Falling back to JSON):", error);
    }
  }

  // Local JSON fallback
  try {
    await initLocalDb();
    const content = await fs.readFile(DB_PATH, 'utf-8');
    const leads = JSON.parse(content);
    leads.push(leadObj);
    await fs.writeFile(DB_PATH, JSON.stringify(leads, null, 2));
    return leadObj;
  } catch (err) {
    console.error("Local DB Fallback Error:", err);
    throw err;
  }
}

export async function getAllLeads() {
  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    try {
      await initPostgresDb();
      const { rows } = await sql`SELECT * FROM leads ORDER BY recorded_at DESC`;
      return rows.map(r => ({
         firstName: r.first_name,
         email: r.email,
         phone: r.phone,
         socialHandle: r.instagram_handle,
         gender: r.gender,
         age: r.age,
         consent: r.consent,
         score: r.score,
         scorePercentage: r.score_percentage,
         sessionId: r.session_id,
         recordedAt: r.recorded_at
      }));
    } catch (error) {
      console.error("Failed querying Database (Falling back to JSON):", error);
    }
  }

  // Local JSON fallback
  try {
    await initLocalDb();
    const content = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(content);
    } catch(error) {
    console.error("Local DB getAllLeads Error:", error);
    return [];
  }
}

export async function getPendingLeadsCount() {
  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    try {
      const { rows } = await sql`SELECT COUNT(*)::int as count FROM leads WHERE emailed_at IS NULL`;
      return rows[0].count;
    } catch (error) {
      console.error("Failed querying pending count:", error);
      return 0;
    }
  }
  return 0;
}

export async function getPendingLeads(limit: number = 50) {
  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    try {
      const { rows } = await sql`
        SELECT * FROM leads 
        WHERE emailed_at IS NULL 
        ORDER BY recorded_at ASC 
        LIMIT ${limit}
      `;
      return rows.map(r => ({
        id: r.id,
        firstName: r.first_name,
        email: r.email,
        score: r.score,
        scorePercentage: r.score_percentage,
        sessionId: r.session_id
      }));
    } catch (error) {
      console.error("Failed querying pending leads:", error);
      return [];
    }
  }
  return [];
}

export async function getLeadsReadyToSend(limit: number = 20) {
  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    try {
      const { rows } = await sql`
        SELECT * FROM leads 
        WHERE emailed_at IS NULL 
        AND scheduled_email_at <= NOW()
        ORDER BY scheduled_email_at ASC 
        LIMIT ${limit}
      `;
      return rows.map(r => ({
        id: r.id,
        firstName: r.first_name,
        email: r.email,
        score: r.score,
        scorePercentage: r.score_percentage,
        sessionId: r.session_id
      }));
    } catch (error) {
      console.error("Failed querying ready to send leads:", error);
      return [];
    }
  }
  return [];
}

export async function markAsEmailed(id: number, error?: string) {
  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    try {
      if (error) {
        await sql`UPDATE leads SET email_error = ${error} WHERE id = ${id}`;
      } else {
        await sql`UPDATE leads SET emailed_at = NOW(), email_error = NULL WHERE id = ${id}`;
      }
      return true;
    } catch (err) {
      console.error("Failed marking as emailed:", err);
      return false;
    }
  }
  return false;
}

export async function deleteLead(sessionId: string) {
  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    try {
      await initPostgresDb();
      await sql`DELETE FROM leads WHERE session_id = ${sessionId}`;
      return true;
    } catch (error) {
      console.error("Database Delete Error:", error);
    }
  }

  // Local JSON cleanup
  try {
    await initLocalDb();
    const content = await fs.readFile(DB_PATH, 'utf-8');
    const leads = JSON.parse(content);
    const filtered = leads.filter((l: any) => (l.sessionId || l.session_id) !== sessionId);
    await fs.writeFile(DB_PATH, JSON.stringify(filtered, null, 2));
    return true;
  } catch (err) {
    console.error("Local DB deleteLead Error:", err);
    return false;
  }
}

export async function createBroadcast(data: { subject: string; body: string; ctaText?: string; ctaUrl?: string }) {
  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    try {
      await initPostgresDb();
      const { rows } = await sql`
        INSERT INTO broadcasts (subject, body, cta_text, cta_url)
        VALUES (${data.subject}, ${data.body}, ${data.ctaText}, ${data.ctaUrl})
        RETURNING id
      `;
      const broadcastId = rows[0].id;
      
      // Initialize delivery for all existing leads
      await sql`
        INSERT INTO broadcast_delivery (broadcast_id, lead_id)
        SELECT ${broadcastId}, id FROM leads
      `;
      
      return broadcastId;
    } catch (err) {
      console.error("Failed creating broadcast:", err);
      throw err;
    }
  }
  return null;
}

export async function getRecentBroadcasts(limit: number = 5) {
  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    try {
      const { rows } = await sql`
        SELECT b.*, 
               (SELECT COUNT(*) FROM broadcast_delivery WHERE broadcast_id = b.id) as total_leads,
               (SELECT COUNT(*) FROM broadcast_delivery WHERE broadcast_id = b.id AND sent_at IS NOT NULL) as sent_leads
        FROM broadcasts b
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
      return rows;
    } catch (err) {
      console.error("Failed fetching broadcasts:", err);
      return [];
    }
  }
  return [];
}

export async function getBroadcastPendingCount(broadcastId: number) {
  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    try {
      const { rows } = await sql`
        SELECT COUNT(*)::int as count 
        FROM broadcast_delivery 
        WHERE broadcast_id = ${broadcastId} AND sent_at IS NULL
      `;
      return rows[0].count;
    } catch (err) {
      console.error("Failed querying broadcast pending count:", err);
      return 0;
    }
  }
  return 0;
}

export async function getNextBroadcastBatch(broadcastId: number, limit: number = 50) {
  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    try {
      const { rows } = await sql`
        SELECT l.*, bd.broadcast_id
        FROM leads l
        JOIN broadcast_delivery bd ON l.id = bd.lead_id
        WHERE bd.broadcast_id = ${broadcastId} AND bd.sent_at IS NULL
        ORDER BY l.recorded_at ASC
        LIMIT ${limit}
      `;
      return rows.map(r => ({
        id: r.id,
        firstName: r.first_name,
        email: r.email,
        score: r.score,
        scorePercentage: r.score_percentage,
        sessionId: r.session_id
      }));
    } catch (err) {
      console.error("Failed fetching next broadcast batch:", err);
      return [];
    }
  }
  return [];
}

export async function markBroadcastRecipientSent(broadcastId: number, leadId: number, error?: string) {
  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    try {
      if (error) {
        await sql`
          UPDATE broadcast_delivery 
          SET error = ${error} 
          WHERE broadcast_id = ${broadcastId} AND lead_id = ${leadId}
        `;
      } else {
        await sql`
          UPDATE broadcast_delivery 
          SET sent_at = NOW(), error = NULL 
          WHERE broadcast_id = ${broadcastId} AND lead_id = ${leadId}
        `;
      }
      return true;
    } catch (err) {
      console.error("Failed marking broadcast recipient sent:", err);
      return false;
    }
  }
  return false;
}
