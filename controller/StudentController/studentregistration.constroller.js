const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const studentRegistration = require("../../model/StudentModel/student.model");
const jwt = require("jsonwebtoken");
  
const registration = async (req, res) => {
  try { 
    const { StudentId, Name, Email, PhoneNumber, Password } = req.body;
    if (!Name || !Email || !PhoneNumber || !Password) {
      return res.status(400).json({
        status: false,
        message: "All field are required",
      }); 
    }  
    //Validation of Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return res.status(400).json({
        status: false,
        message: "Invalid email format",
      });
    }

    // PhoneNumber validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(PhoneNumber)) {
      return res.status(400).json({
        status: false,
        message: "PhoneNumber must be 10(digits) and Indian formate",
      });
    }
    if (Password.length < 8) {
      return res.status.json({
        status: false,
        messsage: "Password must be greater then 8(character)",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(Password, 10);

    const regist = await studentRegistration.create({
      StudentId: uuidv4(),
      Name,
      Email,
      PhoneNumber,
      Password: hashedPassword,
    });

    res.status(200).json({
      status: true,
      message: "Student Registration Successful",
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
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).json({
        status: false,
        message: "Email or Password is required",
      });
    }
    //Validation of Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return res.status(400).json({
        status: false,
        message: "Invalid email format",
      });
    }
    const exist = await studentRegistration.findOne({ Email });
    if (!exist) {
      return res.status(403).json({
        status: false,
        messagge: "Email is not existing",
      });
    }
    // console.log(exist.Email, " ", exist.Password, " ", Password);

    const isMatch = await bcrypt.compare(Password, exist.Password);

    if (!isMatch)
      return res.status(400).json({
        status: false,
        message: "Invalid Password! Try again",
      });

    //Token
    const token = jwt.sign(
      { userId: exist._id, Email: exist.Email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    // ✅ SET COOKIE
    res.cookie("token", token, {
      httpOnly: true, // cannot access via JS
      secure: false, // true in production (https)
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      status: true,
      message: "Login successful",
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

module.exports = { registration, login, profile, logout };
