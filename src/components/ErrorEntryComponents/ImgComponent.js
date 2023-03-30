import React, { useRef } from "react";
import { useImgContext } from "../../context/ImgConext/ImgContext";
import { DrawBox } from "./DrawBox";
import { EntryErrorCords } from "./EntryErrorCords";

export const ImgComponent = () => {
  const { picName, obj, value } = useImgContext();
  const selectRef = useRef();

  return (
    <div ref={selectRef} className="relative w-[800px] h-[600px]">
      <img
        className="absolute w-[800px] h-[600px]"
        src={`/${picName}.png`}
        alt=""
      />

      <div className="w-full h-full relative">
        {!value ? (
          obj.map((box, index) => {
            return <DrawBox box={box} key={index} />;
          })
        ) : (
          <EntryErrorCords selectRef={selectRef} />
        )}
      </div>
    </div>
  );
};
