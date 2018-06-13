import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NativeModules, Platform } from 'react-native'

const { RNHomeIndicator } = NativeModules
const isIos = Platform.OS === 'ios'


const propTypes = {
    autoHidden: PropTypes.bool.isRequired,
    requireDoubleSwipe: PropTypes.bool,
}

export class HomeIndicator extends Component {
    static propsHistory = [];

    static popAndGetPreviousProps() {
        HomeIndicator.propsHistory.pop()
        return HomeIndicator.propsHistory[HomeIndicator.propsHistory.length - 1] || {}
    }

    componentDidMount() {
        if (!isIos) return

        const { autoHidden, requireDoubleSwipe } = this.props
        HomeIndicator.propsHistory.push(this.props)

        updateNativeHomeIndicator({ autoHidden, requireDoubleSwipe })
    }

    componentWillUnmount() {
        if (!isIos) return

        const { autoHidden, requireDoubleSwipe } = HomeIndicator.popAndGetPreviousProps()
        updateNativeHomeIndicator({ autoHidden, requireDoubleSwipe })
    }

    render() { return null }
}

HomeIndicator.propTypes = propTypes

function updateNativeHomeIndicator({ autoHidden = false, requireDoubleSwipe = false }) {
    if (autoHidden) {
        RNHomeIndicator.autoHidden()
    } else {
        RNHomeIndicator.alwaysVisible()
    }
    if (requireDoubleSwipe) {
        RNHomeIndicator.requireDoubleSwipe()
    } else {
        RNHomeIndicator.requireSingleSwipe()
    }
}


// keep this for backwards compatibility
const PrefersHomeIndicatorAutoHidden = () => <HomeIndicator autoHidden />
export default PrefersHomeIndicatorAutoHidden
