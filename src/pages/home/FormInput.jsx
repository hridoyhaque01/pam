import clsx from "clsx";

export const commonInputCss =
  "w-full border border-neutral-300 rounded-[8px] px-4 py-3.5 outline-none text-text-700 placeholder:text-text-disabled bg-white disabled:bg-text-disabled disabled:cursor-not-allowed disabled:opacity-50 disabled:placeholder:text-main-black";

const FormInput = ({
  label,
  type,
  id,
  inputCss,
  isChevron,
  isPickerOpen,
  pickerHandler,
  ...props
}) => {
  // Prevent invalid characters such as 'e', '.', '+', '-', and ',' from being entered
  const handleKeyDown = (e) => {
    if (["e", "E", ".", "+", "-", ","].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className={clsx(isChevron ? "relative" : "")}>
      {label && (
        <label htmlFor={id} className="text-text-700 text-sm text-medium">
          {label}
        </label>
      )}

      <input
        type={type}
        name={id}
        id={id}
        {...props}
        className={clsx(commonInputCss, label ? "mt-1" : "mt-0", inputCss)}
        onKeyDown={type === "number" ? handleKeyDown : () => {}}
      />

      {isChevron ? (
        <img
          alt=""
          role="button"
          //   src={svgAssets.chevronBottom}
          className={clsx(
            "absolute bottom-4 right-[18px] w-6 h-6 trans",
            isPickerOpen ? "transform rotate-180" : "transform rotate-0"
          )}
          onClick={pickerHandler}
        />
      ) : null}
    </div>
  );
};

export default FormInput;
