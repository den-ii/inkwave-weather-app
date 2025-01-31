import { useState } from "react";
import AddLocationModal from "../ui/AddLocationModal";
import LocationWeather from "../ui/LocationWeather";
import Loader from "../ui/Loader";

const BASE_URL = import.meta.env.PROD ? import.meta.env.VITE_BASE_URL : "/api";

export default function Home() {
  const [addLocationModal, setAddLocationModal] = useState(false);
  const [locations, setLocations] = useState<any>([]);
  const [weatherLocations, setWeatherLocations] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  async function addLocation(location: any) {
    setLocations((prev: any) => [...prev, location]);
    setLoading(true);
    setAddLocationModal(false);
    let weather = null;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          location.lat
        }&lon=${location.lon}&units=metric&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }`
      );
      weather = await res.json();
    } catch (err) {
      console.error("error", err);
    }

    try {
      const google_res = await fetch(
        `${BASE_URL}/place/autocomplete/json?input=${
          location.place
        }&types=(cities)&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
      );

      const google_data = await google_res.json();
      const place_id = google_data.predictions[0].place_id ?? null;
      const photo_id_res = await fetch(
        `/api/place/details/json?placeid=${place_id}&key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }`
      );
      const photo_id_data = await photo_id_res.json();
      const photo_reference = photo_id_data.result.photos[0].photo_reference;

      const photo_res = await fetch(
        `${BASE_URL}/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }`
      );
      // const photo_data = await photo_res.json();
      weather.image = photo_res.url;
      weather = { ...weather, image: weather.image };
    } catch (err) {
      console.error(err);
    }
    if (!weather) return;
    setWeatherLocations((prev: any) => [...prev, weather]);
    setLoading(false);
  }

  function removeLocation(id: string) {
    setLocations((prev: any) =>
      prev.filter((location: any) => location.id !== id)
    );
    setWeatherLocations((prev: any) => {
      const newWeatherLocations = prev.filter(
        (weather: any) => weather.id !== id
      );
      return newWeatherLocations;
    });
  }

  function toggleAddLocationModal() {
    setAddLocationModal((prev) => !prev);
  }

  const nothing = locations.length === 0 && !loading;
  const show = !loading && weatherLocations.length > 0;

  return (
    <>
      <main className="max-w-[500px] mx-auto h-screen min-h-screen max-h-[600px] flex flex-col px-5">
        <nav className="flex items-center justify-end py-4">
          <button onClick={toggleAddLocationModal}>
            <img src="./add.svg" width={30} />
          </button>
        </nav>
        <div className="flex-1 flex flex-col">
          <div className="text-3xl font-semibold">Welcome</div>
          {loading && (
            <div className="flex-1 flex justify-center items-center">
              <Loader />
            </div>
          )}
          {show && (
            <ul className="flex-1 flex flex-col gap-2 py-4">
              {weatherLocations.map((weather: any) => (
                <LocationWeather
                  weather={weather}
                  handleDelete={removeLocation}
                />
              ))}
            </ul>
          )}
          {nothing && (
            <div className="flex-1 flex justify-center items-center">
              Add a location to view weather
            </div>
          )}
        </div>
        <div className="py-3  w-full flex left-0 right-0 justify-center">
          <div className="max-w-[500px] px-5 w-full">
            <button
              className="bg-primary block py-3 rounded-md w-full !text-white text-xl font-semibold"
              onClick={toggleAddLocationModal}
            >
              Add Location
            </button>
          </div>
        </div>
      </main>
      {addLocationModal && (
        <AddLocationModal
          toggleAddLocationModal={toggleAddLocationModal}
          addLocation={addLocation}
        />
      )}
    </>
  );
}
