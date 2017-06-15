
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Body, Right, Footer, FooterTab, Badge } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { Actions, ActionConst } from 'react-native-router-flux';
import styles from './styles';
import { style } from '../../globel';


class FooterSection extends Component {

  constructor() {
    super();
    this.state = { selectedIndex: 1, badge: 0 };
    this.goHome = this.goHome.bind(this);
    this.goMe = this.goMe.bind(this);
  }

  componentWillMount() {

  }

  goHome() {
    this.props.navigation.navigate('Home', { user: 'Lucy' });
  }
  goMe() {
    this.props.navigation.navigate('Me', { user: 'me' });
  }

  render() {
    return (

      <Footer style={{ position: 'absolute', bottom: 0, backgroundColor: 'white' }}>
        <FooterTab style={{ backgroundColor: 'white' }}>
          <Button
            onPress={this.goHome}
          >
            <Icon name="time" style={{ color: this.props.selectedIndex === 0 ? style.primaryColor : 'grey' }} />
            <Text allowFontScaling={false} style={this.props.selectedIndex === 0 ? styles.textSelect : styles.text}>Blog</Text>
          </Button>
          <Button
            onPress={this.goMe}
          >
            <Icon name="person" style={{ color: this.props.selectedIndex === 1 ? style.primaryColor : 'grey' }} />
            <Text allowFontScaling={false} style={this.props.selectedIndex === 1 ? styles.textSelect : styles.text}>Me</Text>
          </Button>
        </FooterTab>
      </Footer>

    );
  }
}


export default FooterSection;
