import React from "react";
import update from "react-addons-update";
import _ from "lodash";
import { fromColumnName, toColumnName } from "../Util";
import Row from "./Row.re";

export default class Spreadsheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Generate 30x10 sheet
      rows: _.range(30).reduce((acc, row) => {
        acc.push(_.times(10, _.constant("")));
        return acc;
      }, [])
    };
  }

  onDataChange(row, cell, event) {
    const query = {
      [row]: {
        [cell]: { $set: event.target.value }
      }
    };

    const newState = update(this.state, { rows: query });

    this.setState(newState);
  }

  getCellValue(col, row) {
    let value = "";
    const colIndex = fromColumnName(col);
    const rowIndex = parseInt(row, 10);

    try {
      value = parseInt(this.state.rows[rowIndex - 1][colIndex - 1], 10);
    } catch (err) {
      console.error(err);
    }

    return value;
  }

  getColumns() {
    if (!this.state.rows) {
      return [];
    }

    const cols = this.state.rows[0].map((_cell, i) => {
      const colName = toColumnName(i + 1);

      return (
        <th key={colName} className="col-head">
          {colName}
        </th>
      );
    });

    return [<th className="col-head" />].concat(cols);
  }

  render() {
    const rows = this.state.rows.map(function(row, i) {
      return (
        <Row
          key={"row_" + i}
          rowNumber={i + 1}
          cells={row}
          getCellValue={this.getCellValue.bind(this)}
          onCellValueChange={this.onDataChange.bind(this, i)}
        />
      );
    }, this);

    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>{this.getColumns()}</tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}
