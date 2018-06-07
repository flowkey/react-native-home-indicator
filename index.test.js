
jest.mock('NativeModules', () => ({
    RNHomeIndicator: {
        autoHidden: jest.fn(),
        alwaysVisible: jest.fn()
    }
}))

import React from 'react';
import PrefersHomeIndicatorAutoHidden, { HomeIndicator } from './';
import renderer from 'react-test-renderer';

import { NativeModules, View } from 'react-native';
const { RNHomeIndicator } = NativeModules;

describe('react-native-home-indicator', () => {    
    beforeEach(() => {
        HomeIndicator.propsHistory = []
        RNHomeIndicator.autoHidden.mockReset(),
        RNHomeIndicator.alwaysVisible.mockReset()
    });
    
    test('test hide native indicator when mounting PrefersHomeIndicatorAutoHidden', () => {  
        const component = renderer.create(
            <PrefersHomeIndicatorAutoHidden />
        );
        
        expect(RNHomeIndicator.autoHidden).toHaveBeenCalled()
    });

    test('test hide native indicator when mounting HomeIndicator with autoHidden=true', () => {  
        const component = renderer.create(
            <HomeIndicator autoHidden={true} />
        );
        
        expect(RNHomeIndicator.autoHidden).toHaveBeenCalled()
    });

    test('test hide native indicator when mounting HomeIndicator with autoHidden=false', () => {  
        const component = renderer.create(
            <HomeIndicator autoHidden={false} />
        );
        
        expect(RNHomeIndicator.autoHidden).not.toHaveBeenCalled()
    });

    test('test propsHistory', () => {  
        const component = renderer.create(
            <View>
                <HomeIndicator autoHidden={false} />
                <HomeIndicator autoHidden={true} />
                <HomeIndicator autoHidden={true} />
                <HomeIndicator autoHidden={false} />
            </View>
        );
        
        expect(HomeIndicator.propsHistory).toEqual([
            { autoHidden: false },
            { autoHidden: true },
            { autoHidden: true },
            { autoHidden: false },
        ])
    });
});
