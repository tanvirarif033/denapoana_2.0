const axios = require("axios");


// AI RESPONSE GENERATOR
const generateAIResponse =
  async (prompt) => {

    try {

      const response =
        await axios.post(

          "https://openrouter.ai/api/v1/chat/completions",

          {
            model:
              "mistralai/mistral-7b-instruct",

            messages: [
              {
                role: "system",

                content: `
You are DenPoana AI Shopping Assistant.

Your job:
- Help users find products
- Understand Banglish and English
- Recommend products
- Convince users politely
- Speak naturally
- Be short and smart
- Focus on ecommerce product selling
                `
              },

              {
                role: "user",
                content: prompt
              }
            ]
          },

          {
            headers: {
              Authorization:
                `Bearer ${process.env.OPENROUTER_API_KEY}`,

              "Content-Type":
                "application/json"
            }
          }
        );

      return response.data
        .choices[0]
        .message.content;

    } catch (error) {

      console.log(error);

      return "AI response failed";
    }
  };



module.exports = {
  generateAIResponse
};