var common = require("./fab-common");
var style = require("ui/styling/style");
var utils = require("utils/utils");
var color = require("color");
var ImageSource = require("image-source");

 require("utils/module-merge").merge(common, module.exports);

 var FloatingActionButton = (function (_super) {

     global.__extends(FloatingActionButton, _super);

     function FloatingActionButton() {
         _super.apply(this, arguments);
     }

     FloatingActionButton.prototype._createUI = function () {

         this._android = new android.support.design.widget.FloatingActionButton(this._context);

         var that = new WeakRef(this);

         this._android.setOnClickListener(new android.view.View.OnClickListener({
              get owner() {
                  return that.get();
              },

              onClick: function (v) {
                  if (this.owner) {
                      this.owner._emit("tap");
                  }
              }
        }));
     };

     Object.defineProperty(FloatingActionButton.prototype, "android", {
         get: function () {
             return this._android;
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
        var fab = view.android;
        fab.setBackgroundTintList(android.content.res.ColorStateList.valueOf(newValue));
    };
    FloatingActionButtonStyler.resetBackgroundColorProperty = function (view, nativeValue) {
        var fab = view.android;
        fab.setBackgroundTintList(android.content.res.ColorStateList.valueOf(nativeValue));
    };
    FloatingActionButtonStyler.getNativeBackgroundColorValue = function (view) {
        var fab = view.android;
        return fab.getBackgroundTintList();
    };

    FloatingActionButtonStyler.registerHandlers = function () {
        style.registerHandler(style.backgroundColorProperty, new style.StylePropertyChangedHandler(FloatingActionButtonStyler.setBackgroundColorProperty, FloatingActionButtonStyler.resetBackgroundColorProperty, FloatingActionButtonStyler.getNativeBackgroundColorValue), "FloatingActionButton");
        style.registerHandler(style.backgroundInternalProperty, style.ignorePropertyHandler, "FloatingActionButton");
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
        var droidColor = new color.Color(data.newValue).android;
        fab.android.setBackgroundTintList(android.content.res.ColorStateList.valueOf(droidColor));
    }
}
common.Fab.backColorProperty.metadata.onSetNativeValue = onBackColorPropertyChanged;

//Icon
function onIconPropertyChanged(data) {
    var fab = data.object;
    var icon = data.newValue;
    var iconDrawable = null;

    if(ImageSource.isFileOrResourcePath(icon)){
        iconDrawable = ImageSource.fromFileOrResource(icon);
        if (iconDrawable) {
            fab.android.setImageBitmap(iconDrawable.android);
        } else {
            console.log("The icon: " + icon + " was not found. Check your XML icon property.");
        }
    } else {
        var drawableId = android.content.res.Resources.getSystem().getIdentifier(icon, "drawable", "android");
        iconDrawable = android.content.res.Resources.getSystem().getDrawable(drawableId);
        if (iconDrawable) {
            fab.android.setImageDrawable(iconDrawable);
        } else {
            console.log("The icon: " + icon + " was not found. Check your XML icon property.");
        }
    }
}
common.Fab.iconProperty.metadata.onSetNativeValue = onIconPropertyChanged;

//Ripple Color
function onRippleColorPropertyChanged(data) {
    if(color.Color.isValid(data.newValue)){
        var fab = data.object;
        var droidColor = new color.Color(data.newValue).android;
        fab.android.setRippleColor(droidColor);
    } else {
        console.log("The ripple color: " + data.newValue + " is invalid.");
    }
}
common.Fab.rippleColorProperty.metadata.onSetNativeValue = onRippleColorPropertyChanged;
