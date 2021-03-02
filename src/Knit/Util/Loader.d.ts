interface Loader {
	LoadChildren: (parent: Instance) => Array<unknown>;
	LoadDescendants: (parent: Instance) => Array<unknown>;
}

declare const Loader: Loader;
export = Loader;
