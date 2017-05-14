import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import BulletedList from '../src/components/BulletedList';

describe('Bulleted List', () => {
  let bulletedListComponent;
  let bulletedListNode;
  let li;
  let listItemTextNode;

  const renderBulletedList = (props) => {
    bulletedListComponent = ReactTestUtils.renderIntoDocument(
      <BulletedList
        {...props}
      />,
    );
    bulletedListNode = ReactDOM.findDOMNode(bulletedListComponent);
    li = (index) => bulletedListNode.getElementsByTagName('li')[index];
    listItemTextNode = (index) => ReactDOM.findDOMNode(bulletedListComponent.textRefs[index]);
  };

  beforeEach(() => {
    renderBulletedList({
      listItems: [{
        text: 'Hiya',
      }],
    });
  });

  it('Does render a bulleted list with text', () => {
    renderBulletedList({
      listItems: [
        { text: 'Ben and Jerry\'s' },
        { text: 'Breyers' },
        { text: 'Edy\'s' },
        { text: 'Dean\'s' },
      ],
    });
    expect(li(0).textContent).toEqual('Ben and Jerry\'s');
    expect(li(1).textContent).toEqual('Breyers');
    expect(li(2).textContent).toEqual('Edy\'s');
    expect(li(3).textContent).toEqual('Dean\'s');
  });

  it('Renders a bulleted list with default styles', () => {
    expect(listItemTextNode(0).style['text-decoration']).toEqual('none');
    expect(listItemTextNode(0).style.color).toEqual('rgb(33, 33, 33)');
    expect(listItemTextNode(0).style['font-size']).toEqual('1rem');
    expect(listItemTextNode(0).style['font-weight']).toEqual('normal');
  });

  it('Renders a bulleted list with custom styles', () => {
    renderBulletedList({
      listItems: [
        { text: 'Red',
          styles: {
            color: 'red',
            fontSize: 1,
            fontWeight: 'bold',
            textDecoration: 'underline',
          },
        },
        { text: 'Yellow',
          styles: {
            color: 'yellow',
            fontSize: 1.2,
            fontWeight: 'normal',
            textDecoration: 'none',
          },
        },
        { text: 'Green' },
      ],
    });

    expect(listItemTextNode(0).style['text-decoration']).toEqual('underline');
    expect(listItemTextNode(0).style.color).toEqual('red');
    expect(listItemTextNode(0).style['font-size']).toEqual('1rem');
    expect(listItemTextNode(0).style['font-weight']).toEqual('bold');

    expect(listItemTextNode(1).style['text-decoration']).toEqual('none');
    expect(listItemTextNode(1).style.color).toEqual('yellow');
    expect(listItemTextNode(1).style['font-size']).toEqual('1.2rem');
    expect(listItemTextNode(1).style['font-weight']).toEqual('normal');
  });

  it('Renders a bulleted list with default list style', () => {
    expect(bulletedListNode.style['list-style']).toEqual('disc');
  });

  it('Renders a bulleted list with a custom list style', () => {
    renderBulletedList({
      bulletStyle: 'circle',
      listItems: [
        { text: 'Barney\'s Blasphemous Blunder' },
      ],
    });
    expect(bulletedListNode.style['list-style']).toEqual('circle');
  });
});
