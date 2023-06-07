import axios from "axios";

const button = document.querySelector("#send-btn");
const inputText = document.querySelector("#text");
const output = document.querySelector(".output");

button.addEventListener("click", async () => {
  try {
    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${inputText.value}`
    );
    output.classList.add("show");

    output.innerHTML = response.data.extract;
  } catch (err) {
    output.classList.add("show");
    output.innerHTML = "Please try another topic";
  }
});
inputText.addEventListener("input", () => {
  output.classList.remove("show");
  output.innerHTML = "";
});
