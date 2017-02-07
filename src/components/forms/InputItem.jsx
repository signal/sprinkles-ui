import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Base from './../Base';

export default class InputItem extends Base {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
    fieldName: React.PropTypes.node.isRequired,
    enabled: React.PropTypes.bool,
    errorMessage: React.PropTypes.string,
    required: React.PropTypes.bool,
    label: React.PropTypes.string.isRequired,
    meta: React.PropTypes.shape({
      error: React.PropTypes.object,
      touched: React.PropTypes.bool,
    }),
  };

  static defaultProps = {
    enabled: true,
    meta: {
      error: null,
      touched: false,
    },
  };

  renderRequiredNotation(styles) {
    return (
      <span className={css(styles.requiredNotation)}>*</span>
    );
  }

  render() {
    const clr = this.getColors();
    const styles = StyleSheet.create({
      label: {
        display: 'block',
        color: clr.formColors.label,
        fontSize: '0.875rem',
        lineHeight: '1.8',
        margin: 0,
        padding: 0,
      },
      requiredNotation: {
        color: clr.formColors.requiredNotation,
        paddingLeft: '5px',
      },
      erroring: {
        color: clr.formColors.requiredNotation,
      },
    });
    const labelStyles = css(
      styles.label,
      this.props.meta.error && styles.erroring,
    );

    return (
      <div>
        <label
          className={labelStyles}
          htmlFor={this.props.fieldName}
        >
          {this.props.label}{this.props.required && this.renderRequiredNotation(styles)}
        </label>
        {React.cloneElement(this.props.children, { ...this.props })}
        {this.props.meta.touched && this.props.meta.error && <span>{this.props.errorMessage}</span>}
      </div>
    );
  }

}
