import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import BlankPage2 from '../blankPage2';
import DrawBar from '../DrawBar';
import FooterSection from '../Footer';

import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import styles from './styles';

class Me extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Me</Title>
          </Body>
        </Header>
        <Content>
          <Text>
            {params.user}
          </Text>
        </Content>
        <FooterSection navigation={this.props.navigation} selectedIndex={1} />
      </Container>
    );
  }
}

export default Me;
