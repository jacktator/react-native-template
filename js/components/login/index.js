import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text,
} from 'native-base';
import styles from './styles';

const background = require('../../../images/shadow.png');

const validate = (values) => {
  const error = {};
  error.email = '';
  error.password = '';
  let ema = values.email;
  let pw = values.password;
  if (values.email === undefined) {
    ema = '';
  }
  if (values.password === undefined) {
    pw = '';
  }
  if (ema.length < 8 && ema !== '') {
    error.email = 'too short';
  }
  if (!ema.includes('@') && ema !== '') {
    error.email = '@ not included';
  }
  if (pw.length > 12) {
    error.password = 'max 11 characters';
  }
  if (pw.length < 5 && pw.length > 0) {
    error.password = 'Weak';
  }
  return error;
};

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.renderInput = this.renderInput.bind(this);
  }

  renderInput({
    input,
    label,
    type,
    meta: { touched, error, warning },
    inputProps,
  }) {
    let hasError = false;
    if (error !== undefined) {
      hasError = true;
    }
    return (
      <Item error={hasError}>
        <Icon active name={input.name === 'email' ? 'person' : 'unlock'} />
        <Input
          placeholder={input.name === 'email' ? 'EMAIL' : 'PASSWORD'}
          {...input}
        />
        {hasError
          ? <Item style={{ borderColor: 'transparent' }}>
            <Icon active style={{ color: 'red', marginTop: 5 }} name="bug" />
            <Text style={{ fontSize: 15, color: 'red' }}>{error}</Text>
          </Item>
          : <Text />}
      </Item>
    );
  }
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Input placeholder="邮箱" onChangeText={newUserName => this.setState({ newUserName })} />
                <Input
                  placeholder="密码"
                  onChangeText={newUserPassword => this.setState({ newUserPassword })}
                  secureTextEntry
                />
                <Button
                  style={styles.btn}
                  onPress={() => this.props.navigation.navigate('Home', { user: 'Lucy' })}
                >
                  <Text>Login</Text>
                </Button>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

export default Login;
