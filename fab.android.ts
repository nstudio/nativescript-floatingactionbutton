import {
  FloatingActionButtonBase,
  backColorProperty,
  rippleColorProperty,
  iconProperty
} from "./fab-common";
import * as style from "ui/styling/style";
import * as utils from "utils/utils";
import { Color } from "color";
import * as ImageSource from "image-source";
import {
  backgroundColorProperty,
  backgroundInternalProperty
} from "ui/core/view";

declare var android: any;

export class Fab extends FloatingActionButtonBase {
  public static tapEvent = "tap";

  public createNativeView() {
    const btn = new android.support.design.widget.FloatingActionButton(
      this._context
    );
    let that = new WeakRef(this);
    btn.setOnClickListener(
      new android.view.View.OnClickListener({
        get owner() {
          return that.get();
        },

        onClick: function(v) {
          if (this.owner) {
            this.owner._emit("tap");
          }
        }
      })
    );

    return btn;
  }

  [backColorProperty.setNative](value: Color) {
    this.nativeView.setBackgroundTintList(
      android.content.res.ColorStateList.valueOf(value.android)
    );
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
    this.nativeView.setBackgroundTintList(newValue);
  }

  [backgroundInternalProperty.setNative](value: any) {
    //NOOP
  }

  [rippleColorProperty.setNative](value: Color) {
    this.nativeView.setRippleColor(value.android);
  }

  [iconProperty.setNative](value: any) {
    let iconDrawable = null;

    if (ImageSource.isFileOrResourcePath(value)) {
      iconDrawable = ImageSource.fromFileOrResource(value);
      if (iconDrawable) {
        this.nativeView.setImageBitmap(iconDrawable.android);
      } else {
        console.log(
          "The icon: " + value + " was not found. Check your XML icon property."
        );
      }
    } else {
      const drawableId = android.content.res.Resources
        .getSystem()
        .getIdentifier(value, "drawable", "android");
      iconDrawable = android.content.res.Resources
        .getSystem()
        .getDrawable(drawableId);

      if (iconDrawable) {
        this.nativeView.setImageDrawable(iconDrawable);
      } else {
        console.log(
          "The icon: " + value + " was not found. Check your XML icon property."
        );
      }
    }
  }
}
