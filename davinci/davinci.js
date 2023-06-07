import axios from "axios";
const button = document.querySelector("#send-btn");
const inputText = document.querySelector("#text");

const outputBox = document.querySelector(".output-box");
let images;
let currentImageIndex = 0;

const updateImageUrl = () => {
  document.querySelector("img").src = images[currentImageIndex];
}
button.addEventListener("click", async () => {
  const img = document.querySelector("img");
  if(img) img.remove();

  const options = {
    method: 'POST',
    url: 'https://ai-image-generator3.p.rapidapi.com/generate',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '5a23baae9emsh9c14d082a1ef12ep1b2b30jsn93ff59c2bf6f',
      'X-RapidAPI-Host': 'ai-image-generator3.p.rapidapi.com'
    },
    data: {
      prompt: inputText.value,
      page: 1
    }
  };

  try {
    const response = await axios.request(options);
    const newImg = document.createElement("img");
    images = response.data.results.images;
    const imageUrl = response.data.results.images[currentImageIndex];
    newImg.src = imageUrl;
    newImg.classList.add("img");
    const button = document.createElement("button");
    button.textContent = "Generate another variety";
    button.classList.add("button");
    button.addEventListener("click",() => {
      currentImageIndex ++;
      if(currentImageIndex > images.length){
        return alert("no more varieties");
      }
      updateImageUrl();
    })
    outputBox.append(button);
    outputBox.append(newImg);
  } catch (error) {
    console.error(error);
  }
});

