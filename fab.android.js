/**************************************************************************************
 * Made for the {N} community by Brad Martin @BradWayneMartin
 * Thanks to Lazaro Danillo for his contributions - https://github.com/lazaromenezes
 * https://twitter.com/BradWayneMartin
 * https://github.com/bradmartin
 * Pull requests are welcome. Enjoy!
 *************************************************************************************/

 var common = require("./fab-common");
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
        fab.android.setImageBitmap(iconDrawable.android);
    }
    else{
        var drawableId = android.content.res.Resources.getSystem().getIdentifier(icon, "drawable", "android");
        iconDrawable = android.content.res.Resources.getSystem().getDrawable(drawableId);
        fab.android.setImageDrawable(iconDrawable);
    }
}
common.Fab.iconProperty.metadata.onSetNativeValue = onIconPropertyChanged;

//Ripple Color
function onRippleColorPropertyChanged(data) {
    if(color.Color.isValid(data.newValue)){
        var fab = data.object;
        var droidColor = new color.Color(data.newValue).android;
        fab.android.setRippleColor(droidColor);
    }
}
common.Fab.rippleColorProperty.metadata.onSetNativeValue = onRippleColorPropertyChanged;