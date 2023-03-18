import { createContext, useContext } from "react";

export const ImgContext = createContext({
  obj: [],
  previousObj: [],
  picName: "",
  value: "",
  objErr: null,
  mainObj: [],
  setObj: () => {},
  setPreviousObj: () => {},
  setMainObj: () => {},
  setPicName: () => {},
  setValue: () => {},
  setObjErr: () => {},
  prevClick: () => {},
  handleCLick: async (color, picName , func) => {},
});

export const useImgContext = () => useContext(ImgContext);
