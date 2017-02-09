import React from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import jssCompose from 'jss-compose';
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

  renderRequiredNotation(classes) {
    return (
      <span className={classes.requiredNotation}>*</span>
    );
  }

  generateStyles() {
    jss.setup(preset());
    jss.use(jssCompose());

    const clr = this.getColors();
    const styles = {
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
      error: {
        color: clr.formColors.requiredNotation,
      },
      errorLabel: {
        composes: ['$label', '$error'],
      },
    };

    return jss.createStyleSheet(styles).attach();
  }

  render() {
    const { classes } = this.generateStyles();
    const showError = this.props.meta.touched && this.props.meta.error;

    return (
      <div>
        <label
          className={showError ? classes.errorLabel : classes.label}
          htmlFor={this.props.fieldName}
        >
          {this.props.label}{this.props.required && this.renderRequiredNotation(classes)}
        </label>
        {React.cloneElement(this.props.children, { ...this.props })}
        {showError && <span className={classes.errorLabel}>
          {this.props.errorMessage}</span>}
      </div>
    );
  }

}
