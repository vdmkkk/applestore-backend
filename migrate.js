const fs = require('fs/promises')
const path = require('path')
const db = require('./db')

async function ensureMigrationsTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
}

async function getAppliedMigrations() {
  const result = await db.query('SELECT filename FROM schema_migrations')
  return new Set(result.rows.map((row) => row.filename))
}

async function applyMigration(filename, sql) {
  await db.query('BEGIN')
  try {
    await db.query(sql)
    await db.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [filename])
    await db.query('COMMIT')
    console.log(`migration applied: ${filename}`)
  } catch (error) {
    await db.query('ROLLBACK')
    throw error
  }
}

async function runMigrations() {
  const migrationsDir = path.join(__dirname, 'migrations')
  await ensureMigrationsTable()

  let files = await fs.readdir(migrationsDir)
  files = files.filter((file) => file.endsWith('.sql')).sort()

  const applied = await getAppliedMigrations()

  for (const file of files) {
    if (applied.has(file)) {
      continue
    }
    const sql = await fs.readFile(path.join(migrationsDir, file), 'utf-8')
    await applyMigration(file, sql)
  }
}

module.exports = runMigrations
