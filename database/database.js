import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'

const db = new Database(path.resolve('database/data/database.db'))
db.pragma('journal_mode = WAL')

db.prepare(`
    CREATE TABLE IF NOT EXISTS migration
    (
        filename   TEXT PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`).run()

fs.readdirSync(path.resolve('database/migrations')).forEach((file) => {
    const filename = file.split('.').slice(0, -1).join('.')
    const exists = db.prepare('SELECT COUNT(*) FROM migration WHERE filename = ?').get(filename)
    if (exists) {
        return console.info(`🧘‍♂️Migration ${filename} already applied`)
    }
    const sql = fs.readFileSync(path.resolve(`database/migrations/${file}`), 'utf-8')
    db.exec(sql)
    db.prepare('INSERT INTO migration (filename) VALUES (?)').run(filename)
    console.info(`✅ Migration ${filename} applied`)
})

export default db
