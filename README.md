[![npm](https://img.shields.io/npm/v/nativescript-floatingactionbutton.svg)](https://www.npmjs.com/package/nativescript-floatingactionbutton)
[![npm](https://img.shields.io/npm/dt/nativescript-floatingactionbutton.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-floatingactionbutton)
[![Build Status](https://travis-ci.org/bradmartin/nativescript-floatingactionbutton.svg?branch=master)](https://travis-ci.org/bradmartin/nativescript-floatingactionbutton)
[![nStudio Plugin](https://img.shields.io/badge/nStudio-Plugin-blue.svg)](http://nstudio.io)
[![Twitter Follow][twitter-image]][twitter-url]

[twitter-image]:https://img.shields.io/twitter/follow/bradwaynemartin.svg?style=social&label=Follow%20me
[twitter-url]:https://twitter.com/bradwaynemartin



# NativeScript-FloatingActionButton
XML widget to create the Material Design Floating Action Button for NativeScript apps.

[Material Design Floating Action Button Spec](https://www.google.com/design/spec/components/buttons-floating-action-button.html)

## Installation

### NativeScript 2.x
`tns plugin add nativescript-floatingactionbutton@^2.2.7`

### NativeScript 3+
`tns plugin add nativescript-floatingactionbutton`

## Configuration
No extra configuration is required for the FAB View component.

### Screenshot
---------------
![FAB Android Screenshot](screens/android.png)
![FAB iOS Screenshot](screens/ios.png)

### Multiple FAB/Swipe Animation Support
![FAB Animations](screens/animations.gif)

## Usage

#### XML
##### **NOTE** The sample XML here will position the FAB on top of the ListView. There is no need for absolute positioning due to using a GridLayout row/col settings.
```XML
<Page xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded"
      xmlns:FAB="nativescript-floatingactionbutton">
    <Page.actionBar>
        <ActionBar title="Native FAB" backgroundColor="#3F51B5" color="#fff" />
    </Page.actionBar>
    <grid-layout rows="auto, *">
        <list-view row="1" items="{{ users }}">
            <list-view.itemTemplate>
                <label text="{{ name }}" textWrap="true" fontSize="18" margin="20" />
            </list-view.itemTemplate>
        </list-view>
            <FAB:fab tap="fabTap"
                     row="1"
                     icon="res://ic_add_white"
                     rippleColor="#f1f1f1"
                     class="fab-button" />
    </grid-layout>
</Page>
```
PLEASE NOTE: The fab is on the same **row number** as the listview 
***

#### Angular NativeScript
``` typescript
import { registerElement } from "nativescript-angular/element-registry";
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);
```
##### HTML 
```HTML
<StackLayout>
    <FAB (tap)="fabTap()" icon="res://ic_add_white" rippleColor="#f1f1f1" class="fab-button"></FAB>
</StackLayout>
```

#### CSS
Recommended CSS styles.
```CSS
.fab-button {
    height: 70;
    width: 70; /// this is required on iOS - Android does not require width so you might need to adjust styles 
    margin: 15;
    background-color: #ff4081; 
    horizontal-align: right; 
    vertical-align: bottom; 
}
```

***

#### JS

```JS
exports.fabTap = function(args) {
    console.log('tapped');
}
```

***

## API

| Property   |      Android      |  iOS | Description | Note |
|------------|-------------------|------|-------------|------|
| backgroundColor  |         X         | X    | Sets the background color of the button |
| icon       |         X         | X     | Supports the same image source options that NativeScript images support | Required on android
| rippleColor|         X         |      | Ripple color on lollipop devices, it will fill the FAB on pre-lollipop devices | None
| hideOnSwipeOfView|         X         |   X   | Directs the fab to animate itself in and out on scroll | Pass it the name of the view to monitor for a scroll event example: hideOnSwipeOfView="userListView"
| hideAnimationDuration|         X         |   X   | How many milliseconds it takes for the button to hide. | Default if not set: 300ms
| swipeAnimation|         X         |   X   | slideDown, slideUp, slideLeft, slideRight, scale | Default is slideDown

## NativeScript Compatibility

| NativeScript Version | FloatingActionButton Plugin Version |
|----------------------|-------------------------------------|
| 1.6+                  | 2.+                                 |
| 1.5                  | 1.91                                |  

## iOS Notes
- We're using [MNFloatingActionButton](http://cocoapods.org/pods/MNFloatingActionButton) by [Matt Nydam](https://github.com/mattnydam)
- Width\Height are requried properties
- icon is a required property, if left as empty string default will be shown

## Release Notes ##
### 2.2.0 ###
* Scale iOS images to 1/2 height
* swipeAnimation property added to define animations for the FAB

### Contributors

- Lázaro Danillo [lazaromenezes](https://github.com/lazaromenezes)
- Steve McNiven-Scott [sitefinitysteve](https://github.com/sitefinitysteve)
- Nathanael Anderson [NathanaelA]("https://github.com/NathanaelA)
- Gabriel Marinho [gabrielbiga](https://github.com/gabrielbiga)
