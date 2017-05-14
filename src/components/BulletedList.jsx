/* eslint react/no-unused-prop-types: "off" */

import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import Base from './Base';
import Text from './Text';

export default class BulletedList extends Base {
  static propTypes = {
    bulletStyle: PropTypes.oneOf([
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
    listItems: PropTypes.arrayOf(PropTypes.shape({
      children: PropTypes.node,
      text: PropTypes.string,
      styles: PropTypes.shape({
        color: PropTypes.string,
        fontSize: PropTypes.number,
        fontWeight: PropTypes.string,
        textDecoration: PropTypes.string,
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
          this.renderItem(listItem, i),
        )}
      </ul>
    );
  }
}
