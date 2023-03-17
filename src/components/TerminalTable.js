import React, { useLayoutEffect, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import { useTranslation } from "react-i18next";

const TerminalTableComponent = ({ data }) => {
  const matches = useMediaQuery("(max-width: 1023px)");
  const [itemHeight, setItemHeight] = useState(null);

  const { t, i18n } = useTranslation();

  useLayoutEffect(() => {
    if (matches) {
      setItemHeight(240);
    } else {
      setItemHeight(144);
    }
  }, [matches]);

  const navigate = useNavigate();
  const RenderRow = ({ index, data, style }) => {
    return (
      <tr className="flex  justify-between" style={style}>
        <td className=" border-b border-r flex justify-center items-center  w-[15%] border-black/30">
          ({data[index]?.depCode}) {data[index]?.depName}
        </td>
        <td className="border-b flex gap-5 px-3  items-center flex-wrap   w-[85%] border-black/30">
          {data[index].filterBaseds.map((item) => (
            <span
              onClick={() => navigate(`/cvqsterminal/${data[index]?.depCode}/${item.filterCode}`)}
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
        </td>
      </tr>
    );
  };

  return (
    <div className={`h-[calc(100vh-13rem)]`}>
      <div className="flex flex-col h-20 font-medium  border    border-black/30 text-lg text-red-600 justify-between uppercase">
        <div className="w-full justify-center underline h-full flex items-center">
          {t(`Alltermianls`)}
        </div>
        <div className="flex items-center   ">
          <div
            className={`basis-[20%] flex items-center p-2 justify-center h-full border-black/30 border text-center`}
          >
            {t(`Bychapter`)}
          </div>
          <div
            className={`basis-[80%] flex items-center p-2 justify-center h-full border-black/30 border text-center`}
          >
            {t(`Basedonfilter`)}
          </div>
        </div>
      </div>
      <AutoSizer style={{ width: "100%" }}>
        {({ height, width }) => {
          return (
            <List
              className="no-scrollbar"
              height={height}
              itemCount={data.length}
              itemSize={itemHeight}
              width={"100%"}
              itemData={data}
            >
              {RenderRow}
            </List>
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default TerminalTableComponent;
// https://codesandbox.io/s/dynamic-size-of-react-window-list-items-64o9p?file=/src/Chat.js
