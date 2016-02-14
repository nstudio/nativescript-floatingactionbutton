/**************************************************************************************
 * Made for the {N} community by Brad Martin @BradWayneMartin
 * Thanks to Lazaro Danillo for his contributions - https://github.com/lazaromenezes
 * https://twitter.com/BradWayneMartin
 * https://github.com/bradmartin
 * Pull requests are welcome. Enjoy!
 *************************************************************************************/

 var common = require("./fab-common");
 var ImageSource = require("image-source");

 require("utils/module-merge").merge(common, module.exports);

 var FloatingActionButton = (function (_super) {

     global.__extends(FloatingActionButton, _super);

     function FloatingActionButton() {
         _super.apply(this, arguments);
     }

     FloatingActionButton.prototype._createUI = function () {

         this._android = new android.support.design.widget.FloatingActionButton(this._context);

         if(this.rippleColor)
            this._android.setRippleColor(this.rippleColor.android);

         if (this.backColor)
             this._android.setBackgroundTintList(android.content.res.ColorStateList.valueOf(this.backColor.android));

        if(this.icon){
          var iconDrawable = null;

          if(ImageSource.isFileOrResourcePath(this.icon)){
            iconDrawable = ImageSource.fromFileOrResource(this.icon);
            this._android.setImageBitmap(iconDrawable.android);
          }
          else{
            var drawableId = android.content.res.Resources.getSystem().getIdentifier(this.icon, "drawable", "android");
            iconDrawable = android.content.res.Resources.getSystem().getDrawable(drawableId);
            this._android.setImageDrawable(iconDrawable);
          }
        }

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
