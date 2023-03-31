import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../db/config";
import { useFetch } from "../hooks/useFetch";
import Table from "../components/Table";

export default function TerminalPage() {
  const { data, isLoading } = useFetch(`${apiUrl}TerminalData`);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const columns = React.useMemo(
    () => [
      {
        Header: t(`Alltermianls`),
        columns: [
          {
            Header: t(`Bychapter`),
            Cell: ({ row }) => {
              console.log(row);
              return (
                <div className="flex w-full items-center justify-center gap-1 p-1 flex-wrap">
                  <span>({row.original.shopCode})</span>
                  <span>{row.original.depName}</span>
                </div>
              );
            },
            width: Math.round(window.innerWidth * 0.15),
            className: "text-red-600 ",
          },
          {
            Header: t(`Basedonfilter`),
            width: Math.round(window.innerWidth * 0.85),
            Cell: ({ row }) => {
              return (
                <div className="flex w-full gap-6 p-1 flex-wrap">
                  {row.original.filterBaseds?.map((item, index) => (
                    <span
                      key={index}
                      onClick={() =>
                        navigate(
                          `/cvqsterminal/${row.original?.depCode}/${item.filterCode}`
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
            className: "text-red-600 ",
          },
        ],
        className: "text-red-600 underline",
      },
    ],
    []
  );

  return (
    <div className="App">
      <nav className="w-full  h-20 mb-8    shadow-xl flex flex-wrap p-6 justify-between items-center ">
        <h1 className="text-2xl text-black/60 font-bold">
          Complete Vehicle Quality
        </h1>
        <li className="flex gap-5 text-red-600  uppercase font-medium">
          <ul className="cursor-pointer">{t("Help")}</ul>
          <ul className="cursor-pointer">{t("Homepage")}</ul>
          <ul className="cursor-pointer"> {t("Support")} </ul>
        </li>
      </nav>
      {data && !isLoading && (
        <Table
          columns={columns}
          height="calc(100vh - 11rem)"
          className={" no-scrollbar"}
          data={data}
          rowheightAuto={true}
          full
        />
      )}
    </div>
  );
}
