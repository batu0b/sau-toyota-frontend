import React from "react";
import DialogRaw from "../DialogRaw";
import DrawLine from "./DrawLine";

export const ImgComponent = ({
  objErr,
  obj,
  handleCLick,
  open,
  setOpen,
  value,
  setValue,
}) => {
  console.log(obj);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {obj.map((box, index) => {
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
              key={index}
              onClick={() => handleCLick(box.boxColor, box.childPicID)}
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
      })}
    </div>
  );
};
