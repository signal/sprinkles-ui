import React from 'react';
import Base from './Base';
import Dropdown from './Dropdown';
import Panel from './Panel';
import List from './List';
import ListDivider from './ListDivider';

export default class Menu extends Base {

  static propTypes = {
    children: React.PropTypes.node,
    triggerEl: React.PropTypes.node,
  };

  static defaultProps = {
    onClick: () => {},
  }

  displayName = 'Menu';

  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleClick(item) {
    this.setState({ open: false });
    this.props.onClick(item);
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  handleRequestOpen() {
    this.setState({ open: true });
  }

  renderChildren() {
    return React.Children.map(this.props.children, (topContainerDiv) =>
      React.Children.map(topContainerDiv.props.children, (child, i) =>
        <div>
          <List
            anchorOrigin={'bottom'}
            itemPadding={'5px 20px 5px 20px'}
            showDividers={false}
            showBorder={false}
          >
            {this.renderListGroupItems(child.props.children)}
          </List>
          { i < (topContainerDiv.props.children.length - 1) ? <ListDivider /> : '' }
        </div>
      )
    );
  }

  renderListGroupItems(listGroups) {
    return React.Children.map(listGroups, (listItem) => React.cloneElement(listItem, {
      onClick: this.handleClick.bind(this, listItem.props.children.props),
    }));
  }

  render() {
    const clr = this.getColors();
    const children = this.renderChildren();

    return (
      <Dropdown
        onRequestClose={this.handleRequestClose.bind(this)}
        onRequestOpen={this.handleRequestOpen.bind(this)}
        open={this.state.open}
        triggerEl={this.props.triggerEl}
        useLayerForClickAway={true}
      >
        <Panel
          borderRadius={2}
          borderColor={clr.structuralColors.divider}
          boxShadowStrength={1}
          padding={'5px 0'}
          width={300}
        >
          { children}
        </Panel>
      </Dropdown>
    );
  }

}
