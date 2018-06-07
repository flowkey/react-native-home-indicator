
jest.mock('NativeModules', () => ({
    RNHomeIndicator: {
        autoHidden: jest.fn(),
        alwaysVisible: jest.fn(),
    },
}));

/* eslint-disable import/first */

import React from 'react';
import PrefersHomeIndicatorAutoHidden, { HomeIndicator } from './';
import renderer from 'react-test-renderer';
import { NativeModules, View } from 'react-native';

/* eslint-enable import/first */

const { RNHomeIndicator } = NativeModules;

describe('react-native-home-indicator', () => {
    beforeEach(() => {
        HomeIndicator.propsHistory = [];
        RNHomeIndicator.autoHidden.mockReset();
        RNHomeIndicator.alwaysVisible.mockReset();
    });

    test('test hide native indicator when mounting PrefersHomeIndicatorAutoHidden', () => {
        renderer.create(<PrefersHomeIndicatorAutoHidden />);
        expect(RNHomeIndicator.autoHidden).toHaveBeenCalled();
    });

    test('test hide native indicator when mounting HomeIndicator with autoHidden=true', () => {
        renderer.create(<HomeIndicator autoHidden />);
        expect(RNHomeIndicator.autoHidden).toHaveBeenCalled();
    });

    test('test hide native indicator when mounting HomeIndicator with autoHidden=false', () => {
        renderer.create(<HomeIndicator autoHidden={false} />);
        expect(RNHomeIndicator.autoHidden).not.toHaveBeenCalled();
    });

    test('test propsHistory', () => {
        renderer.create(
            <View>
                <HomeIndicator autoHidden={false} />
                <HomeIndicator autoHidden />
                <HomeIndicator autoHidden />
                <HomeIndicator autoHidden={false} />
            </View>,
        );

        expect(HomeIndicator.propsHistory).toEqual([
            { autoHidden: false },
            { autoHidden: true },
            { autoHidden: true },
            { autoHidden: false },
        ]);
    });
});
