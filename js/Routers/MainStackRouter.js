// import React, { Component } from 'react';
// import Login from '../components/login/';
// import Home from '../components/home/';
// import Me from '../components/me/';
// import BlankPage from '../components/blankPage';
// import HomeDrawerRouter from './HomeDrawerRouter';
// import { StackNavigator } from 'react-navigation';
// import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base';
// HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
//   header: null,
// });
// export default (StackNav = StackNavigator({
//   Login: { screen: Login },
//   Home: { screen: Home },
//   Me: { screen: Me },
//   BlankPage: { screen: BlankPage },
// }));


import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Drawer, View } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';

import { closeDrawer } from '../actions/drawer';

import Login from '../components/login/';
import Home from '../components/home/';
import Detail from '../components/detail/';
import Me from '../components/me/';
import Setting from '../components/setting/';
import SetUsername from '../components/setUsername/';
import { statusBarColor } from '../themes/base-theme';


const RouterWithRedux = connect()(Router);

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    closeDrawer: React.PropTypes.func,
  }


  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }


  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  // _renderScene(props) { // eslint-disable-line class-methods-use-this
  //   switch (props.scene.route.key) {
  //     case 'login':
  //       return <Login />;
  //     case 'home':
  //       return <Home />;
  //     default :
  //       return <Login />;
  //   }
  // }

  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<View />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => {  //eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan
      >
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle="default"
        />
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="login" component={Login} hideNavBar />
            <Scene key="home" component={Home} hideNavBar initial />
            <Scene key="detail" component={Detail} hideNavBar />
            <Scene key="me" component={Me} hideNavBar />
            <Scene key="setting" component={Setting} hideNavBar />
            <Scene key="setUsername" component={SetUsername} hideNavBar />
          </Scene>
        </RouterWithRedux>
      </Drawer>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
