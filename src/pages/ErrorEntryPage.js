import React, { useEffect, useState } from "react";
import { ImgComponent } from "../components/ErrorEntryComponents/ImgComponent";
import { apiUrl } from "../db/config";
import { useFetch } from "../hooks/useFetch";

export default function ErrorEntryPage() {
  const { data, error, isLoading } = useFetch(`${apiUrl}BoxData`);
  const [obj, setObj] = useState([]);
  const [previousObj, setPreviousObj] = useState([]);
  const [mainObj, setMainObj] = useState([]);
  const [picName, setPicName] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [objErr, setObjErr] = useState();
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

  const handleCLick = async (color, picName) => {
    if (color === "blue") {
      try {
        const res = await fetch(`${apiUrl}ChildBoxData`);
        const data = await res.json();

        setPreviousObj([...previousObj, obj]);

        setObj(data.defectButtonRecords);
        setPicName(picName);
      } catch (err) {
        console.log(err);
      }
    } else {
      setOpen(true);
    }
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
    }
  };

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
            <ImgComponent
            objErr={objErr}
              obj={obj}
              handleCLick={handleCLick}
              open={open}
              setOpen={setOpen}
              value={value}
              setValue={setValue}
            />
          </div>
          <button disabled={previousObj.length === 0} onClick={prevClick}>
            Geri
          </button>
        </div>
      ) : null}
    </>
  );
}
