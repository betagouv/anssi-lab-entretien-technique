export type Position = {
  latitude: number;
  longitude: number;
};

export type Forecast = {
  data: {
    time: string;
    tempInCelcius: number;
  }[];
};

export interface WeatherForecast {
  getForecast(position: Position): Promise<Forecast>;
}
