/**************************************************************************************
 * Made for the {N} community by Brad Martin @BradWayneMartin
 * Thanks to Lazaro Danillo for his contributions - https://github.com/lazaromenezes
 * https://twitter.com/BradWayneMartin
 * https://github.com/bradmartin
 * Pull requests are welcome. Enjoy!
 *************************************************************************************/

 var common = require("./fab-common");
 var ImageSource = require("image-source");
var style = require("ui/styling/style");

 require("utils/module-merge").merge(common, module.exports);

var FloatingActionButton = (function (_super) {
    global.__extends(FloatingActionButton, _super);
    
    function FloatingActionButton() {
        var _this = this;
        _super.call(this);
        var size = CGRectMake(0, 0, 50, 50);
        this._ios = MNFloatingActionButton.alloc().initWithFrame(size);

    }
    
    Object.defineProperty(FloatingActionButton.prototype, "ios", {
        get: function () {
            return this._ios;
        }
    });
    
    return FloatingActionButton;
    
})(common.Fab);

exports.Fab = FloatingActionButton;
 
// this function is called when the `color` Style property changes on a `NumberPicker` instance 
function setColor(view, value) {
    var fab = view.ios;

    // value is UIColor, so we may apply it directly
    fab.backgroundColor = value;
}

// this function is called when the `color` Style property changes and the new value is `undefined`
function resetColor(view, value) {
    var fab = view.ios;

    // value is native UIColor, so apply it directly
    fab.backgroundColor = value;
}

// this function is called when the `Styler` is about to reset the `color` property to its default (original) value.
function getNativeColorValue(view) {
    var fab = view.ios;

    return fab.backgroundColor;
}
debugger;
var changedHandler = new style.StylePropertyChangedHandler(setColor, resetColor, getNativeColorValue);

// register the handler for the color property on the NumberPicker type
style.registerHandler(style.properties.colorProperty, changedHandler, "FloatingActionButton");