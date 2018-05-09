
#import "RNHomeIndicator.h"

@implementation HomeIndicatorViewController

- (BOOL)prefersHomeIndicatorAutoHidden {
    return self.prefersAutoHidden;
}

@end


@implementation HomeIndicatorManager

- (id) init {
    [self setPrefersAutoHidden:NO];
    return [super init];
}

- (void) setPrefersAutoHidden: (BOOL) newValue {
    HomeIndicatorViewController *rootViewController = [self getHomeIndicatorViewController];

    rootViewController.prefersAutoHidden = newValue;
    if (@available(iOS 11.0, *)) {
        [rootViewController setNeedsUpdateOfHomeIndicatorAutoHidden];
    }
}

- (HomeIndicatorViewController*) getHomeIndicatorViewController {
    UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
    NSAssert(
        [rootViewController isKindOfClass:[HomeIndicatorViewController class]],
        @"rootViewController is not of type HomeIndicatorViewController as expected."
    );
    return (HomeIndicatorViewController*) rootViewController;
}


- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(setHidden:(BOOL)hidden) {
    [self setPrefersAutoHidden:hidden];
}

@end
