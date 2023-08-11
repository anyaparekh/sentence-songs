import { queryOpenAI } from "./_openai.js";

export default async function handler(request, response) {
    const resp = await queryOpenAI(request.query["query"]);

    response.status(200).json({
      body: resp,
      query: request.query,
      cookies: request.cookies,
    });
  }