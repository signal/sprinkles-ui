/* eslint func-names: "off" */

import React from 'react';
import Version from '../../src/components/Version';


describe('Version', function () {
  this.header(`
  ## Version
  `); // Markdown.

  before(() => {
    const versionSelector = '<=0.10.1';
    const tagSelector = 'has burrito';
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.component(
      <Version
        tag={'has burrito'}
        tagSelector={tagSelector}
        version={'0.9.0'}
        versionSelector={versionSelector}
      >
        <div>
          <div>
            {`My Version Selector Is ${versionSelector}`}
          </div>
          <div>
            {`My Tag Selector Is ${tagSelector}`}
          </div>
          <div>
            {'I get rendered when the version is less than or equal to 0.10.1'}
          </div>
          <div>
            {'I also get rendered when the tag=\'has burrito\''}
          </div>
        </div>
      </Version>
    ).width('100%');
  });

  it('Sets version to 0.11.0', () => this.props({ version: '0.11.0' }));
  it('Sets version to 0.9.0', () => this.props({ version: '0.9.0' }));
  it('Sets version to 0.10.1', () => this.props({ version: '0.10.1' }));
  it('Sets tag to \'no burrito\'', () => this.props({ tag: 'no burrito' }));
  it('Sets tag to \'has burrito\'', () => this.props({ tag: 'has burrito' }));


  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Version

  A Version Element

  #### API

  - **children** *React.PropTypes.node* (optional) the children to show/or hide
  - **tag** *React.PropTypes.string* (optional) the tag to test against the tagSelector prop
  - **tagSelector** *React.PropTypes.string* (optional) when tag === tagSelector then the component is shown
  - **version** *React.PropTypes.string* (optional) the version to test against the versionSelector prop
  - **versionSelector** *React.PropTypes.string* (optional) version selector with basic DSL to define show/hide conditions
    - versionSelector: '0.11.0' the children will be shown with an exact version match
    - versionSelector: '>0.11.0' the children will be shown when the version is greater than the versionSelector
    - versionSelector: '<0.11.0' the children will be shown when the version is less than the versionSelector
    - versionSelector: '>=0.11.0' the children will be shown when the version is greater than or equal to the versionSelector
    - versionSelector: '<=0.11.0' the children will be shown when the version is less than or equal to the versionSelector

  `);
});
