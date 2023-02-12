import useOpenWeatherData from "@/composables/useOpenWeatherData";
import { dateAndTimeForRemote, degreesToWindDirection } from "../utility";

import type { CurrentWeatherData, CurrentWeatherDataForRender } from "../interfaces";

export default async function useCurrentWeatherDataForRender(
  lat: string | undefined,
  lon: string | undefined,
  cityFullName: string | undefined
) {
  const currentWeatherData = await useOpenWeatherData<CurrentWeatherData>(
    lat,
    lon,
    "weather"
  );

  const currentWeatherDataForRender: CurrentWeatherDataForRender = {
    city_full_name: cityFullName,
    dateArr: dateAndTimeForRemote(
      currentWeatherData.dt,
      currentWeatherData.timezone
    ),
    weather_description: currentWeatherData.weather[0].description,
    temp: Math.round(currentWeatherData.main.temp) + '°',
    feels_like: Math.round(currentWeatherData.main.feels_like) + '°',
    picture: currentWeatherData.weather[0].icon,
    pressure: currentWeatherData.main.pressure + ' hPa',
    humidity: currentWeatherData.main.humidity + '%',
    wind_speed: currentWeatherData.wind.speed + ' m/s',
    wind_direction: degreesToWindDirection(currentWeatherData.wind.deg),
  };

  return currentWeatherDataForRender;
}
