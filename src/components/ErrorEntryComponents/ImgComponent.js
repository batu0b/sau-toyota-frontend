import React, { useRef } from "react";
import { useImgContext } from "../../context/ImgConext/ImgContext";
import useMousePosition from "../../hooks/useMousePosition";
import { DrawBox } from "./DrawBox";

export const ImgComponent = () => {
  const { picName, obj, value } = useImgContext();
  const selectRef = useRef();
  const { errorCords, setErrorCords } = useImgContext();
  const { x, y } = useMousePosition(selectRef);

  const handleCordClick = () => {
    setErrorCords({ x: x, y: y });
  };

  return (
    <div
      ref={selectRef}
      style={{
        width: 800,
        height: 600,
        position: "relative",
      }}
    >
      <img
        style={{ width: 800, height: 600, position: "absolute" }}
        src={`./${picName}.png`}
        alt=""
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {!value ? (
          obj.map((box, index) => {
            return <DrawBox box={box} key={index} />;
          })
        ) : (
          <div
            onClick={handleCordClick}
            style={{
              width: 800,
              height: 600,
              position: "relative",
              overflow: "hidden",
            }}
            className="relative"
          >
            {errorCords.x && errorCords.y ? (
              <div
                className="w-5 h-5 rounded-full bg-red-500 absolute"
                style={{ top: errorCords.y, left: errorCords.x }}
              ></div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
