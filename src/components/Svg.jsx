import React from "react";
import ReactCSS from "reactcss";

export default class Svg extends ReactCSS.Component {
  displayName = "Svg";

  static propTypes = {
    fill: React.PropTypes.string,
    height: React.PropTypes.number,
    padding: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    width: React.PropTypes.number
  };

  static defaultProps = {
    fill: "#000",
    height: 10,
    padding: "10px",
    width: 10
  };

  classes () {
    return {
      "default": {
        Svg: {
          padding: this.props.padding
        }
      }
    }
  }

  getSVGType (type) {
    switch (type) {
      case "square":
        return (<svg
            height={this.props.height}
            style={this.styles().Svg}
            version="1.1"
            viewBox={"0 0 " + this.props.height + " " + this.props.width}
            width={this.props.width}
            xmlns="http://www.w3.org/2000/svg"
                >
            <g
                fill="none"
                fill-rule="evenodd"
                stroke="none"
                strokeWidth="1"
            >
                <rect
                    fill={this.props.fill}
                    height={this.props.height}
                    width={this.props.width}
                    x="0"
                    y="0"
                ></rect>
            </g>
        </svg>);
    }
  }

  render () {
    return this.getSVGType(this.props.type);

  }

}
