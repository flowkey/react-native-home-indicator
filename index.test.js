import React from "react";
import PrefersHomeIndicatorAutoHidden, {
    HomeIndicator,
    clearPropsHistory,
    getPropsHistory,
    popAndGetPreviousProps,
} from "./";
import renderer, { act } from "react-test-renderer";
import { NativeModules, View } from "react-native";

jest.mock("react-native", () => {
    const RN = jest.requireActual("react-native");
    RN.NativeModules.RNHomeIndicator = {
        autoHidden: jest.fn(),
        alwaysVisible: jest.fn(),
    };
    return RN;
});

const { RNHomeIndicator } = NativeModules;

describe("react-native-home-indicator", () => {
    beforeEach(() => {
        clearPropsHistory();
        RNHomeIndicator.autoHidden.mockReset();
        RNHomeIndicator.alwaysVisible.mockReset();
    });

    test("hide native indicator when mounting PrefersHomeIndicatorAutoHidden", () => {
        act(() => {
            renderer.create(<PrefersHomeIndicatorAutoHidden />);
        });
        expect(RNHomeIndicator.autoHidden).toHaveBeenCalled();
    });

    test("hide native indicator when mounting HomeIndicator with autoHidden=true", () => {
        act(() => {
            renderer.create(<HomeIndicator autoHidden />);
        });
        expect(RNHomeIndicator.autoHidden).toHaveBeenCalled();
    });

    test("hide native indicator when mounting HomeIndicator with autoHidden=false", () => {
        act(() => {
            renderer.create(<HomeIndicator autoHidden={false} />);
        });
        expect(RNHomeIndicator.autoHidden).not.toHaveBeenCalled();
    });

    test("show indicator when unmounting PrefersHomeIndicatorAutoHidden", () => {
        let component;
        act(() => {
            component = renderer.create(<PrefersHomeIndicatorAutoHidden />);
        });
        expect(RNHomeIndicator.autoHidden).toHaveBeenCalled();

        act(() => {
            component.unmount();
        });

        expect(RNHomeIndicator.alwaysVisible).toHaveBeenCalled();
    });

    test("dont hide native indicator when another instance is currently rendered", () => {
        renderer.create(<PrefersHomeIndicatorAutoHidden />);
        const secondTree = renderer.create(<PrefersHomeIndicatorAutoHidden />);

        secondTree.unmount();

        expect(RNHomeIndicator.alwaysVisible).not.toHaveBeenCalled();
    });

    test("fallback when no prop is provided", () => {
        act(() => {
            renderer.create(<HomeIndicator />);
        });
        expect(RNHomeIndicator.autoHidden).not.toHaveBeenCalled();
        expect(RNHomeIndicator.alwaysVisible).toHaveBeenCalled();
    });

    test("propsHistory", async () => {
        act(() => {
            renderer.create(
                <View>
                    <HomeIndicator autoHidden={false} />
                    <HomeIndicator autoHidden />
                    <HomeIndicator autoHidden />
                    <HomeIndicator autoHidden={false} />
                </View>
            );
        });

        expect(getPropsHistory()).toEqual([
            { autoHidden: false },
            { autoHidden: true },
            { autoHidden: true },
            { autoHidden: false },
        ]);
    });

    test("popAndGetPreviousProps", () => {
        act(() => {
            renderer.create(
                <View>
                    <HomeIndicator autoHidden={false} />
                    <HomeIndicator autoHidden />
                    <HomeIndicator autoHidden />
                    <HomeIndicator autoHidden={false} />
                </View>
            );
        });

        expect(popAndGetPreviousProps()).toEqual({ autoHidden: true });
    });

    test("ensure component renders null", () => {
        const component = renderer.create(<PrefersHomeIndicatorAutoHidden />);
        expect(component.toJSON()).toEqual(null);
    });
});
