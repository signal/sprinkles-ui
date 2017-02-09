/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import { StyleSheet, css } from 'aphrodisiac';
import Base from './../Base';

export default class TextInput extends Base {

  static propTypes = {
    enabled: React.PropTypes.bool,
    fieldId: React.PropTypes.string.isRequired,
    field: React.PropTypes.object,
  };

  static defaultProps = {
    enabled: true,
    meta: {
      error: null,
      touched: false,
    },
  };


  render() {
    const clr = this.getColors();
    const focusBorderColor = this.props.meta.error ?
      clr.formColors.requiredNotation : clr.formColors.borderSelected;
    const styles = StyleSheet.create({
      input: {
        border: `1px solid ${clr.formColors.border}`,
        borderRadius: '3px',
        color: clr.formColors.text,
        fontSize: '0.75rem',
        margin: '0 0 1rem 0',
        padding: '0.5rem',
        width: '100%',
        '&:focus': {
          background: clr.formColors.background,
          borderColor: focusBorderColor,
          outline: 'none',
        },
      },
      error: {
        borderColor: clr.formColors.requiredNotation,
      },
    });

    const inputStyles = css(
      styles.input,
      this.props.meta.error && styles.error,
    );
    return (
      <input
        className={inputStyles}
        disabled={this.props.enabled ? undefined : 'disabled'}
        {...this.props.field}
        id={this.props.fieldId}
        type="text"
      />
    );
  }
}
