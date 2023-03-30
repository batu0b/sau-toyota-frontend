import React, { memo } from "react";
import { useBlockLayout, useResizeColumns, useTable } from "react-table";
import { FixedSizeList, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export default function ErrorTable({ columns, data }) {
  const scrollbarWidth = () => {
    //https://davidwalsh.name/detect-scrollbar-width
    const scrollDiv = document.createElement("div");
    scrollDiv.setAttribute(
      "style",
      "width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;"
    );
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };
  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 120,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns
  );

  const RenderRow = memo((props) => {
    const { index, style } = props;
    const row = rows[index];
    prepareRow(row);

    return (
      <div
        {...row.getRowProps({
          style,
        })}
        className="tr"
      >
        {row.cells.map((cell) => {
          return (
            <div {...cell.getCellProps()} className="td">
              {cell.render("Cell")}
            </div>
          );
        })}
      </div>
    );
  }, areEqual);

  return (
    <div {...getTableProps()} className="table overflow-x-auto ">
      <div>
        {headerGroups.map((headerGroup) => (
          <div
            {...headerGroup.getHeaderGroupProps()}
            className="tr h-12  font-bold"
          >
            {headerGroup.headers.map((column) => (
              <div {...column.getHeaderProps()} className="th">
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="h-[calc(100%-5rem)]" {...getTableBodyProps()}>
        <AutoSizer style={{ height: "100%" }}>
          {({ height, width }) => {
            console.log(height);
            return (
              <FixedSizeList
                height={height}
                itemCount={rows.length}
                itemSize={55}
                className="overflow-hidden"
                width={totalColumnsWidth + scrollBarSize}
              >
                {RenderRow}
              </FixedSizeList>
            );
          }}
        </AutoSizer>
      </div>

      <div className="tr w-full">
        <div className="td h-8 w-full border-t fixed  " colSpan="10000">
          <span className="absolute right-7 "> Total Rows {rows.length} </span>
        </div>
      </div>
    </div>
  );
}
