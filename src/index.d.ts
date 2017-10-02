import { View } from "ui/core/view";
import { Color } from "color";

export declare class Fab extends View {
  public hideOnSwipeOfView: string;
  public swipeAnimation:
    | "slideUp"
    | "slideDown"
    | "slideRight"
    | "slideLeft"
    | "scale";
  public hideAnimationDuration: number;

  public rippleColor: Color;
  public icon: string;
  public backColor: Color;
}
