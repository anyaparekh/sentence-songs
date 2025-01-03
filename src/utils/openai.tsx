import { Configuration, OpenAIApi } from "openai";

export async function queryOpenAI(sentence: string) {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "assistant",
        content:
          'Given a sentence, give a list of 20 songs (find obscure and not popular songs+artists, but MUST be found on spotify) and, their respective artist that are relevant to the emotions and meaning the sentence conveys. Some examples of emotions to look for are, danceability, energy, instrumentalness, liveness, and loudness. Output this in the format of a JavaScript map, with keys as the song title and values as the artist, and no other text. For example, the sentence i like succulents would return something similar to, [{"Electric Feel":"MGMT","Young Folks":"Peter Bjorn and John","Sunflower":"Post Malone, Swae Lee","Banana Pancakes":"Jack Johnson","Budapest":"George Ezra","Take It Easy":"Eagles","Send Me On My Way":"Rusted Root","Plant Life":"Vince Staples","Sunshine":"Tom Misch","Here Comes The Sun":"The Beatles","Sunshine":"Matisse & Sadko, Swanky Tunes","Sittin\' On The Dock of the Bay":"Otis Redding","Life is a Highway":"Tom Cochrane","Tropicalia":"Beck","Green Light":"Lorde","Riptide":"Vance Joy","Island in the Sun":"Weezer","Put It All On Me":"Ed Sheeran"}]. Another example is for a sentence like kya hua tera vada the output should be [{"Dil Dhadakne Do":"Zindagi Na Milegi Dobara, Shankar-Ehsaan-Loy"},{"Ae Mere Humsafar":"Baazigar, Udit Narayan, Alka Yagnik"},{"Chura Liya Hai Tumne":"Yaadon Ki Baaraat, Asha Bhosle, Mohammed Rafi"},{"Tera Ban Jaunga":"Kabir Singh, Akhil Sachdeva, Tulsi Kumar"},{"Kabhi Kabhi Aditi":"Jaane Tu Ya Jaane Na, Rashid Ali"},{"Tum Hi Tum":"Shershaah, Jubin Nautiyal, Asees Kaur"},{"Pal":"Jalebi, Arijit Singh, Shreya Ghosal"},{"Pehla Nasha":"Jo Jeeta Wohi Sikandar, Udit Narayan, Sadhana Sargam"},{"Tum Jo Aaye":"Once Upon a Time in Mumbaai, Rahat Fateh Ali Khan, Sunidhi Chauhan"},{"Hasi Ban Gayi":"Hamari Adhuri Kahani, Ami Mishra"},{"Tum Se Hi":"Jab We Met, Mohit Chauhan"},{"Tum Jo Aaye (Reprise)":"Once Upon a Time in Mumbaai, Rahat Fateh Ali Khan"},{"Tera Yaar Hoon Mai":"Sonu Ke Titu Ki Sweety, Arijit Singh"},{"Raabta":"Agent Vinod, Arijit Singh, Shreya Ghosal"},{"Tum Mile":"Tum Mile, Neeraj Shridhar, Javed Ali"},{"Tujh Mein Rab Dikhta Hai":"Rab Ne Bana Di Jodi, Roop Kumar Rathod"},{"Jeene Laga Hoon":"Ramaiya Vastavaiya, Atif Aslam, Shreya Ghosal"},{"Dil Ki Tamanna":"Aashiqui 2, Arijit Singh"},{"Zara Zara":"Rehna Hai Tere Dil Mein, Hariharan, Sadhana Sargam"}].',
      },
      {
        role: "user",
        content: sentence,
      },
    ],
  });
  return completion.data.choices[0].message
    ? completion.data.choices[0].message["content"]
    : "";
}
