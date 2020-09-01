import { Color, View } from '@nativescript/core';

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
