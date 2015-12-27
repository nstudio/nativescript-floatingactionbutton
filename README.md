# NativeScript-FloatingActionButton
XML widget to create the Material Design Floating Action Button for Android NativeScript apps

## Installation
`npm install nativescript-snackbar`


## Usage

####XML 
```

<Page xmlns="http://schemas.nativescript.org/tns.xsd"
      xmlns:FAB="FloatingActionButton/FloatingActionButton">
    <FAB:FloatingActionButton tap="fabTap"
         icon="icon"
         backColor="#FF5252" 
         rippleColor="#FF8A80"
         class="fab-button"
         margin="15" />
</Page>  

```

####JS

```

function fabTap(args) {
    console.log('tapped');
} 
exports.fabTap = fabTap;

```

