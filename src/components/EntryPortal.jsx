import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from 'react-awesome-modal';

import { FormProvider, Form } from 'react-advanced-form';
import { Input, Button } from 'react-advanced-form-addons';
import isEmail from 'validator/lib/isEmail';

const messages = {
  generic: {
    missing: 'Please provide the required field',
    invalid: 'The value you have provided is invalid'
  },

  type: {
    email: {
      missing: 'Please provide the e-mail',
      invalid: ({ value }) => `'The e-mail you provided is invalid`
    },
    password: {
      missing: 'Please provide the password',
      invalid: 'The password you entered is invalid',
      rule: {
        capitalLetter: 'Include at least one capital letter',
        minLength: 'Password must be at least 6 characters long'
      }
    }
  },

  name: {
    confirmedPassword: {
      invalid: 'The password does not match'
    }
  }
}

const rules = {
  type: {
    email: ({ value }) => isEmail(value),
    password: {
      capitalLetter: ({ value }) => /[A-Z]/.test(value),
      oneNumber: ({ value }) => /[0-9]/.test(value),
      minLength: ({ value }) => (value.length > 5)
    }
  },

  name: {
    confirmedPassword: {
      matches: ({ value, get }) => {
        return (value === get(['password', 'value']));
      }
    }
  }
}

class EntryPortal extends Component {
  state = {
    tabIndex: 0,
    visible: false,
    // signUp_modalHeight: 
  }

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  signin = ({ serialized }) => {
    console.log(serialized)
  }


  render() {

    return (
      <div className="entryContainer">
        <p className="heading-primary"> bank of g96 </p>
        <input type="button" value="Open" onClick={() => this.openModal()} />
        <Modal visible={this.state.visible} width="350" height="475" effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div>
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
              <TabList>
                <Tab>Sign In</Tab>
                <Tab>Sign Up</Tab>
              </TabList>
              <TabPanel>
                <FormProvider rules={rules} messages={messages}>
                  <Form action={ this.signin }>
                    <Input
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="Enter your email"
                      // asyncRule={this.validateEmail}
                      required />
                    <Input
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="Enter your password"
                      required />
                  <Button primary>Sign In</Button>
                  </Form>
                </FormProvider>
              </TabPanel>
              <TabPanel>
                <FormProvider rules={rules} messages={messages}>
                  <Form action={ this.signup }>
                    <Input
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="Enter your email"
                      // asyncRule={this.validateEmail}
                      required />
                    <Input
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="Enter your password"
                      required />
                    <Input
                      name="confirmedPassword"
                      type="password"
                      label="Confirm password"
                      placeholder="Confirm password"
                      required />
                    <Button primary>Sign Up</Button>
                  </Form>
                </FormProvider>
              </TabPanel>
            </Tabs>
          </div>
        </Modal>

   
      </div>
    );
  }
}

export default EntryPortal;