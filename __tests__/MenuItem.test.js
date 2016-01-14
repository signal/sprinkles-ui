jest.dontMock('../src/components/MenuItem.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const MenuItem = require("../src/components/MenuItem.jsx").default;


describe('MenuItem', () => {

  it('Renders a MenuItem', () => {

    const text = "howdy";

    // Render a MenuItem with no style
    const menuItem = TestUtils.renderIntoDocument(
      <MenuItem text={ text } />
    );

    const menuItemNode = ReactDOM.findDOMNode(menuItem);

    // Verify that it's rendered with the right text
    expect(menuItemNode.textContent).toEqual(text);

  });

});
