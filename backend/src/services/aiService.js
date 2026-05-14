const axios=require("axios");

const generateAIResponse=
async(prompt)=>{

try{

console.log(
"Using OpenRouter..."
);

const response=
await axios.post(

"https://openrouter.ai/api/v1/chat/completions",

{
model:
"openai/gpt-4o-mini",

messages:[

{
role:"system",

content:`
You are DenaPoana AI Shopping Assistant.

- Speak Bangla/Banglish naturally
- Human like ecommerce seller
- Recommend products
- Ask follow-up questions
- Convince politely
- Use actual product data only
- Never invent fake features
`
},

{
role:"user",
content:prompt
}

]

},

{
headers:{

Authorization:
`Bearer ${process.env.OPENROUTER_API_KEY}`,

"Content-Type":
"application/json",

"HTTP-Referer":
"http://localhost:5173",

"X-Title":
"DenaPoana"

}

}

);

console.log(
"AI HIT SUCCESS"
);

return response.data
.choices?.[0]
?.message
?.content

|| null;

}
catch(error){

console.log(
"OPENROUTER FULL ERROR:"
);

console.log(
error.response?.data
||
error.message
);

return null;

}

};

module.exports={
generateAIResponse
};