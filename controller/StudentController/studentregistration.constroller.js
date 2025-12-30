const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const studentRegistration = require("../../model/StudentModel/studentregistration.model");
const jwt = require("jsonwebtoken");

const registration = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({
        status: false,
        message: "All field are required",
      });
    }
    //Validation of Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: false,
        message: "Invalid email format",
      });
    }

    // PhoneNumber validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        status: false,
        message: "PhoneNumber must be 10(digits) and Indian formate",
      });
    }
    if (password.length < 8) {
      return res.status.json({
        status: false,
        messsage: "Password must be greater then 8(character)",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const regist = await studentRegistration.create({
      studentId: uuidv4(),
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    res.status(200).json({
      status: true,
      message: "Student Registration",
      data: regist,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const login = async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email or Password is required",
      });
    }
    //Validation of Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: false,
        message: "Invalid email format",
      });
    }
    const exist = await studentRegistration.findOne({ email });
    if (!exist) {
      return res.status(403).json({
        status: false,
        messagge: "Email is not existing",
      });
    }
    // console.log(exist.Email, " ", exist.Password, " ", Password);

    const isMatch = await bcrypt.compare(password, exist.password);

    if (!isMatch)
      return res.status(400).json({
        status: false,
        message: "Invalid Password! Try again",
      });

    //Token
    const token = jwt.sign({ userId: exist._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    // ✅ SET COOKIE
    res.cookie("token", token, {
      httpOnly: true, // cannot access via JS
      secure: false, // true in production (https)
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      status: true,
      message: "Login",
      data: token,
    });
  } catch (error) {
    console.log("Error:", error);

    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const profile = async (req, res) => {
  try {
    res.status(200).json({
      status: true,
      message: "Token is vertify successful",
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const studentId = req.user.userId;
    if (!studentId) {
      return res.status(401).json({
        status: false,
        message: "Authication missing",
      });
    }
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        status: false,
        message: "Email is required",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: false,
        message: "Invalid email format",
      });
    }
    const findEmail = await studentRegistration.findOne({ email });
    if (!findEmail) {
      return res.status(403).json({
        status: false,
        message: "Email is invalid",
      });
    }
    const otp = Math.floor(Math.random() * 9000) + 1000; // 4-digit OTP
    findEmail.otp = otp;
    findEmail.otpExpire = Date.now() + 60000;
    await findEmail.save();

    res.status(200).json({
      status: true,
      message: "Send otp",
      data: otp,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const { email, otp } = req.body;
    if (!studentId) {
      return res.status(401).json({
        status: false,
        message: "StudentId is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        status: false,
        message: "Email is required",
      });
    }
    if (!otp) {
      return res.status(400).json({
        status: false,
        message: "OTP is required",
      });
    }
    const findEmail = await studentRegistration.findOne({ email });
    if (!findEmail) {
      return res.status(403).json({
        status: false,
        message: "Email not found",
      });
    }

    if (findEmail.otp !== otp) {
      return res.status(403).json({
        status: false,
        message: "Invalid OTP or Expire",
      });
    }
    await findEmail.save();
    res.status(200).json({
      status: true,
      message: "Verify-otp is successful",
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const { email, oldPassword, newPassword, confirmPassword } = req.body;
    if (!studentId) {
      return res.status(401).json({
        status: false,
        message: "Authication missing",
      });
    }
    if (!email || !oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "All field is required",
      });
    }
    const exist = await studentRegistration.findOne({ email });
    if (!exist) {
      return res.status(403).json({
        status: false,
        message: "Email is invalid",
      });
    }
    const isMatch = await bcrypt.compare(oldPassword, exist.password);
    if (!isMatch) {
      return res.status(403).json({
        status: false,
        message: "Invalid password",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        status: false,
        message: "Password is not match",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    exist.password = hashedPassword;

    await exist.save();
    res.status(200).json({
      status: true,
      message: "Reset Password",
      data: { oldPassword, newPassword },
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const logout = async (req, res) => {
  try {
    // const token  = req.token;
    // console.log(token);
    res.clearCookie("token");
    res.status(200).json({
      status: true,
      message: "Logout",
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  registration,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  profile,
  logout,
};
