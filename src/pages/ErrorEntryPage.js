import React, { useEffect, useLayoutEffect } from "react";
import { ImgComponent } from "../components/ErrorEntryComponents/ImgComponent";
import { useImgContext } from "../context/ImgConext/ImgContext";
import { apiUrl } from "../db/config";
import { useFetch } from "../hooks/useFetch";
import ExampleData from "../db/exampleData.json";
import { useNavigate, useLocation } from "react-router-dom";
export default function ErrorEntryPage() {
  const { data, error, isLoading } = useFetch(`${apiUrl}BoxData`);
  const {
    setPicName,
    setObj,
    setMainObj,
    setObjErr,
    previousObj,
    prevClick,
    returnMainObj,
    value,
  } = useImgContext();
  const { state } = useLocation();
  const navigate = useNavigate();
  //kullanici giris yapmadan url ile panele ulasamaz
  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, []);
  //fotograflarin ismi datadan geldiginden daha hizli state icine aktarilamsi icin useLayoutEffect
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

  console.log(ExampleData.ExampleData);

  return (
    <>
      {!isLoading && data ? (
        <div className="flex   justify-center  flex-wrap">
          <span className="flex  border  border-black rounded-md  justify-center  flex-wrap ">
            <div className=" w-fit">
              <div className="flex justify-between mx-5 items-center h-20">
                <div className="flex  gap-x-10 ">
                  {" "}
                  <span className="ErrorEntryTopBttn">
                    {" "}
                    <label>Montaj No</label> {ExampleData.ExampleData.assyNo}
                  </span>{" "}
                  <span className="ErrorEntryTopBttn text-white bg-blue-600">
                    {" "}
                    <label>Body No</label> {ExampleData.ExampleData.bodyNo}
                  </span>
                  <span className="uppercase text-black/60 text-xl">
                    Hata giris ekrani
                  </span>
                </div>

                <span
                  style={{ background: `${ExampleData.ExampleData.bgColor}` }}
                  className={` ErrorEntryTopBttn text-white drop-shadow-lg   `}
                >
                  <label>Renk</label>
                  {ExampleData.ExampleData.bgColor}
                </span>
              </div>
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
            <div className="w-56 flex flex-col justify-between lga:w-full p-3 text-center">
              <div className="flex flex-col basis-2/3 gap-12">
                {" "}
                {/*  */}
                <h1 className="text-red-600 text-xl font-normal">
                  {ExampleData.ExampleData.firstname}{" "}
                  {ExampleData.ExampleData.lastname}{" "}
                  {`(${ExampleData.ExampleData.departmentCode})`}{" "}
                </h1>
                {/*  */}
                <div>
                  <div className="flex mb-3 justify-center gap-5">
                    <span className="flex gap-2">
                      {" "}
                      <input
                        className="w-8 h-8 bg-transparent"
                        type="checkbox"
                      />
                      <label>Harigami</label>
                    </span>
                    <span className="flex gap-2">
                      {" "}
                      <input
                        className="w-8 h-8 bg-transparent "
                        type="checkbox"
                      />
                      <label>RDD</label>
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <button className="ErrorEntrySideBttn text-black/50 border-black/50">
                      Hizli Kaydet
                    </button>
                    <button
                      disabled
                      className="ErrorEntrySideBttn text-black/50 border-black/50 "
                    >
                      Kaydet Ve gec
                    </button>
                    <button
                      disabled={value ? false : true}
                      className={`ErrorEntrySideBttn ${
                        !value ? "text-black/50 border-black/50" : ""
                      }`}
                    >
                      Hata Kayit
                    </button>
                  </div>
                </div>
                {/*  */}
                <div className="flex flex-col gap-4">
                  <input
                    className="p-2 text-xl"
                    value={ExampleData.ExampleData.assyNo}
                    type="text"
                  />
                  <button className="ErrorEntrySideBttn">ara</button>
                  <button className="ErrorEntrySideBttn">
                    terminal ilk resim
                  </button>
                  <button className="ErrorEntrySideBttn">sik gelen hata</button>{" "}
                  <button disabled className="ErrorEntrySideBttn">
                    manifest
                  </button>
                </div>
              </div>

              <div className="self-end text-sm font-medium text-red-600">
                Teknik Destek{" "}
                <span className="text-black">
                  {ExampleData.ExampleData.companyName}
                </span>{" "}
              </div>
            </div>
          </span>
        </div>
      ) : null}
    </>
  );
}
