import React, { useEffect } from "react";
import { NativeModules, Platform } from "react-native";

const { RNHomeIndicator } = NativeModules;
const isIos = Platform.OS === "ios";

type Props = { autoHidden: boolean };

export const HomeIndicator = (props: Props) => {
    useEffect(() => {
        if (!isIos) return;

        propsHistory.push(props);
        updateNativeHomeIndicator({ autoHidden: props.autoHidden });

        return () => {
            if (!isIos) return;

            const previousProps = popAndGetPreviousProps();
            updateNativeHomeIndicator({ autoHidden: previousProps.autoHidden });
        };
    });

    return null;
};

const propsHistory: Props[] = [];
function popAndGetPreviousProps() {
    propsHistory.pop();
    return propsHistory[propsHistory.length - 1] || { autoHidden: false };
}

function updateNativeHomeIndicator({ autoHidden = false }: { autoHidden: boolean }) {
    if (autoHidden) {
        RNHomeIndicator.autoHidden();
    } else {
        RNHomeIndicator.alwaysVisible();
    }
}

// keep this for backwards compatibility
const PrefersHomeIndicatorAutoHidden = () => <HomeIndicator autoHidden />;
export default PrefersHomeIndicatorAutoHidden;
