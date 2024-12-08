/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",us&appid=c5d865d192590ae2b53a6c94c140d7b5&units=imperial";
const generate = document.getElementById("generate");

const server = "http://localhost:3030";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

generate.addEventListener("click", perforAction);

function perforAction(e) {
  const newZipCode = document.getElementById("zip").value;
  getZipData(baseUrl, newZipCode, apiKey).then(function (data) {
    console.log(data.main.temp);
    console.log(feelings);

    postData(server + "/addZip", {
      temp: data.main.temp,
      date: newDate,
      content: data.content,
    });
    retrieveData();
  });
}

const getZipData = async (baseUrl, newZipCode, apiKey) => {
  const response = await fetch(baseUrl + newZipCode + apiKey);
  try {
    const data = await response.json();
    console.log(data);
    console.log(baseUrl + newZipCode + apiKey);
    if (data.cod != 200) {
      window.alert("Invalid Zip Code");
    }
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newDate = await response.json();
    console.log(newDate);
    return newDate;
  } catch (error) {
    console.log("error", error);
  }
};
const retrieveData = async () => {
  const request = await fetch(server + "/all");
  const feelings = document.getElementById("feelings").value;

  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + "degrees";
    document.getElementById("content").innerHTML = feelings;
    document.getElementById("date").innerHTML = newDate;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
