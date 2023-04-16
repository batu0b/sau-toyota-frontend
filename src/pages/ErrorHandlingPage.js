import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  DeleteIco,
  PencilIco,
  SaveIco,
  TriangleIco,
} from "../components/Icons/Index";
import { apiUrl } from "../db/config";
import { useFetch } from "../hooks/useFetch";
import Table from "../components/Table";

export default function ErrorHandlingPage() {
  const { data } = useFetch(`${apiUrl}ErrorData`);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const exampleDep = "AI";
  const sortedData = data?.defectList.sort((a, b) =>
    a.depCode === exampleDep ? -1 : b.depCode === exampleDep ? 1 : 0
  );

  const othersIndex = sortedData?.findIndex((item) => {
    return item.depCode !== exampleDep;
  });

  const columns = React.useMemo(
    () => [
      {
        Header: t("Notifier"),
        accessor: "depCode",
        width: 100,
      },
      {
        Header: "Body",
        accessor: "bodyNo",
        width: 120,
      },

      {
        Header: "Assy",
        accessor: "assyNo",
        width: 80,
      },
      {
        Header: "Vin No",
        accessor: "vinNo",
        width: 200,
      },
      {
        Header: t("Color"),
        accessor: "colorExtCode",
        Cell: ({ value, row, data }) => {
          return (
            <div
              className="w-min p-2"
              style={{ background: data[row.index].rgbCode }}
            >
              <span style={{ mixBlendMode: "difference", color: "white" }}>
                {value}{" "}
              </span>
            </div>
          );
        },
        width: 80,
      },
      {
        Header: "Mdl",
        accessor: "modelCode",
        width: 80,
      },
      {
        Header: t("Registry"),
        accessor: "localId",
        width: 120,
      },
      {
        Header: t("Hour"),
        accessor: "cdate",
        Cell: ({ value }) => {
          return <span>{value.slice(11, 16)}</span>;
        },
      },
      {
        Header: t("ErrorType"),
        accessor: "defectType",
      },
      {
        Header: t("AskError"),
        accessor: "defrespName",
      },
    
      {
        Header: "Nr Reason",
        accessor: "NULL",
        Cell: () => {
          return (
            <select defaultValue={""} className="py-0 w-full">
              <option value="" key="1" disabled hidden></option>

              <option value="dummy" key="2">
                dummy
              </option>
            </select>
          );
        },
      },
      {
        Header: t("Save"),
        accessor: "Kaydet",
        Cell: () => {
          return (
            <div className="bg-black w-min p-1 rounded-md text-white">
              {" "}
              <SaveIco />
            </div>
          );
        },
      },
      {
        Header: t("Process"),
        accessor: "Islem",
        Cell: () => {
          return (
            <div className="flex justify-between items-center h-full  w-full   ">
              <DeleteIco className="bg-red-500 text-white basis-2/5  flex " />
              <PencilIco className="bg-red-500 text-white basis-2/5 " />
            </div>
          );
        },
      },
    ],
    []
  );

  const RowHeaderComponent = React.forwardRef((props, ref) => {
    if (props.index === othersIndex) {
      return (
        <span ref={ref} className="bg-red-500 w-full text-white h-16 flex px-4">
          {t("OtherDeps")}
        </span>
      );
    }
    return null;
  });

  return (
    <div className="w-full h-screen flex flex-col overflow-y-hidden  ">
      {data && (
        <Table
          rowHeaderComponent={RowHeaderComponent}
          columns={columns}
          data={sortedData}
          specialIndex={othersIndex}
        />
      )}

      <div className="bg-white fixed bottom-0 overflow-auto   w-full h-[25vh]">
        <div className="h-full items-center p-3  flex gap-6  ">
          <span className="flex flex-col  justify-evenly h-full">
            <label className="flex items-center justify-end gap-2">
              <span>{t("assemblyNo")}</span>
              <input type="text" />
              <button className="bg-gray-300 min-w-[9rem] w-36 h-full rounded-md border border-black ">
                {t("Search")}
              </button>
            </label>
            <label className="flex items-center justify-end gap-2">
              <span>Body No</span>
              <input type="text" />
              <button className="bg-gray-300 min-w-[9rem] w-36 h-full rounded-md border border-black ">
                {t("Search")}
              </button>
            </label>
          </span>
          <span className="flex gap-y-2 flex-col h-full justify-evenly">
            <button className="bg-red-600 flex justify-center items-center text-white w-36 h-full rounded-md border border-black ">
              <TriangleIco />
            </button>
            <button className="bg-red-600 text-white w-36 h-full flex justify-center items-center rounded-md border border-black ">
              <TriangleIco className="rotate-180" />
            </button>
          </span>
          <button className="ErrorTableBtn">{t("CarList")}</button>
          <button className="ErrorTableBtn ">{t("ManuelError")}</button>
          <button className="ErrorTableBtn ">{t("MultipleError")}</button>
          <button className="ErrorTableBtn ">{t("ErrorList")}</button>
          <button className="ErrorTableBtn ">{t("ErrorCopy")}</button>
          <button onClick={() => navigate(-1)} className="ErrorTableBtn">
            {t("Exit")}
          </button>
        </div>
      </div>
    </div>
  );
}
