/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Base from './../Base';

export default class TextInput extends Base {

  static propTypes = {
    disabled: React.PropTypes.bool,
    fieldId: React.PropTypes.string.isRequired,
    field: React.PropTypes.object,
  };

  render() {
    const clr = this.getColors();
    const styles = StyleSheet.create({
      input: {
        border: `1px solid ${clr.formColors.border}`,
        borderRadius: '3px',
        color: clr.formColors.text,
        fontSize: '0.75rem',
        margin: '0 0 1rem 0',
        padding: '0.5rem',
        width: '100%',
        ':focus': {
          background: clr.formColors.background,
          borderColor: clr.formColors.borderSelected,
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
        disabled={this.props.enabled ? undefined : 'disabled'}
        className={inputStyles}
        {...this.props.field}
        id={this.props.fieldId}
        type="text"
      />
    );
  }

}
