import React, { useEffect, useState } from "react";
import { ImgComponent } from "../components/ErrorEntryComponents/ImgComponent";
import { useImgContext } from "../context/ImgConext/ImgContext";
import { apiUrl } from "../db/config";
import { useFetch } from "../hooks/useFetch";

export default function ErrorEntryPage() {
  const { data, error, isLoading } = useFetch(`${apiUrl}BoxData`);

  const {
    setPicName,
    setObj,
    setMainObj,
    setObjErr,
    picName,
    previousObj,
    prevClick,
  } = useImgContext();

  useEffect(() => {
    if (data) {
      setPicName(data.defectButtonRecords[0].picId);
      setObj(data.defectButtonRecords);
      setMainObj(data.defectButtonRecords);
      setObjErr(data.partDefects);
    }

    return () => {
      setObj([]);
    };
  }, [data]);

  return (
    <>
      {!isLoading && data ? (
        <div>
          <div
            style={{
              width: 800,
              height: 600,
              position: "relative",
            }}
            className="bg-pic"
          >
            <img
              style={{ width: 800, height: 600, position: "absolute" }}
              src={`./${picName}.png`}
              alt=""
            />
            <ImgComponent />
          </div>
          <button disabled={previousObj.length === 0} onClick={prevClick}>
            Geri
          </button>
        </div>
      ) : null}
    </>
  );
}
