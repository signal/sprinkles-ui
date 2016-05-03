import React from "react";
import ReactCSS from "reactcss";
import List from "./List";
import ListItem from "./ListItem";
import TextListItem from "./TextListItem";
import Popover from "./Popover";

export default class Dropdown extends ReactCSS.Component {
  static propTypes = {
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string,
        value: React.PropTypes.string,
      })
    ),
    open: React.PropTypes.bool,
  }

  static defaultProps = {
    items: [],
    open: false,
  }

  renderItems() {
    return (
      <Popover
        ref={c => this.popoverRef = c}
        open={this.props.open}
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
      <div>
        {this.renderItems()}
      </div>
    );
  }
}
