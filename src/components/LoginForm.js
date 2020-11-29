import React, {Component} from 'react';
import firebase from 'firebase';
import {StyleSheet, Text} from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';

export default class LoginForm extends Component {
  state = {
    email: 'test@test.com',
    password: 'password',
    error: '',
    loading: false,
  };

  onButtonPress() {
    const {email, password} = this.state;

    this.setState({error: '', loading: true});

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFailed.bind(this));
      });
  }

  onLoginFailed() {
    this.setState({error: 'Authentication failed', loading: false});
  }

  onLoginSuccess() {
    this.setState({email: '', password: '', error: '', loading: false});
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder={'user@gmail.com'}
            label={'Email'}
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
            style={{height: 40, width: 100}}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder={'password'}
            secureTextEntry={true}
            label={'Password'}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 20,
  },
});
