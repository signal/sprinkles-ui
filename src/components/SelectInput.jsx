import React from "react";
import ReactCSS from "reactcss";
import TextListItem from "./TextListItem";
import List from "./List";
import ListItem from "./ListItem";
import Popover from "./Popover";
import VectorGraphic from "./VectorGraphic";
import {
  StructuralColors,
  TextColors,
} from "../shared/colors";

export default class SelectInput extends ReactCSS.Component {
  displayName = "SelectInput";

  static propTypes = {
    initialValue: React.PropTypes.string,
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        value: React.PropTypes.string,
        label: React.PropTypes.string,
      })
    ),
    onChange: React.PropTypes.func,
  };

  static defaultProps = {
    items: [],
    onChange: () => {},
  };

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

  classes() {
    return {
      default: {
        SelectInput: {
          border: `1px solid ${StructuralColors.divider}`,
        },
        Display: {
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        },
        Text: {
          flexGrow: 1,
        },
        Icon: {
          margin: "0 15px",
          transition: "transform 0.2s ease",
        },
      },
      open: {
        Icon: {
          transform: "rotate(180deg)",
        },
      },
    };
  }

  styles() {
    return this.css({
      open: this.state.open,
    });
  }

  calculateDisplayLabel() {
    if (this.state.value) {
      return this.props.items.find((item) => item.value === this.state.value) || {};
    }
    return { label: "--" };
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

  renderDisplay() {
    return (
      <div
        onClick={this.handleClick.bind(this)}
        style={this.styles().Display}
      >
        {this.renderDisplayText()}
        {this.renderDisplayIcon()}
      </div>
    );
  }

  renderDisplayText() {
    return (
      <div
        style={this.styles().Text}
      >
        <TextListItem
          ref={c => this.displayRef = c}
          text={this.calculateDisplayLabel().label}
        />
      </div>
    );
  }

  renderDisplayIcon() {
    return (
      <div
        style={this.styles().Icon}
      >
        <VectorGraphic>
          <g stroke={TextColors.primary} >
            <path
              fill="none"
              d="M1 2 L5 7 L9 2"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </VectorGraphic>
      </div>
    );
  }

  render() {
    return (
      <div
        style={this.styles().SelectInput}
      >
        {this.renderDisplay()}
        {this.renderDropdown()}
      </div>
    );
  }
}
