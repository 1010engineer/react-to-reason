module Cell = {
  [@bs.module "./Cell"] external component : ReasonReact.reactClass = "default";
  type cellValue =
    | Int(int)
    | String(string);
  let make =
      (
        ~value: cellValue,
        ~getCellValue: (int, int) => cellValue,
        ~onValueChange: 'event => unit,
        children
      ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=component,
      ~props={"value": value, "getCellValue": getCellValue, "onValueChange": onValueChange},
      children
    );
};