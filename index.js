const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".city");
const card = document.querySelector(".card");
const apikey = "2a89494dc6a28eda670d37c714f495cd";

weatherform.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityinput.value; // Fix: Correcting the typo from ariaValueMax to value
    if(city) {
        try {
            const weatherdata = await getweatherdata(city);
            displayweather(weatherdata);
        } catch (error) {
            console.log(error);
            displayerror(error);
        }
    } else {
        displayerror("Please enter a city");
    }
});

async function getweatherdata(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    const response = await fetch(apiurl);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    return data;
}

function displayweather(data) {
    const { name, main, weather } = data;
    const citydisplay = document.createElement("p");
    citydisplay.classList.add("citydisplay");
    citydisplay.textContent = `${name}`;

    const temp = document.createElement("p");
    temp.classList.add("temp");
    temp.textContent = `${main.temp}°C`;

    const humid = document.createElement("p");
    humid.classList.add("humid");
    humid.textContent = `Humidity: ${main.humidity}%`;

    const desc = document.createElement("p");
    desc.classList.add("descdis");
    desc.textContent = weather[0].description;

    const weatheremoji = document.createElement("p");
    weatheremoji.classList.add("weather");
    weatheremoji.textContent = getweatheremoji(weather[0].id);

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(citydisplay);
    card.appendChild(temp);
    card.appendChild(humid);
    card.appendChild(desc);
    card.appendChild(weatheremoji);
}

function getweatheremoji(weatherid) {
    if (weatherid >= 200 && weatherid < 300) return "⚡";
    if (weatherid >= 300 && weatherid < 400) return "🌧️"; 
    if (weatherid >= 500 && weatherid < 600) return "🌧️";
    if (weatherid >= 600 && weatherid < 700) return "❄️";
    if (weatherid >= 700 && weatherid < 800) return "🌫️"; 
    if (weatherid === 800) return "☀️";
    if (weatherid >= 801 && weatherid < 900) return "⛅"; 
    return "🌍"; 
}

function displayerror(message) {
    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("error");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}
