
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <UIKit/UIKit.h>


@interface HomeIndicatorViewController : UIViewController
@property BOOL prefersAutoHidden;
@property BOOL requireDoubleSwipe;
@end

@interface RNHomeIndicator : NSObject <RCTBridgeModule>
@end

  
