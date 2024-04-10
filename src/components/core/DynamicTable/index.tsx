import React from "react";

interface DynamicTableProps {
  rows: number;
  columns: number;
}

export const DynamicTable: React.FC<DynamicTableProps> = ({
  rows,
  columns,
}) => {
  const generateTable = (): JSX.Element[] => {
    const table: JSX.Element[] = [];

    // Create table rows
    for (let i = 0; i < rows; i++) {
      const row: JSX.Element[] = [];

      // Create table columns
      for (let j = 0; j < columns; j++) {
        row.push(<td contentEditable key={`cell-${i}-${j}`}></td>);
      }

      table.push(<tr key={`row-${i}`}>{row}</tr>);
    }

    return table;
  };

  return (
    <div>
      <table>
        <tbody>{generateTable()}</tbody>
      </table>
    </div>
  );
};
