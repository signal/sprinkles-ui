import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Breadcrumbs from '../../src/components/deprecated/Breadcrumbs';

describe('Breadcrumbs', () => {
  it('Does render a Breadcrumbs Component', () => {
    const breadcrumbsComponent = ReactTestUtils.renderIntoDocument(
      <Breadcrumbs />,
    );
    expect(breadcrumbsComponent).toBeDefined();
  });

  it('Does render a path', () => {
    const path = [
      {
        display: 'Level 1',
        url: '/lvl-1',
      },
      {
        display: 'Level 2',
        url: '/lvl-1/lvl-2',
      },
      {
        display: 'Level 3',
        url: '/lvl-1/lvl-2/lvl-3',
      },
    ];
    const breadcrumbsComponent = ReactTestUtils.renderIntoDocument(
      <Breadcrumbs path={path} />,
    );
    const breadcrumbsNode = ReactDOM.findDOMNode(breadcrumbsComponent);
    expect(breadcrumbsNode.textContent).toBe('Level 1 / Level 2 / Level 3');
  });

  it('Does trigger a click event when a non-leaf path is clicked', () => {
    const mockHandleClick = jest.fn();
    const path = [
      {
        display: 'Level 1',
        url: '/lvl-1',
      },
      {
        display: 'Level 2',
        url: '/lvl-1/lvl-2',
      },
      {
        display: 'Level 3',
        url: '/lvl-1/lvl-2/lvl-3',
      },
    ];
    const breadcrumbsComponent = ReactTestUtils.renderIntoDocument(
      <Breadcrumbs
        onClick={mockHandleClick}
        path={path}
      />,
    );
    const lvl1Node = ReactDOM.findDOMNode(breadcrumbsComponent.pathRefs.get(0));
    ReactTestUtils.Simulate.click(lvl1Node);
    expect(mockHandleClick).toBeCalledWith(path[0]);
  });

  it('does underline crumbs when hovered', () => {
    const path = [
      {
        display: 'Level 1',
        url: '/lvl-1',
      },
      {
        display: 'Level 2',
        url: '/lvl-1/lvl-2',
      },
      {
        display: 'Level 3',
        url: '/lvl-1/lvl-2/lvl-3',
      },
    ];
    const breadcrumbsComponent = ReactTestUtils.renderIntoDocument(
      <Breadcrumbs
        path={path}
      />,
    );
    const lvl1Node = ReactDOM.findDOMNode(breadcrumbsComponent.pathRefs.get(0));
    ReactTestUtils.Simulate.mouseOver(lvl1Node);
    expect(lvl1Node.children[0].style.textDecoration).toBe('underline');
    ReactTestUtils.Simulate.mouseOut(lvl1Node);
    expect(lvl1Node.style.textDecoration).toBe('');
  });

  it('does not trigger a click event on leaf node', () => {
    const mockHandleClick = jest.fn();
    const path = [
      {
        display: 'Level 1',
        url: '/lvl-1',
      },
      {
        display: 'Level 2',
        url: '/lvl-1/lvl-2',
      },
      {
        display: 'Level 3',
        url: '/lvl-1/lvl-2/lvl-3',
      },
    ];
    const breadcrumbsComponent = ReactTestUtils.renderIntoDocument(
      <Breadcrumbs
        onClick={mockHandleClick}
        path={path}
      />,
    );
    const leafNode = ReactDOM.findDOMNode(breadcrumbsComponent.pathRefs.get(2));
    ReactTestUtils.Simulate.click(leafNode);
    expect(mockHandleClick).not.toBeCalled();
  });
});
