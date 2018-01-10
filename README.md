[![npm version](https://badge.fury.io/js/react-native-home-indicator.svg)](https://badge.fury.io/js/react-native-home-indicator)

A declarative approach for hiding the iPhone X Home Indicator in react-native.

## Getting Started

#### 1. Add dependency
`npm install react-native-home-indicator --save`

#### 2. Link library
follow the [manual linking steps](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#manual-linking)

#### 3. Changes in Appdelegate.m

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


## Usage

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

Render `<PrefersHomeIndicatorAutoHidden />` to signal your preference for hiding the Home Indicator. 
"The system takes your preference into account, but returning true is no guarantee that the indicator will be hidden." 

see [developer.apple.com/documentation](https://developer.apple.com/documentation/uikit/uiviewcontroller/2887510-prefershomeindicatorautohidden)
