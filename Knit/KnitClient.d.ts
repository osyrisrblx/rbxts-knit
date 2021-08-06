import { ClientRemoteProperty, ClientRemoteSignal, Controller, RemoteProperty, RemoteSignal, Service } from "..";

type GetThisType<T> = T extends (this: infer U, ...args: Array<any>) => any ? U : never;

type Method = (this: defined, ...args: Array<any>) => any;

type OmitFirstArg<T> = T extends (firstArg: any, ...args: infer P) => infer R
	? (this: GetThisType<T>, ...args: P) => R
	: never;

type PromisifyFunction<T> = T extends Method
	? OmitFirstArg<(this: GetThisType<T>, ...args: Parameters<T>) => Promise<ReturnType<T>>>
	: T;

type PromisifyService<T> = {
	[K in ExtractKeys<T, Method> & string as `${K}Promise`]: PromisifyFunction<T[K]>;
};

type MapValueToClient<T> = T extends Method
	? OmitFirstArg<T>
	: T extends RemoteProperty<infer U>
	? ClientRemoteProperty<U>
	: T extends RemoteSignal<infer U>
	? ClientRemoteSignal<U>
	: never;

type MapServiceToClient<T> = { [K in keyof T]: MapValueToClient<T[K]> };

/** A table that mirrors the methods and events that were exposed on the server via the Client table. */
type ServiceMirror<T> = T extends Service<{}, infer C> ? MapServiceToClient<C> & PromisifyService<C> : never;

interface KnitClient {
	/**
	 * A table that contains all created [controllers](https://atollstudios.github.io/Knit/knitapi/#controller).
	 *
	 * ```lua
	 * local allControllers = Knit.Controllers
	 * for name,controller in pairs(allControllers) do
	 * 	print(name)
	 * end
	 * ```
	 *
	 * **Note:**
	 * Within other controllers, this table should only be accessed during or after the `KnitInit` stage.
	 * While it is safe to reference other controllers at the `KnitInit` stage, it is not safe to use them.
	 * Wait until the `KnitStart` stage to start using them (e.g. calling methods and events).
	 */
	readonly Controllers: KnitControllers;

	/**
	 * A folder containing utility modules used by Knit, but also accessible for developers to use.
	 *
	 * This folder contains the following modules:
	 * * Janitor
	 * * Event
	 * * Promise
	 * * Thread
	 *
	 * They can be required like any other module:
	 * ```lua
	 * local Signal = require(Knit.Util.Signal)
	 * ```
	 */
	readonly Util: Folder;

	/**
	 * Start Knit.
	 * This returns a promise which resolves once all services or controllers are fully initialized and started.
	 * The usage of this is the same on the server and the client.
	 *
	 * ```lua
	 * local Knit = require(game:GetService("ReplicatedStorage").Knit)
	 *
	 * ----
	 * -- Create services or controllers here
	 * ----
	 *
	 * -- Start Knit:
	 * Knit.Start():Then(function()
	 * 	 print("Knit is running")
	 * end):Catch(function(err)
	 * 	warn(err)
	 * end)
	 * ```
	 *
	 * Alternative ways to start Knit:
	 * ```lua
	 * -- Use 'Await' to wait for Knit to start and capture any errors:
	 * local success, err = Knit.Start():Await()
	 * if (not success) then
	 *     warn(err)
	 * end
	 * ```
	 * ```lua
	 * -- Feed the 'warn' built-in function directly to the Catch of the returned promise:
	 * Knit.Start():Catch(warn)
	 * ```
	 *
	 * ```lua
	 * -- Same as above, but also yield until Knit has started.
	 * -- Just note that the 'Catch' will eat up the error, so Await will return successfully even if an error occurs.
	 * Knit.Start():Catch(warn):Await()
	 * ```
	 *
	 * It is important that errors are handled when starting Catch,
	 * as any errors within the Init lifecycle will go undetected otherwise.
	 */
	readonly Start: () => Promise<void>;

	/**
	 * Wait for Knit to start. This is useful if there are other scripts that need to access Knit services or
	 * controllers. If Knit is already started, it resolves the promise immediately.
	 *
	 * ```lua
	 * -- Wait for Knit to be started:
	 * Knit.OnStart():Await()
	 * ```
	 */
	readonly OnStart: () => Promise<void>;

	/**
	 * Creates a new [controller](https://atollstudios.github.io/Knit/knitapi/#controller). Returns the controller. Please
	 * see the [Controllers](https://atollstudios.github.io/Knit/controllers/) documentation for more info.
	 *
	 * The provided `controller` table must contain a unique `Name` property.
	 */
	readonly CreateController: <T extends Partial<Controller<{}>>>(controller: T) => Controller<T>;

	/**
	 * Automatically creates new controllers from ModuleScripts found directly within `folder`.
	 *
	 * ```lua
	 * Knit.AddControllers(replicatedStorage.MyControllers)
	 * ```
	 */
	readonly AddControllers: (folder: Instance) => void;

	/**
	 * Works the same as `Knit.AddControllers`, but scans all descendants of `folder`. This is useful if controllers are
	 * organized into sub-folders.
	 *
	 * However, this should be used sparingly, since it will try to load _any_ ModuleScript descendant as a controller.
	 * If your controllers might have non-controller modules nested in the descendant hierarchy, use a series of
	 * `Knit.AddControllers` instead.
	 *
	 * ```lua
	 * Knit.AddControllersDeep(replicatedStorage.MyControllers)
	 * ```
	 */
	readonly AddControllersDeep: (folder: Instance) => void;

	/**
	 * Returns a [ServiceMirror](https://atollstudios.github.io/Knit/knitapi/#servicemirror) table object representing the
	 * service. Service methods and events that have been exposed to the client can be used from this returned object.
	 *
	 * ```lua
	 * local SomeService = Knit.GetService("SomeService")
	 * SomeService:DoSomething()
	 * ```
	 *
	 * Every method will also have a "Promisefied" version. Just append "Promise" to the name of the event:
	 * ```lua
	 * local SomeService = Knit.GetService("SomeService")
	 * SomeService:DoSomethingPromise():Then(function() ... end)
	 * ```
	 */
	readonly GetService: <T extends keyof KnitServices>(serviceName: T) => ServiceMirror<KnitServices[T]>;

	/**
	 * Returns a [controller](https://atollstudios.github.io/Knit/knitapi/#controller) with the given controller name. This
	 * is just an alias for `Knit.Controllers[controllerName]` and only exists for developers who want to have the same
	 * pattern used with `Knit.GetService`.
	 */
	readonly GetController: <T extends keyof KnitControllers>(controllerName: T) => KnitControllers[T];

	/**
	 * Reference to Players.LocalPlayer
	 */
	readonly Player: Player;
}

declare const KnitClient: KnitClient;
export = KnitClient;
