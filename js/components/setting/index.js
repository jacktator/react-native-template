import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { View, Container, Header, Title, Content, Text, Button, Icon, Left, Body, Right, Footer, InputGroup, Input, List, ListItem } from 'native-base';
import styles from './styles';

class Setting extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { profileName: 'wwy', username: 'omg@tiger.com', image: 'https://images-na.ssl-images-amazon.com/images/I/512U%2BsSlCaL._SY355_.jpg' },
    };
  }
  render() {
    return (
      <Container style={styles.container}>
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
                this.state.currentUser.profileName &&
                this.state.currentUser.profileName
              }
              {
                !this.state.currentUser.profileName &&
                'Me'
              }
            </Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ marginBottom: 50 }}>
          <List style={{ backgroundColor: 'white' }}>
            <ListItem onPress={() => Actions.setUsername({ type: ActionConst.PUSH })}>
              <Left>
                <Text>profileName</Text>
              </Left>
              <Body />
              <Right>
                <Icon name="ios-arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default Setting;
