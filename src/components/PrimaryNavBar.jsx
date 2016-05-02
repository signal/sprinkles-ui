import React from "react";
import ReactCSS from "reactcss";
import color from "color";
import {
  BackgroundColors,
  // TextColors,
} from "../shared/colors";

export default class PrimaryNavBar extends ReactCSS.Component {
  displayName = "PrimaryNavBar";

  static propTypes = {
    appIcon: React.PropTypes.node,
    bottomNavItems: React.PropTypes.node,
    centerNavItems: React.PropTypes.node,
    isExpanded: React.PropTypes.bool,
    showSectionBorders: React.PropTypes.bool,
  }

  static defaultProps = {
    expanded: false,
  }

  classes() {
    const darkenedBackground = color(BackgroundColors.primaryNavBar)
        .darken(0.3).hexString();
    return {
      default: {
        PrimaryNavBar: {
          background: BackgroundColors.primaryNavBar,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flexStart",
          height: "300px",
          width: "100%",
        },
        AppIcon: {
          alignSelf: "center",
        },
        CenterNavItems: {
          flexGrow: 1,
        },
        BottomNavItems: {
        },
        ExpansionToggle: {
          alignSelf: "center",
          textAlign: "center",
          width: "100%",
        },
      },
      sectionBorders: {
        AppIcon: {
          borderBottom: `1px solid ${darkenedBackground}`,
        },
        CenterNavItems: {
          borderBottom: `1px solid ${darkenedBackground}`,
        },
      },
    };
  }

  styles() {
    return this.css({
      sectionBorders: this.props.showSectionBorders,
    });
  }

  render() {
    return (
      <div style={this.styles().PrimaryNavBar}>
        <div
          style={this.styles().AppIcon}
        >
          {this.props.appIcon}
        </div>
        <div
          style={this.styles().CenterNavItems}
        >
          {this.props.centerNavItems}
        </div>
        <div
          style={this.styles().BottomNavItems}
        >
          {this.props.bottomNavItems}
        </div>
        <div
          style={this.styles().ExpansionToggle}
        >
          {this.props.expansionToggle}
        </div>
      </div>
    );
  }

}
