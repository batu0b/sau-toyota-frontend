import React from "react";
const useMousePosition = (ref) => {
  const [mousePosition, setMousePosition] = React.useState({
    x: null,
    y: null,
  });
  React.useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.offsetX, y: e.offsetY });
    };
    ref.current.addEventListener("mousemove", updateMousePosition);
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mousemove", updateMousePosition);
      }
    };
  }, []);
  return mousePosition;
};
export default useMousePosition;
