import React from "react";
import Cell from "./Cell";

export default function Row({
  cells,
  rowNumber,
  getCellVal,
  onCellValueChange
}) {
  return (
    <tr>
      <th className="row-head">{rowNumber}</th>
      {cells.map(function(cell, i) {
        return (
          <Cell
            key={`cell_${i}`}
            value={cell}
            getCellVal={getCellVal}
            onValueChange={onCellValueChange.bind(this, i)}
          />
        );
      }, this)}
    </tr>
  );
}
