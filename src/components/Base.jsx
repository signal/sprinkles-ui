import React from 'react';
import sprinklesTheme from '../shared/sprinklesTheme';

export default class Button extends React.Component {

  static contextTypes = {
    color: React.PropTypes.object,
  };

  displayName = 'Base';

  getColors() {
    return this.context.color || sprinklesTheme.color;
  }

}
