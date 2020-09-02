import {
  Application,
  Button,
  Color,
  Device,
  Dialogs,
  EventData,
  fromObject,
  isAndroid,
  ObservableArray,
  Page,
  Utils
} from '@nativescript/core';
  
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
    { name: 'Franklin' },
  ];
  const viewModel = fromObject({
    users: new ObservableArray(users),
  });
  
  export function pageLoaded(args) {
    console.log('page loaded');
    const page = args.object;
    // Change statusbar color on Lollipop
    if (isAndroid && Device.sdkVersion >= '21') {
      const window = Application.android.startActivity.getWindow();
      window.setStatusBarColor(new Color('#303F9F').android);
    }
  
    page.bindingContext = viewModel;
  }
  
  export function nStudioIconTap() {
    Dialogs.confirm({
      message:
        'nStudio, LLC. specializes in custom software applications ranging from mobile, web, desktop, server and more. Would you like to visit nstudio.io?',
      okButtonText: 'Yes',
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result) {
        Utils.openUrl('https://nstudio.io');
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
  