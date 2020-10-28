import {
  backgroundColorProperty,
  backgroundInternalProperty,
  Color,
  ImageSource,
  Utils
} from '@nativescript/core';
import {
  AndroidScaleType,
  androidScaleTypeProperty,
  FloatingActionButtonBase,
  iconProperty,
  rippleColorProperty,
  textProperty
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
  static tapEvent = 'tap';

  // get android(): com.google.android.material.floatingactionbutton.FloatingActionButton {
  //   return this.nativeView;
  // }

  createNativeView() {
    this._android = new FABNamespace.FloatingActionButton(this._context);
    return this._android;
  }

  initNativeView() {
    this._androidViewId = android.view.View.generateViewId();
    this.nativeView.setId(this._androidViewId);
    const clickListener = new ClickListenerImpl(this);
    this.nativeView.setOnClickListener(clickListener);
    (<any>this.nativeView).clickListener = clickListener;

    this.nativeView.setScaleType(android.widget.ImageView.ScaleType.CENTER);
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

    if (Utils.isFileOrResourcePath(value)) {
      iconDrawable = ImageSource.fromFileOrResourceSync(value);
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
    const image = this.getImageFromText(value);
    if (image) {
      this.nativeView.setImageBitmap(image.android);
    }
  }

  [androidScaleTypeProperty.setNative](value: AndroidScaleType) {
    let scaleType = android.widget.ImageView.ScaleType.CENTER;

    switch (value.trim().toLowerCase()) {
      case 'centercrop':
        scaleType = android.widget.ImageView.ScaleType.CENTER_CROP;
        break;
      case 'centerinside':
        scaleType = android.widget.ImageView.ScaleType.CENTER_INSIDE;
        break;
      case 'fitcenter':
        scaleType = android.widget.ImageView.ScaleType.FIT_CENTER;
        break;
      case 'fitend':
        scaleType = android.widget.ImageView.ScaleType.FIT_END;
        break;
      case 'fitstart':
        scaleType = android.widget.ImageView.ScaleType.FIT_START;
        break;
      case 'fitxy':
        scaleType = android.widget.ImageView.ScaleType.FIT_XY;
        break;
      case 'matrix':
        scaleType = android.widget.ImageView.ScaleType.MATRIX;
        break;
    }

    this.nativeView.setScaleType(scaleType);
  }
}

interface ClickListener {
  new (owner: FloatingActionButtonBase): android.view.View.OnClickListener;
}

@NativeClass()
@Interfaces([android.view.View.OnClickListener])
class ClickListenerImpl
  extends java.lang.Object
  implements android.view.View.OnClickListener {
  constructor(public owner: FloatingActionButtonBase) {
    super();
    return global.__native(this);
  }

  onClick(v: android.view.View): void {
    const owner = this.owner;
    if (owner) {
      (<any>owner)._emit('tap');
    }
  }
}
