import { Component } from 'react';
import { NativeModules, Platform } from 'react-native';

const { RNHomeIndicator } = NativeModules;
const isIos = Platform.OS === 'ios';

class PrefersHomeIndicatorAutoHidden extends Component {
    componentWillMount() {
        if (isIos) RNHomeIndicator.autoHidden();
    }

    componentWillUnmount() {
        if (isIos) RNHomeIndicator.alwaysVisible();
    }

    render() { return null; }
}

export default PrefersHomeIndicatorAutoHidden;
