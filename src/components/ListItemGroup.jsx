import React from 'react';
import reactCSS from 'reactcss';
import { Map } from 'immutable';
import Text from './Text';

export default class ListItemGroup extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    label: React.PropTypes.string,
  }

  static defaultProps = {
    label: 'Group',
  }

  displayName = 'ListItemGroup';

  renderChildren() {
    this.listItemRefs = new Map();
    return React.Children.map(this.props.children, (child, i) => {
      if (child) {
        const lenChildren = this.props.children.length;
        let listPosition;
        if (lenChildren > 0) {
          switch (i) {
            case 0:
              listPosition = 'first';
              break;
            case lenChildren - 1:
              listPosition = 'last';
              break;
            default:
              listPosition = 'middle';
              break;
          }
        }
        return React.cloneElement(child, {
          listPosition,
          ref: (childComponent) => {
            this.listItemRefs = this.listItemRefs.set(i, childComponent);
          },
        });
      }
      return null;
    });
  }

  render() {
    const style = reactCSS({
      default: {
        Label: {
          padding: 10,
        },
      },
    });
    return (
      <div>
        <div
          style={style.Label}
        >
          <Text
            ref={(child) => this.labelRef = child}
            fontSize={1}
            fontWeight={'bold'}
          >
            {this.props.label}
          </Text>
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}
