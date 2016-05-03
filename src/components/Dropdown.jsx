import React from "react";
import ReactCSS from "reactcss";
import List from "./List";
import ListItem from "./ListItem";
import TextListItem from "./TextListItem";

export default class Dropdown extends ReactCSS.Component {
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

  renderItems() {
    return (
      <List
        ref={c => this.itemsRef = c}
      >
        {this.renderItem()}
      </List>
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
