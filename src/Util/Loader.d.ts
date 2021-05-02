interface Loader {
	readonly LoadChildren: (parent: Instance) => Array<unknown>;
	readonly LoadDescendants: (parent: Instance) => Array<unknown>;
}

declare const Loader: Loader;
export = Loader;
