const EventRegister = require("../../model/StudentModel/eventregister.model");
const Student = require("../../model/StudentModel/studentregistration.model");
const Event = require("../../model/AdminModel/event.model");

const registerEvent = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const { eventid } = req.params;
    if (!studentId) {
      return res.status(401).json({
        status: false,
        message: "Authication Missing",
      });
    }
    if (!eventid) {
      return res.status(400).json({
        status: false,
        message: "EventId is required",
      });
    }
    if (eventid.length !== 24) {
      return res.status(400).json({
        status: false,
        message: "EventId must be 24 length",
      });
      s;
    }

    const findStudent = await Student.findById(studentId);
    if (!findStudent) {
      return res.status(403).json({
        status: false,
        message: "StudentId not found",
      });
    }

    const findEvent = await Event.findById(eventid);
    if (!findEvent) {
      return res.status(403).json({
        status: false,
        message: "EventId not found",
      });
    }

    const register = await EventRegister.create({
      eventId: eventid,
      studentId: studentId,
    });

    res.status(200).json({
      status: true,
      message: "Student register for event successfully",
      data: register,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const viewEvent = async (req, res) => {
  try {
    const studentId = req.user.userId;
    if (!studentId) {
      return res.status(401).json({
        status: false,
        message: "Authication missing",
      });
    }

    const findEvent = await EventRegister.findOne({ studentId })
      .populate("eventId")
      .select("-_id -createdAt -updatedAt -__v");
    if (!findEvent) {
      return res.status(403).json({
        status: false,
        message: "StudentId not found",
      });
    }

    res.status(200).json({
      status: true,
      message: `View Event Details of StudentId: ${studentId}`,
      data: findEvent,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const studentid = req.user.userId;
    const role = req.user.role;
    if (!studentid) {
      return res.status(401).json({
        status: false,
        message: "StudentId not found",
      });
    }

    if (role === "admin" || role === "teacher") {
      return res.status(403).json({
        status: false,
        message: "Only Student access",
      });
    }

    const findEventByStudentId = await EventRegister.findOneAndDelete({
      studentId: studentid,
    });
    if (!findEventByStudentId) {
      return res.status(403).json({
        status: false,
        message: "studentId not found",
      });
    }

    res.status(200).json({
      status: true,
      message: `Cancel Event by StudentId: ${studentid} `,
      data: findEventByStudentId,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

module.exports = { registerEvent, viewEvent, deleteEvent };
