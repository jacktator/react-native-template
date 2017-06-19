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
import { Actions, ActionConst } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { style, config } from '../../globel';
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
      username: '',
      password: '',
      visible: false,
    };
    this.renderInput = this.renderInput.bind(this);
    this.login = this.login.bind(this);
  }

  login() {
    if (this.state.username === '') {
      alert('用户名不能为空');
    } else if (this.state.password === '') {
      alert('密码不能为空');
    } else {
      this.setState({ visible: true });

      const options = {
        method: 'post',
        url: `${config.url}/wp-json/jwt-auth/v1/token`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: this.state.username.toLowerCase(),
          password: this.state.password,
        },
      };
      return axios(options)
        .then((body) => {
          if (body.data.token) {
            const token = body.data.token;
            // returnData filter出用户
            const options = {
              method: 'get',
              url: `${config.url}/wp-json/wp/v2/users/me?context=edit`,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${body.data.token}`,
              },
            };
            return axios(options)
              .then((body) => {
                global.storage.save({
                  key: 'currentValue',   // Note: Do not use underscore("_") in key!
                  data: {
                    currentUser: body.data,
                    currentUserToken: token,
                  },
                  expires: null,
                });
                this.setState({ visible: false });
                Actions.home({ type: ActionConst.REPLACE });
              });
          }
        }).catch((err) => {
          this.setState({ visible: false });
          setTimeout(() => {
            alert('用户名或密码不正确');
          }, 100);
        });
    }
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
        <Spinner visible={this.state.visible} textContent={'加载中...'} textStyle={{ color: '#FFF' }} />
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Item style={styles.input}>
                  <Icon active name="person" />
                  <Input placeholder="邮箱" onChangeText={username => this.setState({ username })} />
                </Item>
                <Item style={styles.input}>
                  <Icon name="lock" />
                  <Input
                    placeholder="密码"
                    onChangeText={password => this.setState({ password })}
                    secureTextEntry
                  />
                </Item>
                <Text style={{ alignSelf: 'flex-end', color: 'grey', fontSize: 14 }} onPress={this.forgetPassword}>忘记密码？</Text>
                <Button style={styles.btn} onPress={this.login}>
                  <Text allowFontScaling={false}>登录</Text>
                </Button>
              </View>
              <View style={{ marginTop: 100, alignSelf: 'center', flexDirection: 'row' }}>
                <Text style={{ color: 'grey', fontSize: 14 }}>没有用户？</Text><Text onPress={this._showModal2} style={{ color: style.primaryColor, fontSize: 14 }}>注册</Text>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

export default Login;
