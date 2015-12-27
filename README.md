# NativeScript-FloatingActionButton
XML widget to create the Material Design Floating Action Button for Android NativeScript apps

## Installation
`npm install nativescript-floatingactionbutton`

### Screenshot
FAB
--------------- | -----------
![FAB](/fab.png) | 

## Usage

####XML 
```

<Page xmlns="http://schemas.nativescript.org/tns.xsd"
      xmlns:FAB="nativescript-floatingactionbutton/fab">
    <FAB:fab tap="fabTap"
         icon="icon"
         backColor="#FF5252" 
         rippleColor="#FF8A80"
         class="fab-button"
         margin="15" />
</Page>  

```

##### Notes*
The **backColor** property will set the backgroundColor of the FAB

The **rippleColor** property will set the ripple color on lollipop devices, it will fill the FAB on pre-lollipop devices

Currently the **icon** needs to be an image in the App_Resources folder.
PRs welcome to enhance the icon/image functionality.


####CSS
I recommend the following CSS styles.
```

height: 70;
horizontal-align: right;
vertical-align: bottom;
```

####JS

```

function fabTap(args) {
    console.log('tapped');
} 
exports.fabTap = fabTap;

```

