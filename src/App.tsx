import { useEffect, useState } from "react";
import "./App.css";

type Position = {
  latitude: number;
  longitude: number;
  precision: number;
};

type Prevision = {
  temperature: number,
  date : string
}

function App() {
  const [position, setPosition] = useState<Position | undefined>();
  const [meteo, setMeteo] = useState<Prevision[]>(
    []
  );



  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        setPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
          precision: coords.accuracy,
        }),
      () => console.error("KO"),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  }, []);

  useEffect(() => {
    if (position) {
      // https://open-meteo.com/en/docs/meteofrance-api
      fetch(
        `https://api.open-meteo.com/v1/meteofrance?latitude=${position.latitude}&longitude=${position.longitude}&hourly=temperature_2m&timezone=Europe%2FBerlin`,
      )
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          let arr: Prevision[] = []
          for(let i = 0; i < 24; i++){
            arr.push({
              temperature: json.hourly.temperature_2m[i],
              date: json.hourly.time[i],
            });
          }
          setMeteo(arr)
        });
    }
  }, [position]);



  return (
    <>
      <div>
        <h2>Emplacement</h2>
        {position && (
          <div className="card">
            Latitude : {position.latitude} <br />
            Longitude : {position.longitude} <br />
            Précision : {position.precision.toFixed()} mètres
          </div>
        )}
      </div>
      <div>
        <h2>Prévisions Météo</h2>…
        {meteo.map((m, index) => <div key={index}><p>{m.date}</p><p>{m.temperature}</p></div> )}
      </div>
    </>
  );
}

export default App;
