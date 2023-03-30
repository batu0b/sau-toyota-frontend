import React, { useEffect } from "react";
import { useImgContext } from "../../context/ImgConext/ImgContext";
import useMousePosition from "../../hooks/useMousePosition";
import { TriangleIco } from "../Icons/Index";

export const EntryErrorCords = ({ selectRef }) => {
  const { errorCords, setErrorCords } = useImgContext();
  const { x, y } = useMousePosition(selectRef);

  useEffect(() => {
    setErrorCords({ x: x, y: y });
  }, [x, y]);

  return (
    <div
      style={{
        width: 800,
        height: 600,
        position: "relative",
        overflow: "hidden",
      }}
      className="relative"
    >
      {errorCords.x && errorCords.y ? (
        <TriangleIco
          className="rounded-full -rotate-45 text-2xl w-8 h-8 absolute"
          stroke={"white"}
          strokeWidth={20}
          stops={[
            { color: `#ff2700`, offset: 0 },
            { color: `#fc9605`, offset: 10 },
            { color: `#f9f20a`, offset: 20 },
            { color: `#75f70e`, offset: 30 },
            { color: `#14f46a`, offset: 40 },
            { color: `#17e2f2`, offset: 50 },
            { color: `#1e3eee`, offset: 60 },
            { color: `#8725f0`, offset: 70 },
            { color: `#f22bee`, offset: 80 },
            { color: `#f53392`, offset: 90 },
            { color: `#fc4567`, offset: 100 },
          ]}
          rotateGradient={90}
          hasGradient={true}
          style={{ top: errorCords.y, left: errorCords.x }}
        />
      ) : null}
    </div>
  );
};
