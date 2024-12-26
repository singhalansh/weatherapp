const API_key ="your_api";
const input = document.getElementById("city");
document.getElementById("search").addEventListener("click", () => {
  const city = input.value.trim();
  if (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          const iconCode = data.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

          // Update Weather Details
          document.querySelector("#temp h1").textContent = `${data.main.temp} °C`;
          document.querySelector("#main h4").textContent = city;
          document.querySelector("#humidity h4").textContent = `${data.main.humidity}%`;
          document.querySelector("#windspeed h4").textContent = ` ${data.wind.speed} km/h`;

          // Update Weather Icon
          const weatherIcon = document.getElementById("weatherIcon");
          weatherIcon.src = iconUrl;
          weatherIcon.alt = data.weather[0].description;

          document.getElementById("temp").style.display = "flex";
        } else {
          alert("City not found. Please enter a valid city name.");
        }
      })
      .catch(error => console.error("Error fetching the weather data:", error));
  } else {
    alert("Please enter a valid city name.");
  }
});
document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== input) {
      e.preventDefault(); // Prevent default browser behavior for `/`
      input.focus();
    }
  });