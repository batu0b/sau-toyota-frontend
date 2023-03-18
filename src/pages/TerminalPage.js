import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import TerminalTableComponent from "../components/TerminalTable";
import { apiUrl } from "../db/config";
import { useFetch } from "../hooks/useFetch";

export default function TerminalPage() {
  const { data, error, isLoading } = useFetch(`${apiUrl}TerminalData`);
  const { t } = useTranslation();

  useEffect(() => {
    console.log(error);
  }, [error]);

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
      {data && !isLoading && <TerminalTableComponent data={data} />}
    </div>
  );
}
