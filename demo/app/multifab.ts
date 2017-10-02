import * as app from "tns-core-modules/application";
import * as observable from "tns-core-modules/data/observable";
import * as observableArrayModule from "tns-core-modules/data/observable-array";
import * as platformModule from "tns-core-modules/platform";
import * as color from "tns-core-modules/color";
import * as frame from "tns-core-modules/ui/frame";

export function pageLoaded(args) {
  const page = args.object;
  if (platformModule.isAndroid) {
    // Change statusbar color on Lollipop
    if (platformModule.device.sdkVersion >= "21") {
      const window = app.android.startActivity.getWindow();
      window.setStatusBarColor(new color.Color("#303F9F").android);
    }
  }
}
// exports.pageLoaded = pageLoaded;

export function fabTap(args) {
  alert("tap");
  frame.topmost().goBack();
}

export function animate(args) {
  args.object.animate({
    duration: 500,
    target: args.object,
    opacity: 0,
    translate: { x: 100, y: 200 }
  });
}
