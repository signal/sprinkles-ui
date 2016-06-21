import React from 'react';
import reactCSS from 'reactcss';
import Text from './Text';
import List from './List';
import ListItem from './ListItem';
import NavListItem from './NavListItem';
import VectorGraphic from './VectorGraphic';
import {
  BackgroundColors,
  TextColors,
} from '../shared/colors';
import color from 'color';

export default class PrimaryNav extends React.Component {
  static propTypes = {
    appIcon: React.PropTypes.node,
    appName: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    navItems: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        height: React.PropTypes.number,
        icon: React.PropTypes.node,
        label: React.PropTypes.string,
        key: React.PropTypes.string,
        width: React.PropTypes.number,
      })
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

  renderBranding(style) {
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
            color={TextColors.light}
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
          text={item.label}
          width={item.width}
        />
      </ListItem>
    );
  }

  renderExpandToggle(style) {
    return (
      <div
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
              stroke={TextColors.light}
              strokeWidth={'2'}
              strokeLinecap={'round'}
              strokeLinejoin={'round'}
              points={'10,14 2,20 10,26'}
            />
          </VectorGraphic>
        </div>
      </div>
    );
  }

  render() {
    const style = reactCSS({
      default: {
        PrimaryNav: {
          background: BackgroundColors.primaryNav,
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
          background: color(BackgroundColors.primaryNav).darken(0.5).hexString(),
        },
      },
    }, {
      expanded: this.props.expanded,
      hovered: this.state.hovered,
    });
    return (
      <div style={style.PrimaryNav}>
        {this.renderBranding(style)}
        {this.renderNavItems(style)}
        {this.renderExpandToggle(style)}
      </div>
    );
  }
}
