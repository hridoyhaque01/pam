import { useEffect, useRef, useState } from "react";

function TimePicker() {
  const [side, setSide] = useState("top");
  const [position, setPosition] = useState({});
  const [contentHeight, setContentHeight] = useState(0);
  const inputRef = useRef(null);
  const contentRef = useRef(null);
  const [showContent, setShowContent] = useState(false);

  const getPositionClass = () => {
    if (!position || !contentHeight) return {};
    const { top, left, right, height, width } = position;

    const styles = {
      top: 0,
      left: 0,
      maxWidth: width + "px",
    };

    switch (side) {
      case "top":
        styles.top = top - contentHeight - 8;
        styles.left = left;
        break;
      case "bottom":
        styles.top = top + height + 8;
        styles.left = left;
        break;
      case "left":
        styles.top = top;
        styles.left = left - width - 8;
        break;
      case "right":
        styles.top = top;
        styles.left = right + 8;
        break;
      case "center":
        styles.top = top + height / 2 - contentHeight / 2;
        styles.left = left;
        break;
      default:
        styles.top = top + height + 8;
        styles.left = left;
    }

    return styles;
  };

  const updatePosition = (preferredSide) => {
    const inputEl = inputRef.current;
    const contentEl = contentRef.current;
    if (!inputEl || !contentEl) return;
    const inputRect = inputEl.getBoundingClientRect();
    const contentRect = contentEl.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    setPosition(inputRect);
    setContentHeight(contentRect.height);

    const space = {
      top: inputRect.top,
      bottom: screenHeight - inputRect.bottom,
      left: inputRect.left,
      right: screenWidth - inputRect.right,
    };

    const padding = 8;
    const fits = {
      top: space.top > contentRect.height + padding,
      bottom: space.bottom > contentRect.height + padding,
      left: space.left > inputRect.width + padding,
      right: space.right > inputRect.width + padding,
    };

    switch (preferredSide) {
      case "top":
        setSide(fits.top ? "top" : fits.bottom ? "bottom" : "center");
        break;
      case "bottom":
        setSide(fits.bottom ? "bottom" : fits.top ? "top" : "center");
        break;
      case "left":
        setSide(fits.left ? "left" : fits.right ? "right" : "center");
        break;
      case "right":
        setSide(fits.right ? "right" : fits.left ? "left" : "center");
        break;
      default:
        setSide("center");
    }
  };

  useEffect(() => {
    const handleResizeOrScroll = () => {
      if (inputRef.current && contentRef.current) {
        const inputRect = inputRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        setPosition(inputRect);
        setContentHeight(contentRect.height);
        updatePosition(side);
      }
    };
    window.addEventListener("resize", handleResizeOrScroll);
    window.addEventListener("scroll", handleResizeOrScroll, true);
    return () => {
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll, true);
    };
  }, [side]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowContent(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full overflow-auto">
      <div className="h-[200vh]"></div>
      <div className="w-full max-w-md mx-auto relative">
        <div
          type="text"
          className="w-full border border-neutral-300 outline-none px-4 h-12 py-3 rounded-lg cursor-pointer"
          ref={inputRef}
          onClick={() => setShowContent((prev) => !prev)}
        ></div>
        <div
          ref={contentRef}
          className={`w-full h-64 fixed duration-300 ${
            showContent ? "" : "pointer-events-none"
          }`}
          style={getPositionClass()}
        >
          <div
            className={`w-full h-full overflow-auto bg-white border border-neutral-300 rounded-lg p-4 duration-300 ease-in-out ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          ></div>
        </div>
      </div>
      <div className="h-screen"></div>
    </div>
  );
}

export default TimePicker;
