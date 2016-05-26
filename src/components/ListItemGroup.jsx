import React from 'react';
import ReactCSS from 'reactcss';
import Text from './Text';

export default class ListItemGroup extends ReactCSS.Component {
  displayName = 'ListItemGroup';

  static propTypes = {
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

  render() {
    return (
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
    );
  }
}
