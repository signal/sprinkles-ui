/* eslint jsx-a11y/no-static-element-interactions: "off" */

import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import Base from './Base';
import Text from './Text';

export default class TextListItem extends Base {
  static propTypes = {
    enabled: PropTypes.bool,
    hovered: PropTypes.bool,
    itemPadding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    listPosition: PropTypes.oneOf(['first', 'middle', 'last']),
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    showDividers: PropTypes.bool,
    text: PropTypes.string,
  }

  static defaultProps = {
    enabled: true,
    showDividers: true,
  };

  displayName = 'TextListItem';

  render() {
    const clr = this.getColors();
    const style = reactCSS({
      default: {
        Text: {
          padding: 10,
          background: clr.backgroundColors.primary,
          color: clr.textColors.primary,
        },
      },
      selected: {
        Text: {
          background: clr.noticeColors.info,
          color: clr.textColors.light,
        },
      },
      hovered: {
        Text: {
          background: clr.backgroundColors.accent,
          color: clr.textColors.accent,
          cursor: 'pointer',
        },
      },
      padding: {
        Text: {
          padding: this.props.itemPadding,
        },
      },
      first: {
        Text: {
          borderBottom: `1px solid ${clr.structuralColors.divider}`,
        },
      },
      middle: {
        Text: {
          borderBottom: `1px solid ${clr.structuralColors.divider}`,
        },
      },
      disabled: {
        Text: {
          color: clr.textColors.secondary,
          cursor: 'not-allowed',
          background: clr.backgroundColors.secondary,
        },
      },
    }, {
      hovered: !!this.props.hovered,
      padding: !!this.props.itemPadding,
      selected: !!this.props.selected,
      first: this.props.listPosition === 'first' && this.props.showDividers,
      middle: this.props.listPosition === 'middle' && this.props.showDividers,
      disabled: !this.props.enabled,
    });
    return (
      <div
        onClick={this.props.onClick}
        style={style.Text}
      >
        <Text
          fontSize={1}
        >
          {this.props.text}
        </Text>
      </div>
    );
  }
}
