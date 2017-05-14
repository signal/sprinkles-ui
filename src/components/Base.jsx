import React from 'react';
import PropTypes from 'prop-types';
import sprinklesTheme from '../shared/sprinklesTheme';

export default class Button extends React.Component {

  static contextTypes = {
    color: PropTypes.object,
  };

  displayName = 'Base';

  getColors() {
    return this.context.color || sprinklesTheme.color;
  }

}
