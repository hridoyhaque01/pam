import { useState } from "react";

function ClockTimePicker() {
  const [type, setType] = useState("hour");
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [rotation, setRotation] = useState(0); // Track rotation angle

  // Calculate rotation from 0 to 11 and always go forward
  const calculateForwardRotation = (current, target) => {
    let diff = target - current;
    if (diff < 0) {
      diff += 12; // Wrap around if going backward, ensuring forward rotation
    }
    return diff * 30; // Each segment is 30 degrees
  };

  const handleHourSelect = (hour) => {
    const diff = calculateForwardRotation(selectedHour, hour);
    setRotation(rotation + diff); // Update rotation based on difference
    setSelectedHour(hour); // Set the selected hour
  };

  const handleMinuteSelect = (minute) => {
    const diff = calculateForwardRotation(selectedMinute, minute);
    setRotation(rotation + diff); // Update rotation based on difference
    setSelectedMinute(minute); // Set the selected minute
  };

  return (
    <div className="w-full max-w-[190px] aspect-square rounded-full border outline outline-1 outline-offset-8 border-neutral-300 outline-neutral-300 bg-white-100 relative before:absolute before:content-[''] before:w-1/2 before:h-1/2 before:bg-neutral-200 before:rounded-full before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2">
      {/* Hours and minutes */}
      {type === "hour" ? (
        <div className="absolute w-[84%] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 aspect-square z-50">
          {Array.from({ length: 12 }).map((_, index) => {
            // Adjust to make 12 appear at the top
            const hour = index === 0 ? 12 : index;

            return (
              <div
                key={index}
                className={`absolute -top-1/2 left-1/2 -translate-x-1/2 origin-[50%,100%] h-full cursor-pointer z-40 duration-300 ${
                  selectedHour === hour ? "text-white" : ""
                }`}
                style={{
                  transform: `rotate(${index * 30}deg)`,
                  transformOrigin: "50% 100%",
                }}
                onClick={() => handleHourSelect(hour)}
              >
                <div
                  className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-40 bg-red-300 after:absolute after:content-[''] after:w-8 after:h-8 after:rounded-full  hover:after:bg-green after:duration-300 after:z-10 group"
                  style={{ transform: `rotate(-${index * 30}deg)` }}
                >
                  <span className="relative z-30 group-hover:text-white duration-300">
                    {hour}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="absolute w-[84%] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 aspect-square z-50">
          {Array.from({ length: 12 }).map((_, index) => {
            const minute = index * 5; // Minute increments in steps of 5
            return (
              <div
                key={index}
                className={`absolute -top-1/2 left-1/2 -translate-x-1/2 origin-[50%,100%] h-full cursor-pointer z-40 duration-300 ${
                  selectedMinute === minute ? "text-white" : ""
                }`}
                style={{
                  transform: `rotate(${index * 30}deg)`,
                  transformOrigin: "50% 100%",
                }}
                onClick={() => handleMinuteSelect(minute)}
              >
                <span
                  className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-40"
                  style={{ transform: `rotate(-${index * 30}deg)` }}
                >
                  {minute}
                </span>
              </div>
            );
          })}
        </div>
      )}
      {/* Handles */}
      <div
        className="absolute left-1/2 -translate-x-2 w-1 h-1/2 bg-green rounded-full duration-300 origin-bottom after:absolute after:content-[''] after:w-8 after:h-8 after:bg-green after:rounded-full after:left-1/2 after:top-0 after:-translate-x-1/2 before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-0 before:w-2 before:h-2 before:bg-green before:rounded-full before:origin-top after:z-10"
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      ></div>
    </div>
  );
}

export default ClockTimePicker;
