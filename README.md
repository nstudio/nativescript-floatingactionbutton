# NativeScript-FloatingActionButton
XML widget to create the Material Design Floating Action Button for Android NativeScript apps

[Material Design Floating Action Button Spec](https://www.google.com/design/spec/components/buttons-floating-action-button.html)

## Installation
`npm install nativescript-floatingactionbutton`

### Screenshot
---------------
![FAB Screenshot](screens/fab.png)

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
                     backColor="#ff4081"
                     rippleColor="#f1f1f1"
                     class="fab-button" />
    </grid-layout>
</Page>
```
PLEASE NOTE: The fab is on the same **row number** as the listview 
***

#### CSS
I recommend the following CSS styles.
```CSS
.fab-button {
    height: 70;
    margin: 15;
    horizontal-align: right; /* Android Only */
    vertical-align: bottom; /* Android Only */
    background-color: #ff4081;  /* iOS Only */
    color: #fff;  /* iOS Only */
}
```

***

#### JS

```JS
function fabTap(args) {
    console.log('tapped');
}
exports.fabTap = fabTap;
```

***

## Attributes
**backColor** - optional

Background color of the FAB

### Android Specific Attributes
**icon** - required

Icon to use for the FAB button, supports the same image source options that NativeScript images support.

**rippleColor**  - optional

Ripple color on lollipop devices, it will fill the FAB on pre-lollipop devices




### Contributors

- L�zaro Danillo [lazaromenezes](https://github.com/lazaromenezes)
- Steve McNiven-Scott [sitefinitysteve](https://github.com/sitefinitysteve) - iOS
