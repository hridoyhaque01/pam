import { useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import FormTimePicker from "./Clock";

function Home() {
  const [taskData, setTaskData] = useState({
    color: "",
    users: [],
    date: null,
    time: { hour: 12, minute: 0, period: "AM" },
    title: "",
    details: "",
  });
  // Handle the time selection
  const handleTimeSelect = (time) => {
    setTaskData((prevData) => ({
      ...prevData,
      time,
    }));
  };
  return (
    <div className="relative max-w-[620px] dayPickerCustom">
      <FormTimePicker
        label="Select Time"
        id="timePicker"
        selectedTime={taskData.time}
        setSelectedTime={handleTimeSelect}
        placeholder="Select Time"
      />
    </div>
  );
}

export default Home;
