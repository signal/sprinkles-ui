import React from 'react';
import ReactCSS from 'reactcss';
import List from './List';
import ListItem from './ListItem';
import TextListItem from './TextListItem';
import Popover from './Popover';

export default class Dropdown extends ReactCSS.Component {
  static propTypes = {
    anchorEl: React.PropTypes.object,
    anchorOrigin: React.PropTypes.shape({
      horizontal: React.PropTypes.oneOf(['left', 'right']),
      vertical: React.PropTypes.oneOf(['top', 'bottom']),
    }),
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string,
        value: React.PropTypes.string,
      })
    ),
    open: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onRequestClose: React.PropTypes.func,
    useLayerForClickAway: React.PropTypes.bool,
  };

  static defaultProps = {
    items: [],
    open: false,
    onClick: () => {},
  };

  handleClick(item) {
    this.props.onClick(item);
  }

  renderItems() {
    return (
      <Popover
        anchorEl={this.props.anchorEl}
        anchorOrigin={this.props.anchorOrigin}
        constrainWidth={true}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        ref={c => this.popoverRef = c}
        useLayerForClickAway={this.props.useLayerForClickAway}
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
        <ListItem
          key={i}
          onClick={this.handleClick.bind(this, item)}
        >
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
