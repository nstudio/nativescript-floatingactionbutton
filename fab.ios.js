/**************************************************************************************
 * Made for the {N} community by Brad Martin @BradWayneMartin
 * Thanks to Lazaro Danillo for his contributions - https://github.com/lazaromenezes
 * https://twitter.com/BradWayneMartin
 * https://github.com/bradmartin
 * Pull requests are welcome. Enjoy!
 * Cocoapod via: https://cocoapods.org/pods/KCFloatingActionButton by Lee Sun-hyoup
 *************************************************************************************/

var common = require("./fab-common");
var ImageSource = require("image-source");
var stateChanged = require("ui/core/control-state-change");
var style = require("ui/styling/style");
var utils = require("utils/utils");
var color = require("color");
var enums = require("ui/enums");



require("utils/module-merge").merge(common, module.exports);

var FloatingActionButton = (function (_super) {
    global.__extends(FloatingActionButton, _super);
    
    function FloatingActionButton() {
        var _this = this;
        _super.call(this);

        var button = KCFloatingActionButton.alloc().init();
        this._ios = button;
        
    }
    
    Object.defineProperty(FloatingActionButton.prototype, "ios", {
        get: function () {
            return this._ios;
        }
    });

    return FloatingActionButton;
    
})(common.Fab);

exports.Fab = FloatingActionButton;

/* SETUP CSS */
var FloatingActionButtonStyler = (function () {
    function FloatingActionButtonStyler() {
    }
    // COLOR
    FloatingActionButtonStyler.setColorProperty = function (view, newValue) {
        var fab = view.ios;
        fab.plusColor = newValue;
    };
    FloatingActionButtonStyler.resetColorProperty = function (view, nativeValue) {
        var fab = view.ios;
        fab.plusColor = nativeValue;
    };
    FloatingActionButtonStyler.getNativeColorValue = function (view) {
        var fab = view.ios;
        return fab.plusColor;
    };
    
    // BACKGROUND COLOR
    FloatingActionButtonStyler.setBackgroundColorProperty = function (view, newValue) {
        var fab = view.ios;
        fab.buttonColor = newValue;
    };
    FloatingActionButtonStyler.resetBackgroundColorProperty = function (view, nativeValue) {
        var fab = view.ios;
        fab.buttonColor = nativeValue;
    };
    FloatingActionButtonStyler.getNativeBackgroundColorValue = function (view) {
        var fab = view.ios;
        return fab.buttonColor;
    };
    
    // WIDTH\HEIGHT
    FloatingActionButtonStyler.setSizeProperty = function (view, newValue) {
        var fab = view.ios;
        fab.size = newValue;
    };
    FloatingActionButtonStyler.resetSizeProperty = function (view, nativeValue) {
        var fab = view.ios;
        fab.size = nativeValue;
    };
    FloatingActionButtonStyler.getNativeSizeValue = function (view) {
        var fab = view.ios;
        return fab.size;
    };
    
    FloatingActionButtonStyler.registerHandlers = function () {
        style.registerHandler(style.colorProperty, new style.StylePropertyChangedHandler(FloatingActionButtonStyler.setColorProperty, FloatingActionButtonStyler.resetColorProperty, FloatingActionButtonStyler.getNativeColorValue), "FloatingActionButton");
        style.registerHandler(style.backgroundColorProperty, new style.StylePropertyChangedHandler(FloatingActionButtonStyler.setBackgroundColorProperty, FloatingActionButtonStyler.resetBackgroundColorProperty, FloatingActionButtonStyler.getNativeBackgroundColorValue), "FloatingActionButton");
        style.registerHandler(style.backgroundInternalProperty, style.ignorePropertyHandler, "FloatingActionButton");
        style.registerHandler(style.widthProperty, new style.StylePropertyChangedHandler(FloatingActionButtonStyler.setSizeProperty, FloatingActionButtonStyler.resetSizeProperty, FloatingActionButtonStyler.getNativeSizeValue), "FloatingActionButton");
        style.registerHandler(style.heightProperty, new style.StylePropertyChangedHandler(FloatingActionButtonStyler.setSizeProperty, FloatingActionButtonStyler.resetSizeProperty, FloatingActionButtonStyler.getNativeSizeValue), "FloatingActionButton");
    };
    return FloatingActionButtonStyler;
})();
exports.FloatingActionButtonStyler = FloatingActionButtonStyler;
FloatingActionButtonStyler.registerHandlers();


/* SETUP PROPERTIES */
//Background Color
function onBackColorPropertyChanged(data) {
    if(color.Color.isValid(data.newValue)){
        var fab = data.object;
        fab.ios.buttonColor = new color.Color(data.newValue).ios;
    }
}
common.Fab.backColorProperty.metadata.onSetNativeValue = onBackColorPropertyChanged;

//Icon
function onIconPropertyChanged(data) {
    if(ImageSource.isFileOrResourcePath(data.newValue)){
        //Cocoapod doesn't support this yet afaik
        //var newImage = ImageSource.fromFileOrResource(data.newValue);
    }
}
common.Fab.iconProperty.metadata.onSetNativeValue = onIconPropertyChanged;