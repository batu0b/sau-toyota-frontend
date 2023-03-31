import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ErrorTable from "../components/ErrorTable";
import TerminalTableComponent from "../components/TerminalTable";
import { apiUrl } from "../db/config";
import { useFetch } from "../hooks/useFetch";

export default function TerminalPage() {
  const { data, isLoading } = useFetch(`${apiUrl}TerminalData`);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "depName",
            width: Math.round(window.innerWidth * 0.15),
          },
          {
            Header: "filter Baseds",
            width: Math.round(window.innerWidth * 0.85),
            Cell: ({ row }) => {
              console.log(row.original);
              return (
                <div className="flex w-full gap-6 p-1 flex-wrap">
                  {row.original.filterBaseds?.map((item , index) => (
                    <span
                      key={index}
                      onClick={() =>
                        navigate(
                          `/cvqsterminal/${data[index]?.depCode}/${item.filterCode}`,
                          { state: { dummyOptionData: data[index] } }
                        )
                      }
                      className="bg-transparent border relative border-black cursor-pointer lga:px-2 px-5 py-2 rounded-lg"
                    >
                      {item.filterCode}
                      {item.linkCount > 1 ? (
                        <span className="absolute top-0 right-0  bg-red-600 rounded-tr-md rounded-bl-xl p-1 text-white text-xs">
                          {" "}
                          {item.linkCount}{" "}
                        </span>
                      ) : null}
                    </span>
                  ))}
                </div>
              );
            },
          },
        ],
      },
    ],
    []
  );

  return (
    <div className="App">
      <nav className="w-full  h-20 mb-8    shadow-xl flex flex-wrap p-6 justify-between items-center ">
        <h1 className="text-2xl text-black/60 font-bold">
          Complete Vehicle Quality {t("Hello")}
        </h1>
        <li className="flex gap-5 text-red-600  uppercase font-medium">
          <ul className="cursor-pointer">{t("Help")}</ul>
          <ul className="cursor-pointer">{t("Homepage")}</ul>
          <ul className="cursor-pointer"> {t("Support")} </ul>
        </li>
      </nav>
      {data && !isLoading && (
        <ErrorTable
          columns={columns}
          height="calc(100vh - 11rem)"
          className={"overflow-y-hidden no-scrollbar"}
          data={data}
          rowheight={100}
          full
        />
      )}
    </div>
  );
}
