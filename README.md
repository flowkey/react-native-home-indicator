[![npm version](https://badge.fury.io/js/react-native-home-indicator.svg)](https://badge.fury.io/js/react-native-home-indicator)
[![CircleCI](https://circleci.com/gh/flowkey/react-native-home-indicator.svg?style=svg)](https://circleci.com/gh/flowkey/react-native-home-indicator)
[![codecov](https://codecov.io/gh/flowkey/react-native-home-indicator/branch/master/graph/badge.svg)](https://codecov.io/gh/flowkey/react-native-home-indicator)

A declarative approach for hiding the iPhone X Home Indicator in react-native.

## Getting Started

#### 1. Add dependency
`npm install react-native-home-indicator --save`

#### 2. Link library
follow the [manual linking steps](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#manual-linking)

#### 3. Add Header to Search Path
Because you need to call react-native-home-indicator from native, ensure that you add `$(SRCROOT)/../node_modules/react-native-home-indicator/ios` to your Header Search Paths as [described here](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#step-3)

#### 4. Changes in Appdelegate.m

```objective-c
// add to your imports
#import <RNHomeIndicator.h>
```

```objective-c
// find this line
UIViewController *rootViewController = [UIViewController new];
```

```objective-c
// and replace with
UIViewController *rootViewController = [HomeIndicatorViewController new];
```


## Simple Usage

Render `<PrefersHomeIndicatorAutoHidden />` to signal your preference for hiding the Home Indicator. 
"The system takes your preference into account, but returning true is no guarantee that the indicator will be hidden." 
see [developer.apple.com/documentation](https://developer.apple.com/documentation/uikit/uiviewcontroller/2887510-prefershomeindicatorautohidden)

```jsx
...
import PrefersHomeIndicatorAutoHidden from 'react-native-home-indicator';

const SomeReactNativeComponent = () => {
    return (
        <View>
            <PrefersHomeIndicatorAutoHidden />
            ...
        </View>
    );
}
```

## Extended Usage

For more complex usage you can use the `HomeIndicator` component which allows passing your preferred
indicator setting as prop. Its even possible to override previous rendered indicator preferences as
you can see in the following example.

```jsx
...
import { HomeIndicator } from 'react-native-home-indicator';

const SomeReactNativeComponent = () => {
    return (
        <View>
            <HomeIndicator autoHidden />
            <SomeDeepComponentTree>
                 <HomeIndicator autoHidden={false} />
            </SomeDeepComponentTree>
        </View>
    );
}
```
