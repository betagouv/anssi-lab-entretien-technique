<script lang="ts">
  import { onMount } from "svelte";

  type Position = {
    latitude: number;
    longitude: number;
    precision: number;
  };

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
    if (position)
      // https://open-meteo.com/en/docs/meteofrance-api
      fetch(
        `https://api.open-meteo.com/v1/meteofrance?latitude=${position.latitude}&longitude=${position.longitude}&hourly=temperature_2m&timezone=Europe%2FBerlin`,
      )
        .then((res) => res.json())
        .then((json) => console.log(json));
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
    …
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
