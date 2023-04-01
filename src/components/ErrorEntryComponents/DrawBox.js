import React, { useState } from "react";
import { useImgContext } from "../../context/ImgConext/ImgContext";
import DialogRaw from "../DialogRaw";
import { DrawLine } from "./DrawLine";

export const DrawBox = ({ box }) => {
  const { handleCLick, objErr, setValue, value } = useImgContext();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <DrawLine
        x={box.lineX}
        y={box.lineY}
        x0={box.boxX}
        y0={box.boxY}
        w={70}
        h={70}
      />
      <div
        onClick={() =>
          handleCLick(box.boxColor, box.childPicID, box.labelText, handleOpen)
        }
        style={{
          position: "absolute",
          left: box.boxX,
          top: box.boxY,
          borderWidth: "2px",
          border: "solid",
          borderColor: `${box.boxColor}`,
          backgroundColor: "transparent",
          width: 70,
          height: 70,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          borderRadius: 3,
          padding: 1,
          zIndex: 4,
        }}
      >
        <span
          style={{
            color: `${box.labelColor}`,
            fontSize: 11.5,
            backgroundColor: "#fff",
            width: "100%",
          }}
        >
          {box.labelText}
        </span>
      </div>

      <DialogRaw
        objErrs={objErr.filter((err) => {
          return err.buttonId === box.buttonId;
        })}
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
      />
    </>
  );
};
