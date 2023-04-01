import React, { memo, useCallback, useEffect, useRef } from "react";
import { useBlockLayout, useResizeColumns, useTable } from "react-table";
import { areEqual, VariableSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export default function Table({
  columns,
  data,
  height,
  className,
  full = false,
  rowheightAuto = true,
  rowHeaderComponent: RowHeaderComponent,
  rowHeaderHeight,
  specialIndex,
}) {
  const listRef = useRef(null);
  const rowHeights = useRef({ 0: 100 });

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
    const rowRef = useRef(null);
    const { index, style, setRowHeight } = props;
    const row = rows[index];
    prepareRow(row);

    useEffect(() => {
      if (rowRef.current) {
        if (rowHeaderHeight) {
          if (specialIndex) {
            if (specialIndex === index) {
              setRowHeight(
                index,
                rowRef.current.clientHeight + rowHeaderHeight
              );
            } else {
              setRowHeight(index, rowRef.current.clientHeight);
            }
          } else {
            setRowHeight(index, rowRef.current.clientHeight + rowHeaderHeight);
          }
        } else {
          setRowHeight(index, rowRef.current.clientHeight);
        }
      }
      // eslint-disable-next-line
    }, [rowRef]);

    return (
      <div
        {...row.getRowProps({
          style,
        })}
        className="tr flex"
      >
        <span className="w-full flex flex-col">
          {RowHeaderComponent ? (
            <RowHeaderComponent index={index} row={row} />
          ) : null}
          <div className={`w-full flex ${"h-full"} `}>
            {row.cells.map((cell) => {
              return (
                <div {...cell.getCellProps()} className="td">
                  <span
                    className="w-full flex items-center justify-center"
                    ref={rowRef}
                  >
                    {cell.render("Cell")}
                  </span>
                </div>
              );
            })}
          </div>
        </span>
      </div>
    );
  }, areEqual);

  const getRowHeight = useCallback((index) => {
    if (rowheightAuto) {
      return rowHeights.current[index] + 20 || 80;
    }
    return 55;
  }, []);

  const setRowHeight = useCallback((index, size) => {
    listRef.current?.resetAfterIndex(index);
    rowHeights.current = { ...rowHeights.current, [index]: size };
  }, []);

  return (
    <div
      {...getTableProps()}
      style={height ? { height: `${height}` } : { height: "75vh" }}
      className={`tableComp overflow-x-auto   ${className} `}
    >
      <div className="thead">
        {headerGroups.map((headerGroup) => (
          <div
            {...headerGroup.getHeaderGroupProps()}
            className="tr h-12 font-bold w-full"
          >
            {headerGroup.headers.map((column) => (
              <div
                {...column.getHeaderProps()}
                className={`th w-full ${column.className}`}
              >
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="h-[calc(100%-5rem)]" {...getTableBodyProps()}>
        <AutoSizer style={{ height: "100%" }}>
          {({ height, width }) => {
            return (
              <VariableSizeList
                ref={listRef}
                height={height}
                itemCount={rows.length}
                itemSize={getRowHeight}
                className="overflow-hidden"
                width={full ? width : totalColumnsWidth + scrollBarSize}
              >
                {({ data, index, style }) => (
                  <RenderRow
                    data={data}
                    index={index}
                    style={style}
                    setRowHeight={setRowHeight}
                  />
                )}
              </VariableSizeList>
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
