import { useState } from "react";
import Loader from "./Loader";

function Location({
  location,
  ...props
}: { location: any } & React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className="flex items-center justify-between py-4 px-4 cursor-pointer"
      {...props}
    >
      <span className="flex items-center gap-4">
        <img src="./location.svg" width={18} />
        <span>{location.place}</span>
      </span>
      <img src="./add2.svg" width={18} />
    </li>
  );
}

export default function AddLocationModal({
  toggleAddLocationModal,
  addLocation,
}: {
  toggleAddLocationModal: () => void;
  addLocation: (location: any) => void;
}) {
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  }

  async function onSearch(value: string) {
    setLoading(true);
    let location = null;
    try {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }`
      );
      location = await res.json();
    } catch (err) {
      console.error(err);
    }
    if (!location) return;
    setLocations(location);
    setLoading(false);
  }

  const nothing = !loading && locations.length === 0;

  return (
    <div className="fixed top-0 bottom-0 bg-white h-screen flex flex-col left-0 right-0 z-50">
      <div className="container max-h-[600px] flex-1 flex flex-col">
        <nav className="flex items-center justify-between py-4 px-4">
          <div className="text-2xl font-semibold text-center items-center w-full flex-1">
            Add Location
          </div>
          <button onClick={() => toggleAddLocationModal()}>
            <img src="./x.svg" width={26} />
          </button>
        </nav>
        <div className="relative">
          <input
            className="py-3 px-4 w-full block rounded-md bg-[rgba(245,90,90,0.1)] focus:outline-0 pl-9 pr-12"
            placeholder="e.g London, Chelsea"
            onChange={handleSearch}
            value={search}
          />
          <img
            src="./search.svg"
            className="absolute left-3 top-[50%] -translate-y-[50%]"
            width={18}
          />
          <button
            className="absolute right-3 top-[50%] -translate-y-[50%]"
            onClick={() => setSearch("")}
          >
            <img src="./x3.svg" width={25} />
          </button>
        </div>
        {loading && (
          <div className="flex-1 flex justify-center items-center">
            <Loader />
          </div>
        )}
        {nothing && (
          <div className="flex-1 flex justify-center items-center">
            Search for a location
          </div>
        )}
        {locations.length > 0 && (
          <ul>
            {locations?.map((location: any) => {
              const id = `${location.lat},${location.lon}`;
              const place = location.state
                ? `${location.name}, ${location.state}`
                : location.name;
              location.place = place;
              location.id = id;
              return (
                <Location
                  onClick={() => addLocation(location)}
                  key={id}
                  location={location}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
