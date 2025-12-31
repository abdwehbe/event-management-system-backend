const pool = require("../config/database");

class Event {
  static async create({
    userId,
    title,
    description,
    eventDate,
    eventTime,
    location,
  }) {
    const [result] = await pool.execute(
      "INSERT INTO events (user_id, title, description, event_date, event_time, location) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, title, description, eventDate, eventTime, location]
    );
    return result.insertId;
  }

  static async findAllByUser(userId) {
    const [rows] = await pool.execute(
      "SELECT * FROM events WHERE user_id = ? ORDER BY event_date, event_time",
      [userId]
    );
    return rows;
  }

  static async findById(id, userId) {
    const [rows] = await pool.execute(
      "SELECT * FROM events WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    return rows[0];
  }

  static async update(
    id,
    userId,
    { title, description, eventDate, eventTime, location }
  ) {
    const [result] = await pool.execute(
      `UPDATE events 
             SET title = ?, description = ?, event_date = ?, event_time = ?, location = ?
             WHERE id = ? AND user_id = ?`,
      [title, description, eventDate, eventTime, location, id, userId]
    );
    return result.affectedRows > 0;
  }

  static async delete(id, userId) {
    const [result] = await pool.execute(
      "DELETE FROM events WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Event;
