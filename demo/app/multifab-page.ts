import * as app from '@nativescript/core/application';
import { Color } from '@nativescript/core/color';
import { device, isAndroid } from '@nativescript/core/platform';
import { topmost } from '@nativescript/core/ui/frame';
import { Fab } from '@nstudio/nativescript-floatingactionbutton';

export function pageLoaded(args) {
  // Change statusbar color on Lollipop
  if (isAndroid && device.sdkVersion >= '21') {
    const window = app.android.startActivity.getWindow();
    window.setStatusBarColor(new Color('#303F9F').android);
  }
}

export function fabTap(args) {
  console.log('fab tapped', args.object);
  console.log('navigating back to main-page in 1000ms');
  setTimeout(() => {
    topmost().goBack();
  }, 1000);
}

export function animate(args) {
  const fab = args.object as Fab;
  fab
    .animate({
      duration: 750,
      target: fab,
      opacity: 0,
      translate: { x: 125, y: 350 },
      rotate: 900
    })
    .then(() => {
      console.log('navigating back to main-page');
      topmost().goBack();
    });
}
