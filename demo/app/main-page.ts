import * as app from 'tns-core-modules/application';
import * as color from 'tns-core-modules/color';
import * as observable from 'tns-core-modules/data/observable';
import * as observableArrayModule from 'tns-core-modules/data/observable-array';
import * as platformModule from 'tns-core-modules/platform';
import * as frameModule from 'tns-core-modules/ui/frame';

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
const viewModel = observable.fromObject({
	users: new observableArrayModule.ObservableArray(users)
});

export function pageLoaded(args) {
	const page = args.object;
	if (platformModule.isAndroid) {
		// Change statusbar color on Lollipop
		if (platformModule.device.sdkVersion >= '21') {
			const window = app.android.startActivity.getWindow();
			window.setStatusBarColor(new color.Color('#303F9F').android);
		}
	}
	page.bindingContext = viewModel;
}

export function fabTap(args) {
	console.log('fab tap event');
	(viewModel as any).users.unshift({ name: 'Gary' });
}

export function goMultiFab(args) {
	frameModule.topmost().navigate('multifab');
}
