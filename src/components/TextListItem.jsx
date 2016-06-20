import React from 'react';
import reactCSS from 'reactcss';
import Text from './Text';
import {
  Colors,
  BackgroundColors,
  TextColors,
  StructuralColors,
 } from '../shared/colors';

export default class TextListItem extends React.Component {
  static propTypes = {
    enabled: React.PropTypes.bool,
    hovered: React.PropTypes.bool,
    listPosition: React.PropTypes.oneOf(['first', 'middle', 'last']),
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool,
    text: React.PropTypes.string,
  }

  static defaultProps = {
    enabled: true,
  };

  displayName = 'TextListItem';

  render() {
    const style = reactCSS({
      default: {
        Text: {
          padding: 10,
          background: BackgroundColors.primary,
          color: TextColors.primary,
        },
      },
      selected: {
        Text: {
          background: Colors.info,
          color: TextColors.light,
        },
      },
      hovered: {
        Text: {
          background: BackgroundColors.accent,
          color: TextColors.accent,
          cursor: 'pointer',
        },
      },
      first: {
        Text: {
          borderBottom: `1px solid ${StructuralColors.divider}`,
        },
      },
      middle: {
        Text: {
          borderBottom: `1px solid ${StructuralColors.divider}`,
        },
      },
      disabled: {
        Text: {
          color: TextColors.secondary,
          cursor: 'not-allowed',
          background: BackgroundColors.secondary,
        },
      },
    }, {
      hovered: !!this.props.hovered,
      selected: !!this.props.selected,
      first: this.props.listPosition === 'first',
      middle: this.props.listPosition === 'middle',
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
