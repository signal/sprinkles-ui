import React from "react";
import ReactCSS from "reactcss";
import Text from "./Text";
import TextInput from "./TextInput";
import Button from "./Button";
import { TextColors } from "../shared/colors";
import Immutable, { Map, fromJS } from "immutable";

export default class KeyValueInput extends ReactCSS.Component {
  displayName = "KeyValueInput";

  static propTypes = {
    addButtonText: React.PropTypes.string,
    enabled: React.PropTypes.bool,
    initialValue: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string,
        value: React.PropTypes.string,
      })
    ),
    keyLabel: React.PropTypes.string,
    onChange: React.PropTypes.func,
    valueLabel: React.PropTypes.string,
  };

  static defaultProps = {
    addButtonText: "Add",
    enabled: true,
    initialValue: [{
      key: "",
      value: "",
    }],
    keyLabel: "Key",
    onChange: () => {},
    valueLabel: "Value",
  };

  constructor(props) {
    super();
    this.state = {
      value: fromJS(props.initialValue),
    };
  }

  classes() {
    return {
      default: {
        KeyValuePair: {
          display: "flex",
          marginBottom: 15,
        },
        TextInput: {

          flex: "4",
          marginRight: 15,
        },
        DeleteButton: {
          flex: "1",
          minWidth: 50,
          alignSelf: "center",
        },
      },
    };
  }

  value() {
    return this.state.value.toJS();
  }

  validate() {
    const valid = !this.state.value.find((item) => {
      if (!item.get("key") || !item.get("value")) {
        return true;
      }
      return undefined;
    });
    return {
      valid,
      isInitialValue: Immutable.is(fromJS(this.props.initialValue), this.state.value),
      validationError: valid ? "" : "All Fields Must Not Be Empty",
    };
  }

  handleAddClick() {
    const newStateValue = this.state.value.push(new Map({
      key: "",
      value: "",
    }));
    this.setState({
      value: newStateValue,
    }, () => this.props.onChange(this.value()));
  }

  handleDeleteClick(i) {
    this.setState({
      value: this.state.value.delete(i),
    }, () => this.props.onChange(this.value()));
  }

  handleChange(i, type, newValue) {
    const newStateValue = this.state.value.set(i, this.state.value.get(i).set(type, newValue));
    this.setState({
      value: newStateValue,
    }, () => this.props.onChange(this.value()));
  }

  renderKeyValueLabels() {
    const textColor = this.props.enabled ?
      TextColors.primary : TextColors.secondary;
    return (
      <div style={this.styles().KeyValuePair}>
        <span style={this.styles().TextInput}>
          <Text
            color={textColor}
            fontSize={14}
            ref={(c) => this.keyLabelRef = c}
          >
            {this.props.keyLabel}
          </Text>
        </span>
        <span style={this.styles().TextInput}>
          <Text
            color={textColor}
            fontSize={14}
            ref={(c) => this.valueLabelRef = c}
          >
            {this.props.valueLabel}
          </Text>
        </span>
        <span style={this.styles().DeleteButton} />
      </div>
    );
  }

  renderKeyValuePairs() {
    return this.state.value.map((item, i) => {
      let deleteButton;
      if (i !== 0) {
        deleteButton = (
          <Button
            enabled={this.props.enabled}
            onClick={this.handleDeleteClick.bind(this, i)}
            ref={(c) => this[`deleteButtonRef${i}`] = c}
            text={"✕"}
            type={"danger"}
          />
        );
      }
      return (
        <div
          key={i}
          style={this.styles().KeyValuePair}
        >
          <span style={this.styles().TextInput}>
            <TextInput
              boundValue={item.get("key")}
              enabled={this.props.enabled}
              onChange={this.handleChange.bind(this, i, "key")}
              ref={(c) => this[`keyInputRef${i}`] = c}
            />
          </span>
          <span style={this.styles().TextInput}>
            <TextInput
              boundValue={item.get("value")}
              enabled={this.props.enabled}
              onChange={this.handleChange.bind(this, i, "value")}
              ref={(c) => this[`valueInputRef${i}`] = c}
            />
          </span>
          <span style={this.styles().DeleteButton}>
              {deleteButton}
          </span>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderKeyValueLabels()}
        {this.renderKeyValuePairs()}
        <Button
          enabled={this.props.enabled}
          onClick={this.handleAddClick.bind(this)}
          ref={(c) => this.addButtonRef = c}
          text={this.props.addButtonText}
        />
      </div>
    );
  }
}
