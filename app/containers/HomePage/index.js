/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import EEGGraph from 'components/EEGGraph';
import LineGraph from 'components/LineGraph';

const styles = {
  textAlign: 'center'
};

const lineGraphStyles = {
  width: 1300,
  height: 500
};

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={styles}>
        <LineGraph {...lineGraphStyles} />
      </div>
    );
  }
}
