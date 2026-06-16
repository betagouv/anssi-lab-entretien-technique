<script lang="ts">
  import { onMount } from "svelte";
  import type { Forecast, WeatherForecast } from "./weather-forecast-gateway";
  import { OpenMeteoGateway } from "./weather-forecast-gateway/open-meteo.gateway";

  type Position = {
    latitude: number;
    longitude: number;
    precision: number;
  };

  let weatherForecastGateway: WeatherForecast = new OpenMeteoGateway();
  let weather: Forecast;

  let position: Position;

  onMount(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        (position = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          precision: coords.accuracy,
        }),
      () => console.error("KO"),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  });

  $: {
    if (position) {
      // https://open-meteo.com/en/docs/meteofrance-api
      async function getForecast() {
        try {
          const result = await weatherForecastGateway.getForecast(position);
          weather = result;
        } catch (_) {
          console.error("oupsie");
        }
      }

      getForecast()
    }
  }
</script>

<main>
  <div>
    <h2>Emplacement</h2>
    {#if position}
      <div class="card">
        Latitude : {position.latitude} <br />
        Longitude : {position.longitude} <br />
        Précision : {position.precision.toFixed()} mètres
      </div>
    {/if}
  </div>
  <div>
    <h2>Prévisions Météo</h2>
    {#if weather}
      {#each weather.data as forecast }
        <span>time: {forecast.time}</span>
        <span>temperature: {forecast.tempInCelcius}°C</span>
        <br />
      {/each}
    {:else}
      ...
    {/if}
  </div>
</main>

<style>
  main {
    width: 1000px;
    padding: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .card {
    padding-top: 10px;
  }
</style>
