## Todos

### P1: Prompt and API Integration
* make calls to OpenAI API
* authenticate it with the API - API key
* test the system prompt

### P2: API Wrapper
* making calls to a service that we host (API wrapper)
* service should run the script we wrote in P1
* add some sort of authentication

### P3: Frontend Integration
* connect frontend to service created in P2

curl https://api.openai.com/v1/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-3.5-turbo",
    "prompt": "Given a sentence, give a decimal value from 0 to 1 of the sentences relevance to the following parameters based on the emotions the sentence conveys: acousticness, danceability, energy, instrumentalness, liveness, and loudness. Output this in the format of a JavaScript map, with keys as the parameters and values as the rating, and no other text. For example, the sentence barbie soundrack would return something similar to, [{acousticness:0.2,danceability:0.9,energy:0.8,instrumentalness:0.4,liveness:0.1,loudness:0.5}]. While a sentence like oppenheimer soundtrack would return something similar to, [{acousticness:0.4,danceability:0.1,energy:0.5,instrumentalness:0.8,liveness:0.2,loudness:0.5}]. Do this for the sentence, intern coffee breaks",
    "max_tokens": 200,
    "temperature": 0
  }'


curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "system",
        "content": "Given a sentence, give a decimal value from 0 to 1 of the sentences relevance to the following parameters based on the emotions the sentence conveys: acousticness, danceability, energy, instrumentalness, liveness, and loudness. Output this in the format of a JavaScript map, with keys as the parameters and values as the rating, and no other text. For example, the sentence barbie soundrack would return something similar to, [{acousticness:0.2,danceability:0.9,energy:0.8,instrumentalness:0.4,liveness:0.1,loudness:0.5}]. While a sentence like oppenheimer soundtrack would return something similar to, [{acousticness:0.4,danceability:0.1,energy:0.5,instrumentalness:0.8,liveness:0.2,loudness:0.5}]."
      },
      {
        "role": "user",
        "content": "intern coffee breaks"
      }
    ]
  }'
