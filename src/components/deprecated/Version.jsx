/* eslint react/no-unused-prop-types: "off" */
/* eslint class-methods-use-this: "off" */

import React from 'react';
import PropTypes from 'prop-types';

export default class Version extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    tag: PropTypes.string,
    tagSelector: PropTypes.string,
    version: PropTypes.string,
    versionSelector: PropTypes.string,
  };

  displayName = 'Version';

  constructor() {
    super();
    this.validateVersionSelectorRegex = RegExp(/^(?!=)[<>]??[=]??([\d.]+)$/);
    this.validateVersionRegex = RegExp(/^([\d.]+)$/);
  }

  versionComparitor(versionA, versionB) {
    const vASplit = versionA.split('.').map((item) => parseInt(item, 10));
    const vBSplit = versionB.split('.').map((item) => parseInt(item, 10));
    const longer = vASplit.length > vBSplit.length ? vASplit : vBSplit;
    const shorter = longer === vASplit ? vBSplit : vASplit;
    return longer.reduce((p, longVal, i) => {
      if (p !== 0) {
        return p;
      }
      const shortVal = shorter.length > i ? shorter[i] : 0;
      if (longVal === shortVal) {
        return 0;
      } else if (longVal > shortVal) {
        return vASplit === longer ? 1 : -1;
      }
      return vASplit === longer ? -1 : 1;
    }, 0);
  }

  matchingTag(props) {
    return !!props.tag && props.tag === props.tagSelector;
  }

  validVersionSelector(version) {
    const matches = this.validateVersionSelectorRegex.exec(version);
    if (!matches) {
      return false;
    }
    return matches[1].split('.').find((item) => item === '') === undefined;
  }

  validVersion(version) {
    const matches = this.validateVersionRegex.exec(version);
    if (!matches) {
      return false;
    }
    return matches[1].split('.').find((item) => item === '') === undefined;
  }

  matchingVersion(props) {
    if (!this.validVersion(props.version) || !this.validVersionSelector(props.versionSelector)) {
      return false;
    }
    const version = this.validateVersionSelectorRegex.exec(props.version)[1];
    const selectorVersion = this.validateVersionSelectorRegex.exec(props.versionSelector)[1];
    const validComps = [];
    if (props.versionSelector.indexOf('>') >= 0) {
      validComps.push(1);
    }
    if (props.versionSelector.indexOf('<') >= 0) {
      validComps.push(-1);
    }
    if (props.versionSelector.indexOf('=') >= 0 || validComps.length === 0) {
      validComps.push(0);
    }
    return validComps.indexOf(this.versionComparitor(version, selectorVersion)) >= 0;
  }

  showVersion() {
    return this.matchingTag(this.props) || this.matchingVersion(this.props);
  }

  render() {
    if (this.showVersion()) {
      return (
        <span>{this.props.children}</span>
      );
    }
    return null;
  }
}
