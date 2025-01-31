import { useNavigate } from "react-router";

export default function LocationWeather({
  weather,
  handleDelete,
}: {
  weather: any;
  handleDelete: (id: any) => void;
}) {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(
      `/location-details?city=${weather.name}&lat=${weather.coord.lat}&lon=${lon}`
    );
  };

  const deleteLocation = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    handleDelete(weather.id);
  };

  const lon = weather.coord.lon;
  return (
    <li className="">
      <span
        className="flex justify-between items-center py-2"
        onClick={navigateToDetails}
      >
        <div className="flex items-center gap-3">
          <img
            src={weather.image}
            className="rounded-[6px] object-cover h-[150px] w-[150px]"
          />
          <div className="flex flex-col">
            <span className="text-xl inline-block">{weather.name}</span>
            <span className="text-lg inline-block !text-primary">
              {weather.main.temp.toFixed()}&deg;, {weather.weather[0].main}
            </span>
          </div>
        </div>
        <button onClick={deleteLocation}>
          <img src="./trash.svg" width={20} />
        </button>
      </span>
    </li>
  );
}
