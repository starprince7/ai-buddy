import axios from "axios";

export async function postToAi(prompt: string, file: string) {
  try {
    const { data } = await axios.post("https:www.subber.net/api/ai");
    return data;
  } catch (e) {
    console.log("Error posting to AI:", e);
  }
}
