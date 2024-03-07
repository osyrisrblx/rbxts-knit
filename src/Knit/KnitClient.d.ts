import { ClientRemoteProperty, ClientRemoteSignal, Controller, RemoteProperty, RemoteSignal, Service } from ".";

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
	 * @return Promise
	 * Starts Knit. Should only be called once per client.
	 * ```lua
	 * Knit.Start():andThen(function()
	 * 		print("Knit started!")
	 * end):catch(warn)
	 * ```
	 * 
	 * By default, service methods exposed to the client will return promises.
	 * To change this behavior, set the `ServicePromises` option to `false`:
	 * ```lua
	 * Knit.Start({ServicePromises = false}):andThen(function()
	 * 		print("Knit started!")
	 * end):catch(warn)
	 * ```
	 */
	readonly Start: () => Promise<void>;

	/**
	 * @return Promise
	 * Returns a promise that is resolved once Knit has started. This is useful
	 * for any code that needs to tie into Knit controllers but is not the script
	 * that called `Start`.
	 * ```lua
	 * Knit.OnStart():andThen(function()
	 * 		local MyController = Knit.GetController("MyController")
	 * 		MyController:DoSomething()
	 * end):catch(warn)
	 * ```
	 */
	readonly OnStart: () => Promise<void>;

	/**
	 * Creates a new controller.
	 * 
	 * Controllers must be created _before_ calling `Knit.Start()`.
	 * ```lua
	 * -- Create a controller
	 * local MyController = Knit.CreateController {
	 * 		Name = "MyController",
	 * }
	 * 
	 * function MyController:KnitStart()
	 * 		print("MyController started")
	 * end
	 * 
	 * function MyController:KnitInit()
	 * 		print("MyController initialized")
	 * end
	 * ```
	 */
	readonly CreateController: <T extends Partial<Controller<{}>>>(controller: T) => Controller<T>;

	/**
	 * Requires all the modules that are children of the given parent. This is an easy
	 * way to quickly load all controllers that might be in a folder.
	 * ```lua
	 * Knit.AddControllers(somewhere.Controllers)
	 * ```
	 */
	readonly AddControllers: (folder: Instance) => void;

	/**
	 * Requires all the modules that are descendants of the given parent.
	 */
	readonly AddControllersDeep: (folder: Instance) => void;

	/**
	 * Returns a Service object which is a reflection of the remote objects
	 * within the Client table of the given service. Throws an error if the
	 * service is not found.
	 * 
	 * If a service's Client table contains RemoteSignals and/or RemoteProperties,
	 * these values are reflected as
	 * [ClientRemoteSignals](https://sleitnick.github.io/RbxUtil/api/ClientRemoteSignal) and
	 * [ClientRemoteProperties](https://sleitnick.github.io/RbxUtil/api/ClientRemoteProperty).
	 * 
	 * ```lua
	 * -- Server-side service creation:
	 * local MyService = Knit.CreateService {
	 * 		Name = "MyService",
	 * 		Client = {
	 * 			MySignal = Knit.CreateSignal(),
	 * 			MyProperty = Knit.CreateProperty("Hello"),
	 * 		},
	 * }
	 * 
	 * function MyService:AddOne(player, number)
	 * 		return number + 1
	 * end
	 * 
	 * -------------------------------------------------
	 * 
	 * -- Client-side service reflection:
	 * local MyService = Knit.GetService("MyService")
	 * 
	 * -- Call a method:
	 * local num = MyService:AddOne(5) --> 6
	 * 
	 * -- Fire a signal to the server:
	 * MyService.MySignal:Fire("Hello")
	 * 
	 * 	-- Listen for signals from the server:
	 * MyService.MySignal:Connect(function(message)
	 * 		print(message)
	 * end)
	 * 
	 * -- Observe the initial value and changes to properties:
	 * MyService.MyProperty:Observe(function(value)
	 * 		print(value)
	 * end)
	 * ```
	 * 
	 * Services are only exposed to the client if the service has remote-based
	 * content in the Client table. If not, the service will not be visible
	 * to the client. `KnitClient.GetService` will only work on services that
	 * expose remote-based content on their Client tables.
	 */
	readonly GetService: <T extends keyof KnitServices>(serviceName: T) => ServiceMirror<KnitServices[T]>;

	/**
	 * Gets the controller by name. Throws an error if the controller
	 * is not found.
	 */
	readonly GetController: <T extends keyof KnitControllers>(controllerName: T) => KnitControllers[T];

	/**
	 * Reference to Players.LocalPlayer
	 */
	readonly Player: Player;
}

declare const KnitClient: KnitClient;
export = KnitClient;
