import React, { Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { View, Container, Header, Title, Content, Text, Button, Icon, Left, Body, Right, Footer, InputGroup, Input, List, ListItem, Item } from 'native-base';
import styles from './styles';

class SetUsername extends Component {
  constructor() {
    super();
    this.state = {
      profileName: '',
      currentUser: { profileName: 'wwy', username: 'omg@tiger.com', image: 'https://images-na.ssl-images-amazon.com/images/I/512U%2BsSlCaL._SY355_.jpg' },
    };
    this.save = this.save.bind(this);
  }

  save() {
    Actions.me({ type: ActionConst.RESET });
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
