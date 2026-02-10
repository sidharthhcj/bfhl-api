require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
const EMAIL = process.env.OFFICIAL_EMAIL;
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});
app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);
    if (keys.length !== 1) {
      return res.status(400).json({ is_success: false });
    }

    const key = keys[0];
    let result;
    if (key === "fibonacci") {
      const n = body.fibonacci;
      if (!Number.isInteger(n) || n < 0) {
        return res.status(400).json({ is_success: false });
      }

      const fib = [];
      let a = 0, b = 1;
      for (let i = 0; i < n; i++) {
        fib.push(a);
        [a, b] = [b, a + b];
      }
      result = fib;
    }
    else if (key === "prime") {
      if (!Array.isArray(body.prime)) {
        return res.status(400).json({ is_success: false });
      }
      result = body.prime.filter(
        (n) => Number.isInteger(n) && isPrime(n)
      );
    }
    else if (key === "lcm") {
      if (!Array.isArray(body.lcm) || body.lcm.length === 0) {
        return res.status(400).json({ is_success: false });
      }
      result = body.lcm.reduce((a, b) => lcm(a, b));
    }
    else if (key === "hcf") {
      if (!Array.isArray(body.hcf) || body.hcf.length === 0) {
        return res.status(400).json({ is_success: false });
      }
      result = body.hcf.reduce((a, b) => gcd(a, b));
    }
 
else if (key === "AI") {
  if (typeof body.AI !== "string") {
    return res.status(400).json({ is_success: false });
  }
  try {
    const MODEL = "gemini-2.5-flash";
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(API_URL, {
      contents: [{ parts: [{ text: body.AI }] }]
    });
    const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text
            ?.trim()
            ?.split(/\s+/)[0] || "Unknown";

  } catch (aiErr) {
    console.error("AI ERROR:", aiErr.response?.data || aiErr.message);
    result = "Error connecting to AI"; 
  }
}


    else {
      return res.status(400).json({ is_success: false });
    }
    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data: result
    });

  } catch (error) {
    res.status(500).json({ is_success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
