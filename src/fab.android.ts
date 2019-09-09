import { Color } from 'tns-core-modules/color';
import * as ImageSource from 'tns-core-modules/image-source';
import {
  backgroundColorProperty,
  backgroundInternalProperty
} from 'tns-core-modules/ui/core/view';
import { Font, FontStyle, FontWeight } from 'tns-core-modules/ui/styling/font';
import {
  FloatingActionButtonBase,
  iconProperty,
  textProperty,
  rippleColorProperty
} from './fab-common';

declare let global: any;

const FABNamespace = useAndroidX()
  ? com.google.android.material.floatingactionbutton
  : (android.support as any).design.widget;

function useAndroidX() {
  return (
    global.androidx &&
    com.google &&
    com.google.android &&
    com.google.android.material
  );
}

export class Fab extends FloatingActionButtonBase {
  private _androidViewId: number;
  private _android: com.google.android.material.floatingactionbutton.FloatingActionButton;
  public static tapEvent = 'tap';

  get android(): com.google.android.material.floatingactionbutton.FloatingActionButton {
    return this.nativeView;
  }

  public createNativeView() {
    this._android = new FABNamespace.FloatingActionButton(this._context);
    return this._android;
  }

  public initNativeView() {
    this._androidViewId = android.view.View.generateViewId();
    this.nativeView.setId(this._androidViewId);
    initializeClickListener();
    const clickListener = new ClickListener(this);
    this.nativeView.setOnClickListener(clickListener);
    (<any>this.nativeView).clickListener = clickListener;
    // setting scale type statically for now - can add configuration options with next release after confirming fixes for other icons sizes
    this.android.setScaleType(android.widget.ImageView.ScaleType.CENTER_INSIDE);
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
          'The icon: ' +
            value +
            ' was not found. Check your icon property value. Be sure to rebuild the project after adding images.'
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
          'The icon: ' +
            value +
            ' was not found. Check your icon property value. Be sure to rebuild the project after adding images.'
        );
      }
    }
  }

  [textProperty.setNative](value: string) {
    const paint = new android.graphics.Paint(android.graphics.Paint.ANTI_ALIAS_FLAG);
    const color = this.style.color || new Color('#FFFFFF');
    paint.setColor(color.android);
    if (this.style.fontFamily) {
      const nsFont = new Font(this.style.fontFamily, 0, FontStyle.NORMAL, FontWeight.LIGHT);
      paint.setTypeface(nsFont.getAndroidTypeface());
    }
    const FONT_SIZE_FACTOR = 3;
    paint.setTextSize((this.style.fontSize || 32) * FONT_SIZE_FACTOR);
    paint.setTextAlign(android.graphics.Paint.Align.LEFT);
    const baseline = -paint.ascent();
    const width = paint.measureText(value);
    const height = baseline + paint.descent();
    const image = android.graphics.Bitmap.createBitmap(
      width,
      height,
      android.graphics.Bitmap.Config.ARGB_8888,
    );
    const canvas = new android.graphics.Canvas(image);
    canvas.drawText(value, 0, baseline, paint);
    this.nativeView.setImageBitmap(image);
  }
}

interface ClickListener {
  new (owner: FloatingActionButtonBase): android.view.View.OnClickListener;
}

let ClickListener: ClickListener;

function initializeClickListener(): void {
  if (ClickListener) {
    return;
  }

  @Interfaces([android.view.View.OnClickListener])
  class ClickListenerImpl extends java.lang.Object
    implements android.view.View.OnClickListener {
    constructor(public owner: FloatingActionButtonBase) {
      super();
      return global.__native(this);
    }

    public onClick(v: android.view.View): void {
      const owner = this.owner;
      if (owner) {
        (<any>owner)._emit('tap');
      }
    }
  }

  ClickListener = ClickListenerImpl;
}
