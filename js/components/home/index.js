import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Image, Dimensions, TouchableHighlight, ListView, RefreshControl, View, PixelRatio, Platform } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { style, config } from '../../globel';
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
import axios from 'axios';
import { Grid, Row } from 'react-native-easy-grid';
import styles from './styles';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const screen = Dimensions.get('window');

let page = 1;
let noMore = false;
let returnData = [];
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Home extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: ds.cloneWithRows([]),
      blogs: [],
      refreshing: false,
      loading: false,
    };
    this.loadMore = this.loadMore.bind(this);
    this.goDetail = this.goDetail.bind(this);
  }

  componentDidMount() {
    this.getCurrentUser();
    this.loadBlog();
  }

  goDetail(blog) {
    Actions.detail({ blog, type: ActionConst.PUSH });
  }

  loadBlog() {
    this.setState({ loading: true });
    const options = {
      method: 'get',
      url: `${config.url}/wp-json/wp/v2/posts`,
      headers: {
      },
      params: {
        per_page: 10,
        page,
      },
    };
    return axios(options)
        .then((body) => {
          if (body.data.length > 0) {
            returnData = body.data;
            global.blogs = body.data;
            this.setState({ dataSource: ds.cloneWithRows(returnData) });
            this.setState({ blogs: returnData });
            this.setState({ loading: false });
          }
        });
  }

  loadMore() {
    this.setState({ loading: true });
    page += 1;
    const options = {
      method: 'get',
      url: `${config.url}/wp-json/wp/v2/posts`,
      headers: {
      },
      params: {
        per_page: 10,
        page,
      },
    };
    axios(options)
      .then((body) => {
        console.log('22222222222222222', page);
        if (body.data.length > 0) {
          returnData = returnData.concat(body.data);
          global.blogs = global.blogs.concat(body.data);
          this.setState({ dataSource: ds.cloneWithRows(returnData) });
          this.setState({ blogs: returnData });
          this.setState({ loading: false });
        } else {
          this.setState({ loading: false });
          noMore = true;
        }
      });
  }

  _onRefresh() {
    noMore = false;
    this.setState({ loading: true });
    page = 1;
    this.setState({ refreshing: true });
    const options = {
      method: 'get',
      url: `${config.url}/wp-json/wp/v2/posts`,
      headers: {
      },
      params: {
        per_page: 10,
        page: 1,
      },
    };
    return axios(options)
        .then((body) => {
          returnData = body.data;
          global.blogs = body.data;
          this.setState({ dataSource: ds.cloneWithRows(global.blogs) });
          this.setState({ blogs: global.blogs });
          this.setState({ refreshing: false });
          this.setState({ loading: false });
        });
  }

  getCurrentUser() {
    global.storage.load({
      key: 'currentValue',
      syncInBackground: true,
    }).then((ret) => {
      global.currentUser = ret.currentUser;
      global.currentUserToken = ret.currentUserToken;
    }).catch((err) => {
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          Actions.login({ type: ActionConst.REPLACE });
          break;
        case 'ExpiredError':
          Actions.login({ type: ActionConst.REPLACE });
          break;
        default:
          break;
      }
    });
  }

  componentWillUnmount() {
    page = 1;
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Home</Title>
          </Body>
        </Header>

        <View style={{ minHeight: this.state.loading ? 0 : screen.height - 50 }}>
          <ListView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            style={{ marginBottom: 70 }}
            dataSource={this.state.dataSource}
            renderRow={data =>
              (<TouchableHighlight underlayColor="transparent" onPress={() => this.goDetail(data)}>
                <View style={{ marginBottom: 10, borderBottomWidth: 2, borderBottomColor: '#efefef' }}>

                  <View style={{ borderLeftWidth: 5, borderLeftColor: style.primaryColor, padding: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text>{entities.decode(data.title.rendered)}</Text>
                  </View>

                </View>
              </TouchableHighlight>)
            }
            onEndReached={this.loadMore}
          />


          {
          this.state.loading &&
            <Text style={{ alignSelf: 'center' }}>
              正在加载中，请稍后...
            </Text>
          }
        </View>


        <FooterSection selectedIndex={0} />
      </Container>
    );
  }
}

export default Home;
