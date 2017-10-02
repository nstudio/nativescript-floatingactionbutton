var app = require("tns-core-modules/application");
var observable = require("tns-core-modules/data/observable");
var observableArrayModule = require("tns-core-modules/data/observable-array");
var platformModule = require("tns-core-modules/platform");
var frameModule = require("tns-core-modules/ui/frame");
var color = require("tns-core-modules/color");

var users = [
  { name: "Billy Bob" },
  { name: "Tweeder" },
  { name: "Mox" },
  { name: "Coach" },
  { name: "Lance" },
  { name: "Johnson" },
  { name: "William" },
  { name: "Franklin" },
  { name: "Billy Bob" },
  { name: "Tweeder" },
  { name: "Mox" },
  { name: "Coach" },
  { name: "Lance" },
  { name: "Johnson" },
  { name: "William" },
  { name: "Franklin" }
];
var viewModel = observable.fromObject({
  users: new observableArrayModule.ObservableArray(users)
});

function pageLoaded(args) {
  var page = args.object;
  if (platformModule.isAndroid) {
    // Change statusbar color on Lollipop
    if (platformModule.device.sdkVersion >= "21") {
      var window = app.android.startActivity.getWindow();
      window.setStatusBarColor(new color.Color("#303F9F").android);
    }
  }
  page.bindingContext = viewModel;
}
exports.pageLoaded = pageLoaded;

exports.fabTap = function(args) {
  viewModel.users.unshift({ name: "Gary" });
};

exports.goMultiFab = function(args) {
  frameModule.topmost().navigate("multifab");
};
