const Teacher = require("../../model/TeacherModel/teacher.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("bson");

const teacherregistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "All field are required",
      });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: false,
        message: "Invalid email format",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: false,
        message: "Password must be at least 6 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const create = await Teacher.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      status: true,
      message: "Registration Succesful",
      data: create,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email or Password is required",
      });
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: false,
        message: "Invalid email format",
      });
    }

    const find = await Teacher.findOne({ email }).select("+password");
    // console.log(find._id.toString());
    if (!find) {
      res.status(401).json({
        status: false,
        message: "Email or Password is Invalid",
      });
    }

    const isMatch = await bcrypt.compare(password, find.password);
    if (!isMatch)
      return res.status(400).json({
        status: false,
        message: "Invalid Password! Try again",
      });

    //Token
    const token = jwt.sign(
      { userId: find._id, role: find.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    //cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      status: true,
      message: "Login",
      Token: token,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const teacherlogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      status: true,
      message: "Logout",
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
  teacherregistration,
  teacherLogin,
  teacherlogout,
};
