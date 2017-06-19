import React, { Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { View, Container, Header, Title, Content, Text, Button, Icon, Left, Body, Right, Footer, InputGroup, Input, List, ListItem, Item } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { style, config } from '../../globel';
import styles from './styles';

class SetUsername extends Component {
  constructor() {
    super();
    this.state = {
      profileName: '',
      currentUser: global.currentUser,
      visible: false,
    };
    this.save = this.save.bind(this);
  }

  save() {
    if (this.state.profileName === '') {
      alert('Profile name cannot be empty');
      return;
    }
    this.setState({ visible: true });
    const options = {
      method: 'post',
      url: `${config.url}/wp-json/wp/v2/users/me`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${global.currentUserToken}`,
      },
      data: {
        nickname: this.state.profileName,
      },
    };
    return axios(options)
      .then((body) => {
        global.storage.save({
          key: 'currentValue',   // Note: Do not use underscore("_") in key!
          data: {
            currentUser: body.data,
          },
          expires: null,
        });
        global.currentUser = body.data;
        this.setState({ visible: false });
        Actions.me({ type: ActionConst.RESET });
      });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Spinner visible={this.state.visible} textContent={'加载中...'} textStyle={{ color: '#FFF' }} />
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon style={{ color: 'black' }} name="ios-arrow-back" />
              <Text style={{ color: 'black' }}>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>
              {
                this.state.currentUser.nickname &&
                this.state.currentUser.nickname
              }
              {
                !this.state.currentUser.nickname &&
                'Me'
              }
            </Title>
          </Body>
          <Right>
            <Button transparent onPress={this.save}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content style={{ marginBottom: 50 }}>
          <Item>
            <Icon name="person" />
            <Input
              placeholder="profile name"
              onChangeText={profileName => this.setState({ profileName })}
            />
          </Item>

        </Content>
      </Container>
    );
  }
}

export default SetUsername;
