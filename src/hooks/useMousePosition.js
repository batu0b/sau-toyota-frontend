import React, { useRef } from "react";
const useMousePosition = (ref) => {
  const [mousePosition, setMousePosition] = React.useState({
    x: null,
    y: null,
  });

  const timeRef = useRef();

  const clearTouchTimeOut = (e) => {
    e.preventDefault();
    clearTimeout(timeRef.current);
  };
  let touchHandler = async function (event) {
    const itemSize = ref.current.getBoundingClientRect();

    const x = event.touches[0].clientX - itemSize.x;
    const y = event.touches[0].clientY - itemSize.y;
    timeRef.current = setTimeout(() => {
      setMousePosition({ x: x, y: y });
    }, 600);
  };

  const clickMouse = (event) => {
    let x = 0,
      y = 0;
    x = event.offsetX;
    y = event.offsetY;
    setMousePosition({ x: x, y: y });
  };

  React.useEffect(() => {
    ref.current.addEventListener("touchstart", touchHandler);
    ref.current.addEventListener("touchend", clearTouchTimeOut, {
      passive: false,
    });
    ref.current.addEventListener("mousedown", clickMouse);
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("touchstart", touchHandler);
        ref.current.removeEventListener("touchend", clearTouchTimeOut);
        ref.current.removeEventListener("mousedown", touchHandler);
      }
    };
  }, []);

  return mousePosition;
};
export default useMousePosition;
