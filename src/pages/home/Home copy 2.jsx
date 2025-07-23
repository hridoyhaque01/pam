import moment from "moment";
import { useEffect, useState } from "react";
import { getHour, getMinute, getTimes } from "../../lib/getTimes";

const TimePicker = ({ time }) => {
  const [isShowHour, setIsShowHour] = useState(true);
  const [format, setFormat] = useState("PM");
  const [showHour, setShowHour] = useState("12");
  const [showMinute, setShowMinute] = useState("12");
  const [timestamp, setTimestamp] = useState(0);

  const formatedHour = getHour(showHour);
  const formatedMinute = getMinute(showMinute);

  useEffect(() => {
    if (time) {
      setTime(time);
    }
  }, [time]);

  const handleHourSelect = (hour) => {
    setShowHour(hour);
    setIsShowHour(false);
    getCurrentTime();
  };

  const handleMinuteSelect = (minute) => {
    setShowMinute(minute);
    getCurrentTime();
  };

  const getCurrentTime = () => {
    let minute = parseInt(showMinute);
    if (minute === 12) {
      minute = "00";
    } else {
      minute = minute * 5;
    }

    const timeString = `${showHour}:${minute} ${format}`;
    const currentDate = moment().format("YYYY-MM-DD");
    const combinedDateTimeString = `${currentDate} ${timeString}`;
    const dateTime = moment(combinedDateTimeString, "YYYY-MM-DD h:mm A");
    const unixTimestamp = dateTime.unix();
    setTimestamp(unixTimestamp);
    return unixTimestamp * 1000;
  };

  const changeFormat = (value) => {
    setFormat(value);
  };

  const changeTimeFormat = (value) => {
    setIsShowHour(value);
  };

  const setTime = (time) => {
    if (time) {
      const { hour, minute, format } = getTimes(time);
      setShowHour(hour || "12");
      setShowMinute(minute || "12");
      setFormat(format || "PM");
    } else {
      resetTimes();
    }
    getCurrentTime();
  };

  const resetTimes = () => {
    setIsShowHour(true);
    setFormat("PM");
    setShowHour("12");
    setShowMinute("12");
    setTimestamp(0);
  };

  return (
    <div className="w-full max-w-max mx-auto select-none">
      <div className="text-2xl font-semibold mb-4 flex items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <span
            className="inline-block w-8 cursor-pointer"
            onClick={() => changeTimeFormat(true)}
          >
            {formatedHour}
          </span>
          <span>:</span>
          <span
            className="inline-block w-8 cursor-pointer"
            onClick={() => changeTimeFormat(false)}
          >
            {formatedMinute}
          </span>
        </div>
        <div className="flex flex-col">
          <button
            type="button"
            className="flex items-center justify-center"
            onClick={() => changeFormat("AM")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M7 14.5L12 9.5L17 14.5H7Z" fill="#E0E0E0" />
            </svg>
          </button>
          <div className="flex flex-col h-8 overflow-hidden">
            <span
              className={`duration-300 ${
                format === "AM" ? "" : "translate-y-8"
              }`}
            >
              AM
            </span>
            <span
              className={`duration-300 ${
                format === "AM" ? "" : "-translate-y-8"
              }`}
            >
              PM
            </span>
          </div>
          <button
            type="button"
            className="flex items-center justify-center"
            onClick={() => changeFormat("PM")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M7 9.5L12 14.5L17 9.5H7Z" fill="#E0E0E0" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hour Selector */}
      {isShowHour ? (
        <div className="p-1.5 border rounded-full">
          <div className="relative p-8 border rounded-full bg-red-100 outline-neutral-300">
            <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full relative flex items-center justify-center before:content-[''] before:absolute before:w-2 before:h-2 before:bg-green-main before:rounded-full">
              {Array.from({ length: 12 }).map((_, index) => {
                const hour = index + 1;
                return (
                  <div
                    key={hour}
                    className={`absolute -top-1/2 left-1/2 -translate-x-1/2 origin-[50%,100%] h-full cursor-pointer z-40 duration-300 ${
                      parseInt(showHour || 12) === hour ? "text-white" : ""
                    }`}
                    style={{
                      transform: `rotate(${hour * 30}deg)`,
                      transformOrigin: "50% 100%",
                    }}
                    onClick={() => handleHourSelect(hour)}
                  >
                    <span
                      className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
                      style={{ transform: `rotate(-${hour * 30}deg)` }}
                    >
                      {hour}
                    </span>
                  </div>
                );
              })}

              {/* Hour hand */}
              <div
                className="absolute flex items-end justify-center duration-300 z-30"
                style={{
                  transform: `rotate(${parseInt(showHour || 12) * 30}deg)`,
                }}
              >
                <div className="absolute w-1 h-[100px] sm:h-[132px] bg-green-300 rounded-full flex items-start justify-center" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Minute Selector
        <div className="p-1.5 border rounded-full">
          <div className="relative p-8 border rounded-full bg-blue-400 outline-neutral-300">
            <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full relative flex items-center justify-center before:content-[''] before:absolute before:w-2 before:h-2 before:bg-green-400 before:rounded-full">
              {Array.from({ length: 12 }).map((_, index) => {
                const minute = index + 1;
                return (
                  <div
                    key={minute}
                    className={`absolute -top-1/2 left-1/2 -translate-x-1/2 origin-[50%,100%] h-full cursor-pointer z-40 duration-300 ${
                      parseInt(showMinute) === minute ? "text-white" : ""
                    }`}
                    style={{
                      transform: `rotate(${minute * 30}deg)`,
                      transformOrigin: "50% 100%",
                    }}
                    onClick={() => handleMinuteSelect(minute)}
                  >
                    <span
                      className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
                      style={{ transform: `rotate(-${minute * 30}deg)` }}
                    >
                      {minute * 5 === 60 ? 0 : minute * 5}
                    </span>
                  </div>
                );
              })}

              {/* Minute hand */}
              <div
                className="absolute flex items-end justify-center duration-300 z-30"
                style={{ transform: `rotate(${parseInt(showMinute) * 30}deg)` }}
              >
                <div className="absolute w-1 h-[100px] sm:h-[132px] bg-green-400 rounded-full after:absolute after:content-[''] after:h-10 after:w-10 after:rounded-full after:bg-green-400 flex items-start justify-center before:z-10" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
