import color from 'color';
import Fuse from 'fuse.js';
import React from 'react';
import reactCSS from 'reactcss';
import TextInput from './TextInput';
import VectorGraphic from './VectorGraphic';
import { IconColors } from '../shared/colors';
import { Resets } from '../shared/styles';

export default class SearchInput extends TextInput {
  static propTypes = {
    autoComplete: React.PropTypes.bool,
    boundValue: React.PropTypes.string,
    enabled: React.PropTypes.bool,
    initialValue: React.PropTypes.string,
    multiline: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    status: React.PropTypes.oneOf(['error', 'warning', 'success']),
    searchableRecords: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    searchSettings: React.PropTypes.shape({
      caseSensitive: React.PropTypes.bool,
      distance: React.PropTypes.number,
      id: React.PropTypes.string,
      // TODO: Consider validating the types of strings
      include: React.PropTypes.arrayOf(React.PropTypes.string),
      keys: React.PropTypes.array,
      location: React.PropTypes.number,
      matchAllTokens: React.PropTypes.bool,
      maxPatternLength: React.PropTypes.number,
      shouldSort: React.PropTypes.bool,
      tokenize: React.PropTypes.bool,
      threshold: React.PropTypes.number,
    }),
  };

  static defaultProps = {
    initialValue: '',
    placeholder: 'Enter Search Term(s)',
  };

  displayName = 'SearchInput';

  constructor(props) {
    super(props);
    this.defaultSearchSettings = {
      distance: 100,
      location: 0,
      maxPatternLength: 32,
      shouldSort: false,
      threshold: 0.6,
    };

    this.state = {
      combinedSearchSettings: Object.assign({}, props.searchSettings, this.defaultSearchSettings),
      isFocused: false,
      searchResults: [],
      value: props.initialValue,
    };
    this.setupFuse(props);
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      combinedSearchSettings: Object.assign({},
        nextProps.searchSettings, this.defaultSearchSettings),
    };
    this.setupFuse(nextProps);
  }

  setupFuse(props) {
    this.fuse = new Fuse(props.searchableRecords, this.state.combinedSearchSettings);
  }

  handleChange(changeEvent) {
    const value = changeEvent.target.value;
    const searchResults = this.fuse.search(value);
    this.setState({
      value,
      searchResults,
    }, () => this.props.onChange({
      value,
      searchResults,
    }));
  }

  handleClearSearch() {
    this.setState({
      isFocused: false,
      searchResults: [],
      value: '',
    });
  }

  handleMouseOutClearSearch() {
    this.setState({
      clearSearchHover: false,
    });
  }

  handleMouseOverClearSearch() {
    this.setState({
      clearSearchHover: true,
    });
  }

  render() {
    const style = reactCSS({
      default: {
        CloseGraphicWrapper: {
          fill: IconColors.primary,
          height: 20,
          position: 'absolute',
          top: '5px',
          right: '5px',
          visibility: 'hidden',
        },
        searchIconWrapper: {
          fill: IconColors.primary,
          position: 'absolute',
          left: '5px',
          top: '5px',
        },
        SearchInputWrapper: {
          position: 'relative',
        },
        TextInput: {
          boxSizing: 'border-box',
          paddingLeft: '30px',
          paddingRight: 0,
        },
      },
      clearSearchHover: {
        CloseGraphicWrapper: {
          cursor: 'pointer',
          fill: color(IconColors.primary).darken(0.5).hexString(),
        },
      },
      searching: {
        CloseGraphicWrapper: {
          visibility: 'visible',
        },
      },
    }, {
      searching: (this.state.value && this.state.value.length > 0) || null,
      clearSearchHover: this.state.clearSearchHover,
    });

    // Override the inherited styles
    const mergedInputStyles = Object.assign({}, this.style().TextInput, style.TextInput);
    style.CloseGraphicWrapper = Object.assign({}, Resets.Button, style.CloseGraphicWrapper);

    return (
      <div style={style.SearchInputWrapper}>
        <input
          disabled={this.props.enabled ? undefined : 'disabled'}
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          placeholder={this.props.placeholder}
          style={mergedInputStyles}
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          ref={(comp) => this.inputRef = comp}
          type={'search'}
        />
        <div
          style={style.searchIconWrapper}
        >
          <VectorGraphic
            height={24}
            width={24}
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </VectorGraphic>
        </div>
        <button
          onClick={this.handleClearSearch.bind(this)}
          onMouseOut={this.handleMouseOutClearSearch.bind(this)}
          onMouseOver={this.handleMouseOverClearSearch.bind(this)}
          ref={(c) => this.clearSearchRef = c}
          style={style.CloseGraphicWrapper}
        >
          <VectorGraphic
            height={24}
            width={24}
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </VectorGraphic>
        </button>
      </div>
    );
  }
}
