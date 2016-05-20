import React from "react";
import ReactCSS from "reactcss";
import Text from "./Text";
import List from "./List";
import ListItem from "./ListItem";
import NavListItem from "./NavListItem";
import VectorGraphic from "./VectorGraphic";
import {
  BackgroundColors,
  TextColors,
} from "../shared/colors";
import color from "color";

export default class PrimaryNav extends ReactCSS.Component {
  displayName = "PrimaryNav";

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

  constructor() {
    super();
    this.state = {
      hovered: false,
    };
  }

  classes() {
    return {
      default: {
        PrimaryNav: {
          background: BackgroundColors.primaryNav,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          height: "100%",
          width: "100%",
        },
        Branding: {
          display: "flex",
          alignItems: "center",
        },
        AppName: {
          marginLeft: 10,
        },
        NavItems: {
          flexGrow: 1,
        },
        ExpandToggleWrapper: {
          cursor: "pointer",
        },
        ExpandToggle: {
          textAlign: "center",
          transform: "rotate(180deg)",
          transition: "transform 0.2s ease",
        },
      },
      expanded: {
        ExpandToggle: {
          transform: "rotate(360deg)",
        },
      },
      hovered: {
        ExpandToggleWrapper: {
          background: color(BackgroundColors.primaryNav).darken(0.5).hexString(),
        },
      },
    };
  }

  styles() {
    return this.css({
      expanded: this.props.expanded,
      hovered: this.state.hovered,
    });
  }

  handleNavItemClick(item) {
    this.props.onNavItemClick(item);
  }

  renderBranding() {
    return (
      <div style={this.styles().Branding}>
        <div
          ref={c => this.appIconRef = c}
        >
          {this.props.appIcon}
        </div>
        <div
          style={this.styles().AppName}
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

  renderNavItems() {
    return (
      <div
        style={this.styles().NavItems}
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
    return this.props.navItems.map((item, i) => (
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
      )
    );
  }

  renderExpandToggle() {
    return (
      <div
        onClick={this.props.onRequestExpandToggle}
        ref={c => this.expandToggleRef = c}
        style={this.styles().ExpandToggleWrapper}
        onMouseOut={this.handleMouseOut.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
      >
        <div
          style={this.styles().ExpandToggle}
        >
          <VectorGraphic height={40} width={14}>
            <polyline
              fill="none"
              stroke={TextColors.light}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="10,14 2,20 10,26"
            />
          </VectorGraphic>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div style={this.styles().PrimaryNav}>
        {this.renderBranding()}
        {this.renderNavItems()}
        {this.renderExpandToggle()}
      </div>
    );
  }
}
