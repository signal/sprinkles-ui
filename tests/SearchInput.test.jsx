import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import SearchInput from '../src/components/SearchInput';

describe('SearchInput', () => {
  let emptySearchInputComponent;
  let emptySearchInputNode;

  beforeEach(() => {
    emptySearchInputComponent = TestUtils.renderIntoDocument(
      <SearchInput
        searchableRecords={[]}
      />
    );
    emptySearchInputNode = ReactDOM.findDOMNode(emptySearchInputComponent.inputRef);
  });

  it('Does render a SearchInput', () => {
    expect(emptySearchInputComponent.inputRef.value).toBe('');
    expect(emptySearchInputNode.getAttribute('type')).toBe('search');
  });

  it('Does render a disabled search input', () => {
    const searchInputComponent = TestUtils.renderIntoDocument(
      <SearchInput
        enabled={false}
        searchableRecords={[]}
      />
    );
    const searchInputNode = ReactDOM.findDOMNode(searchInputComponent.inputRef);

    expect(searchInputNode.disabled).toBe(true);
  });
  it('Does merge search settings with defaults', () => {
    const searchSettings = {
      keys: [
        'title',
        'author.firstName',
      ],
    };
    const searchInputComponent = TestUtils.renderIntoDocument(
      <SearchInput
        searchableRecords={[]}
        searchSettings={searchSettings}
      />
    );

    expect(searchInputComponent.state.combinedSearchSettings.keys).toEqual(searchSettings.keys);
  });
  it('Does trigger a change event on search', () => {
    const handleChange = jest.genMockFunction();
    const record = [{
      title: 'Old Man\'s War',
      author: {
        firstName: 'John',
        lastName: 'Scalzi',
      },
    }];
    const searchSettings = {
      keys: [
        'title',
        'author.firstName',
      ],
    };
    const searchInputComponent = TestUtils.renderIntoDocument(
      <SearchInput
        onChange={handleChange}
        searchableRecords={record}
        searchSettings={searchSettings}
      />
    );
    const searchInputNode = ReactDOM.findDOMNode(searchInputComponent.inputRef);
    searchInputNode.value = 'zoo';
    TestUtils.Simulate.change(searchInputNode);

    expect(handleChange).toBeCalledWith({
      value: 'zoo',
      searchResults: [],
    });
  });

  it('Does show a clear search box option when value is entered', () => {
    emptySearchInputComponent.setState({
      value: 'foo',
    });
    const clearSearchNode = ReactDOM.findDOMNode(emptySearchInputComponent.clearSearchRef);

    expect(clearSearchNode.style.visibility).toEqual('visible');
  });

  it('Does remove value on clear state', () => {
    emptySearchInputComponent.setState({
      value: 'foo',
    });
    const clearSearchNode = ReactDOM.findDOMNode(emptySearchInputComponent.clearSearchRef);
    TestUtils.Simulate.click(clearSearchNode);

    expect(emptySearchInputComponent.state.value).toEqual('');
    expect(emptySearchInputComponent.state.isFocused).toEqual(false);
    expect(clearSearchNode.style.visibility).toEqual('hidden');
  });
});
