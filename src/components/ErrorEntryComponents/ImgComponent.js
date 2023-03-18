import React from "react";
import { useImgContext } from "../../context/ImgConext/ImgContext";
import DialogRaw from "../DialogRaw";
import { DrawBox } from "./DrawBox";
import DrawLine from "./DrawLine";

export const ImgComponent = () => {
  const { obj, value } = useImgContext();

  return (
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
        <div>Deneme</div>
      )}
    </div>
  );
};
