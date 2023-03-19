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
    returnMainObj
  } = useImgContext();

  useEffect(() => {
    if (data) {
      setPicName(data.defectButtonRecords[0].picId);
      setObj(data.defectButtonRecords);
      setObjErr(data.partDefects);
      setMainObj(data);
    }

    return () => {
      setObj([]);
      setPicName("");
      setObjErr(null);
    };
  }, [data]);

  return (
    <>
      {!isLoading && data ? (
        <span className="flex gap-3 flex-wrap">
          <div className="h-screen w-fit">
            <div>asdasdasd</div>
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
            <span className="flex py-3 gap-6">
              <button
                className="ErrorPageBtn"
                disabled={previousObj.length === 0}
                onClick={prevClick}
              >
                {"<"} Geri
              </button>
              <button className="ErrorPageBtn">Cikis</button>{" "}
              <button onClick={returnMainObj} className="ErrorPageBtn">Model Ilk Resmi</button>
              <button className="ErrorPageBtn">Hata Listesi</button>
              <button className="ErrorPageBtn">Temizle</button>
              <button className="ErrorPageBtn">Buyuk Font</button>
            </span>
          </div>
          <div>
            <h1>asdasd</h1>
            <div>asdasd</div>
            <div>asdasd</div>
            <div>asdasd</div>
            <div>asdasd</div>
            <div>asdasd</div>
          </div>
        </span>
      ) : null}
    </>
  );
}
