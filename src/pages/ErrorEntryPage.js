import React, { useEffect, useLayoutEffect, useState } from "react";
import { useImgContext } from "../context/ImgConext/ImgContext";
import { apiUrl } from "../db/config";
import { useFetch } from "../hooks/useFetch";
import ExampleData from "../db/exampleData.json";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import AlertSound from "./alertsound.mp3";
import {
  ErrorModalForm,
  ImgComponent,
} from "../components/ErrorEntryComponents";
import { SnackBarComponent } from "../components/SnackBar";
import { useTranslation } from "react-i18next";

export default function ErrorEntryPage() {
  const { data, isLoading } = useFetch(`${apiUrl}BoxData`);
  const {
    setPicName,
    setObj,
    setMainObj,
    setObjErr,
    previousObj,
    prevClick,
    returnMainObj,
    errorCords,
    setValue,
  } = useImgContext();
  const [clicked, setClicked] = useState(false);
  const [largeFont, setLargeFont] = useState(false);
  const [show, setShow] = useState(false);
  const [dangerBg, setDangerBg] = useState(false);
  const [snackOptions, setSnackOptions] = useState({
    show: false,
    message: "",
    messageType: "",
  });
  const [isAuth, setIsAuth] = useOutletContext();
  const { depCode, filterCode } = useParams();
  const navigate = useNavigate();
  //auth control
  const reloading = localStorage.getItem("reloading");
  const saved = localStorage.getItem("saved");
  useLayoutEffect(() => {
    const listener = () => {
      if (reloading) {
        localStorage.removeItem("reloading");
        setIsAuth(true);
      } else {
        if (!isAuth) {
          navigate(`/cvqsterminal/${depCode}/${filterCode}`);
        }
      }
      if (saved) {
        localStorage.removeItem("saved");
        setSnackOptions({
          message: "Success",
          messageType: "success",
          show: true,
        });
      }
    };
    if (document.readyState === "complete") {
      listener();
    } else {
      window.addEventListener("load", listener);
      return () => {
        window.removeEventListener("load", listener);
      };
    }
  }, [isAuth, reloading, saved]);
  //alert sound
  useEffect(() => {
    let timeout;
    const audio = new Audio(AlertSound);
    audio.loop = true;

    if (!clicked) {
      timeout = setTimeout(() => {
        audio.play();
        setDangerBg(true);
      }, 10000);
    }
    return () => {
      setDangerBg(false);
      clearTimeout(timeout);
      audio.pause();
    };
  }, [clicked]);
  //data
  useLayoutEffect(() => {
    if (data) {
      setPicName(data.defectButtonRecords[0].picId);
      setObj(data.defectButtonRecords);
      setObjErr(data.partDefects);
      setMainObj(data);
    }
    return () => {
      setValue("");
    };
  }, [data]);

  const { t } = useTranslation();

  const HandleErrorSave = () => {
    setClicked(true);
    setShow(true);
  };

  return (
    <>
      {!isLoading && data ? (
        !largeFont ? (
          <div className="flex   justify-center  flex-wrap">
            <span
              style={!dangerBg ? { background: "" } : { background: "red" }}
              className="flex  border  border-black rounded-md  justify-center  flex-wrap "
            >
              <div className=" w-fit">
                <div className="flex justify-between mx-5 items-center h-20">
                  <div className="flex  gap-x-10 ">
                    {" "}
                    <span className="ErrorEntryTopBttn">
                      {" "}
                      <label>{t("assemblyNo")}</label>{" "}
                      {ExampleData.ExampleData.assyNo}
                    </span>{" "}
                    <span className="ErrorEntryTopBttn text-white bg-blue-600">
                      {" "}
                      <label>Body No</label> {ExampleData.ExampleData.bodyNo}
                    </span>
                    <span className="uppercase text-black/60 text-xl">
                      {t("ErrorEntryPage")}
                    </span>
                  </div>

                  <span
                    style={{ background: `${ExampleData.ExampleData.bgColor}` }}
                    className={` ErrorEntryTopBttn text-white drop-shadow-lg   `}
                  >
                    <label>{t("Color")} </label>
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
                    {"<"} {t("Back")}
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/cvqsterminal/${depCode}/${filterCode}`)
                    }
                    className="ErrorPageBtn"
                  >
                    {t("Exit")}
                  </button>{" "}
                  <button onClick={returnMainObj} className="ErrorPageBtn">
                    {t("ModelFirstImage")}
                  </button>
                  <button
                    onClick={() => navigate("errorlist")}
                    className="ErrorPageBtn"
                  >
                    {t("ErrorList")}
                  </button>
                  <button className="ErrorPageBtn">{t("Clear")}</button>
                  <button
                    onClick={() => setLargeFont(true)}
                    className="ErrorPageBtn"
                  >
                    {t("LargeFont")}
                  </button>
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
                        {t("QuickSave")}
                      </button>
                      <button
                        disabled
                        className="ErrorEntrySideBttn text-black/50 border-black/50 "
                      >
                        {t("SaveAndSkip")}
                      </button>
                      <button
                        onClick={HandleErrorSave}
                        disabled={errorCords.y && errorCords.x ? false : true}
                        className={`ErrorEntrySideBttn ${
                          !errorCords.y && !errorCords.x
                            ? "text-black/50 border-black/50"
                            : ""
                        }`}
                      >
                        {t("ErrorEntry")}
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
                    <button className="ErrorEntrySideBttn">
                      {t("Search")}
                    </button>
                    <button className="ErrorEntrySideBttn">
                      {t("TerminalFirstImage")}
                    </button>
                    <button className="ErrorEntrySideBttn">
                      {t("FrequentError")}
                    </button>{" "}
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
        ) : (
          <div
            style={!dangerBg ? { background: "" } : { background: "red" }}
            className="w-ful  h-screen gap-4 p-5 flex flex-col items-center"
          >
            {" "}
            <div className="flex w-full rounded-md p-2 bg-white justify-evenly mx-5 items-center h-20">
              <div className="flex  gap-x-10 ">
                {" "}
                <span className="ErrorEntryTopBttn">
                  {" "}
                  <label>{t("assemblyNo")}</label>{" "}
                  {ExampleData.ExampleData.assyNo}
                </span>{" "}
                <span className="ErrorEntryTopBttn text-white bg-blue-600">
                  {" "}
                  <label>Body No</label> {ExampleData.ExampleData.bodyNo}
                </span>
                <span className="uppercase text-black/60 text-xl">
                  {t("ErrorEntryPage")}
                </span>
              </div>

              <span
                style={{ background: `${ExampleData.ExampleData.bgColor}` }}
                className={` ErrorEntryTopBttn text-white drop-shadow-lg   `}
              >
                <label>{t("Color")}</label>
                {ExampleData.ExampleData.bgColor}
              </span>
              <h1 className="text-red-600 text-xl font-normal">
                {ExampleData.ExampleData.firstname}{" "}
                {ExampleData.ExampleData.lastname}{" "}
                {`(${ExampleData.ExampleData.departmentCode})`}{" "}
              </h1>
            </div>
            <div className="w-full flex flex-wrap items-center justify-evenly">
              <div className="text-9xl basis-3/4 flex items-center flex-col">
                <h1>
                  {ExampleData.ExampleData.modelName}-
                  {ExampleData.ExampleData.assyNo}{" "}
                </h1>
                <h1>{ExampleData.ExampleData.bodyNo} </h1>
              </div>
              <div className="border-2 p-3  border-black/50 rounded-md">
                <div className="flex flex-col gap-12">
                  <button
                    onClick={() => setLargeFont(false)}
                    className="ErrorEntrySideBttn bg-red-600 text-white"
                  >
                    {t("ErrorEntry")}
                  </button>
                  <input
                    className="p-2 text-xl"
                    value={ExampleData.ExampleData.assyNo}
                    type="text"
                  />
                  <button className="ErrorEntrySideBttn"> {t("Search")}</button>
                </div>
              </div>
            </div>
          </div>
        )
      ) : null}
      <ErrorModalForm
        sethow={setShow}
        show={show}
        componyName={ExampleData?.ExampleData?.companyName}
      />

      <SnackBarComponent
        showTimer={2300}
        snackOptions={snackOptions}
        setSnack={setSnackOptions}
      />
    </>
  );
}
