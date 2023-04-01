import { createContext, useContext } from "react";

export const ImgContext = createContext({
  obj: [],
  previousObj: [],
  picName: "",
  value: "",
  objErr: null,
  mainObj: [],
  errorCords: null,
  defPart: "",
  setObj: () => {},
  setPreviousObj: () => {},
  setMainObj: () => {},
  setPicName: () => {},
  setValue: () => {},
  setObjErr: () => {},
  setErrorCords: () => {},
  setDefPart: () => {},
  prevClick: () => {},
  handleCLick: async (color, picName, func) => {},
  returnMainObj: () => {},
});

export const useImgContext = () => useContext(ImgContext);
