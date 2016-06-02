import React from 'react';
import ReactCSS from 'reactcss';
import { Map } from 'immutable';
import Text from './Text';

export default class ListItemGroup extends ReactCSS.Component {
  displayName = 'ListItemGroup';

  static propTypes = {
    children: React.PropTypes.node,
    label: React.PropTypes.string,
  }

  static defaultProps = {
    label: 'Group',
  }

  classes() {
    return {
      default: {
        Label: {
          padding: 10,
        },
      },
    };
  }

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
    return (
      <div>
        <div
          style={this.styles().Label}
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