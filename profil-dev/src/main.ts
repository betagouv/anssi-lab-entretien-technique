import App from "./App.svelte";
import type { WeatherForecast } from "./weather-forecast-gateway";
import { OpenMeteoGateway } from "./weather-forecast-gateway/open-meteo.gateway";

const weatherForecastGateway: WeatherForecast = new OpenMeteoGateway();

const app = new App({
  target: document.getElementById("app")!,
  props: {
    weatherForecastGateway
  }
});

export default app;
