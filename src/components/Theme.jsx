/* eslint class-methods-use-this: "off" */
/* eslint react/no-unused-prop-types: "off" */

import React from 'react';
import {
  BackgroundColors,
  ButtonColors,
  FormColors,
  IconColors,
  NoticeColors,
  StructuralColors,
  TextColors,
} from '../shared/colors';

export default class Theme extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    color: React.PropTypes.shape({
      backgroundColors: React.PropTypes.object,
      buttonColors: React.PropTypes.object,
      formColors: React.PropTypes.object,
      iconColors: React.PropTypes.object,
      noticeColors: React.PropTypes.object,
      structuralColors: React.PropTypes.object,
      textColors: React.PropTypes.object,
    }),
  }

  static childContextTypes = {
    color: React.PropTypes.object,
  };

  displayName = 'Theme';

  getChildContext() {
    return { color: this.mergeDeep({
      backgroundColors: BackgroundColors,
      buttonColors: ButtonColors,
      formColors: FormColors,
      iconColors: IconColors,
      noticeColors: NoticeColors,
      textColors: TextColors,
      structuralColors: StructuralColors,
    }, this.props.color) };
  }

  // See http://stackoverflow.com/questions/27936772/deep-object-merging-in-es6-es7
  isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
  }

  // See http://stackoverflow.com/questions/27936772/deep-object-merging-in-es6-es7
  mergeDeep(target, source) {
    const output = Object.assign({}, target);
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = this.mergeDeep(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }

  render() {
    return this.props.children;
  }
}
