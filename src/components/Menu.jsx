import React from "react";
import MenuItem from "./MenuItem";


export default class Menu extends React.Component {
  static displayName = "Menu";

  static propTypes = {
    handleItemClick: React.PropTypes.func,
    itemStyle: React.PropTypes.object,
    menuItems: React.PropTypes.array,
    selectedItemStyle: React.PropTypes.object,
    style: React.PropTypes.object
  };

  static defaultProps = {
    menuItems: {},
    itemStyle: {
      padding: 10,
      color: "#444"
    },
    selectedItemStyle: {
      padding: 10,
      background: "#3879D9",
      color: "white"
    },
    style: {
      listStyleType: "none",
      padding: 0
    }
  };

  handleItemClick (item) {
    if (this.props.handleItemClick) {
      this.props.handleItemClick(item);
    }
  }

  renderMenuItems (items) {
    return items.map((item, i) => {
      let itemStyle = item.selected ?
        this.props.selectedItemStyle : this.props.itemStyle;
      return (
          <MenuItem
              handleClick={this.handleItemClick.bind(this, item)}
              key={item.key}
              style={itemStyle}
              text={item.text}
          />
      );
    });
  }

  render () {
    return (
        <ul style={this.props.style}>
          {this.renderMenuItems(this.props.menuItems)}
        </ul>
    );
  }
}
