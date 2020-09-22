<a align="center" href="https://www.npmjs.com/package/nativescript-floatingactionbutton">
    <h3 align="center">NativeScript-FloatingActionButton</h3>
</a>
<h4 align="center">NativeScript plugin for Material Design Floating Action Button UI component.</h4>

<p align="center">
    <a href="https://www.npmjs.com/package/@nstudio/nativescript-floatingactionbutton">
        <img src="https://github.com/nstudio/nativescript-floatingactionbutton/workflows/Build%20CI/badge.svg" alt="Action Build">
    </a>
    <a href="https://www.npmjs.com/package/@nstudio/nativescript-floatingactionbutton">
        <img src="https://img.shields.io/npm/v/@nstudio/nativescript-floatingactionbutton.svg" alt="npm">
    </a>
    <a href="https://www.npmjs.com/package/@nstudio/nativescript-floatingactionbutton">
        <img src="https://img.shields.io/npm/dt/@nstudio/nativescript-floatingactionbutton.svg?label=npm%20downloads" alt="npm">
    </a>
</p>

## Installation

### Nativescript 7+:

`ns plugin add @nstudio/nativescript-floatingactionbutton`

### NativeScript lower than 7:

`tns plugin add @nstudio/nativescript-floatingactionbutton@2.1.0`

### Screenshot

---

![FAB Android Screenshot](screens/android.png)
![FAB iOS Screenshot](screens/ios.png)

### Multiple FAB/Swipe Animation Support

![FAB Animations](screens/animations.gif)

## Usage

<h4>The icon for the FAB can be a local image in your app or an image/icon from the App_Resources.</h4>

### Plain NativeScript

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded"
      xmlns:FAB="@nstudio/nativescript-floatingactionbutton">
    <ActionBar title="Native FAB" />
    <grid-layout rows="auto, *">
        <list-view row="1" items="{{ users }}">
            <list-view.itemTemplate>
                <label text="{{ name }}" />
            </list-view.itemTemplate>
        </list-view>
            <FAB:fab tap="fabTap"
                     row="1"
                     icon="'~/assets/ic_add_white.png'"
                     rippleColor="#f1f1f1"
                     class="fab-button" />
    </grid-layout>
</Page>
```

---

### NativeScript Angular

```typescript
import { registerElement } from 'nativescript-angular/element-registry';
registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
);
```

#### HTML

```HTML
<StackLayout>
    <FAB (tap)="fabTap()" icon="'~/assets/ic_add_white.png'" rippleColor="#f1f1f1" class="fab-button"></FAB>
</StackLayout>
```

---

### NativeScript Vue

```javascript
import Vue from 'nativescript-vue';

Vue.registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
);
```

#### Template

```html
<template>
  <page>
    <grid-layout rows="auto, *">
      <list-view row="1" items="{{ users }}">
        <list-view.itemTemplate>
          <label text="{{ name }}" textWrap="true" />
        </list-view.itemTemplate>
      </list-view>
      <fab
        @tap="fabTap"
        row="1"
        icon="res://ic_add_white"
        rippleColor="#f1f1f1"
        class="fab-button"
      ></fab>
    </grid-layout>
  </page>
</template>
```

---

#### CSS

Recommended CSS styles.

```css
.fab-button {
  height: 70;
  width: 70; /// this is required on iOS - Android does not require width so you might need to adjust styles
  margin: 15;
  background-color: #ff4081;
  horizontal-align: right;
  vertical-align: bottom;
}
```

## Use Icon Fonts

First you need to setup icon fonts as described in [NativeScript documentation](https://docs.nativescript.org/ui/components/icon-fonts).

After this, you can use icon fonts on FAB by specifiying the unicode as text and add the `fas`/`far` class:

```
<FAB:fab text="&#xf02a;" class="fab-button fas" />
```

---

## API

| Property              | Android | iOS | Description                                                                                                                                                                                      | Note                                                                                                 |
| --------------------- | ------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| backgroundColor       | X       | X   | Sets the background color of the button                                                                                                                                                          |
| icon                  | X       | X   | Supports the same image source options that NativeScript images support                                                                                                                          | Required on android                                                                                  |
| text                  | X       | X   | Allows to use text instead of image                                                                                                                                                              | Can be styled with `font-*` and `color` CSS properties                                               |
| rippleColor           | X       |     | Ripple color on lollipop devices, it will fill the FAB on pre-lollipop devices                                                                                                                   | None                                                                                                 |
| hideOnSwipeOfView     | X       | X   | Directs the fab to animate itself in and out on scroll                                                                                                                                           | Pass it the name of the view to monitor for a scroll event example: hideOnSwipeOfView="userListView" |
| hideAnimationDuration | X       | X   | How many milliseconds it takes for the button to hide.                                                                                                                                           | Default if not set: 300ms                                                                            |
| swipeAnimation        | X       | X   | slideDown, slideUp, slideLeft, slideRight, scale                                                                                                                                                 | Default is slideDown                                                                                 |
| androidScaleType      | X       |     | center, centerCrop, centerInside, fitCenter, fitEnd, fitStart, fitXY, matrix<br> for more details see [Android-Docs](https://developer.android.com/reference/android/widget/ImageView.ScaleType) | Default is center                                                                                    |

## iOS Notes

- We're using [MNFloatingActionButton](http://cocoapods.org/pods/MNFloatingActionButton) by [Matt Nydam](https://github.com/mattnydam)
- Width\Height are requried properties
- icon is a required property, if left as empty string default will be shown

### Running Demo Apps

```bash
npm run demo.android

// or

npm run demo.ios
```

### [Changelog](./CHANGELOG.md)

### Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

| [<img src="https://avatars1.githubusercontent.com/u/6006148?s=100&v=4" width="100px;"/><br /><sub>Brad Martin</sub>](https://github.com/bradmartin) | [<img src="https://avatars1.githubusercontent.com/u/1542376?s=100&v=4" width="100px;"/><br /><sub>Steve McNiven-Scott</sub>](https://github.com/sitefinitysteve) | [<img src="https://avatars3.githubusercontent.com/u/850871?s=100&v=4" width="100px;"/><br /><sub>Nathanael Anderson</sub>](https://github.com/NathanaelA) | [<img src="https://avatars3.githubusercontent.com/u/1100522?s=100&v=4" width="100px;"/><br /><sub>Gabriel Marinho</sub>](https://github.com/gabrielbiga) |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |


| [<img src="https://avatars1.githubusercontent.com/u/4092076?s=100&v=4" width="100px;"/><br /><sub>Alexander Vakrilov</sub>](https://github.com/vakrilov) | [<img src="https://avatars1.githubusercontent.com/u/8123916?s=100&v=4" width="100px;"/><br /><sub>Lázaro Danillo Menezes</sub>](https://github.com/lazaromenezes) | [<img src="https://avatars0.githubusercontent.com/u/8638243?s=100&v=4" width="100px;"/><br /><sub>Jofferson Ramirez Tiquez</sub>](https://github.com/jofftiquez) | [<img src="https://avatars3.githubusercontent.com/u/9256365?s=100&v=4" width="100px;"/><br /><sub>Ravi</sub>](https://github.com/dlucidone) |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |


| [<img src="https://avatars3.githubusercontent.com/u/13824510?s=100&v=4" width="100px;"/><br /><sub>Samuel Ikechukwu</sub>](https://github.com/holymp2006) | [<img src="https://avatars2.githubusercontent.com/u/7893485?s=100&v=4" width="100px;"/><br /><sub>Stanimira Vlaeva</sub>](https://github.com/sis0k0) |     |     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --- | --- |


<!-- ALL-CONTRIBUTORS-LIST:END -->
