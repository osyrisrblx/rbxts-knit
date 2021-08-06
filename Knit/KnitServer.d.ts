import { Service } from "..";

interface KnitServer {
	/**
	 * A table that contains all created [services](https://atollstudios.github.io/Knit/knitapi/#service).
	 *
	 * ```lua
	 * local allServices = Knit.Services
	 * for name,service in pairs(allServices) do
	 *     print(name)
	 * end
	 * ```
	 *
	 * **Note:**
	 * Within other services, this table should only be accessed during or after the `KnitInit` stage.
	 * While it is safe to reference other services at the `KnitInit` stage, it is not safe to use them.
	 * Wait until the `KnitStart` stage to start using them (e.g. calling methods and events).
	 */
	readonly Services: KnitServices;

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
	 * Start Knit. This returns a promise which resolves once all services or controllers are fully initialized and
	 * started. The usage of this is the same on the server and the client.
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
	 * Creates a new [service](https://atollstudios.github.io/Knit/knitapi/#service). Returns the service. Please see the
	 * [Services](https://atollstudios.github.io/Knit/services/) documentation for more info.
	 *
	 * The provided `service` table must contain a unique Name property. It can optionally contain a `Client` table as
	 * well. If the `Client` table isn't provided, Knit will automatically create one for the service.
	 *
	 * ```lua
	 * local MyService = Knit.CreateService { Name = "MyService", Client = {} }
	 * ```
	 */
	readonly CreateService: <T extends Partial<Service<{}, U>>, U>(
		service: T & { Client?: ThisType<T["Client"] & { Server: T }> },
	) => Service<T, U>;

	/**
	 * Automatically creates new [services](https://atollstudios.github.io/Knit/knitapi/#service) from ModuleScripts found
	 * directly within `folder`.
	 * ```lua
	 * Knit.AddServices(serverStorage.MyServices)
	 * ```
	 */
	readonly AddServices: (folder: Instance) => void;

	/**
	 * Works the same as `Knit.AddServices`, but scans all descendants of `folder`. This is useful if services are
	 * organized into sub-folders.
	 *
	 * However, this should be used sparingly, since it will try to load _any_ ModuleScript descendant as a service. If
	 * your services might have non-service modules nested in the descendant hierarchy, use a series of
	 * `Knit.AddServices` instead.
	 *
	 * ```lua
	 * Knit.AddServicesDeep(serverStorage.MyServices)
	 * ```
	 */
	readonly AddServicesDeep: (folder: Instance) => void;

	readonly GetService: <T extends keyof KnitServices>(serviceName: T) => KnitServices[T];
}

declare const KnitServer: KnitServer;
export = KnitServer;
