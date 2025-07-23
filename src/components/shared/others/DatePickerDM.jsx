import moment from "moment";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function DatePickerDM() {
  const [selected, setSelected] = useState();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const bookedDays = [new Date(2024, 9, 8), new Date(2024, 9, 9)];
  const disabledDays = [new Date(2024, 9, 12), new Date(2024, 9, 14)];

  const modifiers = {
    booked: bookedDays,
    disabled: [
      ...disabledDays,
      {
        before: new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          1
        ),
      },
      {
        after: new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + 1,
          0
        ),
      },
    ],
  };

  // Custom header component
  const CustomFooter = () => {
    return (
      <div className="flex items-center justify-between p-4 bg-gray-200"></div>
    );
  };

  return (
    <div className="w-full max-w-[444px]">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        modifiers={modifiers}
        showOutsideDays
        footer={<CustomFooter />}
        onMonthChange={setCurrentMonth}
        modifiersClassNames={{
          booked: "bg-green/20 rounded-full",
          disabled: "bg-neutral-200 rounded-full !text-black-600",
          today: "text-green-500",
          selected: "!text-white bg-green-500 rounded-full",
        }}
        classNames={{
          weekdays: "grid grid-cols-7 gap-1 py-2",
          day: "w-9 sm:w-12 aspect-square flex items-center justify-center duration-300",
          week: "grid grid-cols-7 gap-1",
          day_button: "w-full h-full flex items-center justify-center",
          month: "w-full",
          month_grid: "w-full",
          months: "relative flex flex-wrap max-w-max",
        }}
        components={{
          MonthCaption: () => {},
          Nav: ({ onNextClick, onPreviousClick, nextMonth }) => {
            const currentMonth = moment(nextMonth).subtract(1, "month");
            const formattedMonthYear = currentMonth
              .format("MMM YYYY")
              .toUpperCase();
            return (
              <div className="w-full flex items-center justify-center gap-4 pb-4 border-b border-neutral-300">
                <button onClick={onPreviousClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M18.7915 11.0046H7.62148L12.5015 6.12461C12.8915 5.73461 12.8915 5.09461 12.5015 4.70461C12.1115 4.31461 11.4815 4.31461 11.0915 4.70461L4.50148 11.2946C4.11148 11.6846 4.11148 12.3146 4.50148 12.7046L11.0915 19.2946C11.4815 19.6846 12.1115 19.6846 12.5015 19.2946C12.8915 18.9046 12.8915 18.2746 12.5015 17.8846L7.62148 13.0046H18.7915C19.3415 13.0046 19.7915 12.5546 19.7915 12.0046C19.7915 11.4546 19.3415 11.0046 18.7915 11.0046Z"
                      fill="#1EC96B"
                    />
                  </svg>
                </button>
                {formattedMonthYear}
                <button onClick={onNextClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5.20898 13.0007H16.379L11.499 17.8807C11.109 18.2707 11.109 18.9107 11.499 19.3007C11.889 19.6907 12.519 19.6907 12.909 19.3007L19.499 12.7107C19.889 12.3207 19.889 11.6907 19.499 11.3007L12.919 4.7007C12.529 4.3107 11.899 4.3107 11.509 4.7007C11.119 5.0907 11.119 5.7207 11.509 6.1107L16.379 11.0007H5.20898C4.65898 11.0007 4.20898 11.4507 4.20898 12.0007C4.20898 12.5507 4.65898 13.0007 5.20898 13.0007Z"
                      fill="#1EC96B"
                    />
                  </svg>
                </button>
              </div>
            );
          },
        }}
      />
      <div>
        
      </div>
    </div>
  );
}
