import axios from "axios";
const button = document.querySelector("#send-btn");
const inputText = document.querySelector("#text");

const outputBox = document.querySelector(".output-box");

button.addEventListener("click", async () => {
  const img = document.querySelector("img");
  console.log(img);
  if (img) img.remove();
  const encodedParams = new URLSearchParams();
  encodedParams.set("prompt", inputText.value);
  encodedParams.set("id", "12345");
  encodedParams.set("width", "768");
  encodedParams.set("height", "768");
  encodedParams.set("inferenceSteps", "50");
  encodedParams.set("guidanceScale", "7.5");
  encodedParams.set("img2img_strength", "0.75");

  const options = {
    method: "POST",
    url: "https://arimagesynthesizer.p.rapidapi.com/generate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "5a23baae9emsh9c14d082a1ef12ep1b2b30jsn93ff59c2bf6f",
      "X-RapidAPI-Host": "arimagesynthesizer.p.rapidapi.com",
    },
    data: encodedParams,
  };
  try {
    const response = await axios.request(options);
    const hash = response.data.hash;

    const options1 = {
      method: "GET",
      url: "https://arimagesynthesizer.p.rapidapi.com/get",
      params: {
        hash: hash,
        returnType: "image",
      },
      responseType: "arraybuffer",
      headers: {
        "X-RapidAPI-Key": "5a23baae9emsh9c14d082a1ef12ep1b2b30jsn93ff59c2bf6f",
        "X-RapidAPI-Host": "arimagesynthesizer.p.rapidapi.com",
      },
    };

    try {
      let response = await axios.request(options1);
      if (response.data.message) {
        while (true) {
          setTimeout(async () => {
            const newResponse = await axios.request(options1);
            response = newResponse;
          }, 5000);
        }
      }
      const base64Data = btoa(
        String.fromCharCode(...new Uint8Array(response.data))
      );
      const img = document.createElement("img");
      img.classList.add("img");
      img.src = "data:image/png;base64," + base64Data;
      outputBox.append(img);
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
});
