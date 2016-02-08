var view = require("ui/core/view");
var color = require("color");

var FloatingActionButton = (function (_super) {

    global.__extends(FloatingActionButton, _super);

    function FloatingActionButton() {
        _super.call(this);
    }

    Object.defineProperty(FloatingActionButton.prototype, "rippleColor", {
        get: function () {
            return this.rippleColorProperty;
        },
        set: function(value){
            this.rippleColorProperty = new color.Color(value);
        }
    });

    Object.defineProperty(FloatingActionButton.prototype, "backColor", {
        get: function () {
            return this.backColorProperty;
        },
        set: function(value){
            this.backColorProperty = new color.Color(value);
        }
    });

    Object.defineProperty(FloatingActionButton.prototype, "icon", {
        get: function () {
            return this.iconProperty;
        },
        set: function(value){
            this.iconProperty = value;
        }
    });

    return FloatingActionButton;
})(view.View);

exports.Fab = FloatingActionButton;
