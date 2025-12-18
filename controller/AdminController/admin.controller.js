const Admin = require("../../model/AdminModel/admin.model");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
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

    const adminfind = await Admin.findOne({ email: email });
    if (!adminfind) {
      return res.status(401).json({
        status: false,
        message: "Admin not found",
      });
    }

    if (adminfind.password !== password) {
      return res.status(401).json({
        status: false,
        message: "Invalid Password",
      });
    }

    //Token
    const token = jwt.sign(
      { userId: adminfind._id, role: adminfind.role },
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

const logout = async (req, res) => {
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

module.exports = { login, logout };
