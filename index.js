import { Component } from 'react';
import { NativeModules } from 'react-native';

const { RNHomeIndicator } = NativeModules;

class PrefersHomeIndicatorAutoHidden extends Component {
    componentWillMount() {
        RNHomeIndicator.autoHidden();
    }

    componentWillUnmount() {
        RNHomeIndicator.alwaysVisible();
    }

    render() { return null; }
}

export default PrefersHomeIndicatorAutoHidden;
