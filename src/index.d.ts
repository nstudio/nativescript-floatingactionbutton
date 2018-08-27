import { Color } from 'tns-core-modules/color';
import { View } from 'tns-core-modules/ui/core/view';

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
	// public backColor: Color;
}
