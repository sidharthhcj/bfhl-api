BFHL API – Chitkara Qualifier Submission

This project is developed as part of the
“Chitkara - API Test - Qualifier 1 (10 Feb 2026)”.

It is a Node.js REST API that performs multiple operations such as
Fibonacci calculation, prime number filtering, LCM/HCF calculation,
and AI-based question answering using Google Gemini.

--------------------------------------------------

Tech Stack
- Node.js
- Express.js
- Axios
- Google Gemini API
- Render (Hosting)

--------------------------------------------------

API Endpoints

1. GET /health
Used to check whether the API is running.

Response:
{
  "is_success": true,
  "official_email": "sidharth1496.be23@chitkarauniversity.edu.in"
}

--------------------------------------------------

2. POST /bfhl
Main API endpoint.  
Accepts exactly ONE key in the request body.

Supported Operations:

- fibonacci (Integer) -> Returns Fibonacci series
- prime (Array of Integers) -> Returns prime numbers
- lcm (Array of Integers) -> Returns LCM value
- hcf (Array of Integers) -> Returns HCF value
- AI (String) -> Returns a single-word AI response

--------------------------------------------------

Example Requests

Fibonacci:
{
  "fibonacci": 7
}

Prime:
{
  "prime": [2, 4, 7, 9, 11]
}

LCM:
{
  "lcm": [12, 18, 24]
}

HCF:
{
  "hcf": [24, 36, 60]
}

AI:
{
  "AI": "What is the capital city of Maharashtra?"
}

--------------------------------------------------

Response Format

Successful Response:
{
  "is_success": true,
  "official_email": "sidharth1496.be23@chitkarauniversity.edu.in",
  "data": "..."
}

Error Response:
{
  "is_success": false
}

--------------------------------------------------

Live Deployment (Render)

Health API:
https://bfhl-api-kiqf.onrender.com/health

BFHL API:
https://bfhl-api-kiqf.onrender.com/bfhl

--------------------------------------------------

GitHub Repository
https://github.com/sidharthhcj/bfhl-api

--------------------------------------------------

Environment Variables Used

PORT=3000
OFFICIAL_EMAIL=sidharth1496.be23@chitkarauniversity.edu.in
GEMINI_API_KEY=your_api_key_here

--------------------------------------------------

Run Locally

npm install
npm start

--------------------------------------------------
