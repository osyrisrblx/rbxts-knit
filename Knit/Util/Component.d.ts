import Janitor from "./Janitor";
import Signal from "./Signal";

declare namespace Component {
	export interface ComponentClass {
		/**
		 *
		 * Destroy is fired internally when the component becomes unbound from the instance.
		 *
		 * A component is destroyed when one of the following conditions occurs:
		 * - The bound instance is destroyed.
		 * - The bound instance no longer has the component tag anymore.
		 * - The bound instance no longer has the required components attached anymore (see documentation on Required Components).
		 *
		 * It is recommended to use janitors in components and to only have the janitor cleanup within the Destroy method. */
		Destroy(): void;
		/** Init fires a tick/frame after the constructor has fired. */
		Init?(): void;
		/** Deinit fires right before the component's Destroy method is called. */
		Deinit?(): void;
		/**
		 * Fired when RunService.Heartbeat is fired.
		 * The delta time argument from the event is passed as an argument to the method.
		 */
		HeartbeatUpdate?(dt: number): void;
		/**
		 * Fired when RunService.Stepped is fired.
		 * The delta time argument from the event is passed as an argument to the method.
		 */
		SteppedUpdate?(dt: number): void;
		/**
		 * The RenderUpdate optional method uses RunService:BindToRenderStep internally,
		 * using your component's RenderPriority field as the priority for binding.
		 * Just like HeartbeatUpdate and SteppedUpdate, the delta time is passed along to the method.
		 */
		RenderUpdate?(dt: number): void;
	}

	/**
	 * @param Tag - the CollectionService tag to bind.
	 * @param RequiredComponents - The other components that must exist on a given instance before this one can exist.
	 */
	export interface ComponentClassConstructor<T extends ComponentClass> {
		Tag?: string;
		RequiredComponents?: ReadonlyArray<string>;
		RenderPriority?: number;
		new (instance: Instance): T;
	}
}

interface Component<T extends Component.ComponentClass> {
	/** Gets all component instances for the given component class. */
	GetAll(): Array<T>;
	/** Gets a component instance from the given Roblox instance. If no component is found, nil is returned. */
	GetFromInstance(instance: Instance): T | undefined;
	GetFromID(id: string): T | undefined;
	/** Returns a filtered list from all components for a given component class. This is equivalent to calling GetAll and running it through TableUtil.Filter. */
	Filter(filterFunc: (v: T, i: number, t: Array<T>) => boolean): Array<T>;
	/** Waits for a component to be bound to a given instance. Returns a promise that is resolved when the component is bound, or rejected when either the timeout is reached or the instance is removed. */
	WaitFor(instance: Instance, timeout?: number): Promise<T>;
	/** If the component is not needed anymore, Destroy can be called to clean it up. Typically, components are never destroyed. */
	Destroy(): void;
	/** Observes when a component is bound to a given instance. Returns a janitor that can be destroyed. */
	Observe(instance: Instance, observer: (component: T, janitor: Janitor) => void): Janitor;
	readonly Added: Signal<(component: T) => void>;
	readonly Removed: Signal<(component: T) => void>;
	readonly Instance: Instance;
}

interface ComponentConstructor {
	/** Get a component from the tag name, which assumes the component class has already been loaded. This will return nil if not found. */
	readonly FromTag: (tag: string) => Component<Component.ComponentClass>;
	/** Automatically create components from the component module descendants of the given instance. */
	readonly Auto: (folder: Instance) => void;
	new <T extends Component.ComponentClass>(
		tag: string,
		classConstructor: Component.ComponentClassConstructor<T>,
		renderPriority?: number,
	): Component<T>;
}

declare const Component: ComponentConstructor;
export = Component;
