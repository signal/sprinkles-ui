/* eslint react/no-unused-prop-types: "off" */

import Immutable, { Map, fromJS } from 'immutable';
import React from 'react';
import reactCSS from 'reactcss';
import Text from './Text';
import TextInput from './TextInput';
import Button from './Button';
import { TextColors, FormColors, Colors } from '../shared/colors';


export default class KeyValueInput extends React.Component {
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
    uniqueKeys: React.PropTypes.bool,
    valueLabel: React.PropTypes.string,
    status: React.PropTypes.oneOf(['success', 'error']),
  };

  static defaultProps = {
    addButtonText: 'Add',
    enabled: true,
    initialValue: [{
      key: '',
      value: '',
    }],
    keyLabel: 'Key',
    onChange: () => {},
    uniqueKeys: false,
    valueLabel: 'Value',
  };

  displayName = 'KeyValueInput';

  constructor(props) {
    super();
    this.state = {
      value: fromJS(props.initialValue),
    };
  }

  value() {
    return this.state.value.toJS();
  }

  inputIsValid(inputValue, isKey, duplicateKeySet) {
    const isEmpty = inputValue === '';
    if (this.props.uniqueKeys && isKey) {
      return !duplicateKeySet.has(inputValue) && !isEmpty;
    }
    return !isEmpty;
  }

  duplicateKeys() {
    const seenKeys = new Set();
    const duplicateKeys = new Set();
    this.state.value.forEach((item) => {
      const key = item.get('key');
      if (key) {
        if (seenKeys.has(key)) {
          duplicateKeys.add(key);
        } else {
          seenKeys.add(key);
        }
      }
    });
    return duplicateKeys;
  }

  hasEmptyInputs() {
    return this.state.value.find((item) => {
      if (!item.get('key') || !item.get('value')) {
        return true;
      }
      return undefined;
    });
  }

  validate() {
    const duplicateKeys = this.duplicateKeys();
    const valid = duplicateKeys.size === 0 && !this.hasEmptyInputs();
    let validationError = '';
    if (!valid) {
      if (duplicateKeys.size > 0) {
        const duplicateString = [...duplicateKeys].join(',');
        validationError = `All keys must be unique, found duplicate \'${duplicateString}\'`;
      } else {
        validationError = 'All Fields Must Not Be Empty';
      }
    }
    return {
      valid,
      isInitialValue: Immutable.is(fromJS(this.props.initialValue), this.state.value),
      validationError,
    };
  }

  handleAddClick() {
    const newStateValue = this.state.value.push(new Map({
      key: '',
      value: '',
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

  renderKeyValueLabels(style) {
    let textColor;
    switch (this.props.status) {
      case 'success':
        textColor = Colors.success;
        break;
      case 'error':
        textColor = Colors.danger;
        break;
      default:
        textColor = this.props.enabled ?
          TextColors.primary : TextColors.secondary;
        break;
    }
    return (
      <div style={style.KeyValuePair}>
        <span style={style.TextInput}>
          <Text
            color={textColor}
            fontSize={0.8}
            ref={(c) => this.keyLabelRef = c}
          >
            {this.props.keyLabel}
          </Text>
        </span>
        <span style={style.TextInput}>
          <Text
            color={textColor}
            fontSize={0.8}
            ref={(c) => this.valueLabelRef = c}
          >
            {this.props.valueLabel}
          </Text>
        </span>
        <span style={style.DeleteButton} />
      </div>
    );
  }

  renderKeyValuePairs(style) {
    const duplicateKeys = this.duplicateKeys();
    return this.state.value.map((item, i) => {
      const inputStatus = {};
      switch (this.props.status) {
        case 'success':
          inputStatus.key = 'success';
          inputStatus.value = 'success';
          break;
        case 'error':
          inputStatus.key = !this.inputIsValid(
            item.get('key'), true, duplicateKeys) ? 'error' : undefined;
          inputStatus.value = !this.inputIsValid(item.get('value')) ? 'error' : undefined;
          break;
        default:
          break;
      }
      let deleteButton;
      if (i !== 0) {
        deleteButton = (
          <Button
            enabled={this.props.enabled}
            onClick={this.handleDeleteClick.bind(this, i)}
            ref={(c) => this[`deleteButtonRef${i}`] = c}
            text={'✕'}
            type={'danger'}
          />
        );
      }
      return (
        <div
          key={i}
          style={style.KeyValuePair}
        >
          <span style={style.TextInput}>
            <TextInput
              boundValue={item.get('key')}
              enabled={this.props.enabled}
              onChange={this.handleChange.bind(this, i, 'key')}
              ref={(c) => this[`keyInputRef${i}`] = c}
              status={inputStatus.key}
            />
          </span>
          <span style={style.TextInput}>
            <TextInput
              boundValue={item.get('value')}
              enabled={this.props.enabled}
              onChange={this.handleChange.bind(this, i, 'value')}
              ref={(c) => this[`valueInputRef${i}`] = c}
              status={inputStatus.value}
            />
          </span>
          <span style={style.DeleteButton}>
              {deleteButton}
          </span>
        </div>
      );
    });
  }

  render() {
    const style = reactCSS({
      default: {
        KeyValuePair: {
          color: FormColors.text,
          display: 'flex',
          marginBottom: 15,
        },
        TextInput: {
          flex: '4',
          marginRight: 15,
        },
        DeleteButton: {
          flex: '1',
          minWidth: 50,
          alignSelf: 'center',
        },
      },
    });
    return (
      <div>
        {this.renderKeyValueLabels(style)}
        {this.renderKeyValuePairs(style)}
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
