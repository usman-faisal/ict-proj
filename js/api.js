const url = "https://waifu.p.rapidapi.com/v1/waifu";
import axios from "axios";

const generateRandomId = () => {
  const randomId = Math.floor(Math.random() * 10000);
  return randomId;
};
export const sendText = async (text, situation, from, to) => {
  const options = {
    method: "POST",
    url: "https://waifu.p.rapidapi.com/path",
    params: {
      user_id: 12345,
      message: text,
      from_name: from,
      to_name: to,
      situation: situation,
      translate_from: "auto",
      translate_to: "auto",
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "5a23baae9emsh9c14d082a1ef12ep1b2b30jsn93ff59c2bf6f",
      "X-RapidAPI-Host": "waifu.p.rapidapi.com",
    },
    data: {},
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
