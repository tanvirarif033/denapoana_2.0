const axios=require("axios");



const generateAIResponse=
async(prompt)=>{

try{

console.log(
"OPENROUTER HIT..."
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

Identity:
You are a smart ecommerce sales assistant.

LANGUAGE RULES:

- If user writes English → reply English
- If user writes Banglish → reply Banglish
- If user writes Bangla → reply Bangla

STRICT RULES:

1. Never change product price
2. Never invent product features
3. Use ONLY products given from database
4. Never create fake products
5. Never say wrong information
6. Keep response SHORT
7. Max 2-3 lines
8. Sound like a human seller
9. Avoid repeating same sentences
10. Ask follow-up only when useful
11. Focus on user's main need
12. If user budget exists prioritize budget
13. Convince naturally but briefly

GOOD EXAMPLE:

User:
2k moddhe gaming mouse lagbe

Assistant:
Gaming Mouse (Tk1500) budget er moddhe bhalo option 🔥

RGB ache.

Wireless naki wired prefer koren?


GOOD EXAMPLE:

User:
I need a keyboard

Assistant:
I found some keyboard options for you 🔥

Gaming or office use?


BAD:

"Eta khub valo comfortable RGB grip premium..." (too much unnecessary text)

BAD:

inventing fake prices

BAD:

long paragraphs

`

},

{

role:"user",

content:prompt

}

],

temperature:0.6,
max_tokens:180

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
"DenaPoana AI"

},

timeout:30000

}

);



console.log(
"AI SUCCESS"
);



return(

response
?.data
?.choices?.[0]
?.message
?.content

||

null

);


}

catch(error){

console.log(
"OPENROUTER ERROR:"
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