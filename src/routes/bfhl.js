import express from "express";
import { fibonacci, isPrime, gcd, lcm } from "../utils/math.js";
import { askAI } from "../utils/ai.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const keys = Object.keys(req.body);

    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        message: "Exactly one key is required"
      });
    }

    const key = keys[0];
    const value = req.body[key];
    let data;

    if (key === "fibonacci") {
      data = fibonacci(value);
    } else if (key === "prime") {
      data = value.filter(isPrime);
    } else if (key === "lcm") {
      data = value.reduce((a, b) => lcm(a, b));
    } else if (key === "hcf") {
      data = value.reduce((a, b) => gcd(a, b));
    } else if (key === "AI") {
      data = await askAI(value);
    } else {
      return res.status(400).json({
        is_success: false,
        message: "Invalid key"
      });
    }

    res.status(200).json({
      is_success: true,
      official_email: "sanjay1621.be23@chitkarauniversity.edu.in",
      data
    });
  } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
    
      res.status(500).json({
        is_success: false,
        error: err.response?.data || err.message
      });
    }
    
});

export default router;
