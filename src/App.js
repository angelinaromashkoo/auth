import React, {Component} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import firebase from 'firebase';
import {Button, Header, Spinner} from './components/common';
import LoginForm from './components/LoginForm';

const initUser = {
  apiKey: 'AIzaSyDxdPBIz_j-AcosOr-_z8P8RGX05-gPkoc',
  authDomain: 'auth-2e45c.firebaseapp.com',
  databaseURL: 'https://auth-2e45c.firebaseio.com',
  projectId: 'auth-2e45c',
  storageBucket: 'auth-2e45c.appspot.com',
  messagingSenderId: '392163144065',
  appId: '1:392163144065:web:fd42eb7e3dd3e393673880',
  measurementId: 'G-MDQW0NVTBG',
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
    };
  }

  componentDidMount() {
    firebase.initializeApp(initUser);

    firebase.auth().onAuthStateChanged((user) => {
      user ? this.setState({loggedIn: true}) : this.setState({loggedIn: false});
    });
  }

  onSignOut = () => {
    return firebase.auth().signOut();
  };

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.styleView}>
            <Button style={styles.button} onPress={this.onSignOut}>
              Log Out
            </Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header headersText="Authentication" />
        {this.renderContent()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleView: {
    height: 40,
  },
});
