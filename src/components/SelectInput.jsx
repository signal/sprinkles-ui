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
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string,
        value: React.PropTypes.string,
      })
    ),
  }

  static defaultProps = {
    items: [],
  }

  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleClick() {
    this.setState({
      open: true,
    });
  }

  classes() {
    return {
      default: {
        SelectInput: {
          border: `1px solid ${StructuralColors.divider}`,
        },
      },
    };
  }

  renderItems() {
    return (
      <Popover
        open={this.state.open}
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
          <TextListItem text={item.value} />
        </ListItem>
      )
    );
  }

  render() {
    return (
      <div
        onClick={this.handleClick.bind(this)}
        style={this.styles().SelectInput}
      >
        <TextListItem
          ref={c => this.displayRef = c}
          text={"--"}
        />
      {this.renderItems()}
      </div>
    );
  }
}
