import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import ErrorTable from "../components/ErrorTable";
import { DeleteIco, PencilIco, SaveIco } from "../components/Icons/Index";
import { apiUrl } from "../db/config";
import { useFetch } from "../hooks/useFetch";

export default function ErrorHandlingPage() {
  const { data } = useFetch(`${apiUrl}ErrorData`);
  const { t } = useTranslation();

  const exampleDep = "AI";
  const sortedData = data?.defectList.sort((a, b) =>
    a.depCode === exampleDep ? -1 : b.depCode === exampleDep ? 1 : 0
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Bildiren",
        accessor: "depCode",
      },
      {
        Header: "Body",
        accessor: "bodyNo",
      },

      {
        Header: "Assy",
        accessor: "assyNo",
      },
      {
        Header: "Vin No",
        accessor: "vinNo",
      },
      {
        Header: "Renk",
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
      },
      {
        Header: "Mdl",
        accessor: "modelCode",
      },
      {
        Header: "Sicil",
        accessor: "localId",
      },
      {
        Header: "Parca",
        accessor: "g",
      },
      {
        Header: "Spot",
        accessor: "f",
      },
      {
        Header: "Gun",
        accessor: "d",
      },
      {
        Header: "Arc",
        accessor: "s",
      },
      {
        Header: "Arc Gun",
        accessor: "a",
      },
      {
        Header: "Hata",
        accessor: "ss",
      },
      {
        Header: "Renk",
        accessor: "ddaa",
      },
      {
        Header: "Saat",
        accessor: "cdate",
        Cell: ({ value }) => {
          return <span>{value.slice(11, 16)}</span>;
        },
      },
      {
        Header: "Hata Turu",
        accessor: "defectType",
      },
      {
        Header: "Hata Sor",
        accessor: "defrespName",
      },
      {
        Header: "Alt Sorunmlu",
        accessor: "ALTSORUMLU",
      },
      {
        Header: "Nr Reason",
        accessor: "NULL",
        Cell: () => {
          return (
            <select className="py-0 w-full">
              <option value="" key="" disabled selected hidden></option>

              <option value="dummy" key="">
                dummy
              </option>
            </select>
          );
        },
      },
      {
        Header: "Kaydet",
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
        Header: "Islem",
        accessor: "Islem",
        Cell: () => {
          return (
            <div className="flex justify-between items-center h-full    ">
              <DeleteIco className="bg-red-500 text-white basis-2/5  flex " />
              <PencilIco className="bg-red-500 text-white basis-2/5 " />
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <span className="w-full">
      {data && <ErrorTable columns={columns} data={sortedData} />}
    </span>
  );
}
