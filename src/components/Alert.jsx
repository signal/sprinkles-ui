import React from 'react';
import reactCSS from 'reactcss';
import color from 'color';
import { Colors, TextColors } from '../shared/colors';
import Text from './Text';

export default class Alert extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    details: React.PropTypes.string,
    title: React.PropTypes.string,
    type: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']).isRequired,
  };

  displayName = 'Alert';

  renderTitle() {
    if (this.props.title) {
      return (
        <Text
          color={TextColors.light}
          fontSize={1}
          fontWeight={'bold'}
          ref={c => this.titleRef = c}
        >
          {this.props.title}
        </Text>
      );
    }
    return null;
  }

  renderDetails() {
    if (this.props.details) {
      return (
        <span>
          {' '}
          <Text
            color={TextColors.light}
            fontSize={1}
            ref={c => this.detailsRef = c}
          >
            {this.props.details}
          </Text>
        </span>
      );
    }
    return null;
  }

  renderChildren(style) {
    if (this.props.children) {
      return (
        <div style={style.AlertItem}>
          {this.props.children}
        </div>
      );
    }
    return null;
  }

  render() {
    const style = reactCSS({
      default: {
        Alert: {
          padding: '10px 10px 0 10px',
        },
        AlertItem: {
          paddingBottom: '10px',
        },
      },
      success: {
        Alert: {
          backgroundColor: Colors.success,
          border: `1px solid ${color(Colors.success).darken(0.1).hexString()}`,
        },
      },
      info: {
        Alert: {
          backgroundColor: Colors.info,
          border: `1px solid ${color(Colors.info).darken(0.1).hexString()}`,
        },
      },
      warning: {
        Alert: {
          backgroundColor: Colors.warning,
          border: `1px solid ${color(Colors.warning).darken(0.1).hexString()}`,
        },
      },
      danger: {
        Alert: {
          backgroundColor: Colors.danger,
          border: `1px solid ${color(Colors.danger).darken(0.1).hexString()}`,
        },
      },
    }, {
      success: this.props.type === 'success',
      info: this.props.type === 'info',
      warning: this.props.type === 'warning',
      danger: this.props.type === 'danger',
    });

    return (
      <div style={style.Alert}>
        <div style={style.AlertItem}>
          {this.renderTitle()}
          {this.renderDetails()}
        </div>
        {this.renderChildren(style)}
      </div>
    );
  }
}
