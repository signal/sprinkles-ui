/* eslint func-names: "off" */
/* eslint no-console: "off" */


import React from 'react';
import loremIpsum from 'lorem-ipsum';
import SearchInput from '../../src/components/SearchInput';

describe('Search Input', function () {
  this.header(`
  ## SearchInput
  `); // Markdown.

  before(() => {
    // Runs when the Suite loads.  Use this to host your component-under-test.

    this.searchSettingsForOneRecord = {
      keys: [
        'title',
        'author.firstName',
      ],
    };

    this.searchSettingsForMultipleRecords = {
      keys: [
        'product',
        'price',
        'meta.origin',
        'meta.tags',
      ],
    };

    this.record = [{
      title: 'Old Man\'s War',
      author: {
        firstName: 'John',
        lastName: 'Scalzi',
      },
    }];

    this.records = [{
      product: 'Old Bay',
      price: 1.25,
      meta: {
        origin: 'Mexico',
        tags: ['cleaning', 'household'],
      },
    },
    {
      product: 'Italian Old Oil',
      price: 3.95,
      meta: {
        origin: 'Italy',
        tags: ['cooking', 'pasta', 'dressings'],
      },
    },
    {
      product: 'Old Style Beer 12 Pk',
      price: 7.99,
      meta: {
        origin: 'Wisconsin',
        tags: ['beer', 'craft-beer', 'best beer ever!'],
      },
    }];

    const handleChange = (results) => {
      console.log('search results:', results);
    };

    this.load(
      <SearchInput
        include={['matches']}
        enabled={true}
        onChange={handleChange}
        searchableRecords={this.record}
        searchSettings={this.searchSettings}
      />
  ).width('100%');
  });
  it('With one record', () => this.props(
    { searchableRecords: this.record,
      searchSettings: this.searchSettingsForOneRecord,
    }
  ));
  it('With multiple records', () => this.props(
    { searchableRecords: this.records,
      searchSettings: this.searchSettingsForMultipleRecords,
    }
  ));
  it('Update value', () => UIHarness.component.setState({ value: loremIpsum() }));
  it('Clear value', () => UIHarness.component.setState({ value: '' }));
  it('Validate (output on console)', () =>
    console.log('Is Valid: ', UIHarness.component.validate()));
  it('Update placeholder', () => this.props({ placeholder: loremIpsum() }));
  it('Clear placeholder', () => this.props({ placeholder: 'password' }));
  it('Set Success Status', () => this.props({ status: 'success' }));
  it('Set Warning Status', () => this.props({ status: 'warning' }));
  it('Set Error Status', () => this.props({ status: 'error' }));
  it('Clear Status', () => this.props({ status: undefined }));
  it('Disable Input', () => this.props({ enabled: false }));
  it('Enable Input', () => this.props({ enabled: true }));

    /**
     * Documentation (Markdown)
     */
  this.footer(`
    ### Text

    A SearchInput Element

    #### API

    - **autoComplete** *React.PropTypes.bool* (optional) toggle input autoComplete from browser
    - **enabled** *React.PropTypes.bool* (optional) enable/disable user input
    - **initialValue** *React.PropTypes.string* (optional) initial value of the input
    - **onChange** *React.PropTypes.func* (optional) callback called when the value of the text box changes
    - **placeholder** *React.PropTypes.string* (optional) placeholder when text is empty
    - **status** *React.PropTypes.oneOf* (optional) set status of the input (overrides focus). Acceptable values are 'error', 'warning' and 'success'

    `);
});
