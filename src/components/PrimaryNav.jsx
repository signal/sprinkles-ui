import React from "react";
import ReactCSS from "reactcss";
import Text from "./Text";
import List from "./List";
import ListItem from "./ListItem";
import TextListItem from "./TextListItem";
import VectorGraphic from "./VectorGraphic";
import {
  BackgroundColors,
  TextColors,
} from "../shared/colors";

export default class PrimaryNav extends ReactCSS.Component {
  displayName = "PrimaryNav";

  static propTypes = {
    appIcon: React.PropTypes.node,
    appName: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    navItems: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        icon: React.PropTypes.node,
        label: React.PropTypes.string,
        key: React.PropTypes.string,
      })
    ),
    onNavItemClick: React.PropTypes.func,
    onRequestExpandToggle: React.PropTypes.func,
    showSectionBorders: React.PropTypes.bool,
  }

  static defaultProps = {
    expanded: true,
    navItems: [],
    onNavItemClick: () => {},
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
        ExpandToggle: {
          textAlign: "center",
          transform: "rotate(180deg)",
          transition: "transform 0.2s ease",
        },
      },
      expanded: {
        ExpandToggle: {
          transform: "rotate(0deg)",
        },
      },
    };
  }

  styles() {
    return this.css({
      expanded: this.props.expanded,
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
        >
          {this.renderNavItem()}
        </List>
      </div>
    );
  }

  renderNavItem() {
    return this.props.navItems.map((item, i) => (
        <ListItem
          onClick={this.handleNavItemClick.bind(this, item.key)}
          key={i}
        >
          <TextListItem text={item.label} />
        </ListItem>
      )
    );
  }

  renderExpandToggle() {
    return (
      <div
        onClick={this.props.onRequestExpandToggle}
        ref={c => this.expandToggleRef = c}
        style={this.styles().ExpandToggle}
      >
        <VectorGraphic height={30} width={14}>
          <polyline
            fill="none"
            stroke={TextColors.light}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="10,9 2,15 10,21"
          />
        </VectorGraphic>
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
