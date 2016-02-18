 var common = require("./fab-common");
 var ImageSource = require("image-source");

 require("utils/module-merge").merge(common, module.exports);

 var FloatingActionButton = (function (_super) {

     global.__extends(FloatingActionButton, _super);

     function FloatingActionButton() {
         _super.apply(this, arguments);
         debugger;
         var button = MNFloatingActionButton.alloc().init(); 
         
     }

     Object.defineProperty(FloatingActionButton.prototype, "ios", {
         get: function () {
             return this._ios;
         }
     });

     return FloatingActionButton;

 })(common.Fab);

 exports.Fab = FloatingActionButton;
