/* eslint func-names: "off" */
/* eslint no-console: "off" */

import React from 'react';
import Form from '../../src/components/Form';
import Field from '../../src/components/Field';
import EmailInput from '../../src/components/EmailInput';
import PasswordInput from '../../src/components/PasswordInput';
import SelectInput from '../../src/components/SelectInput';
import ToggleInput from '../../src/components/ToggleInput';
import Text from '../../src/components/Text';


describe('Form', function () {
  this.header(`
  ## Form
  `); // Markdown.

  before(() => {
    const handleChange = (formData) => {
      console.log('formData', formData);
    };

    const handleSubmit = () => {
      this.props({
        alert: null,
        working: true,
      });
      setTimeout(() => {
        this.props({
          alert: {
            type: 'success',
            title: 'Woo Hoo!',
            details: 'You\'re logged in',
          },
          working: false,
        });
      }, 2000);
    };
    // Runs when the Suite loads.  Use this to host your component-under-test.
    this.component(
      <Form
        onChange={handleChange}
        onSubmit={handleSubmit.bind(this)}
        submitButtonText={'Login'}
      >
        <Field
          fieldKey={'email'}
          label={'Email'}
          required={true}
        >
          <EmailInput placeholder={'test@signal.co'} />
        </Field>
        <Field
          fieldKey={'password'}
          label={'Password'}
          required={true}
        >
          <PasswordInput placeholder={'password'} />
        </Field>
        <Field
          fieldKey={'userType'}
          label={'User Type'}
          required={true}
        >
          <SelectInput
            items={[
              {
                value: 'admin',
                label: 'Admin',
              },
              {
                value: 'standard',
                label: 'Standard',
              },
            ]}
          />
        </Field>
        <Field
          fieldKey={'stayLoggedIn'}
          label={'Stay Logged In'}
          required={true}
        >
          <ToggleInput />
        </Field>
      </Form>
    ).width('100%');
  });

  it('Set Alert', () => this.props({ alert: {
    type: 'danger',
    title: 'Please reset your password using the following criteria:',
    children:
      <div>
        <div
          style={{
            padding: '10px 0 5px 0',
          }}
        >
          <Text
            color={'white'}
            fontSize={0.8}
          >
            {'◼︎ At least 1 special character (e.g. ][?/<~!$#%)'}
          </Text>
        </div>
        <div
          style={{
            padding: '10px 0 5px 0',
          }}
        >
          <Text
            color={'white'}
            fontSize={0.8}
          >
            {'◼︎ At least 1 numeric character'}
          </Text>
        </div>
      </div>,
  } }));
  it('Clear Alert', () => this.props({ alert: undefined }));
  it('Button Text: My Button', () => this.props({ submitButtonText: 'My Button' }));
  it('Button Text: Login', () => this.props({ submitButtonText: 'Login' }));
  it('Set Working', () => this.props({ working: true }));
  it('Clear Working', () => this.props({ working: false }));
  it('Simulate Server Error', () => {
    UIHarness.component.invalidateFields([
      {
        fieldKey: 'password',
        validationError: 'Server says this thing isn\'t cool',
      },
    ]);
    this.props({ alert: {
      type: 'danger',
      title: 'Please reset your password using the following criteria:',
      children:
        <div>
          <div
            style={{
              padding: '10px 0 5px 0',
            }}
          >
            <Text
              color={'white'}
              fontSize={0.8}
            >
              {'◼︎ At least 1 special character (e.g. ][?/<~!$#%)'}
            </Text>
          </div>
          <div
            style={{
              padding: '10px 0 5px 0',
            }}
          >
            <Text
              color={'white'}
              fontSize={0.8}
            >
              {'◼︎ At least 1 numeric character'}
            </Text>
          </div>
        </div>,
    } });
  });
  it('Sets the fields per row to 2', () => this.props({ fieldsPerRow: 2 }));
  it('Sets the fields per row to 1', () => this.props({ fieldsPerRow: 1 }));
  it('Sets the label position to left', () => this.props({ labelPosition: 'left' }));
  it('Sets the label position to top', () => this.props({ labelPosition: 'top' }));

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### Form

  A Form Element

  #### API

  - **alert** *React.PropTypes.shape* (optional)
    - **children** *React.PropTypes.node* (optional) child elements, appended after alert title and details
    - **details** *React.PropTypes.string* (optional) alert details text
    - **title** *React.PropTypes.string* (optional) alert title text (bold)
    - **type** *React.PropTypes.oneOf* Alert type one of: ['success', 'info', 'warning', 'danger']
  - **onSubmit** *React.PropTypes.func* (optional) called when Form has been submitted
  - **submitButtonText** *React.PropTypes.string* (optional) set form submit button text
  - **working** *React.PropTypes.bool* (optional) disables user input and shows working state on submit button when set to true
  - **invalidFields** *class function* invalidate Form fields with a fieldKey with a given message
    - **arguments** a collection where each item has the following keys
      - **fieldKey** *string* they field to apply the error
      - **validationError** *string* the error message to apply to the field
  `);
});
