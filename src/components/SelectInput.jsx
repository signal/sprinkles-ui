import React from 'react';
import reactCSS from 'reactcss';
import TextListItem from './TextListItem';
import List from './List';
import ListItem from './ListItem';
import Popover from './Popover';
import VectorGraphic from './VectorGraphic';
import {
  BackgroundColors,
  Colors,
  StructuralColors,
  TextColors,
} from '../shared/colors';

export default class SelectInput extends React.Component {
  static propTypes = {
    enabled: React.PropTypes.bool,
    initialValue: React.PropTypes.string,
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        value: React.PropTypes.string,
        label: React.PropTypes.string,
      })
    ),
    onChange: React.PropTypes.func,
    status: React.PropTypes.oneOf(['error', 'warning', 'success']),
  };

  static defaultProps = {
    items: [],
    onChange: () => {},
    enabled: true,
  };

  displayName = 'SelectInput';

  constructor(props) {
    super();
    this.state = {
      anchorEl: undefined,
      open: false,
      value: props.initialValue,
    };
  }

  handleClick(e) {
    this.setState({
      anchorEl: e.currentTarget,
      open: true,
    });
  }

  handleItemClick(item) {
    this.setState({
      value: item.value,
      open: false,
    }, () => this.props.onChange(item.value));
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
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

  renderDropdown() {
    return (
      <Popover
        anchorEl={this.state.anchorEl}
        constrainWidth={true}
        open={this.state.open}
        useLayerForClickAway={true}
        onRequestClose={this.handleRequestClose.bind(this)}
        ref={c => this.popoverRef = c}
      >
        <List
          ref={c => this.itemsRef = c}
        >
          {this.renderItems()}
        </List>
      </Popover>
    );
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

  renderDisplay(style) {
    return (
      <div
        onClick={this.props.enabled ? this.handleClick.bind(this) : undefined}
        style={style.Display}
      >
        {this.renderDisplayText(style)}
        {this.renderDisplayIcon(style)}
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

  renderDisplayIcon(style) {
    return (
      <div
        style={style.Icon}
      >
        <VectorGraphic>
          <g stroke={this.props.enabled ? TextColors.primary : TextColors.secondary} >
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

  render() {
    const style = reactCSS({
      default: {
        SelectInput: {
          border: `1px solid ${StructuralColors.inputBorder}`,
          borderRadius: 3,
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
          background: BackgroundColors.secondary,
        },
        Display: {
          cursor: 'not-allowed',
        },
      },
      success: {
        SelectInput: {
          boxShadow: `0 0 3px 1px ${Colors.success}`,
          border: '1px solid transparent',
        },
      },
      warning: {
        SelectInput: {
          boxShadow: `0 0 3px 1px ${Colors.warning}`,
          border: '1px solid transparent',
        },
      },
      error: {
        SelectInput: {
          boxShadow: `0 0 3px 1px ${Colors.danger}`,
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
      <div
        style={style.SelectInput}
      >
        {this.renderDisplay(style)}
        {this.renderDropdown()}
      </div>
    );
  }
}
