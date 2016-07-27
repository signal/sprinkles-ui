import React from 'react';
import List from './List';
import ListItem from './ListItem';
import TextListItem from './TextListItem';
import Popover from './Popover';

export default class Dropdown extends React.Component {
  static propTypes = {
    anchorOrigin: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.string,
        value: React.PropTypes.string,
      })
    ),
    open: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onRequestOpen: React.PropTypes.func,
    onRequestClose: React.PropTypes.func,
    triggerEl: React.PropTypes.node,
    useLayerForClickAway: React.PropTypes.bool,
  };

  static defaultProps = {
    anchorOrigin: 'bottom',
    items: [],
    open: false,
    onClick: () => {},
    onRequestClose: () => {},
    onRequestOpen: () => {},
  };

  displayName = 'Dropdown';

  handleClick(item) {
    this.props.onClick(item);
  }

  renderItems() {
    return (
      <Popover
        anchorOrigin={this.props.anchorOrigin}
        open={this.props.open}
        onRequestOpen={this.props.onRequestOpen}
        onRequestClose={this.props.onRequestClose}
        ref={c => this.popoverRef = c}
        triggerEl={this.props.triggerEl}
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
      <ListItem
        key={i}
        onClick={this.handleClick.bind(this, item)}
      >
        <TextListItem text={item.value} />
      </ListItem>
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
