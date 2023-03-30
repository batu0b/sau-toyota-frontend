import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ErrorTable from "../components/ErrorTable";
import { DeleteIco, PencilIco, SaveIco } from "../components/Icons/Index";
import { apiUrl } from "../db/config";
import { useFetch } from "../hooks/useFetch";

export default function ErrorHandlingPage() {
  const { data } = useFetch(`${apiUrl}ErrorData`);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const exampleDep = "AI";
  const sortedData = data?.defectList.sort((a, b) =>
    a.depCode === exampleDep ? -1 : b.depCode === exampleDep ? 1 : 0
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Bildiren",
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
        width: 80,
      },
      {
        Header: "Mdl",
        accessor: "modelCode",
        width: 80,
      },
      {
        Header: "Sicil",
        accessor: "localId",
        width: 120,
      },
      {
        Header: "Parca",
        accessor: "parca",
        width: 60,
      },
      {
        Header: "Spot",
        accessor: "spot",
        width: 60,
      },
      {
        Header: "Gun",
        accessor: "gun",
      },
      {
        Header: "Arc",
        accessor: "arc",
      },
      {
        Header: "Arc Gun",
        accessor: "arcgun",
      },
      {
        Header: "Hata",
        accessor: "hata",
      },
      {
        Header: "Renk",
        accessor: "renk",
      },
      {
        Header: "Saat",
        accessor: "cdate",
        Cell: ({ value }) => {
          return <span>{value.slice(11, 16)}</span>;
        },
      },
      {
        Header: "h Turu",
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
    <div className="w-full h-screen flex flex-col overflow-y-hidden  ">
      {data && <ErrorTable columns={columns} data={sortedData} />}

      <div className="bg-white fixed bottom-0 overflow-auto   w-full h-[25vh]">
        <div className="h-full items-center p-3  flex gap-6  ">
          <span className="flex flex-col  justify-evenly h-full">
            <label className="flex items-center justify-end gap-2">
              <span>Montaj No</span>
              <input type="text" />
              <button className="bg-gray-300 w-36 h-full rounded-md border border-black ">
                ARA
              </button>
            </label>
            <label className="flex items-center justify-end gap-2">
              <span>Body No</span>
              <input type="text" />
              <button className="bg-gray-300 w-36 h-full rounded-md border border-black ">
                ARA
              </button>
            </label>
          </span>
          <span className="flex gap-y-2 flex-col h-full justify-evenly">
            <button className="bg-red-600 w-36 h-full rounded-md border border-black ">
              asd
            </button>
            <button className="bg-red-600 w-36 h-full rounded-md border border-black ">
              asd
            </button>
          </span>
          <button className="ErrorTableBtn">Arac Listesi</button>
          <button className="ErrorTableBtn ">Manuel Hata</button>
          <button className="ErrorTableBtn ">Coklu Hata</button>
          <button className="ErrorTableBtn ">Hata Listesi</button>
          <button className="ErrorTableBtn ">Hata Kopya</button>
          <button onClick={() => navigate(-1)} className="ErrorTableBtn">
            Cikis
          </button>
        </div>
      </div>
    </div>
  );
}
