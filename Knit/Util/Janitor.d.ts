/**
 * A class to manage the connections in your game
 */
declare class Janitor<U extends object | void = void> {
	/**
	 * Instantiates a new Janitor object.
	 */
	public constructor();

	/**
	 * Adds an `Object` to Janitor for later cleanup, where `MethodName` is the key of the method within `Object` which should be called at cleanup time.
	 *
	 * If the `MethodName` is `true` the `Object` itself will be called instead.
	 *
	 * If passed an index it will occupy a namespace which can be `Remove()`d or overwritten. Returns the `Object`.
	 * @param object The object you want to clean up.
	 * @param methodName The name of the method that will be used to clean up. If not passed, it will first check if the object's type exists in TypeDefaults, and if that doesn't exist, it assumes `Destroy`.
	 * @param index The index that can be used to clean up the object manually.
	 * @returns The object that was passed.
	 */
	public Add<
		O extends keyof U extends never
			? object
			: I extends keyof U
			? U[I]
			: M extends true
			? Callback
			: M extends undefined
			? RBXScriptConnection | { Destroy(): void }
			: object,
		M extends undefined | ((this: O) => void) | ((_: O) => void) | ExtractKeys<O, () => void> | true,
		I extends keyof U | undefined = undefined
	>(object: O, methodName?: M, index?: I): O;

	/**
	 * Adds a promise to the janitor. If the janitor is cleaned up and the promise is not completed, the promise will be cancelled.
	 * @param promise The promise you want to add to the janitor.
	 * @returns The promise that was passed
	 */
	public AddPromise<T extends Promise<unknown>>(promise: T): T;

	/**
	 * Cleans up whatever `object` was set to this namespace by the 3rd parameter of `.Add()`.
	 * @param index The index you want to remove.
	 * @returns The same janitor, for chaining reasons.
	 */
	public Remove(index: keyof U): this;

	/**
	 * Gets whatever object is stored with the given index, if it exists. This was added since Maid allows getting the task using `__index`.
	 * @param index The index that the object is stored under.
	 * @returns This will return the object if it is found, but it won't return anything if it doesn't exist.
	 */
	public Get<T extends keyof U>(index: T): U[T] | undefined;

	/**
	 * Calls each Object's `MethodName` (or calls the Object if `MethodName === true`) and removes them from the Janitor. Also clears the namespace. This function is also called when you call a Janitor Object (so it can be used as a destructor callback).
	 */
	public Cleanup(): void;

	/**
	 * Calls `.Cleanup()` and renders the Janitor unusable.
	 */
	public Destroy(): void;

	/**
	 * "Links" this Janitor to an Instance, such that the Janitor will `Cleanup` when the Instance is `Destroyed()` and garbage collected.
	 *
	 * A Janitor may only be linked to one instance at a time, unless `AllowMultiple` is true.
	 *
	 * When called with a truthy `AllowMultiple` parameter, the Janitor will "link" the Instance without overwriting any previous links, and will also not be overwritable.
	 *
	 * When called with a falsy `AllowMultiple` parameter, the Janitor will overwrite the previous link which was also called with a falsy `AllowMultiple` parameter, if applicable.
	 * @param object The instance you want to link the Janitor to.
	 * @param allowMultiple Whether or not to allow multiple links on the same Janitor.
	 * @returns A pseudo RBXScriptConnection that can be disconnected.
	 */
	public LinkToInstance(object: Instance, allowMultiple: boolean): RBXScriptConnection;

	/**
	 * Links several instances to a janitor, which is then returned.
	 * @param instances All the instances you want linked.
	 * @returns A janitor that can be used to manually disconnect all LinkToInstances.
	 */
	public LinkToInstances(...instances: Array<Instance>): Janitor;

	/**
	 * Determines if the passed object is a Janitor.
	 * @param object The object you are checking.
	 * @returns Whether or not the object is a Janitor.
	 */
	public static Is<T extends object>(object: unknown): object is Janitor<T>;
}

export = Janitor;
