var app = require("tns-core-modules/application");
var observable = require("tns-core-modules/data/observable");
var observableArrayModule = require("tns-core-modules/data/observable-array");
var platformModule = require("tns-core-modules/platform");
var color = require("tns-core-modules/color");
var frame = require("tns-core-modules/ui/frame");

function pageLoaded(args) {
  var page = args.object;
  if (platformModule.isAndroid) {
    // Change statusbar color on Lollipop
    if (platformModule.device.sdkVersion >= "21") {
      var window = app.android.startActivity.getWindow();
      window.setStatusBarColor(new color.Color("#303F9F").android);
    }
  }
}
exports.pageLoaded = pageLoaded;

exports.fabTap = function(args) {
  alert("tap");
  frame.topmost().goBack();
};

exports.animate = function(args) {
  args.object.animate({
    duration: 500,
    target: args.object,
    opacity: 0,
    translate: { x: 100, y: 200 }
  });
};
