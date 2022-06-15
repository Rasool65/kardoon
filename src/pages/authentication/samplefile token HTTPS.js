const callWeather = () => {
  debugger;
  axios.defaults.withCredentials = true;
  axios.get(`https://krdnv07.kardoon.local:8009/WeatherForecast`).then((res) => {
    debugger;
    const persons = res.data;
  });
};
const callWeatherwithtoken = () => {
  debugger;

  httpRequest.getRequest(`https://krdnv07.kardoon.local:8009/WeatherForecast`).then((res) => {
    debugger;
    const persons = res.data;
  });
};
