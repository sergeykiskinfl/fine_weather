import { OPEN_WEATHER_API_URL, OPEN_WEATHER_API_KEY } from "../api";

// Get weather's info from Open Weather API on latitude and longitude
export default async function useOpenWeatherData<T>(
  lat: string | undefined,
  lon: string | undefined,
  kind: string
): Promise<T> {
  let weatherData;
  let timerId: ReturnType<typeof setTimeout> | null = null;

  try {
    const controller = new AbortController();

    timerId = setTimeout(async () => {
      controller.abort();
      await useOpenWeatherData(lat, lon, kind);
    }, 10000);

    const response = await fetch(
      `${OPEN_WEATHER_API_URL}/${kind}?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
      { signal: controller.signal }
    );

    clearTimeout(timerId);
    timerId = null;

    weatherData = await response.json();
  } catch (error) {
    console.log("error during fetch", error);
  }

  return weatherData;
}
