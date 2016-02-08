var app = require("application");
var platformModule = require("platform");
var color = require("color");

function pageLoaded(args) {
    var page = args.object; 
    // Change statusbar color on Lollipop
    if (platformModule.device.sdkVersion >= "21") {
        var window = app.android.startActivity.getWindow(); 
        window.setStatusBarColor(new color.Color("#303F9F").android);
    }
}
exports.pageLoaded = pageLoaded;