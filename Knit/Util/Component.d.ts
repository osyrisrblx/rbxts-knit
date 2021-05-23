import Maid from "./Maid";
import Signal from "./Signal";

declare namespace Component {
	export interface ComponentClass {
		Destroy(): void;
		Init?(): void;
		Deinit?(): void;
		HeartbeatUpdate?(): void;
		SteppedUpdate?(): void;
		RenderUpdate?(): void;
	}

	export interface ComponentClassConstructor<T extends ComponentClass> {
		Tag?: string;
		RequiredComponents: ReadonlyArray<string>;
		new (instance: Instance): T;
	}
}

interface Component<T extends Component.ComponentClass> {
	GetAll(): Array<T>;
	GetFromInstance(instance: Instance): T | undefined;
	GetFromID(id: string): T | undefined;
	Filter(filterFunc: (v: T, i: number, t: Array<T>) => boolean): Array<T>;
	WaitFor(instance: Instance, timeout?: number): Promise<T>;
	Destroy(): void;
	Observe(instance: Instance, observer: (component: T, maid: Maid) => void): Maid;
	readonly Added: Signal<(component: T) => void>;
	readonly Removed: Signal<(component: T) => void>;
	readonly Instance: Instance;
}

interface ComponentConstructor {
	readonly FromTag: (tag: string) => Component<Component.ComponentClass>;
	readonly Auto: (folder: Folder) => void;
	new <T extends Component.ComponentClass>(
		tag: string,
		classConstructor: Component.ComponentClassConstructor<T>,
		renderPriority?: number,
	): Component<T>;
}

declare const Component: ComponentConstructor;
export = Component;
