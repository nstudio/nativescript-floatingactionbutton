var view = require("ui/core/view");
var color = require("color");
var frameModule = require("ui/frame");
var dObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
var swipeLoaded = false;
    
var FloatingActionButton = (function (_super) {
    global.__extends(FloatingActionButton, _super);

    function FloatingActionButton() {
        _super.call(this);
    }
    

    FloatingActionButton.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);

        if(swipeLoaded === false){
            var fab = this;
            var viewToAttachTo = this.hideOnSwipeOfView;
            if(viewToAttachTo !== undefined){
                var swipeItem = this.page.getViewById(viewToAttachTo);

                if(swipeItem !== undefined){
                    console.log("Wiring up swipe");
                    var duration = (this.hideAnimationDuration == undefined) ? 300 : this.hideAnimationDuration;
                    swipeItem.on("swipe", function (args) { 
                        //Swipe up
                        if (args.direction === 4) {
                            fab.animate({
                                translate: { x: 0, y: 200 },
                                opacity: 0,
                                duration: duration
                            });
                        } 
                        //Swipe Down
                        else if (args.direction === 8) {
                            fab.animate({
                                translate: { x: 0, y: 0 },
                                opacity: 1,
                                duration: duration
                            });
                        };  
                    });
                    
                    swipeLoaded = true;
                }
            }
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
