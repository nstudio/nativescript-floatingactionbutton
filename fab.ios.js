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

        var button = MNFloatingActionButton.alloc().init();
        
        button.animationScale = 0.95;
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
    
    // BACKGROUND COLOR
    FloatingActionButtonStyler.setBackgroundColorProperty = function (view, newValue) {
        var fab = view.ios;
        fab.backgroundColor = newValue;
    };
    FloatingActionButtonStyler.resetBackgroundColorProperty = function (view, nativeValue) {
        var fab = view.ios;
        fab.backgroundColor = nativeValue;
    };
    FloatingActionButtonStyler.getNativeBackgroundColorValue = function (view) {
        var fab = view.ios;
        return fab.backgroundColor;
    };
    
    // WIDTH\HEIGHT
    FloatingActionButtonStyler.setSizeProperty = function (view, newValue) {
        var fab = view.ios;
        if (isNaN(newValue)) return;
        fab.bounds.size.width = newValue;
        fab.bounds.size.height = newValue;

        centerIcon(view, newValue); //move image back to center
    };
    FloatingActionButtonStyler.resetSizeProperty = function (view, nativeValue) {
        var fab = view.ios;
        fab.bounds.size.width = nativeValue;
    };
    FloatingActionButtonStyler.getNativeSizeValue = function (view) {
        var fab = view.ios;
        return fab.bounds.size.width;
    };
    
    FloatingActionButtonStyler.registerHandlers = function () {
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
        fab.ios.backgroundColor = new color.Color(data.newValue).ios;
    }
}
common.Fab.backColorProperty.metadata.onSetNativeValue = onBackColorPropertyChanged;

//Icon
function onIconPropertyChanged(data) {
    var fab = data.object;
    var icon = data.newValue;
    var iconDrawable = null;


    var newImageView = null;
    if(ImageSource.isFileOrResourcePath(icon)){
        iconDrawable = ImageSource.fromFileOrResource(icon);

        //Set the new one    
        if (iconDrawable !== null) {
            newImageView = UIImageView.alloc().initWithImage(iconDrawable.ios);
        } 
    }else{
        //Default image
        var defaultImage = ImageSource.fromBase64("iVBORw0KGgoAAAANSUhEUgAAAJAAAACQAQAAAADPPd8VAAAAAnRSTlMAAHaTzTgAAAAqSURBVHgBY6AMjIJRYP9n0AuNCo0KMf+HgwPDTmgoRMeo0KgQRWAUjAIABsnZRR7bYyUAAAAASUVORK5CYII=");

        newImageView = UIImageView.alloc().initWithImage(defaultImage.ios);
       
    }

    if(newImageView !== null){
        //Kill the old Image, cocoapod doesn't support changing it yet
        var button = fab.ios.subviews[0];     
        var oldBadImageView = button.subviews[0];
        oldBadImageView.removeFromSuperview();
    
        //Add the new guy
        button.addSubview(newImageView);
    }
}
common.Fab.iconProperty.metadata.onSetNativeValue = onIconPropertyChanged;

function centerIcon(fab, newValue) {
    var button = fab.ios.subviews[0];     
    var imageView = button.subviews[0];

    imageView.contentMode = UIViewContentModeScaleAspectFit;
    imageView.frame = CGRectMake(0, 0, imageView.frame.size.width, newValue / 2); //resize
    
    imageView.center = CGPointMake(newValue / 2, 
                                   newValue / 2);
}
