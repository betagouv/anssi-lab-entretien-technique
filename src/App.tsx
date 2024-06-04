import { useEffect, useState } from "react";
import "./App.css";

type Position = {
  latitude: number;
  longitude: number;
  precision: number;
};

function App() {
  const [position, setPosition] = useState<Position | undefined>();
  const [testMeteo, setTestMeteo] = useState({
    temperature: 0,
    date: ""
  });



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
          setTestMeteo({
            temperature: json.hourly.temperature_2m[0],
            date: json.hourly.time[0],
          });
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
        <p>{testMeteo.temperature}</p>
        <p>{testMeteo.date}</p>
      </div>
    </>
  );
}

export default App;
