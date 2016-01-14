jest.dontMock("../src/components/MenuItem");

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const MenuItem = require("../src/components/MenuItem");

describe('MenuItem', () => {

  it('Renders a MenuItem', () => {

    let text = "howdy";
    // Render a MenuItem with no style
    let menuItem = TestUtils.renderIntoDocument(
      <MenuItem text={ text } />
    );

    let menuItemNode = ReactDOM.findDOMNode(menuItem);

    // Verify that it's rendered with text
    expect(checkboxNode.textContent).toEqual(text);

  });

});
