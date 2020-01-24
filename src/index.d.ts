import { Color } from '@nativescript/core/color';
import { View } from '@nativescript/core/ui/core/view';

export declare class Fab extends View {
  public hideOnSwipeOfView: string;
  public swipeAnimation:
    | 'slideUp'
    | 'slideDown'
    | 'slideRight'
    | 'slideLeft'
    | 'scale';
  public hideAnimationDuration: number;
  public rippleColor: Color;
  public icon: string;
}
