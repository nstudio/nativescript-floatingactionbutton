var app = require("application");
var observable = require("data/observable");
var observableArrayModule = require("data/observable-array");
var platformModule = require("platform");
var color = require("color");
var fab;

function pageLoaded(args) {
    var page = args.object; 
    if(app.android){
        // Change statusbar color on Lollipop
        if (platformModule.device.sdkVersion >= "21") {
            var window = app.android.startActivity.getWindow(); 
            window.setStatusBarColor(new color.Color("#303F9F").android);
        }
    }

    fab = page.getViewById("fabButton");
}
exports.pageLoaded = pageLoaded;

exports.fabTap = function(args){
    alert("tap");
}
