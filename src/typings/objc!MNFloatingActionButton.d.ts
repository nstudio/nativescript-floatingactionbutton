declare class MNFloatingActionButton extends UIControl {
  static alloc(): MNFloatingActionButton; // inherited from NSObject

  static appearance(): MNFloatingActionButton; // inherited from UIAppearance

  static appearanceForTraitCollection(
    trait: UITraitCollection
  ): MNFloatingActionButton; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedIn(
    trait: UITraitCollection,
    ContainerClass: typeof NSObject
  ): MNFloatingActionButton; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(
    trait: UITraitCollection,
    containerTypes: NSArray<typeof NSObject> | typeof NSObject[]
  ): MNFloatingActionButton; // inherited from UIAppearance

  static appearanceWhenContainedIn(
    ContainerClass: typeof NSObject
  ): MNFloatingActionButton; // inherited from UIAppearance

  static appearanceWhenContainedInInstancesOfClasses(
    containerTypes: NSArray<typeof NSObject> | typeof NSObject[]
  ): MNFloatingActionButton; // inherited from UIAppearance

  static new(): MNFloatingActionButton; // inherited from NSObject

  animationDuration: number;

  animationScale: number;

  centerImage: UIImage;

  shadowColor: UIColor;

  shadowOpacity: number;

  shadowRadius: number;
}

declare var MNFloatingActionButtonVersionNumber: number;

declare var MNFloatingActionButtonVersionString: interop.Reference<number>;
