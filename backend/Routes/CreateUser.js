const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Store your secret key in an environment variable
const jwtSecret = process.env.JWT_SECRET || "AndiMandiSandi";

// Define validation checks for each field separately
const emailValidation = body("email", "Invalid Email").isEmail();
const nameValidation = body("name", "Invalid name").isLength({ min: 5 });
const passwordValidation = body("password", "Invalid Password").isLength({
  min: 5,
});

router.post(
  "/createuser",
  [emailValidation, nameValidation, passwordValidation],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      let securePassword = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
        location: req.body.location,
      });

      res.json({ success: true, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

router.post(
  "/loginuser",
  [emailValidation, passwordValidation],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const email = req.body.email;
      const userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Invalid credentials." });
      }

      const passwordCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (!passwordCompare) {
        return res.status(400).json({ errors: "Invalid credentials." });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);

      return res.json({ success: true, authToken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

module.exports = router;
