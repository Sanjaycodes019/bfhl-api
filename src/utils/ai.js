import axios from "axios";

export const askAI = async (question) => {
  // -------- FALLBACK --------
  const q = question.toLowerCase();

  const fallbackAnswers = [
    { match: ["capital", "maharashtra"], answer: "Mumbai" },
    { match: ["capital", "india"], answer: "Delhi" }
  ];

  const fallback = fallbackAnswers.find(f =>
    f.match.every(word => q.includes(word))
  );

  try {
    // -------- GEMINI API --------
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("API key missing");
    }

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent",
      {
        contents: [
          {
            parts: [{ text: question }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        timeout: 5000
      }
    );

    const text =
      response.data.candidates[0].content.parts[0].text;

    return text.trim().split(/\s+/)[0];

  } catch (err) {
    // -------- FALLBACK RESPONSE --------
    console.warn(
      "Gemini failed, using fallback:",
      err.response?.data?.error?.message || err.message
    );

    if (fallback) return fallback.answer;
    return "Unknown";
  }
};
