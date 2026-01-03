const Event = require("../../model/AdminModel/event.model");
const Admin = require("../../model/AdminModel/admin.model");
const Notification = require("../../model/AdminModel/notification.model");

const createEvent = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const {
      title,
      date,
      location,
      description,
      capacity,
      category,
      statusEvent,
    } = req.body;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Authication missing",
      });
    }
    const findAdmin = await Admin.findById(adminId);
    if (!findAdmin) {
      return res.status(403).json({
        status: false,
        message: "AdminId not found",
      });
    }

    if (
      !title ||
      !date ||
      !location ||
      !description ||
      !capacity ||
      !category ||
      !statusEvent
    ) {
      return res.status(400).json({
        status: false,
        message: "All field is required",
      });
    }

    const create = await Event.create({
      title,
      date,
      location,
      description,
      capacity,
      category,
      statusEvent,
    });

    res.status(200).json({
      status: true,
      message: "Create Event By Admin",
      data: create,
    });
  } catch (error) {}
};

const updateEvent = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const { id } = req.params;
    const {
      title,
      date,
      location,
      description,
      category,
      capacity,
      statusEvent,
    } = req.body;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Authication missing",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    const findAdmin = await Admin.findById(adminId);
    if (!findAdmin) {
      return res.status(403).json({
        status: false,
        message: "AdminId not found",
      });
    }
    const findEvent = await Event.findById(id);
    if (!findEvent) {
      return res.status(403).json({
        status: false,
        message: "Category not found",
      });
    }

    if (title) {
      findEvent.title = title;
    }
    if (date) {
      findEvent.date = date;
    }
    if (location) {
      findEvent.location = location;
    }
    if (description) {
      findEvent.description = description;
    }
    if (category) {
      findEvent.category = category;
    }
    if (capacity) {
      findEvent.capacity = capacity;
    }
    if (statusEvent) {
      findEvent.statusEvent = statusEvent;
    }

    await findEvent.save();

    res.status(200).json({
      status: true,
      message: "Update Event By Admin",
      data: findEvent,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const { id } = req.params;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Authication missing",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    if (id.length !== 24) {
      return res.status(401).json({
        status: false,
        message: "Id must be 24 length",
      });
    }
    const findAdmin = await Admin.findById(adminId);
    if (!findAdmin) {
      return res.status(403).json({
        status: false,
        message: "AdminId not found",
      });
    }

    const findEvent = await Event.findByIdAndDelete(id);
    if (!findEvent) {
      return res.status(403).json({
        status: false,
        message: "Id is found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Delete Event By Admin",
      data: findEvent,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const viewEventById = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const { id } = req.params;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Authication missing",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    if (id.length !== 24) {
      return res.status(401).json({
        status: false,
        message: "Id must be 24 length",
      });
    }
    const findAdmin = await Admin.findById(adminId);
    if (!findAdmin) {
      return res.status(403).json({
        status: false,
        message: "AdminId not found",
      });
    }

    const findEvent = await Event.findById(id);
    if (!findEvent) {
      return res.status(403).json({
        status: false,
        message: "EventId is invalid",
      });
    }

    res.status(200).json({
      status: true,
      message: "View Event By Id",
      data: findEvent,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const viewEventAll = async (req, res) => {
  try {
    const adminId = req.user.userId;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Authication missing",
      });
    }
    const findAdmin = await Admin.findById(adminId);
    if (!findAdmin) {
      return res.status(403).json({
        status: false,
        message: "AdminId not found",
      });
    }

    const find = await Event.find();
    if (find.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No data",
        data: find,
      });
    }

    res.status(200).json({
      status: true,
      message: "View All Event",
      data: find,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const sendNotification = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const { id } = req.params;
    const { type, message } = req.body;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Authication missing",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    if (id.length !== 24) {
      return res.status(400).json({
        status: false,
        message: "Id must be 24 length",
      });
    }
    if (!message) {
      return res.status(400).json({
        status: false,
        message: "Missing the message",
      });
    }
    const findEvent = await Event.findById(id);
    if (!findEvent) {
      return res.status(403).json({
        status: false,
        message: "EventId is not found",
      });
    }

    await Notification.create({
      eventId: id,
      type,
      message,
    });

    res.status(200).json({
      status: true,
      message: "Notification send",
      data: findEvent,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  viewEventById,
  viewEventAll,
  sendNotification,
};
