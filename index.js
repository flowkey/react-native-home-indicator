import { Component } from 'react';
import PropTypes from 'prop-types';
import { NativeModules, Platform } from 'react-native';

const { HomeIndicatorManager } = NativeModules;

// See comments in React Native StatusBar.js for info on how this works

function mergePropsStack(propsStack, defaultValues) {
  return propsStack.reduce((prev, cur) => {
    for (const prop in cur) {
      if (cur[prop] != null) {
        prev[prop] = cur[prop];
      }
    }
    return prev;
  }, Object.assign({}, defaultValues));
}

function createStackEntry({ hidden }) {
  return {
    hidden,
  };
}

export default class HomeIndicator extends Component {
  static _propsStack = [];

  static _defaultProps = createStackEntry({
    hidden: false,
  });

  // Timer for updating the native module values at the end of the frame.
  static _updateImmediate = null;

  // The current merged values from the props stack.
  static _currentValues = null;

  static setHidden(hidden) {
    HomeIndicator._defaultProps.hidden = hidden;
    if (Platform.OS === 'ios') {
      HomeIndicatorManager.setHidden(hidden);
    }
  }

  static propTypes = {
    /**
     * If the home indicator is hidden.
     */
    hidden: PropTypes.bool,
  };

  _stackEntry = null;

  componentDidMount() {
    // Every time a HomeIndicator component is mounted, we push it's prop to a stack
    // and always update the native status bar with the props from the top of then
    // stack. This allows having multiple HomeIndicator components and the one that is
    // added last or is deeper in the view hierarchy will have priority.
    this._stackEntry = createStackEntry(this.props);
    HomeIndicator._propsStack.push(this._stackEntry);
    this._updatePropsStack();
  }

  componentWillUnmount() {
    // When a HomeIndicator is unmounted, remove itself from the stack and update
    // the native bar with the next props.
    const index = HomeIndicator._propsStack.indexOf(this._stackEntry);
    HomeIndicator._propsStack.splice(index, 1);

    this._updatePropsStack();
  }

  componentDidUpdate() {
    const index = HomeIndicator._propsStack.indexOf(this._stackEntry);
    this._stackEntry = createStackEntry(this.props);
    HomeIndicator._propsStack[index] = this._stackEntry;

    this._updatePropsStack();
  }

  /**
   * Updates the native status bar with the props from the stack.
   */
  _updatePropsStack = () => {
    // Send the update to the native module only once at the end of the frame.
    clearImmediate(HomeIndicator._updateImmediate);
    HomeIndicator._updateImmediate = setImmediate(() => {
      const oldProps = HomeIndicator._currentValues;
      const mergedProps = mergePropsStack(HomeIndicator._propsStack, HomeIndicator._defaultProps);

      // Update the props that have changed using the merged values from the props stack.
      if (Platform.OS === 'ios') {
        if (!oldProps || oldProps.hidden !== mergedProps.hidden) {
          HomeIndicatorManager.setHidden(mergedProps.hidden);
        }
      }
      // Update the current prop values.
      HomeIndicator._currentValues = mergedProps;
    });
  };

  render() {
    return null;
  }
}
