import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: "sanjay1621.be23@chitkarauniversity.edu.in"
  });
});

export default router;
