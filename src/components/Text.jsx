import React from 'react';
import reactCSS from 'reactcss';

export default class Text extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    color: React.PropTypes.string,
    fontSize: React.PropTypes.number,
    fontWeight: React.PropTypes.string,
    textDecoration: React.PropTypes.oneOf(['underline', 'overline', 'line-through', 'none']),
  };

  displayName = 'Text';

  render() {
    const style = reactCSS({
      default: {
        Text: {
          fontSize: '1rem',
        },
      },
      color: {
        Text: {
          color: this.props.color,
        },
      },
      fontSize: {
        Text: {
          fontSize: `${this.props.fontSize}rem`,
        },
      },
      fontWeight: {
        Text: {
          fontWeight: this.props.fontWeight,
        },
      },
      textDecoration: {
        Text: {
          textDecoration: this.props.textDecoration,
        },
      },
    }, {
      color: !!this.props.color,
      fontSize: !!this.props.fontSize,
      fontWeight: !!this.props.fontWeight,
      textDecoration: !!this.props.textDecoration,
    });
    return (
      <span style={style.Text}>
        {this.props.children}
      </span>
    );
  }
}
