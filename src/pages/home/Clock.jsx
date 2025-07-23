import clsx from "clsx";
import { useState } from "react";
import FormInput from "./FormInput";

const FormTimePicker = ({
  label,
  id,
  selectedTime,
  setSelectedTime,
  inputCss,
  ...props
}) => {
  const defaultTime = selectedTime || { hour: 12, minute: 0, period: "AM" };
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isHourPicker, setIsHourPicker] = useState(true);
  const [tempSelectedTime, setTempSelectedTime] = useState(defaultTime);

  const togglePeriod = () => {
    setTempSelectedTime((prev) => ({
      ...prev,
      period: prev.period === "AM" ? "PM" : "AM",
    }));
  };

  const handleHourClick = (hour) => {
    setTempSelectedTime((prev) => ({ ...prev, hour }));
    setIsHourPicker(false); // Switch to minute picker after selecting hour
  };

  const handleMinuteClick = (minute) => {
    setTempSelectedTime((prev) => ({ ...prev, minute }));
  };

  const handleSave = () => {
    setSelectedTime(tempSelectedTime);
    setIsPickerOpen(false); // Close the picker on save
  };

  const handleCancel = () => {
    setTempSelectedTime(defaultTime);
    setIsPickerOpen(false);
  };

  const displayTime = `${tempSelectedTime.hour} : ${String(
    tempSelectedTime.minute
  ).padStart(2, "0")} ${tempSelectedTime.period}`;

  return (
    <div className="relative">
      <FormInput
        id={id}
        value={displayTime}
        readOnly
        onClick={() => {
          setIsPickerOpen(!isPickerOpen);
          setIsHourPicker(true); // Reset to hour picker when opening
        }}
        label={label}
        isChevron
        isPickerOpen={isPickerOpen}
        pickerHandler={() => {
          setIsPickerOpen(!isPickerOpen);
          setIsHourPicker(true); // Reset to hour picker when toggling
        }}
        {...props}
      />

      {isPickerOpen && (
        <div className="relative">
          <div className="absolute z-10 bg-white border border-neutral-300 rounded-[8px] p-4 mt-2 right-0 w-[336px]">
            <div className="flex justify-center items-center mb-4">
              <TimeDisplay
                time={tempSelectedTime}
                isHourPicker={isHourPicker}
                setIsHourPicker={setIsHourPicker}
                togglePeriod={togglePeriod}
              />
            </div>

            <ClockWrapper>
              {isHourPicker ? (
                <Clock
                  numbers={12}
                  onClick={handleHourClick}
                  selected={tempSelectedTime.hour}
                />
              ) : (
                <MinuteClock
                  onClick={handleMinuteClick}
                  selected={tempSelectedTime.minute}
                />
              )}
            </ClockWrapper>

            <div className="flex justify-between gap-x-6 mt-8">
              <button
                onClick={handleCancel}
                className="py-3 bg-[#F5F8F7] text-text-600 rounded w-1/2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="py-3 bg-secondary-400 text-white rounded w-1/2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Time display component
const TimeDisplay = ({ time, isHourPicker, setIsHourPicker, togglePeriod }) => (
  <>
    <span
      className={clsx(
        "text-2xl cursor-pointer font-bold flex items-center gap-2",
        isHourPicker ? "text-secondary-400" : "text-text-900"
      )}
      onClick={() => setIsHourPicker(true)}
    >
      {time.hour}
      <span>:</span>
    </span>

    <span
      className={clsx(
        "text-2xl cursor-pointer font-bold flex items-center gap-2 ml-2",
        !isHourPicker ? "text-secondary-400" : "text-text-900"
      )}
      onClick={() => setIsHourPicker(false)}
    >
      {String(time.minute).padStart(2, "0")}
      <span>:</span>
    </span>
    <div className="text-text-600 flex flex-col items-center">
      <button onClick={togglePeriod} className="shrink-0 outline-none">
        {/* <img src={svgAssets.arrowDropUp} alt="up" className="w-6 h-6" /> */}
      </button>
      <span className="ml-2 text-2xl cursor-pointer">{time.period}</span>
      <button onClick={togglePeriod} className="shrink-0 outline-none">
        {/* <img src={svgAssets.arrowDropDown} alt="down" className="w-6 h-6" /> */}
      </button>
    </div>
  </>
);

// Clock component
const Clock = ({ numbers, onClick, selected }) => {
  const clockNumbers = Array.from({ length: numbers }, (_, i) => i + 1);
  const selectedIndex = selected;

  return (
    <>
      {clockNumbers.map((num, index) => {
        let angle;
        if (index < 2) {
          angle = (index + 1) * 30 + 270;
        } else {
          angle = Math.abs((index + 1) * 30 - 90);
        }
        return (
          <ClockNumber
            key={index}
            style={{
              transform: `rotate(${angle}deg) translate(80px) rotate(-${angle}deg)`,
            }}
            isActive={selectedIndex === num}
            onClick={() => onClick(num)}
            num={num}
          />
        );
      })}

      <ClockPointer
        style={{
          transform: `rotate(${
            (selectedIndex / clockNumbers.length) * 360
          }deg)`,
        }}
      />
    </>
  );
};

// Minute clock component
const MinuteClock = ({ onClick, selected }) => {
  const minuteNumbers = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const selectedIndex = selected / 5;

  return (
    <>
      {minuteNumbers.map((num, index) => {
        let angle;
        if (index < 3) {
          angle = Math.abs((index / 12) * 360 + 270);
        } else {
          angle = Math.abs((index / 12) * 360 - 90);
        }
        return (
          <ClockNumber
            key={index}
            style={{
              transform: `rotate(${angle}deg) translate(80px) rotate(-${angle}deg)`,
            }}
            isActive={selectedIndex === index}
            onClick={() => onClick(num)}
            num={num}
          />
        );
      })}

      <ClockPointer
        style={{
          transform: `rotate(${(selected / 60) * 360}deg)`,
        }}
      />
    </>
  );
};

// Clock wrapper component
const ClockWrapper = ({ children }) => (
  <div className="flex items-center justify-center ">
    <div className="border border-neutral-300 p-1.5 rounded-full w-max">
      <div className="relative w-[200px] h-[200px] rounded-full border border-neutral-300 flex items-center justify-center  bg-neutral-100">
        {children}
      </div>
    </div>
  </div>
);

// Clock pointer component
const ClockPointer = ({ style }) => (
  <>
    <div className="w-[100px] h-[100px] rounded-full bg-red-200 absolute"></div>
    <div className="absolute w-2.5 h-2.5 bg-red-400 rounded-full" />
    <div
      className="absolute w-[3px] h-[130px] rounded-full flex flex-col duration-300"
      style={style}
    >
      <span className="flex-1 bg-red-400"></span>
      <span className="flex-1 bg-transparent"></span>
    </div>
  </>
);

// Clock number component
const ClockNumber = ({ style, onClick, isActive, num }) => (
  <span
    style={style}
    className={clsx(
      "absolute text-xs cursor-pointer",
      isActive
        ? "text-white bg-blue-400 rounded-full w-8 h-8 flex items-center justify-center "
        : "text-text-900"
    )}
    onClick={onClick}
  >
    {String(num).padStart(2, "0")}
  </span>
);

export default FormTimePicker;
