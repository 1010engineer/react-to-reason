import React from "react";

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }

  evalFormula(formula) {
    // =sum(A0,B1)
    const match = /=(sum|mul)\(([A-Z]+)(\d+)\:([A-Z]+)(\d+)\)/.exec(formula);
    if (match) {
      return {
        sum:
          this.props.getCellVal(match[2], match[3]) +
          this.props.getCellVal(match[4], match[5]),
        mul:
          this.props.getCellVal(match[2], match[3]) *
          this.props.getCellVal(match[4], match[5])
      }[match[1]];
    } else {
      return formula;
    }
  }

  getValue() {
    const { value } = this.props;

    if (/^=/.test(value.toString()) && !this.state.focused) {
      return this.evalFormula(value);
    } else {
      return value;
    }
  }

  setFocus() {
    this.setState({ focused: true });
  }

  unsetFocus() {
    this.setState({ focused: false });
  }

  render() {
    return (
      <td>
        <input
          value={this.getValue()}
          onChange={this.props.onValueChange}
          onFocus={this.setFocus.bind(this)}
          onBlur={this.unsetFocus.bind(this)}
        />
      </td>
    );
  }
}
