import React, { useEffect, useRef } from "react";

export const DrawLine = ({ x, y, x0, y0, w, h }) => {
  const canvas = useRef();
  let ctx = null;

  const xCenterStart = x0 + w / 2;
  const yCenterStart = y0 + h / 2;

  useEffect(() => {
    if (x < 0 && y < 0) {
    } else {
      const canvasEle = canvas.current;
      canvasEle.width = canvasEle.clientWidth;
      canvasEle.height = canvasEle.clientHeight;
      ctx = canvasEle.getContext("2d");
    }
  }, [x, y]);

  const drawLine = (info, style = {}) => {
    const { x, y, x1, y1 } = info;
    const { color = "red", width = 1 } = style;

    if (x1 > 0 && y1 > 0) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
    }
  };

  useEffect(() => {
    drawLine({ x: xCenterStart, y: yCenterStart, x1: x, y1: y });
  }, [x, y]);

  if (x > 0 && y > 0) {
    return (
      <canvas
        style={{ position: "absolute", width: 800, height: 600 }}
        ref={canvas}
      />
    );
  } else {
    return;
  }
};
