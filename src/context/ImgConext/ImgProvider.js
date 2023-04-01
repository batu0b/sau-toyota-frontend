import React, { useState } from "react";
import { apiUrl } from "../../db/config";
import { ImgContext } from "./ImgContext";

export default function ImgProvider({ children }) {
  const [obj, setObj] = useState([]);
  const [previousObj, setPreviousObj] = useState([]);
  const [mainObj, setMainObj] = useState([]);
  const [picName, setPicName] = useState("");
  const [defPart, setDefPart] = useState("");
  const [errValue, setErrValue] = useState("");
  const [objErr, setObjErr] = useState();
  const [allObjErr, setAllObjErr] = useState([]);
  const [errorCords, setErrorCords] = useState({ x: null, y: null });

  const handleCLick = async (color, picName, defPart, func) => {
    if (color === "blue") {
      try {
        const res = await fetch(`${apiUrl}ChildBoxData`);
        const data = await res.json();

        setPreviousObj([...previousObj, obj]);
        setAllObjErr([...allObjErr, objErr]);

        setObj(data.defectButtonRecords);
        setObjErr(data.partDefects);
        setPicName(picName);
      } catch (err) {
        console.log(err);
      }
    } else {
      func();
    }
    setDefPart(defPart);
  };

  const prevClick = () => {
    if (previousObj.length !== 0) {
      setObj(previousObj[previousObj.length - 1]);
      const pic = previousObj[previousObj.length - 1].map((obj) => {
        return obj.picId;
      });

      setPicName(pic[0]);
      const copyPrev = [...previousObj];
      copyPrev.pop();
      setPreviousObj(copyPrev);

      setObjErr(allObjErr[allObjErr.length - 1]);
      const copyAllObjErr = [...allObjErr];
      copyAllObjErr.pop();
      setAllObjErr(copyAllObjErr);

      if (errValue) {
        setErrValue("");
        setErrorCords({ x: null, y: null });
      }
    }
  };

  const returnMainObj = () => {
    setObj(mainObj.defectButtonRecords);
    setObjErr(mainObj.partDefects);

    setPicName(mainObj.defectButtonRecords[0].picId);
    setAllObjErr([]);
    setPreviousObj([]);

    if (errValue) {
      setErrValue("");
      setErrorCords({ x: null, y: null });
    }
  };

  return (
    <ImgContext.Provider
      value={{
        mainObj: mainObj,
        obj: obj,
        objErr: objErr,
        picName: picName,
        value: errValue,
        previousObj: previousObj,
        errorCords: errorCords,
        defPart: defPart,
        setMainObj: setMainObj,
        setObj: setObj,
        setObjErr: setObjErr,
        setPicName: setPicName,
        setPreviousObj: setPreviousObj,
        setValue: setErrValue,
        setErrorCords: setErrorCords,
        setDefPart: setDefPart,
        handleCLick: handleCLick,
        prevClick: prevClick,
        returnMainObj: returnMainObj,
      }}
    >
      {children}
    </ImgContext.Provider>
  );
}
