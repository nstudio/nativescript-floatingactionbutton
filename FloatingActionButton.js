var color = require("color");
var app = require("application");
var utils = require("utils/utils");

exports.creatingFab = function (args) {

    try {
        // Check for android app
        if (app.android) {

            // Get ref to the placeholder
            var fabPlaceholder = args.object.parent.getViewById("nativeScriptFabButton");
            console.log(fabPlaceholder);

            // Construct the native FAB button
            var fab = new android.support.design.widget.FloatingActionButton(app.android.currentContext);

            // Get icon from resources and set as FAB icon
            // Using the icon property set on the users <FloatingActionButton icon property>
            var res = utils.ad.getApplicationContext().getResources();
            if (res) {
                var identifier = res.getIdentifier(fabPlaceholder.icon, 'drawable', utils.ad.getApplication().getPackageName());
                if (0 < identifier) {
                    var bitmapDrawable = res.getDrawable(identifier);
                    // Here we set the ICON of the FAB button
                    fab.setImageDrawable(bitmapDrawable);
                }
            }

            // Check for and set Background color
            if (fabPlaceholder.backColor) {
                var backColor = fabPlaceholder.backColor;
                var bColor = new color.Color(backColor);
                fab.setBackgroundTintList(android.content.res.ColorStateList.valueOf(bColor.android));
            }

            // Check for and set Ripple color - fills background on pre-lollipop
            if (fabPlaceholder.rippleColor) {
                var rippleColor = fabPlaceholder.rippleColor;
                var rColor = new color.Color(rippleColor);
                fab.setRippleColor(rColor.android);
            }
            
            fab.show();

            args.view = fab;

        };

    } catch (ex) {
        console.log(ex);
    }
}