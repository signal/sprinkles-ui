import React from 'react';
import reactCSS from 'reactcss';
import color from 'color';
import PropTypes from 'prop-types';
import Text from './Text';
import Base from './Base';

export default class Alert extends Base {
  static propTypes = {
    children: PropTypes.node,
    details: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf(['success', 'info', 'warning', 'danger']).isRequired,
  };

  displayName = 'Alert';

  renderTitle(clr) {
    if (this.props.title) {
      return (
        <Text
          color={clr.textColors.light}
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

  renderDetails(clr) {
    if (this.props.details) {
      return (
        <span>
          {' '}
          <Text
            color={clr.textColors.light}
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
    const clr = this.getColors();
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
          backgroundColor: clr.noticeColors.success,
          border: `1px solid ${color(clr.noticeColors.success).darken(0.1).hexString()}`,
        },
      },
      info: {
        Alert: {
          backgroundColor: clr.noticeColors.info,
          border: `1px solid ${color(clr.noticeColors.info).darken(0.1).hexString()}`,
        },
      },
      warning: {
        Alert: {
          backgroundColor: clr.noticeColors.warning,
          border: `1px solid ${color(clr.noticeColors.warning).darken(0.1).hexString()}`,
        },
      },
      danger: {
        Alert: {
          backgroundColor: clr.noticeColors.danger,
          border: `1px solid ${color(clr.noticeColors.danger).darken(0.1).hexString()}`,
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
          {this.renderTitle(clr)}
          {this.renderDetails(clr)}
        </div>
        {this.renderChildren(style)}
      </div>
    );
  }
}
