// curl https://api.openai.com/v1/chat/completions \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer $OPENAI_API_KEY" \
//   -d '{
//     "model": "gpt-3.5-turbo",
    // "messages": [
    //   {
    //     "role": "system",
    //     "content": "Given a sentence, give a decimal value from 0 to 1 of the sentences relevance to the following parameters based on the emotions the sentence conveys: acousticness, danceability, energy, instrumentalness, liveness, and loudness. Output this in the format of a JavaScript map, with keys as the parameters and values as the rating, and no other text. For example, the sentence barbie soundrack would return something similar to, [{acousticness:0.2,danceability:0.9,energy:0.8,instrumentalness:0.4,liveness:0.1,loudness:0.5}]. While a sentence like oppenheimer soundtrack would return something similar to, [{acousticness:0.4,danceability:0.1,energy:0.5,instrumentalness:0.8,liveness:0.2,loudness:0.5}]."
    //   },
    //   {
    //     "role": "user",
    //     "content": "intern coffee breaks"
    //   }
    // ]
//   }'

import { Configuration, OpenAIApi } from "openai";
import process from "process";

// console.log(completion.data.choices[0].message)

export async function queryOpenAI(sentence) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        "messages": [
        {
            "role": "system",
            "content": "Given a sentence, give a decimal value from 0 to 1 of the sentences relevance to the following parameters based on the emotions the sentence conveys: acousticness, danceability, energy, instrumentalness, liveness, and loudness. Output this in the format of a JavaScript map, with keys as the parameters and values as the rating, and no other text. For example, the sentence barbie soundrack would return something similar to, [{'acousticness':0.2,'danceability':0.9,'energy':0.8,'instrumentalness':0.4,'liveness':0.1,'loudness':0.5}]. While a sentence like oppenheimer soundtrack would return something similar to, [{acousticness:0.4,danceability:0.1,energy:0.5,instrumentalness:0.8,liveness:0.2,loudness:0.5}]."
        },
        {
            "role": "user",
            "content": sentence
        }
        ]
    });
    return completion.data.choices[0].message['content'];
}