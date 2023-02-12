import useOpenWeatherData from "@/composables/useOpenWeatherData";
import { dateAndTimeForRemote } from "../utility";

import type {
  ForecastWeatherData,
  ForecastItemWeatherData,
  ForecastItemWeatherDataForRender,
} from "../interfaces";
import type { LocationQueryValue } from "vue-router";

export default async function useForecastWeatherDataForRender(
  lat: string | undefined,
  lon: string | undefined,
  cityFullName: string | undefined
) {
  const forecastWeatherData = await useOpenWeatherData<ForecastWeatherData>(
    lat,
    lon,
    "forecast"
  );

  const forecastWeatherDataTimezone = forecastWeatherData.city.timezone;

  const forecastWeatherDataForRenderInit = forecastWeatherData.list.map(
    (threeHourForecastItem: ForecastItemWeatherData) => {
      const dateArr = dateAndTimeForRemote(
        threeHourForecastItem.dt,
        forecastWeatherDataTimezone
      );

      return {
        dt: threeHourForecastItem.dt,
        city_full_name: cityFullName,
        dateArr: dateArr,
        date: dateArr[2] + "_" + dateArr[3],
        weather_description: threeHourForecastItem.weather[0].description,
        temp: Math.round(threeHourForecastItem.main.temp) + '°',
        picture: threeHourForecastItem.weather[0].icon,
      };
    }
  );

  const foreacastDates = new Set<string>();

  forecastWeatherDataForRenderInit.forEach(
    (threeHourForecastItemForRender: ForecastItemWeatherDataForRender) => {
      foreacastDates.add(threeHourForecastItemForRender.date);
    }
  );

  const foreacastDatesArr: string[] = Array.from(foreacastDates);

  const forecastWeatherDataForRenderArrProcessed: ForecastItemWeatherDataForRender[][] =
    [];

  foreacastDatesArr.forEach((forecastDate: string) => {
    const forecastWeatherDataForRenderItemArr =
      forecastWeatherDataForRenderInit.filter(
        (threeHourForecastItemForRender: ForecastItemWeatherDataForRender) =>
          threeHourForecastItemForRender.date === forecastDate
      );

    forecastWeatherDataForRenderArrProcessed.push(
      forecastWeatherDataForRenderItemArr
    );
  });

  return forecastWeatherDataForRenderArrProcessed;
}
