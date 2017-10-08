open Legacy;

let component = ReasonReact.statelessComponent("Row");

let make =
    (~cells: array(Cell.cellValue), ~rowNumber, ~getCellValue, ~onCellValueChange, _children) => {
  ...component,
  render: (_self) => {
    let cellsComponents =
      cells
      |> Array.mapi(
           (i, value) =>
             <Cell
               key=("cell_" ++ string_of_int(i))
               value
               getCellValue
               onValueChange=(onCellValueChange(i))
             />
         );
    <tr>
      <th className="row-head"> rowNumber </th>
      (ReasonReact.arrayToElement(cellsComponents))
    </tr>
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~cells=jsProps##cells,
        ~rowNumber=jsProps##rowNumber,
        ~getCellValue=jsProps##getCellValue,
        ~onCellValueChange=jsProps##onCellValueChange,
        [||]
      )
  );