/**************************************************************************************
 * Made for the {N} community by Brad Martin @BradWayneMartin
 * Thanks to Lazaro Danillo for his contributions - https://github.com/lazaromenezes
 * Thanks to Steve McNiven-Scott for his contributions - https://github.com/sitefinitysteve
 * Thanks to Gabriel Marinho for his contributions - https://github.com/gabrielbiga
 * https://twitter.com/BradWayneMartin
 * https://github.com/bradmartin
 * Pull requests are welcome. Enjoy!
 *************************************************************************************/

var view = require("ui/core/view");
var color = require("color");
var frameModule = require("ui/frame");
var dObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");

var FloatingActionButton = (function (_super) {
    global.__extends(FloatingActionButton, _super);

    function FloatingActionButton() {
        _super.call(this);

        this.swipeEventAttached = false;

        this.getDurationDefault = function (animationType) {
            switch (animationType) {
                case "scale":
                    return 100;
                default:
                    return 300;
            }
        };
    }


    FloatingActionButton.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);

        if (this.swipeEventAttached === false) {
            var fab = this;
            var viewToAttachTo = this.hideOnSwipeOfView;
            if (viewToAttachTo !== undefined) {
                var swipeItem = frameModule.topmost().getViewById(viewToAttachTo);
                var animationType = (this.swipeAnimation) ? this.swipeAnimation : "slideDown"

                if (swipeItem !== undefined) {
                    var duration = (this.hideAnimationDuration) ? this.hideAnimationDuration : this.getDurationDefault(animationType);

                    swipeItem.on("pan", function (args) {
                        //Swipe up
                        if (args.deltaY < -10) {
                            switch (animationType) {
                                case "slideUp":
                                    fab.animate({
                                        translate: {
                                            x: 0,
                                            y: -200
                                        },
                                        opacity: 0,
                                        duration: duration
                                    });
                                    break;
                                case "slideDown":
                                    fab.animate({
                                        translate: {
                                            x: 0,
                                            y: 200
                                        },
                                        opacity: 0,
                                        duration: duration
                                    });
                                    break;
                                case "slideRight":
                                    fab.animate({
                                        translate: {
                                            x: 200,
                                            y: 0
                                        },
                                        opacity: 0,
                                        duration: duration
                                    });
                                    break;
                                case "slideLeft":
                                    fab.animate({
                                        translate: {
                                            x: -200,
                                            y: 0
                                        },
                                        opacity: 0,
                                        duration: duration
                                    });
                                    break;
                                case "scale":
                                    fab.animate({
                                        scale: {
                                            x: 0,
                                            y: 0
                                        },
                                        duration: duration
                                    });
                                    break;
                            }

                        }
                        //Swipe Down
                        else if (args.deltaY > 0) {
                            switch (animationType) {
                                case "slideUp":
                                    fab.animate({
                                        translate: {
                                            x: 0,
                                            y: 0
                                        },
                                        opacity: 1,
                                        duration: duration
                                    });
                                    break;
                                case "slideDown":
                                    fab.animate({
                                        translate: {
                                            x: 0,
                                            y: 0
                                        },
                                        opacity: 1,
                                        duration: duration
                                    });
                                    break;
                                case "slideRight":
                                    fab.animate({
                                        translate: {
                                            x: 0,
                                            y: 0
                                        },
                                        opacity: 1,
                                        duration: duration
                                    });
                                    break;
                                case "slideLeft":
                                    fab.animate({
                                        translate: {
                                            x: 0,
                                            y: 0
                                        },
                                        opacity: 1,
                                        duration: duration
                                    });
                                    break;
                                case "scale":
                                    fab.animate({
                                        scale: {
                                            x: 1,
                                            y: 1
                                        },
                                        duration: duration
                                    });
                                    break;
                            }
                        };
                    });

                    this.swipeEventAttached = true;
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