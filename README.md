# NativeScript-FloatingActionButton
XML widget to create the Material Design Floating Action Button for NativeScript apps.

[Material Design Floating Action Button Spec](https://www.google.com/design/spec/components/buttons-floating-action-button.html)

## Installation
`npm install nativescript-floatingactionbutton`

### Screenshot
---------------
![FAB Android Screenshot](screens/android.png)
![FAB iOS Screenshot](screens/ios.png)

## Usage

#### XML
##### **NOTE** The sample XML here will position the FAB on top of the ListView. There is no need for absolute positioning.
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

#### CSS
Recommended CSS styles.
```CSS
.fab-button {
    height: 70;
    margin: 15;
    background-color: #ff4081; 
    horizontal-align: right; /* Android Only */
    vertical-align: bottom; /* Android Only */
    color: #fff;  /* iOS Only */
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

## Attributes

| Property   |      Android      |  iOS | Description | Note |
|------------|-------------------|------|-------------|------|
| backColor  |         X         | X    | Sets the background color of the button | None
| icon       |         X         |      | Supports the same image source options that NativeScript images support | Required on android
| rippleColor|         X         |      | Ripple color on lollipop devices, it will fill the FAB on pre-lollipop devices | None


## iOS Notes
Since iOS doesn't have a native FAB, we're using the amazing [KCFloatingActionButton](https://cocoapods.org/pods/KCFloatingActionButton) by [Lee Sun-Hyoup](https://github.com/kciter)
As of this publish, it does not yet support images, however this is an Issue open. 

### Contributors

- L�zaro Danillo [lazaromenezes](https://github.com/lazaromenezes)
- Steve McNiven-Scott [sitefinitysteve](https://github.com/sitefinitysteve) - iOS
