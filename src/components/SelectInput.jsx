import React from "react";
import ReactCSS from "reactcss";
import TextListItem from "./TextListItem";
import List from "./List";
import ListItem from "./ListItem";
import Popover from "./Popover";
import { StructuralColors } from "../shared/colors";

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
  };

  static defaultProps = {
    items: [],
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
    });
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
        },
      },
    };
  }

  calculateDisplayLabel() {
    if (this.state.value) {
      return this.props.items.find((item) => item.value === this.state.value) || {};
    }
    return { label: "--" };
  }

  renderItems() {
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
          {this.renderItem()}
        </List>
      </Popover>
    );
  }

  renderItem() {
    if (this.props.items.length === 0) {
      return null;
    }
    return this.props.items.map((item, i) =>
      (
        <ListItem key={i}>
          <TextListItem
            onClick={this.handleItemClick.bind(this, item)}
            text={item.label}
          />
        </ListItem>
      )
    );
  }

  render() {
    return (
      <div
        style={this.styles().SelectInput}
      >
        <div
          style={this.styles().Display}
        >
          <TextListItem
            onClick={this.handleClick.bind(this)}
            ref={c => this.displayRef = c}
            text={this.calculateDisplayLabel().label}
          />
        </div>
      {this.renderItems()}
      </div>
    );
  }
}
