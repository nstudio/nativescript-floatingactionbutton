var view = require("ui/core/view");
var color = require("color");
var frameModule = require("ui/frame");
var dObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");

var FloatingActionButton = (function (_super) {
    global.__extends(FloatingActionButton, _super);

    function FloatingActionButton() {
        _super.call(this);
    }
    
    FloatingActionButton.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        var fab = this;
        var viewToAttachTo = this.hideOnSwipeOfView;
        var swipeItem = this.page.getViewById(viewToAttachTo);
        
        if(swipeItem !== undefined){
            var duration = (this.hideAnimationDuration == undefined) ? 300 : this.hideAnimationDuration;
            
            //Wire up action
            swipeItem.on("swipe", function (args) {
 
            //if scrolling down (swipe up) --  hide FAB
            if (args.direction === 4) {
                    fab.animate({
                        translate: { x: 0, y: 200 },
                        opacity: 0,
                        duration: duration
                    });
                } //if scrolling up (swipe down) -- show FAB
                else if (args.direction === 8) {
                    fab.animate({
                        translate: { x: 0, y: 0 },
                        opacity: 1,
                        duration: duration
                    });
                };  
            });
        }
    };

    Object.defineProperty(FloatingActionButton.prototype, "rippleColor", {
        get: function () {
            return this._getValue(FloatingActionButton.rippleColorProperty);
        },
        set: function (value) {
            this._setValue(FloatingActionButton.rippleColorProperty, value);
        }
    });

    Object.defineProperty(FloatingActionButton.prototype, "backColor", {
        get: function () {
            return this._getValue(FloatingActionButton.backColorProperty);
        },
        set: function (value) {
            this._setValue(FloatingActionButton.backColorProperty, value);
        }
    });

    Object.defineProperty(FloatingActionButton.prototype, "icon", {
        get: function () {
            return this._getValue(FloatingActionButton.iconProperty);
        },
        set: function (value) {
            this._setValue(FloatingActionButton.iconProperty, value);
        }
    });

    FloatingActionButton.backColorProperty = new dObservable.Property("backColor", "FloatingActionButton", new proxy.PropertyMetadata(0, dObservable.PropertyMetadataSettings.AffectsLayout));
    FloatingActionButton.iconProperty = new dObservable.Property("icon", "FloatingActionButton", new proxy.PropertyMetadata(0, dObservable.PropertyMetadataSettings.AffectsLayout));
    FloatingActionButton.rippleColorProperty = new dObservable.Property("rippleColor", "FloatingActionButton", new proxy.PropertyMetadata(0, dObservable.PropertyMetadataSettings.AffectsLayout));
    
    
    return FloatingActionButton;
})(view.View);


exports.Fab = FloatingActionButton;
