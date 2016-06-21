import React from 'react';

export default class Version extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    tag: React.PropTypes.string,
    tagSelector: React.PropTypes.string,
    version: React.PropTypes.string,
    versionSelector: React.PropTypes.string,
  };

  displayName = 'Version';

  constructor() {
    super();
    this.validateVersionSelectorRegex = RegExp(/^(?!=)[<>]??[=]??([\d.]+)$/);
    this.validateVersionRegex = RegExp(/^([\d.]+)$/);
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
