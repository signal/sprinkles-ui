/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import jssCompose from 'jss-compose';
import Base from './../Base';

export default class TextInput extends Base {

  static propTypes = {
    disabled: React.PropTypes.bool,
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

  generateStyles() {
    jss.setup(preset());
    jss.use(jssCompose());

    const clr = this.getColors();
    const focusBorderColor =
      this.props.meta.error ? clr.formColors.requiredNotation : clr.formColors.borderSelected;

    const styles = {
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
      errorInput: {
        composes: ['$input', '$error'],
      },
    };

    return jss.createStyleSheet(styles).attach();
  }

  render() {
    const { classes } = this.generateStyles();
    return (
      <input
        disabled={this.props.enabled ? undefined : 'disabled'}
        className={this.props.meta.error ? classes.errorInput : classes.input}
        {...this.props.field}
        id={this.props.fieldId}
        type="text"
      />
    );
  }

}
