import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from 'react-awesome-modal';

import { FormProvider, Form } from 'react-advanced-form';
import { Input, Button } from 'react-advanced-form-addons';
import isEmail from 'validator/lib/isEmail';

// import { connect } from 'react-redux';

import axios from 'axios';

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
      // capitalLetter: ({ value }) => /[A-Z]/.test(value),
      // oneNumber: ({ value }) => /[0-9]/.test(value),
      // minLength: ({ value }) => (value.length > 5)
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
    validating: false
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

  userSignIn = ({ serialized, fields, form }) => {
    // console.log(serialized)
    // console.log(fields)
    // console.log(form)

    fields.email.validating = true; 
    fields.password.validating = true; 
    this.setState({ });

    return setTimeout(()=>{
      return axios.post('http://localhost:8000/users/login', serialized)
        .then((response) => {
          let token = response.data.token;
          localStorage.setItem("token", token);
          if (response.data.token) {
            console.log(this.props)
            // this.props.history.push('/');
            window.location.href = '/';
          } else {
            fields.email.validating = false;
            fields.password.validating = false;
            
            fields.email.invalid = true;
            fields.password.invalid = true;

            fields.email.valid = false;
            fields.password.valid = false;

            this.setState({});
          }
        })
    }, 3000);
  }

  render() {
    console.log(this.props);

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
              <FormProvider rules={rules} messages={messages}>
                <TabPanel>
                  <Form action={this.userSignIn}>
                    <Input
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="Enter your email"
                      required />
                    <Input
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="Enter your password"
                      required />
                    <Button primary>
                      Sign In
                    </Button>
                  
                  </Form>
                </TabPanel>
              </FormProvider>
              <FormProvider rules={rules} messages={messages}>
                <TabPanel>
                  <Form >
                    <Input
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="Enter your email"
                      asyncRule={this.validateEmail}
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
                </TabPanel>
              </FormProvider>
            </Tabs>
          </div>
        </Modal>


      </div>
    );
  }
}

// const mapStateToProps = state => ({

// })

// const mapDispatchtoProps = {

// }

export default EntryPortal;