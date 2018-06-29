
jest.mock('NativeModules', () => ({
    RNHomeIndicator: {
        autoHidden: jest.fn(),
        alwaysVisible: jest.fn(),
    },
}))

/* eslint-disable import/first */

import React from 'react'
import PrefersHomeIndicatorAutoHidden, { HomeIndicator } from './'
import renderer from 'react-test-renderer'
import { NativeModules, View } from 'react-native'

/* eslint-enable import/first */

const { RNHomeIndicator } = NativeModules

describe('test react-native-home-indicator', () => {
    beforeEach(() => {
        HomeIndicator.propsHistory = []
        RNHomeIndicator.autoHidden.mockReset()
        RNHomeIndicator.alwaysVisible.mockReset()
    })

    test('show indicator when unmounting PrefersHomeIndicatorAutoHidden', () => {
        const component = renderer.create(<PrefersHomeIndicatorAutoHidden />)
        expect(RNHomeIndicator.autoHidden).toHaveBeenCalled()

        component.unmount()
        expect(RNHomeIndicator.alwaysVisible).toHaveBeenCalled()
    })

    test('dont hide native indicator when another instance is currently rendered', () => {
        renderer.create(<PrefersHomeIndicatorAutoHidden />)
        const secondTree = renderer.create(<PrefersHomeIndicatorAutoHidden />)

        secondTree.unmount()

        expect(RNHomeIndicator.alwaysVisible).not.toHaveBeenCalled()
    })

    test('fallback when no prop is provided', () => {
        renderer.create(<HomeIndicator />)
        expect(RNHomeIndicator.autoHidden).not.toHaveBeenCalled()
        expect(RNHomeIndicator.alwaysVisible).toHaveBeenCalled()
    })

    test('propsHistory', () => {
        renderer.create(
            <View>
                <HomeIndicator autoHidden={false} />
                <HomeIndicator autoHidden />
                <HomeIndicator autoHidden />
                <HomeIndicator autoHidden={false} />
            </View>,
        )

        expect(HomeIndicator.propsHistory).toEqual([
            { autoHidden: false },
            { autoHidden: true },
            { autoHidden: true },
            { autoHidden: false },
        ])
    })

    test('popAndGetPreviousProps', () => {
        renderer.create(
            <View>
                <HomeIndicator autoHidden={false} />
                <HomeIndicator autoHidden />
                <HomeIndicator autoHidden />
                <HomeIndicator autoHidden={false} />
            </View>,
        )

        expect(HomeIndicator.popAndGetPreviousProps()).toEqual({ autoHidden: true })
    })

    test('ensure component renders null', () => {
        const component = renderer.create(
            <PrefersHomeIndicatorAutoHidden />,
        )
        expect(component.toJSON()).toEqual(null)
    })
})
