import React from "react";
import ReactCSS from "reactcss";
import Text from "./Text";
import TextInput from "./TextInput";
import Button from "./Button";
import { TextColors } from "../shared/colors";
import { Map, fromJS } from "immutable";

export default class KeyValueInput extends ReactCSS.Component {
  displayName = "KeyValueInput";

  static propTypes = {
    initialValue: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string,
        value: React.PropTypes.string,
      })
    )
  };

  static defaultProps = {
    initialValue: [{
      key: "",
      value: ""
    }]
  };

  constructor(props) {
    super();
    this.state = {
      value: fromJS(props.initialValue)
    };
  }

  classes () {
    return {
      "default": {
        KeyValuePair: {
          display: "flex",
          marginBottom: 15
        },
        TextInput: {
          flex: "2",
          marginRight: 15
        },
        DeleteButton: {
          flex: "1",
          minWidth: 100,
          alignSelf: "center"
        }
      }
    };
  }

  handleAddClick () {
    this.setState({
      value: this.state.value.push(Map({
        key: "",
        value: ""
      }))
    });
  }

  handleDeleteClick (i) {
    this.setState({
      value: this.state.value.delete(i)
    })
  }

  handleChange (i, type, newValue) {
    this.setState({
      value: this.state.value.set(i, this.state.value.get(i).set(type, newValue))
    });
  }

  renderKeyValuePairs () {
    return this.state.value.map((item, i) => {
      let deleteButton;
      if (i !== 0) {
        deleteButton = (
            <Button
                onClick={this.handleDeleteClick.bind(this, i)}
                ref={(c) => this["deleteButtonRef"+i] = c}
                text={"Delete"}
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
                      onChange={this.handleChange.bind(this, i, "key")}
                      ref={(c) => this["keyInputRef" + i] = c}
                  />
              </span>
              <span style={this.styles().TextInput}>
                  <TextInput
                      boundValue={item.get("value")}
                      onChange={this.handleChange.bind(this, i, "value")}
                      ref={(c) => this["valueInputRef" + i] = c}
                  />
              </span>
              <span style={this.styles().DeleteButton}>
                  {deleteButton}
              </span>
          </div>
      );
    });
  }

  render () {
    return(
        <div>
            <div style={this.styles().KeyValuePair}>
                <span style={this.styles().TextInput}>
                    <Text
                        color={TextColors.dark}
                        fontSize={14}
                    >
                      {"Key"}
                    </Text>
                </span>
                <span style={this.styles().TextInput}>
                    <Text
                        color={TextColors.dark}
                        fontSize={14}
                    >
                      {"Value"}
                    </Text>
                </span>
                <span style={this.styles().DeleteButton}/>
            </div>
            {this.renderKeyValuePairs()}
            <Button
                onClick={this.handleAddClick.bind(this)}
                ref={(c) => this.addButtonRef = c}
                text={"Add"}
            />
        </div>
    );
  }
};
