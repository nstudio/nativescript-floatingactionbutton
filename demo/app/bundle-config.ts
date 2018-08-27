declare var global: NodeJS.Global;

if ((<any>global).TNS_WEBPACK) {
	require('tns-core-modules/bundle-entry-points');

	global.registerModule('main-page', () => require('./main-page'));
	global.registerModule('multifab', () => require('./multifab'));

	// register application modules
	global.registerModule('nativescript-floatingactionbutton', () =>
		require('nativescript-floatingactionbutton')
	);
}
