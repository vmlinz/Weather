const OWM_API_KEY = '3046ad11a19532df369035b6239c44cb';
const OWM_API_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

function kToF(k) {
  return `${Math.round((k - 273.15) * 1.8 + 32)} F`;
}

export default function (latitude, longitude) {
  return fetch(`${OWM_API_BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${OWM_API_KEY}`)
  .then((response) => response.json())
  .then((json) => ({
    city: json.name,
    temperature: kToF(json.main.temp),
    description: json.weather[0].description,
  }))
  .catch((error) => {
    console.warn(error);
  });
}
