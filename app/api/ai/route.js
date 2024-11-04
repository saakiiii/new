import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyAXJMv4Vi6T9ZhK6zEUjGr7kILeKWRkofY");

async function run(prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//   const prompt = "print(hello world) what is the error?"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

export async function POST(request){

    var temp = await request.json();
    console.log(temp);
    var response = await run(temp["prompt"]);
    console.log(response);
    return NextResponse.json({res:response});
}