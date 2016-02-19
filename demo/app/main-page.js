var app = require("application");
var observable = require("data/observable");
var observableArrayModule = require("data/observable-array");
var platformModule = require("platform");
var color = require("color");
  
var users = [
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
}
exports.pageLoaded = pageLoaded;

exports.fabTap = function(args){
    viewModel.users.push({ name: "Gary"});
}