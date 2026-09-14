import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite";

import type { Entry } from "../types/entry";

const DB_NAME = "doodh-khaata.db";

let dbPromise: Promise<SQLiteDatabase> | null = null;

function getDb(): Promise<SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = openDatabaseAsync(DB_NAME).then(async (db) => {
      await db.execAsync(
        "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, quantity REAL NOT NULL);"
      );
      return db;
    });
  }
  return dbPromise;
}

export async function addEntry(date: string, quantity: number): Promise<void> {
  const db = await getDb();
  await db.runAsync("INSERT INTO entries (date, quantity) VALUES (?, ?);", date, quantity);
}

export async function getAllEntries(): Promise<Entry[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<{ id: number; date: string; quantity: number }>(
    "SELECT id, date, quantity FROM entries ORDER BY date DESC, id DESC;"
  );
  return rows.map((row) => ({ id: String(row.id), date: row.date, quantity: row.quantity }));
}

export async function deleteEntry(id: string): Promise<void> {
  const db = await getDb();
  await db.runAsync("DELETE FROM entries WHERE id = ?;", Number(id));
}

export async function getMonthlyTotal(yearMonth: string): Promise<number> {
  const db = await getDb();
  const row = await db.getFirstAsync<{ total: number | null }>(
    "SELECT SUM(quantity) as total FROM entries WHERE date LIKE ?;",
    `${yearMonth}%`
  );
  return row?.total ?? 0;
}
