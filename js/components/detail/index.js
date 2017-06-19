import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';
import { View, Container, Header, Title, Content, Text, Button, Icon, Left, Body, Right, Footer, InputGroup, Input, List, ListItem } from 'native-base';
import styles from './styles';

// used to decode the encrypted text
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      blog: {},
    };
    this.renderNode = this.renderNode.bind(this);
  }

  componentWillMount() {
    if (this.props.blog) {
      this.setState({ blog: this.props.blog });
    }
  }

  /**
  * This function can be used to render image in web view, the following code shows the example
  */
  renderNode(node, index, siblings, parent, defaultRenderer) {
    // if (node.name === 'img') {
    //   const a = node.attribs;
    //   const imgHtml = `<img src="https://ozii.sk8.tech${a.src}" width=${screen.width - 25}/>`;
    //   return (
    //     <View key={index} style={{ width: screen.width - 15, height: 300 }}>
    //       <WebView source={{ html: imgHtml }} />
    //     </View>
    //   );
    // }
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
              {entities.decode(this.state.blog.title.rendered)}
            </Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ marginBottom: 50 }}>
          <HTMLView
            value={this.state.blog.content.rendered}
            renderNode={this.renderNode}
            style={{ paddingLeft: 5, paddingRight: 5 }}
          />
        </Content>
      </Container>
    );
  }
}

export default Detail;
