import React from 'react';
import reactCSS from 'reactcss';
import { Resets } from '../shared/styles';

export default class ListItem extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    itemPadding: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    listPosition: React.PropTypes.oneOf(['first', 'middle', 'last']),
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool,
    showDividers: React.PropTypes.bool,
    textAlign: React.PropTypes.string,
  };

  static defaultProps = {
    selected: false,
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
          textAlign: this.props.textAlign,
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
