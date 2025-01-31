import { useLayoutEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

const Forecast = ({ forecast, today }: { forecast: any; today?: boolean }) => {
  return (
    <li className="flex items-center justify-between">
      <span className="flex gap-3 items-center">
        <img
          src={`./${forecast?.weather[0].main.toLowerCase()}.png`}
          width={50}
          height={50}
        />
        <span>
          {today
            ? "Today"
            : new Date(forecast?.dt * 1000).toLocaleDateString("en-US", {
                weekday: "long",
              })}
        </span>
      </span>

      {!today && (
        <span>
          {forecast?.temp?.min?.toFixed()}&deg; -{" "}
          {forecast?.temp?.max?.toFixed()}
          &deg;
        </span>
      )}
      {today && <span>{forecast?.temp?.toFixed()}&deg;</span>}
    </li>
  );
};

export default function LocationDetails() {
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState<any>(null);
  const city = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  useLayoutEffect(() => {
    const getLocationDetails = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minute,hourly,alerts&units=metric&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }`
      );
      const data = await res.json();
      setDetails(data);
    };

    try {
      getLocationDetails();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <main className="container max-h-[600px]">
      <div className="min-h-[150px] flex flex-col justify-center px-5 bg-[rgba(245,90,90,0.1)]">
        <div className="flex">
          <Link
            to="/"
            className="h-[26px] w-[26px] shadow rounded-full flex items-center justify-center bg-primary"
          >
            <img src="./arrow-left.svg" width={15} />
          </Link>
          <div className="text-lg font-semibold flex-1 text-center">
            <p>{city}</p>
            <p className="text-2xl">{details?.current.temp.toFixed()}&deg;</p>
          </div>
        </div>
      </div>
      <div className="py-4 px-5">
        <p className="text-lg font-medium">5 day forecast</p>
        <ul className="py-4">
          <Forecast forecast={details?.current} today />
          {details?.daily.slice(0, 4).map((forecast: any) => (
            <Forecast key={forecast.dt} forecast={forecast} />
          ))}
        </ul>
      </div>
    </main>
  );
}
