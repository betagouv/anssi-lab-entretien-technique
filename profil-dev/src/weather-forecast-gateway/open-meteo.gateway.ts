import type { Forecast, Position, WeatherForecast } from ".";

type WeatherResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    temperature_2m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
};

export class OpenMeteoGateway implements WeatherForecast {
  async getForecast(position: Position): Promise<Forecast> {
    const result = await fetch(
      `https://api.open-meteo.com/v1/meteofrance?latitude=${position.latitude}&longitude=${position.longitude}&hourly=temperature_2m&timezone=Europe%2FBerlin`,
    )
      .then((res) => res.json())
      .then((json: WeatherResponse) => {
        let data = [];

        let length = json.hourly.time.length;

        for (let i = 0; i < length; i++) {
          data.push({
            time: json.hourly.time[i],
            tempInCelcius: json.hourly.temperature_2m[i],
          });

        }
        return { data };
      });

    if (result) {
      return result;
    } else {
      throw new Error("Unable to fetch data");
    }
  }
}
