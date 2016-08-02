import React from 'react';
import reactCSS from 'reactcss';
import { Map } from 'immutable';
import Text from './Text';
import { TextColors } from '../shared/colors';


export default class Breadcrumbs extends React.Component {
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

  displayName = 'Breadcrumbs';

  constructor() {
    super();
    this.state = {
      isHovered: undefined,
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

  renderPath(style) {
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
          style={!isLast ? style.ClickableCrumb : style.Crumb}
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
    const style = reactCSS({
      default: {
        Crumb: {
          cursor: 'default',
        },
        ClickableCrumb: {
          cursor: 'pointer',
        },
      },
    });
    return (
      <div>
        {this.renderPath(style)}
      </div>
    );
  }
}
