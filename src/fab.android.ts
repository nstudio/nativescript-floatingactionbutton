import { Color } from 'tns-core-modules/color';
import * as ImageSource from 'tns-core-modules/image-source';
import {
	backgroundColorProperty,
	backgroundInternalProperty
} from 'tns-core-modules/ui/core/view';
import {
	FloatingActionButtonBase,
	iconProperty,
	rippleColorProperty
} from './fab-common';

declare var android: any;

export class Fab extends FloatingActionButtonBase {
	private _androidViewId: number;
	private _android: any;
	public static tapEvent = 'tap';

	get android(): any {
		return this.nativeView;
	}

	public createNativeView() {
		this._android = new android.support.design.widget.FloatingActionButton(
			this._context
		);
		const that = new WeakRef(this);
		this._android.setOnClickListener(
			new android.view.View.OnClickListener({
				get owner() {
					return that.get();
				},

				onClick: function(v) {
					if (this.owner) {
						this.owner._emit('tap');
					}
				}
			})
		);

		return this._android;
	}

	public initNativeView() {
		this._androidViewId = android.view.View.generateViewId();
		this.nativeView.setId(this._androidViewId);
	}

	[backgroundColorProperty.getDefault](): android.content.res.ColorStateList {
		return this.nativeView.getBackgroundTintList();
	}

	[backgroundColorProperty.setNative](
		value: Color | android.content.res.ColorStateList
	) {
		let newValue: android.content.res.ColorStateList;
		if (value instanceof Color) {
			newValue = android.content.res.ColorStateList.valueOf(value.android);
		} else {
			// Resetting with the default value;
			newValue = value;
		}
		try {
			this.nativeView.setBackgroundTintList(newValue);
		} catch (err) {
			console.log(`Error setNative backgroundColorProperty: `, err);
		}
	}

	[backgroundInternalProperty.setNative](value: any) {
		// NOOP
	}

	[rippleColorProperty.setNative](value: Color) {
		this.nativeView.setRippleColor(value.android);
	}

	[iconProperty.setNative](value: any) {
		let iconDrawable = null;
		if (!value) {
			return;
		}

		if (ImageSource.isFileOrResourcePath(value)) {
			iconDrawable = ImageSource.fromFileOrResource(value);
			if (iconDrawable) {
				this.nativeView.setImageBitmap(iconDrawable.android);
			} else {
				console.log(
					'The icon: ' + value + ' was not found. Check your XML icon property.'
				);
			}
		} else {
			const drawableId = android.content.res.Resources.getSystem().getIdentifier(
				value,
				'drawable',
				'android'
			);
			iconDrawable = android.content.res.Resources.getSystem().getDrawable(
				drawableId
			);

			if (iconDrawable) {
				this.nativeView.setImageDrawable(iconDrawable);
			} else {
				console.log(
					'The icon: ' + value + ' was not found. Check your XML icon property.'
				);
			}
		}
	}
}
