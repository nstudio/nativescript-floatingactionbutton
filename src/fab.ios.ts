import { ImageSource, Utils } from '@nativescript/core';
import {
  FloatingActionButtonBase,
  iconProperty,
  textProperty
} from './fab-common';

export class Fab extends FloatingActionButtonBase {
  nativeView: UIView;

  constructor() {
    super();
    const btn = MNFloatingActionButton.alloc().init() as MNFloatingActionButton;
    btn.animationScale = 0.95;
    this.nativeView = btn;
  }

  private setImage(iconDrawable: ImageSource) {
    if (iconDrawable) {
      const newImageView = UIImageView.alloc().initWithImage(
        iconDrawable.ios
      ) as UIImageView;
  
      if (newImageView !== null) {
        // Kill the old Image, cocoapod doesn't support changing it yet
        const button = this.nativeView.subviews[0] as MNFloatingActionButton;
        const oldBadImageView = button.subviews[0]; // this should be the image view inside the MNFloatingActionButton
        oldBadImageView.removeFromSuperview();
  
        // Add the new image to the button
        button.addSubview(newImageView);
      }
    }
  }

  [iconProperty.setNative](value: any) {
    let iconDrawable = null;
    if (Utils.isFileOrResourcePath(value)) {
      iconDrawable = ImageSource.fromFileOrResourceSync(value);
    } else {
      // Default image
      iconDrawable = ImageSource.fromBase64Sync(
        'iVBORw0KGgoAAAANSUhEUgAAAJAAAACQAQAAAADPPd8VAAAAAnRSTlMAAHaTzTgAAAAqSURBVHgBY6AMjIJRYP9n0AuNCo0KMf+HgwPDTmgoRMeo0KgQRWAUjAIABsnZRR7bYyUAAAAASUVORK5CYII='
      ) as ImageSource;
    }
    this.setImage(iconDrawable);
  }

  [textProperty.setNative](value: string) {
    const image = this.getImageFromText(value);
    this.setImage(image);
  }

  onLayout(left: number, top: number, right: number, bottom: number): void {
    super.onLayout(left, top, right, bottom);
    this._centerIcon();
  }

  private _centerIcon() {
    const frame = this.nativeView.frame as CGRect;
    const width = frame.size.width as number;
    const height = frame.size.height as number;

    const button = this.nativeView.subviews[0] as MNFloatingActionButton;
    const imageView = <UIImageView>button.subviews[0]; // should be the image view inside the MNFloatingActionButton

    imageView.contentMode = UIViewContentMode.ScaleAspectFit;
    imageView.frame = CGRectMake(0, 0, width / 2, height / 2);
    imageView.center = CGPointMake(width / 2, height / 2);
  }
}
