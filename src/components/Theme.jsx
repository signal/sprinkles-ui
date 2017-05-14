/* eslint class-methods-use-this: "off" */
/* eslint react/no-unused-prop-types: "off" */

import React from 'react';
import PropTypes from 'prop-types';
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
    children: PropTypes.node.isRequired,
    color: PropTypes.shape({
      backgroundColors: PropTypes.object,
      buttonColors: PropTypes.object,
      formColors: PropTypes.object,
      iconColors: PropTypes.object,
      noticeColors: PropTypes.object,
      structuralColors: PropTypes.object,
      textColors: PropTypes.object,
    }),
  }

  static childContextTypes = {
    color: PropTypes.object,
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
