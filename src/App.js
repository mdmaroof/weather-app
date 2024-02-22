import { MdLocationOn } from "react-icons/md";
import { GoSearch } from "react-icons/go";

import { BiWater } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { LuLoader2 } from "react-icons/lu";

import { useState } from "react";


const api_key = "86d92c15f6484454930130514242202";
function App() {

  const [cityName, setCityName] = useState('');
  const [currentData, setCurrentData] = useState(null);
  const [loader, setLoader] = useState(false);

  const callApi = async () => {
    if (!cityName) {
      setCityName('')
      setCurrentData(null)
      alert('Please type city name');
      return
    }
    setLoader(true)
    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${cityName}&aqi=no`);
    const { location, current, error } = await res.json();
    setLoader(false)
    if (error) {
      setCityName('')
      setCurrentData(null)
      alert(error?.message || 'something went wrong')
      return
    }
    setCityName(location?.name || '')
    setCurrentData(current || null)
  }

  // const getGeoPoints = async () => {
  //   const res = await fetch(`https://api.weatherapi.com/v1/search.json?key=${api_key}&q=${cityName}`);
  //   const result = await res.json();
  //   console.log(result)
  // }

  return (
    <div className="flex justify-center items-center min-h-svh">
      {/* <img src={bgImage} alt="weather app by maroof" className="h-full w-full absolute bg-cover bg-center" /> */}
      <div className={`bg-white/10 w-[400px]  rounded-md p-4 backdrop-blur-xl border border-white/20 transition-all duration-700 ease-in-out overflow-hidden ${(!currentData && 'h-[85px]') || 'h-[400px]'}`}>
        {/* searchbox */}
        <div className="w-full flex flex-row items-center h-[50px] relative">
          <div className="absolute w-[40px] h-full flex items-center justify-center text-2xl text-white">
            <MdLocationOn />
          </div>
          <div className="relative w-full h-full">
            <input
              value={cityName}
              onChange={(e) => setCityName(e.target.value || null)}
              className="border-2 border-white/20 absolute w-full h-full bg-transparent outline-none rounded-lg text-lg text-white font-medium uppercase pr-[40px] pl-[40px] placeholder:text-white placeholder:capitalize"
              placeholder="Enter your location" />

            {/* <div className="bg-white rounded-md w-full h-[150px] absolute top-[55px]">
              </div> */}
          </div>
          {!loader && (
            <div
              onClick={() => callApi()}
              className="absolute right-0 w-[40px] text-2xl h-full flex items-center justify-center cursor-pointer text-white">
              <GoSearch />
            </div>
          )}
          {loader && (
            <div
              className="absolute right-0 w-[40px] text-2xl h-full flex items-center justify-center text-white animate-spin"
            >
              <LuLoader2 />
            </div>
          )}
        </div>
        {/* searchbox */}

        {currentData && (
          <>
            {/* main weather */}
            <div className="relative flex flex-col justify-center items-center py-14 text-white">
              <div className="relative">
                <img src={`http:${currentData?.condition?.icon}`} alt="maroof weather app" />
              </div>
              <div className="text-4xl font-bold">{currentData?.feelslike_c || 0} &deg;C</div>
              <div className="text-lg">{currentData?.condition?.text || 'No Data'}</div>
            </div>
            {/* main weather */}

            {/* extra info */}
            <div className="flex justify-between px-4">

              <div className="flex text-white gap-2 items-center">
                <div className="text-[50px]"><BiWater /></div>
                <div className="flex flex-col">
                  <div className="text-lg font-semibold">{currentData?.humidity || '0'}%</div>
                  <div className="text-sm">Humidity</div>
                </div>
              </div>

              <div className="flex text-white gap-2 items-center">
                <div className="text-[50px]"><FiWind /></div>
                <div className="flex flex-col">
                  <div className="text-lg font-semibold">{currentData?.wind_kph || '0'}km/h</div>
                  <div className="text-sm">wind speed</div>
                </div>
              </div>
            </div>
            {/* extra info */}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
