
#import "RNHomeIndicator.h"

@implementation HomeIndicatorViewController

- (BOOL)prefersHomeIndicatorAutoHidden {
    return self.prefersAutoHidden;
}

- (UIRectEdge)preferredScreenEdgesDeferringSystemGestures {
	return UIRectEdgeBottom;
}

@end


@implementation RNHomeIndicator

- (id) init {
    [self setPrefersAutoHidden:NO];
	[self setRequireDoubleSwipe:NO];
    return [super init];
}

- (void) setPrefersAutoHidden: (BOOL) newValue {
    HomeIndicatorViewController *rootViewController = [self getHomeIndicatorViewController];

    rootViewController.prefersAutoHidden = newValue;
    if (@available(iOS 11.0, *)) {
        [rootViewController setNeedsUpdateOfHomeIndicatorAutoHidden];
    }
}

- setRequireDoubleSwipe: (BOOL) newValue {
	HomeIndicatorViewController *rootViewController = [self getHomeIndicatorViewController];

	rootViewController.requireDoubleSwipe = newValue;
	[rootViewController setNeedsUpdateOfScreenEdgesDeferringSystemGestures];
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

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(alwaysVisible) {
    [self setPrefersAutoHidden:NO];
}

RCT_EXPORT_METHOD(autoHidden) {
    [self setPrefersAutoHidden:YES];
}

RCT_EXPORT_METHOD(requireSingleSwipe) {
	[self setRequireDoubleSwipe:NO];
}

RCT_EXPORT_METHOD(requireDoubleSwipe) {
	[self setRequireDoubleSwipe:YES];
}

@end


  
