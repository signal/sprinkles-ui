/* eslint react/no-unused-prop-types: "off" */

import color from 'color';
import React from 'react';
import reactCSS from 'reactcss';
import Base from './Base';
import Text from './Text';
import List from './List';
import ListItem from './ListItem';
import NavListItem from './NavListItem';
import VectorGraphic from './VectorGraphic';
import { Resets } from '../shared/styles';

export default class PrimaryNav extends Base {
  static propTypes = {
    appIcon: React.PropTypes.node,
    appName: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    navItems: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        height: React.PropTypes.number,
        icon: React.PropTypes.node,
        key: React.PropTypes.string,
        label: React.PropTypes.string,
        linkStyle: React.PropTypes.shape({
          color: React.PropTypes.string,
          fontSize: React.PropTypes.number,
          fontWeight: React.PropTypes.string,
          textDecoration: React.PropTypes.oneOf(['underline', 'overline', 'line-through', 'none']),
        }),
        urlPath: React.PropTypes.string,
        width: React.PropTypes.number,
      }).isRequired
    ),
    onNavItemClick: React.PropTypes.func,
    onRequestExpandToggle: React.PropTypes.func,
    selectedNavItem: React.PropTypes.string,
    showSectionBorders: React.PropTypes.bool,
  };

  static defaultProps = {
    expanded: true,
    navItems: [],
    onNavItemClick: () => {},
  };

  displayName = 'PrimaryNav';

  constructor() {
    super();
    this.state = {
      hovered: false,
    };
  }

  handleMouseOver() {
    this.setState({
      hovered: true,
    });
  }

  handleMouseOut() {
    this.setState({
      hovered: false,
    });
  }

  handleNavItemClick(item) {
    this.props.onNavItemClick(item);
  }

  renderBranding(clr, style) {
    return (
      <div style={style.Branding}>
        <div
          ref={c => this.appIconRef = c}
        >
          {this.props.appIcon}
        </div>
        <div
          style={style.AppName}
        >
          <Text
            fontSize={1.2}
            ref={c => this.appNameRef = c}
            color={clr.textColors.light}
          >
            {this.props.appName}
          </Text>
        </div>
      </div>
    );
  }

  renderNavItems(style) {
    return (
      <div
        style={style.NavItems}
      >
        <List
          ref={c => this.listItemRef = c}
          showBorder={false}
        >
          {this.renderNavItem()}
        </List>
      </div>
    );
  }

  renderNavItem() {
    return this.props.navItems.map((item, i) =>
      <ListItem
        key={i}
        onClick={this.handleNavItemClick.bind(this, item.key)}
        selected={this.props.selectedNavItem === item.key}
      >
        <NavListItem
          expanded={this.props.expanded}
          height={item.height}
          icon={item.icon}
          key={i}
          linkStyle={item.linkStyle}
          text={item.label}
          urlPath={item.urlPath}
          width={item.width}
        />
      </ListItem>
    );
  }

  renderExpandToggle(clr, style) {
    return (
      <button
        onClick={this.props.onRequestExpandToggle}
        ref={c => this.expandToggleRef = c}
        style={style.ExpandToggleWrapper}
        onMouseOut={this.handleMouseOut.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
      >
        <div
          style={style.ExpandToggle}
        >
          <VectorGraphic height={40} width={14}>
            <polyline
              fill={'none'}
              stroke={clr.textColors.light}
              strokeWidth={'2'}
              strokeLinecap={'round'}
              strokeLinejoin={'round'}
              points={'10,14 2,20 10,26'}
            />
          </VectorGraphic>
        </div>
      </button>
    );
  }

  render() {
    const clr = this.getColors();
    const style = reactCSS({
      default: {
        PrimaryNav: {
          background: clr.backgroundColors.primaryNav,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          height: '100%',
          width: '100%',
        },
        Branding: {
          display: 'flex',
          alignItems: 'center',
        },
        AppName: {
          marginLeft: 10,
        },
        NavItems: {
          flexGrow: 1,
        },
        ExpandToggleWrapper: {
          cursor: 'pointer',
        },
        ExpandToggle: {
          textAlign: 'center',
          transform: 'rotate(180deg)',
          transition: 'transform 0.2s ease',
        },
      },
      expanded: {
        ExpandToggle: {
          transform: 'rotate(360deg)',
        },
      },
      hovered: {
        ExpandToggleWrapper: {
          background: color(clr.backgroundColors.primaryNav).darken(0.5).hexString(),
        },
      },
    }, {
      expanded: this.props.expanded,
      hovered: this.state.hovered,
    });
    style.ExpandToggleWrapper = Object.assign({}, Resets.Button, style.ExpandToggleWrapper);
    return (
      <div style={style.PrimaryNav}>
        {this.renderBranding(clr, style)}
        {this.renderNavItems(style)}
        {this.renderExpandToggle(clr, style)}
      </div>
    );
  }
}
