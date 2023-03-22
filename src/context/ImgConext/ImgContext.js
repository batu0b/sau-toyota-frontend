import { createContext, useContext } from "react";

export const ImgContext = createContext({
  obj: [],
  previousObj: [],
  picName: "",
  value: "",
  objErr: null,
  mainObj: [],
  errorCords: null,
  setObj: () => {},
  setPreviousObj: () => {},
  setMainObj: () => {},
  setPicName: () => {},
  setValue: () => {},
  setObjErr: () => {},
  setErrorCords: () => {},
  prevClick: () => {},
  handleCLick: async (color, picName, func) => {},
  returnMainObj: () => {},
});

export const useImgContext = () => useContext(ImgContext);
