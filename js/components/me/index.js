import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { View, Container, Header, Title, Content, Text, Button, Icon, Left, Body, Right, Footer, InputGroup, Input, List, ListItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import FooterSection from '../Footer';
import styles from './styles';

class Me extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: global.currentUser,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {

  }

  logout() {
    global.storage.remove({
	     key: 'currentValue',
    });

    Actions.login({ type: ActionConst.RESET });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
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
        </Header>
        <Content style={{ marginBottom: 50 }}>
          <Grid>
            <Col style={{ padding: 10 }}>
              <View style={{ alignSelf: 'center' }}>
                {
                  this.state.currentUser.avatar_urls[24] &&
                  <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: this.state.currentUser.avatar_urls[24] }} />
                }

              </View>
            </Col>
          </Grid>
          <View style={{ alignSelf: 'center', marginBottom: 10 }}>
            {
              <Text>{this.state.currentUser.email}</Text>
            }
          </View>
          <List style={{ backgroundColor: 'white' }}>
            <ListItem onPress={() => Actions.setting({ type: ActionConst.PUSH })}>
              <Left>
                <Text>Setting</Text>
              </Left>
              <Body />
              <Right>
                <Icon name="ios-arrow-forward" />
              </Right>
            </ListItem>
          </List>
          <Grid style={{ marginTop: 20, marginBottom: 30 }}>
            <Col>
              <Button onPress={this.logout} style={styles.bottomBtn}><Text style={{ color: 'black' }}>Logout</Text></Button>
            </Col>
          </Grid>
        </Content>
        <FooterSection navigation={this.props.navigation} selectedIndex={1} />
      </Container>
    );
  }
}

export default Me;
