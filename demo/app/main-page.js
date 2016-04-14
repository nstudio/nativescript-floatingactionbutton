var app = require("application");
var observable = require("data/observable");
var observableArrayModule = require("data/observable-array");
var platformModule = require("platform");
var color = require("color");
var fab;
  
var users = [
    { name: 'Billy Bob' },
    { name: 'Tweeder' }, 
    { name: 'Mox' },
    { name: 'Coach' },
    { name: 'Lance' },
    { name: 'Johnson' },
    { name: 'William' },
    { name: 'Franklin' },
    { name: 'Billy Bob' },
    { name: 'Tweeder' }, 
    { name: 'Mox' },
    { name: 'Coach' },
    { name: 'Lance' },
    { name: 'Johnson' },
    { name: 'William' },
    { name: 'Franklin' }
];
var viewModel = new observable.Observable({
    users: new observableArrayModule.ObservableArray(users)
});

function pageLoaded(args) {
    var page = args.object; 
    if(app.android){
        // Change statusbar color on Lollipop
        if (platformModule.device.sdkVersion >= "21") {
            var window = app.android.startActivity.getWindow(); 
            window.setStatusBarColor(new color.Color("#303F9F").android);
        }
    }
    page.bindingContext = viewModel;
    fab = page.getViewById("fabButton");
}
exports.pageLoaded = pageLoaded;

exports.fabTap = function(args){
    viewModel.users.unshift({ name: "Gary"}); 
}

exports.onAnimateUp = function(args){
    fab.swipeAnimation = "slideUp";
}