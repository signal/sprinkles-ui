/* eslint react/no-unused-prop-types: "off" */

import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import Base from '../Base';
import TextListItem from '../TextListItem';
import List from '../List';
import ListItem from '../ListItem';
import Popover from '../Popover';
import VectorGraphic from '../VectorGraphic';

export default class SelectInput extends Base {
  static propTypes = {
    enabled: PropTypes.bool,
    initialValue: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    ),
    onChange: PropTypes.func,
    status: PropTypes.oneOf(['error', 'warning', 'success']),
  };

  static defaultProps = {
    enabled: true,
    items: [],
    onChange: () => {},
  };

  displayName = 'SelectInput';

  constructor(props) {
    super();
    this.state = {
      open: false,
      value: props.initialValue,
    };
  }

  handleItemClick(item) {
    this.setState({
      value: item.value,
      open: false,
    }, () => this.props.onChange(item.value));
  }

  handleRequestClose() {
    if (this.props.enabled) {
      this.setState({
        open: false,
      });
    }
  }

  handleRequestOpen() {
    if (this.props.enabled) {
      this.setState({
        open: true,
      });
    }
  }

  value() {
    return this.state.value;
  }

  validate() {
    const isEmpty = this.value() === undefined;
    const isInitialValue = this.value() === this.props.initialValue;
    return {
      valid: !isEmpty,
      isInitialValue,
      validationError: !isEmpty ? '' : 'A value must be selected',
    };
  }

  calculateDisplayLabel() {
    if (this.state.value) {
      return this.props.items.find((item) => item.value === this.state.value) || {};
    }
    return { label: '--' };
  }

  renderItems() {
    if (this.props.items.length === 0) {
      return null;
    }
    return this.props.items.map(this.renderItem.bind(this));
  }

  renderItem(item, i) {
    return (
      <ListItem
        key={i}
        selected={item.value === this.state.value}
      >
        <TextListItem
          onClick={this.handleItemClick.bind(this, item)}
          text={item.label}
        />
      </ListItem>
    );
  }

  renderDisplay(clr, style) {
    return (
      <div
        style={style.Display}
      >
        {this.renderDisplayText(style)}
        {this.renderDisplayIcon(clr, style)}
      </div>
    );
  }

  renderDisplayText(style) {
    return (
      <div
        style={style.Text}
      >
        <TextListItem
          enabled={this.props.enabled}
          ref={c => this.displayRef = c}
          text={this.calculateDisplayLabel().label}
        />
      </div>
    );
  }

  renderDisplayIcon(clr, style) {
    return (
      <div
        style={style.Icon}
      >
        <VectorGraphic>
          <g stroke={this.props.enabled ? clr.textColors.primary : clr.textColors.secondary} >
            <path
              fill={'none'}
              d={'M1 2 L5 7 L9 2'}
              strokeWidth={'2'}
              strokeLinecap={'round'}
            />
          </g>
        </VectorGraphic>
      </div>
    );
  }

  renderTriggerEl(clr, style) {
    return (
      <div
        style={style.SelectInput}
        className="SelectInputContainer"
      >
        {this.renderDisplay(clr, style)}
      </div>);
  }

  render() {
    const clr = this.getColors();
    const style = reactCSS({
      default: {
        SelectInput: {
          border: `1px solid ${clr.formColors.border}`,
          borderRadius: 3,
          color: clr.formColors.text,
          minWidth: '200px',
        },
        Display: {
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        },
        Text: {
          flexGrow: 1,
        },
        Icon: {
          margin: '0 15px',
          maxWidth: '20px',
          transition: 'transform 0.2s ease',
        },
      },
      open: {
        Icon: {
          transform: 'rotate(180deg)',
        },
      },
      disabled: {
        SelectInput: {
          background: clr.backgroundColors.secondary,
        },
        Display: {
          cursor: 'not-allowed',
        },
      },
      success: {
        SelectInput: {
          boxShadow: `0 0 3px 1px ${clr.noticeColors.success}`,
          border: '1px solid transparent',
        },
      },
      warning: {
        SelectInput: {
          boxShadow: `0 0 3px 1px ${clr.noticeColors.warning}`,
          border: '1px solid transparent',
        },
      },
      error: {
        SelectInput: {
          boxShadow: `0 0 3px 1px ${clr.noticeColors.danger}`,
          border: '1px solid transparent',
        },
      },
    }, {
      open: this.state.open,
      disabled: !this.props.enabled,
      success: this.props.status === 'success',
      warning: this.props.status === 'warning',
      error: this.props.status === 'error',
    });
    return (
      <Popover
        disabled={!this.props.enabled}
        open={this.state.open}
        onRequestClose={this.handleRequestClose.bind(this)}
        onRequestOpen={this.handleRequestOpen.bind(this)}
        ref={c => this.popoverRef = c}
        triggerEl={this.renderTriggerEl(clr, style)}
        useLayerForClickAway={true}
      >
        <List
          ref={c => this.itemsRef = c}
        >
          {this.renderItems()}
        </List>
      </Popover>
    );
  }
}
