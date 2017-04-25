/**************************************************************************************
 * Made for the {N} community by Brad Martin @BradWayneMartin
 * Thanks to Lazaro Danillo for his contributions - https://github.com/lazaromenezes
 * Thanks to Steve McNiven-Scott for his contributions - https://github.com/sitefinitysteve
 * Thanks to Gabriel Marinho for his contributions - https://github.com/gabrielbiga
 * https://twitter.com/BradWayneMartin
 * https://github.com/bradmartin
 * Pull requests are welcome. Enjoy!
 *************************************************************************************/
import * as definitions from "./index";
import { View, Property } from "ui/core/view";
import { Color } from "color";
import { PanGestureEventData } from "ui/gestures";

export class FloatingActionButtonBase extends View implements definitions.Fab {

    private swipeEventAttached: boolean = false;
    public hideOnSwipeOfView: string;
    public swipeAnimation: "slideUp" | "slideDown" | "slideRight" | "slideLeft" | "scale";
    public hideAnimationDuration: number;

    public rippleColor: Color;
    public icon: string;
    public backColor: Color;

    getDurationDefault(animationType: string) {
        switch (animationType) {
            case "scale":
                return 100;
            default:
                return 300;
        }
    }

    onLoaded() {
        super.onLoaded()

        if (this.swipeEventAttached === false) {
            var fab = this;
            if (this.hideOnSwipeOfView !== undefined) {
                var swipeItem = this.page.getViewById(this.hideOnSwipeOfView);
                var animationType = (this.swipeAnimation) ? this.swipeAnimation : "slideDown"

                if (swipeItem !== undefined) {
                    var duration = (this.hideAnimationDuration) ? this.hideAnimationDuration : this.getDurationDefault(animationType);

                    swipeItem.on("pan", (args: PanGestureEventData) => {
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
}


export const backColorProperty = new Property<FloatingActionButtonBase, Color>({
    name: "backColor",
    equalityComparer: Color.equals,
    valueConverter: (v) => new Color(v),
    valueChanged: (fab, oldValue, newValue) => {
        fab.style.backgroundColor = newValue
    }
});
backColorProperty.register(FloatingActionButtonBase);

export const iconProperty = new Property<FloatingActionButtonBase, string>({
    name: "icon", affectsLayout: true
});
iconProperty.register(FloatingActionButtonBase);

export const rippleColorProperty = new Property<FloatingActionButtonBase, Color>({
    name: "rippleColor", equalityComparer: Color.equals, valueConverter: (v) => new Color(v)
});
rippleColorProperty.register(FloatingActionButtonBase);
