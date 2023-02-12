import type { CityLocalStorageItem } from "../interfaces";

export function getFineWeatherCitiesFromLocalStorage(): CityLocalStorageItem[] {
  let result;
  const localResult = localStorage.getItem("fineWeatherCitiesLocalStorage");

  if (localResult) {
    result = JSON.parse(localResult);
  } else {
    result = [];
  }

  return result;
}

export function setFineWeatherCityItemToLocalStorage(
  cityItemFullName: string,
  lat: string | undefined,
  lon: string | undefined,
  fineWeatherCitiesArr: CityLocalStorageItem[]
): CityLocalStorageItem[] {
  const savedCityItem: CityLocalStorageItem = {
    cityItemFullName,
    lat,
    lon,
  };

  const resultArr = [...fineWeatherCitiesArr];

  resultArr.push(savedCityItem);

  if (resultArr.length > 3) {
    resultArr.shift();
  }

  const savedStr = JSON.stringify(resultArr);

  localStorage.setItem("fineWeatherCitiesLocalStorage", savedStr);

  return resultArr;
}

export function removeWeatherCityItemFromLocalStorage(
  cityItemFullName: string,
  fineWeatherCitiesArr: CityLocalStorageItem[]
) {
  const filteredCityArr = fineWeatherCitiesArr.filter(
    (cityItem) => cityItem.cityItemFullName !== cityItemFullName
  );

  const savedStr = JSON.stringify(filteredCityArr);

  localStorage.setItem("fineWeatherCitiesLocalStorage", savedStr);

  return filteredCityArr;

}
