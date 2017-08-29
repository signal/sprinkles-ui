/* eslint react/no-unused-prop-types: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import Base from './Base';
import List from './List';
import ListItem from './ListItem';
import TextListItem from './TextListItem';
import Popover from './Popover';

export default class Dropdown extends Base {
  static propTypes = {
    anchorOrigin: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    children: PropTypes.node,
    disabled: PropTypes.bool,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    open: PropTypes.bool,
    onClick: PropTypes.func,
    onRequestOpen: PropTypes.func,
    onRequestClose: PropTypes.func,
    triggerEl: PropTypes.node,
    useLayerForClickAway: PropTypes.bool,
  };

  static defaultProps = {
    anchorOrigin: 'bottom',
    disabled: false,
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

  renderItems(children) {
    return (
      <Popover
        anchorOrigin={this.props.anchorOrigin}
        disabled={this.props.disabled}
        open={this.props.open}
        onRequestOpen={this.props.onRequestOpen}
        onRequestClose={this.props.onRequestClose}
        ref={c => this.popoverRef = c}
        triggerEl={this.props.triggerEl}
        useLayerForClickAway={this.props.useLayerForClickAway}
      >
        { children }
      </Popover>
    );
  }

  renderItem() {
    if (this.props.items.length === 0) {
      return null;
    }
    return this.props.items.map((item, i) => (
      <ListItem
        key={i}
        onClick={this.handleClick.bind(this, item)}
      >
        <TextListItem text={item.label ? item.label : item.value} />
      </ListItem>
    ));
  }

  render() {
    const dropdownContent = this.props.children || (<List
      ref={c => this.itemsRef = c}
    >
      {this.renderItem()}
    </List>);

    return (
      <div>
        {this.renderItems(dropdownContent)}
      </div>
    );
  }
}
