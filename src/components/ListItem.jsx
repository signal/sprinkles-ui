import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import { Resets } from '../shared/styles';

export default class ListItem extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    itemPadding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    listPosition: PropTypes.oneOf(['first', 'middle', 'last']),
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    showDividers: PropTypes.bool,
    textAlign: PropTypes.string,
  };

  static defaultProps = {
    selected: false,
    showDividers: true,
    textAlign: 'left',
  };

  displayName = 'ListItem';

  constructor() {
    super();
    this.state = {
      isHovering: false,
    };
  }

  handleMouseOut() {
    this.setState({ isHovering: false });
  }

  handleMouseOver() {
    this.setState({ isHovering: true });
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (child) {
        return React.cloneElement(child, {
          hovered: this.state.isHovering,
          itemPadding: this.props.itemPadding,
          listPosition: this.props.listPosition,
          ref: c => this.listItemRef = c,
          selected: this.props.selected,
          showDividers: this.props.showDividers,
        });
      }
      return undefined;
    });
  }

  render() {
    const style = reactCSS({
      default: {
        ListItemButton: {
          textAlign: `${this.props.textAlign}`,
          width: '100%',
        },
      },
    });
    style.ListItemButton = Object.assign({}, Resets.Button, style.ListItemButton);
    return (
      <button
        onClick={this.props.onClick}
        onMouseOut={this.handleMouseOut.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
        style={style.ListItemButton}
        ref={c => this.listItemButtonRef = c}
      >
        {this.renderChildren()}
      </button>
    );
  }
}
