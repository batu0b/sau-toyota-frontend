import React, { useEffect, useLayoutEffect } from "react";
import { ImgComponent } from "../components/ErrorEntryComponents/ImgComponent";
import { useImgContext } from "../context/ImgConext/ImgContext";
import { apiUrl } from "../db/config";
import { useFetch } from "../hooks/useFetch";

export default function ErrorEntryPage() {
  const { data, error, isLoading } = useFetch(`${apiUrl}BoxData`);
  const headerData = useFetch(`${apiUrl}HeaderData`);

  const {
    setPicName,
    setObj,
    setMainObj,
    setObjErr,
    previousObj,
    prevClick,
    returnMainObj,
  } = useImgContext();

  useLayoutEffect(() => {
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
        <div className="flex   justify-center  flex-wrap">
          <span className="flex  border  border-black rounded-md  justify-center  flex-wrap ">
            <div className=" w-fit">
              <div className="h-20">asdasdasd</div>
              <ImgComponent />
              <span className="flex py-3 gap-6">
                <button
                  className="ErrorPageBtn"
                  disabled={previousObj.length === 0}
                  onClick={prevClick}
                >
                  {"<"} Geri
                </button>
                <button className="ErrorPageBtn">Cikis</button>{" "}
                <button onClick={returnMainObj} className="ErrorPageBtn">
                  Model Ilk Resmi
                </button>
                <button className="ErrorPageBtn">Hata Listesi</button>
                <button className="ErrorPageBtn">Temizle</button>
                <button className="ErrorPageBtn">Buyuk Font</button>
              </span>
            </div>
            <div className="w-56 flex flex-col lga:w-full p-3 text-center">
              <h1>asdasd</h1>
              <div>asdasd</div>
              <div>asdasd</div>
              <div>asdasd</div>
              <div>asdasd</div>
              <div>asdasd</div>
            </div>
          </span>
        </div>
      ) : null}
    </>
  );
}
