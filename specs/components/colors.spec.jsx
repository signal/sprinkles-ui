/* eslint func-names: "off" */

import React from 'react';
import Text from '../../src/components/Text';
import {
  ButtonColors,
  NoticeColors,
  TextColors,
  BackgroundColors,
 } from '../../src/shared/colors';


describe('Colors', function () {
  this.header(`
  ## Colors
  `); // Markdown.

  before(() => {
    const renderColor = (color) => (
      <div
        style={{
          backgroundColor: color,
          flex: 1,
          height: 120,
          width: 120,
          marginRight: 10,
        }}
      />);
    const renderLabel = (label) => (
      <div
        style={{
          flex: 1,
          width: 120,
          marginRight: 10,
        }}
      >
        <Text>{label}</Text>
      </div>);

    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.component(
      <div>
        <div>
          <Text
            fontWeight={'bold'}
            fontSize={1}
          >
            {'Colors'}
          </Text>
        </div>
        <div style={{ display: 'flex', marginTop: 10 }}>
          {renderColor(NoticeColors.success)}
          {renderColor(NoticeColors.info)}
          {renderColor(NoticeColors.warning)}
          {renderColor(NoticeColors.danger)}
        </div>
        <div style={{ display: 'flex', marginTop: 10 }}>
          {renderLabel(`success: ${NoticeColors.success}`)}
          {renderLabel(`info: ${NoticeColors.info}`)}
          {renderLabel(`warning: ${NoticeColors.warning}`)}
          {renderLabel(`danger: ${NoticeColors.danger}`)}
        </div>
        <div style={{ marginTop: 20 }}>
          <Text
            fontWeight={'bold'}
            fontSize={1}
          >
            {'ButtonColors'}
          </Text>
        </div>
        <div style={{ display: 'flex', marginTop: 10 }}>
          {renderColor(ButtonColors.primary)}
          {renderColor(ButtonColors.secondary)}
        </div>
        <div style={{ display: 'flex', marginTop: 10 }}>
          {renderLabel(`primary: ${ButtonColors.primary}`)}
          {renderLabel(`secondary: ${ButtonColors.secondary}`)}
        </div>
        <div style={{ marginTop: 20 }}>
          <Text
            fontWeight={'bold'}
            fontSize={1}
          >
            {'TextColors'}
          </Text>
        </div>
        <div style={{ display: 'flex', marginTop: 10 }}>
          {renderColor(TextColors.primary)}
          {renderColor(TextColors.secondary)}
          {renderColor(TextColors.light)}
          {renderColor(TextColors.accent)}
        </div>
        <div style={{ display: 'flex', marginTop: 10 }}>
          {renderLabel(`primary: ${TextColors.primary}`)}
          {renderLabel(`secondary: ${TextColors.secondary}`)}
          {renderLabel(`light: ${TextColors.light}`)}
          {renderLabel(`accent: ${TextColors.accent}`)}
        </div>
        <div style={{ marginTop: 20 }}>
          <Text
            fontWeight={'bold'}
            fontSize={1}
          >
            {'BackgroundColors'}
          </Text>
        </div>
        <div style={{ display: 'flex', marginTop: 10 }}>
          {renderColor(BackgroundColors.primary)}
          {renderColor(BackgroundColors.secondary)}
          {renderColor(BackgroundColors.accent)}
        </div>
        <div style={{ display: 'flex', marginTop: 10 }}>
          {renderLabel(`primary: ${BackgroundColors.primary}`)}
          {renderLabel(`secondary: ${BackgroundColors.secondary}`)}
          {renderLabel(`accent: ${BackgroundColors.accent}`)}
        </div>
      </div>,
    );
  });
});
