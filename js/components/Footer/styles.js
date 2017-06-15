
const React = require('react-native');
import { style } from '../../globel';
const { StyleSheet } = React;
export default {
  container: {
    backgroundColor: '#FBFAFA',
  },
  row: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    alignItems: 'center',
    color: 'grey',
  },
  textSelect: {
    fontSize: 12,
    alignItems: 'center',
    color: style.primaryColor,
  },
  mt: {
    marginTop: 18,
  },
};
