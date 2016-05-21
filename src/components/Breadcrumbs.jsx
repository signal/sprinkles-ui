import React from 'react';
import ReactCSS from 'reactcss';
import Text from './Text';
import { TextColors } from '../shared/colors';
import { Map } from 'immutable';

export default class Breadcrumbs extends ReactCSS.Component {
  displayName = 'Breadcrumbs';
  static propTypes = {
    path: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        display: React.PropTypes.string,
        url: React.PropTypes.string,
      }),
    ),
    onClick: React.PropTypes.func,
  };

  static defaultProps = {
    path: [],
    onClick: () => {},
  };

  constructor() {
    super();
    this.state = {
      isHovered: undefined,
    };
  }

  classes() {
    return {
      default: {
        Crumb: {
          cursor: 'default',
        },
        ClickableCrumb: {
          cursor: 'pointer',
        },
      },
    };
  }

  handleMouseOver(i) {
    this.setState({
      isHovered: i,
    });
  }

  handleMouseOut() {
    this.setState({
      isHovered: undefined,
    });
  }

  handleClick(itemData) {
    this.props.onClick(itemData);
  }

  renderPath() {
    this.pathRefs = new Map();
    return this.props.path.map((item, i) => {
      const isLast = i === this.props.path.length - 1;
      const divider = !isLast ? (
        <Text
          color={TextColors.primary}
          fontSize={1.5}
        >
          {' / '}
        </Text>
      ) : undefined;
      const textDecoration = i === this.state.isHovered && !isLast ? 'underline' : undefined;
      return (
        <span
          key={i}
          onClick={!isLast ? this.handleClick.bind(this, item) : undefined}
          onMouseOver={this.handleMouseOver.bind(this, i)}
          onMouseOut={this.handleMouseOut.bind(this)}
          ref={c => {
            this.pathRefs = this.pathRefs.set(i, c);
          }}
          style={!isLast ? this.styles().ClickableCrumb : this.styles().Crumb}
        >
          <Text
            color={TextColors.primary}
            textDecoration={textDecoration}
            fontSize={1.5}
          >
            {item.display}
          </Text>
          <span>{divider}</span>
        </span>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderPath()}
      </div>
    );
  }
}
