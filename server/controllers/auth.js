import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

/* CONFIGURATIONS */
dotenv.config();
// for production
// if (process.env.NODE_ENV === "production") {
//   SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
//   TOKEN_KEY = process.env.TOKEN_KEY;
// }
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; //destructor the info sent from FE
    //Check to see if unique username is taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    //Check if password reaches minimum length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }
    //Once password passes length check then it will hash
    const password_digest = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    //Creates new user
    const user = new User({
      name,
      email,
      password_digest,
    });
    await user.save();
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.TOKEN_KEY);
    res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select(
      "name email password_digest"
    );
    //Check if the user object is found
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    //First, check if both username and password were filled in
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill out all fields" });
    }
    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.TOKEN_KEY);
      res.status(201).json({ token });
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.TOKEN_KEY);
    if (payload) {
      res.json(payload);
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).send("Not Authorized");
  }
};

export const edit = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (
      (email.length < 4 && name.length < 4) ||
      name.length < 4 ||
      email.length < 4
    ) {
      return res
        .status(400)
        .json({ error: "Field must be longer than four characters" });
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log(token, "this is token");
    const payload = jwt.verify(token, process.env.TOKEN_KEY);
    const editUser = await User.findByIdAndUpdate(payload.id, req.body, {
      new: true,
    });

    if (editUser) {
      const updatedPayload = {
        id: editUser._id,
        name: editUser.name,
        email: editUser.email,
        // include any other user details you want in the token
      };
      const newToken = jwt.sign(updatedPayload, process.env.TOKEN_KEY, {
        expiresIn: "1h",
      }); // for example, 1 hour expiry
      res.status(200).json({ user: editUser, token: newToken });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.TOKEN_KEY);
    const deleteuser = await User.findByIdAndDelete(payload.id);
    if (deleteuser) {
      return res.status(200).send("user deleted");
    }
  } catch (err) {
    console.log(err.message);
  }
};
