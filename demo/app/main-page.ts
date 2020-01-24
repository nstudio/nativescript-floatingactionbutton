import * as app from '@nativescript/core/application';
import { Color } from '@nativescript/core/color';
import { EventData, fromObject } from '@nativescript/core/data/observable';
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { device, isAndroid } from '@nativescript/core/platform';
import { Button } from '@nativescript/core/ui/button';
import { confirm } from '@nativescript/core/ui/dialogs';
import { Page } from '@nativescript/core/ui/page';
import { openUrl } from '@nativescript/core/utils/utils';

const users = [
  { name: 'Billy Bob' },
  { name: 'Tweeder' },
  { name: 'Mox' },
  { name: 'Coach' },
  { name: 'Lance' },
  { name: 'Johnson' },
  { name: 'William' },
  { name: 'Franklin' },
  { name: 'Billy Bob' },
  { name: 'Tweeder' },
  { name: 'Mox' },
  { name: 'Coach' },
  { name: 'Lance' },
  { name: 'Johnson' },
  { name: 'William' },
  { name: 'Franklin' }
];
const viewModel = fromObject({
  users: new ObservableArray(users)
});

export function pageLoaded(args) {
  const page = args.object;
  // Change statusbar color on Lollipop
  if (isAndroid && device.sdkVersion >= '21') {
    const window = app.android.startActivity.getWindow();
    window.setStatusBarColor(new Color('#303F9F').android);
  }

  page.bindingContext = viewModel;
}

export function nStudioIconTap() {
  confirm({
    message:
      'nStudio, LLC. specializes in custom software applications ranging from mobile, web, desktop, server and more. Would you like to visit nstudio.io?',
    okButtonText: 'Yes',
    cancelButtonText: 'Close'
  }).then(result => {
    if (result) {
      openUrl('https://nstudio.io');
    }
  });
}

export function fabTap(args: EventData) {
  console.log('fab tap event', args.object);
  (viewModel as any).users.unshift({ name: 'Gary' });
}

export function goMultiFab(args: EventData) {
  const button = args.object as Button;
  const page = button.page as Page;
  page.frame.navigate('multifab-page');
}
