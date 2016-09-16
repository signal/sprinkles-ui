/* eslint react/no-unused-prop-types: "off" */

import React from 'react';
import reactCSS from 'reactcss';
import Base from './Base';
import Text from './Text';

export default class BulletedList extends Base {
  static propTypes = {
    bulletStyle: React.PropTypes.oneOf([
      'disc',
      'circle',
      'square',
      'decimal',
      'decimal-leading-zero',
      'lower-roman',
      'upper-roman',
      'lower-greek',
      'lower-latin',
      'upper-latin',
      'armenian',
      'georgian',
      'lower-alpha',
      'upper-alpha',
      'none',
    ]),
    listItems: React.PropTypes.arrayOf(React.PropTypes.shape({
      children: React.PropTypes.node,
      text: React.PropTypes.string,
      styles: React.PropTypes.shape({
        color: React.PropTypes.string,
        fontSize: React.PropTypes.number,
        fontWeight: React.PropTypes.string,
        textDecoration: React.PropTypes.string,
      }),
    })),
  }

  static defaultProps = {
    bulletStyle: 'disc',
  };

  displayName = 'BulletedList';


  renderItem(item, i) {
    this.bulletedListItemRefs = [];
    this.textRefs = [];

    const clr = this.getColors();
    const defaultItemStyles = {
      color: clr.textColors.primary,
      fontSize: 1,
      fontWeight: 'normal',
      textDecoration: 'none',
    };

    const styles = item.styles ?
      Object.assign({}, defaultItemStyles, item.styles) : defaultItemStyles;

    return (
      <li
        key={`item-${i}`}
        ref={(c) => this.bulletedListItemRefs.push(c)}
      >
        { item.children }
        <Text
          color={styles.color}
          fontSize={styles.fontSize}
          fontWeight={styles.fontWeight}
          ref={(c) => this.textRefs.push(c)}
          textDecoration={styles.textDecoration}
        >{ item.text }</Text>
      </li>);
  }

  render() {
    const style = reactCSS({
      default: {
        BulletedList: {
          listStyle: this.props.bulletStyle,
        },
      },
    });
    return (
      <ul style={style.BulletedList}>
        {this.props.listItems.map((listItem, i) =>
          this.renderItem(listItem, i)
        )}
      </ul>
    );
  }
}
