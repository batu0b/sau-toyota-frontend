import React, { memo, useLayoutEffect, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { areEqual, FixedSizeList as List } from "react-window";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import { useTranslation } from "react-i18next";

const TerminalTableComponent = ({ data }) => {
  const matches = useMediaQuery("(max-width: 1023px)");
  const [itemHeight, setItemHeight] = useState(null);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    if (matches) {
      setItemHeight(240);
    } else {
      setItemHeight(144);
    }
  }, [matches]);

  const navigate = useNavigate();
  const RenderRow = memo((props) => {
    const { index, data, style } = props;
    return (
      <div key={index} className="flex  justify-between" style={style}>
        <div className=" border-b border-r flex justify-center items-center  w-[15%] border-black/30">
          ({data[index]?.depCode}) {data[index]?.depName}
        </div>
        <div className="border-b flex gap-5 px-3  items-center flex-wrap   w-[85%] border-black/30">
          {data[index].filterBaseds.map((item, index) => (
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
      </div>
    );
  }, areEqual);

  return (
    <div className={`h-[calc(100vh-15rem)]`}>
      <div className="flex flex-col h-28 font-medium  border    border-black/30 text-lg text-red-600 justify-between uppercase">
        <div className="w-full justify-center underline h-full flex items-center">
          {t(`Alltermianls`)}
        </div>
        <div className="flex items-center   ">
          <div
            className={`basis-[15%] flex items-center p-2 justify-center h-full border-black/30 border text-center`}
          >
            {t(`Bychapter`)}
          </div>
          <div
            className={`basis-[85%] flex items-center p-2 justify-center h-full border-black/30 border text-center`}
          >
            {t(`Basedonfilter`)}
          </div>
        </div>
      </div>
      <AutoSizer style={{ width: "100%" }}>
        {({ height, width }) => {
          return (
            <List
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
