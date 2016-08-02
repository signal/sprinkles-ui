import React from 'react';
import { Map } from 'immutable';

export default class ButtonGroup extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    onClick: React.PropTypes.func,
    selectedButton: React.PropTypes.string,
    type: React.PropTypes.oneOf([
      'secondary',
      'primary',
      'success',
      'info',
      'warning',
      'danger',
    ]),
  };

  static defaultProps = {
    onClick: () => {},
  };

  displayName = 'ButtonGroup';

  handleClick(buttonKey) {
    this.props.onClick(buttonKey);
  }

  renderButtons() {
    this.buttonRefs = new Map();
    return React.Children.map(this.props.children, (child, i) => {
      if (child) {
        if (!child.props.buttonKey) {
          throw new Error('Button missing buttonKey prop');
        }
        let groupPosition;
        const numChildren = this.props.children.length;
        if (numChildren > 1) {
          switch (i) {
            case 0:
              groupPosition = 'left';
              break;
            case numChildren - 1:
              groupPosition = 'right';
              break;
            default:
              groupPosition = 'center';
              break;
          }
        }
        let type;
        if (this.props.selectedButton && this.props.selectedButton === child.props.buttonKey) {
          type = this.props.type ? this.props.type : 'primary';
        } else {
          type = this.props.type && !this.props.selectedButton ? this.props.type : 'secondary';
        }
        return React.cloneElement(child, {
          groupPosition,
          onClick: this.handleClick.bind(this, child.props.buttonKey),
          ref: (buttonRef) => {
            if (buttonRef) {
              if (this.buttonRefs.get(child.props.buttonKey)) {
                throw new Error(`buttonKey prop '${child.props.buttonKey}' is not unique`);
              }
              this.buttonRefs = this.buttonRefs.set(child.props.buttonKey, buttonRef);
            }
          },
          type,
        });
      }
      return undefined;
    });
  }

  render() {
    return (
      <span>
        {this.renderButtons()}
      </span>
    );
  }
}
