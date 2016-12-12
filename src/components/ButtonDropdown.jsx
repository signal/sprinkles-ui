import React from 'react';
import reactCSS from 'reactcss';
import Button from './Button';

export default class ButtonDropdown extends Button {
  displayName = 'ButtonDropdown';

  static propTypes = {
    arrowSize: React.PropTypes.number,
  };

  static defaultProps = {
    arrowSize: 4,
    enabled: true,
    working: false,
    text: 'Submit',
    type: 'secondary',
  };

  renderChildren() {
    const clr = this.getColors();
    const style = reactCSS({
      default: {
        Arrow: {
          borderLeft: `${this.props.arrowSize}px solid transparent`,
          borderRight: `${this.props.arrowSize}px solid transparent`,
          borderTop: `${this.props.arrowSize}px dashed`,
          color: clr.textColors.light,
          display: 'inline-block',
          marginLeft: 10,
          verticalAlign: 'middle',
          height: 0,
          width: 0,
        },
      },
    });
    const content = this.props.children || this.props.text;

    return (
      <span>
        <span ref={c => this.buttonDropdownContentRef = c}>{content}</span>
        <span ref={c => this.buttonDropdownArrowRef = c} style={style.Arrow} />
      </span>
    );
  }
}
