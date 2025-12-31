const Event = require("../models/eventModel");

exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date: eventDate,
      time: eventTime,
      location,
    } = req.body;
    const userId = req.userId;

    const eventId = await Event.create({
      userId,
      title,
      description,
      eventDate,
      eventTime,
      location,
    });

    res.status(201).json({
      message: "Event created successfully",
      eventId,
    });
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const userId = req.userId;
    const events = await Event.findAllByUser(userId);

    res.json(events);
  } catch (error) {
    console.error("Get events error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const event = await Event.findById(id, userId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("Get event error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const {
      title,
      description,
      date: eventDate,
      time: eventTime,
      location,
    } = req.body;

    const updated = await Event.update(id, userId, {
      title,
      description,
      eventDate,
      eventTime,
      location,
    });

    if (!updated) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event updated successfully" });
  } catch (error) {
    console.error("Update event error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deleted = await Event.delete(id, userId);
    if (!deleted) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete event error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
