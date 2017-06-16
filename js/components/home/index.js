import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
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

class Home extends Component {
  static navigationOptions = {
    header: null,
  };
  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  };

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Home</Title>
          </Body>
        </Header>
        <Content>
          <Text>
          abs
          </Text>
        </Content>
        <FooterSection selectedIndex={0} />
      </Container>
    );
  }
}

export default Home;
